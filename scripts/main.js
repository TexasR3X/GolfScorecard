import * as HTML from "./html.js";
import { Table, tables, Player, players } from "./classes.js";

const loadedCourses = [];
const loadedCourseIds = [];

const fetchData = async (url) => await (await fetch(url)).json();
const getCourse = async (courseId) => {
    if (!loadedCourseIds.includes(courseId)) {
        const newCourse = await fetchData(`https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${courseId}.json`);
        console.log("newCourse:", newCourse);

        loadedCourses.push(newCourse);
        loadedCourseIds.push(courseId);

        console.log("loadedCourses:", loadedCourses);
        console.log("loadedCourseIds:", loadedCourseIds);
    }

    return loadedCourses[loadedCourseIds.indexOf(courseId)];
}
const repeatFn = (firstIndex, lastIndex, callbackFn, ...inputFnArgs) => {
    const outputArr = [];

    for (let i = firstIndex; i <= lastIndex; i++) {
        const finalFnArgs = [...inputFnArgs];
        if (finalFnArgs.includes("current index")) finalFnArgs[finalFnArgs.indexOf("current index")] = i;

        outputArr.push(callbackFn(...finalFnArgs));
    }

    return outputArr;
}
const waitFor = (condition) => { const intervalId = setInterval(() => { if (condition) clearInterval(intervalId); }, 1000); }

const onLoad = async () => {
    const golfCoursesData = await fetchData("https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json");
    console.log("golfCoursesData:", golfCoursesData);

    golfCoursesData.forEach((course) => HTML.selectCourse.appendChild(HTML.buildOption(course.id, course.name)));

    const remakeTeeSelect = async (event) => {
        console.log("event:", event);
        console.log("event.target.value:", event.target.value);

        const course = await getCourse(event.target.value);

        console.log("course:", course);

        HTML.thumbnailImage.src = course.thumbnail;

        console.log("course.holes[0].teeBoxes:", course.holes[0].teeBoxes);
        
        // Build Tee Select
        HTML.selectTee.innerHTML = "";
        course.holes[0].teeBoxes.forEach((teeBox, i) => HTML.selectTee.appendChild(HTML.buildOption(i, teeBox.teeType.toUpperCase())));

        const remakeTable = async (event) => {
            // ===== The following section builds the two tables as data. ===== //
            // This creates a table without the last column (total column).
            const buildPartOfTable = (table, holes, inOrOut) => {
                table.addRow(["Holes", ...holes, inOrOut]);
                table.addRow(["Yardage", ...getDataForAllHoles("yards", holes)]);
                table.addRow(["Par", ...getDataForAllHoles("par", holes)]);
                table.addRow(["Handicap", ...getDataForAllHoles("hcp", holes)]);
            }
            // This gets the data from course, finds the sum of all data points, and returns an array of each data point.
            const getDataForAllHoles = (prop, holes) => {
                let outputArr = [];
                let sum = 0;

                holes.forEach((num) => {
                    let newDataPoint = getDataForHole(num, prop)
                    outputArr.push(newDataPoint);
                    sum += newDataPoint;
                });

                outputArr.push(sum);

                return outputArr;
            }
            // Returns a specific data point from course.
                // holes[holeNum - 1].teeBoxes[+(event.target.value)][prop] -> Path to get yards, par, or hcp for a specific hole.
                // +(event.target.value) -> The tee index.
            const getDataForHole = (holeNum, prop) => course.holes[holeNum - 1].teeBoxes[+(event.target.value)][prop];

            // A tables are cleared of all data they had.
            tables.front.clear();
            tables.back.clear();

            // All of the data points for each table will be built, aside from the last column of each.
            buildPartOfTable(tables.front, [1, 2, 3, 4, 5, 6, 7, 8, 9], "In");
            buildPartOfTable(tables.back, [10, 11, 12, 13, 14, 15, 16, 17, 18], "Out");

            // This gets the totals for the last column.
            let totals = ["Totals"];
            for (let i = 1; i < tables.front.rows.length; i++) { totals.push(tables.front.getCell(10, i) + tables.back.getCell(10, i)); }

            // This adds the last column to each table.
                // Both tables have the same totals column.
            tables.front.addColumn(totals);
            tables.back.addColumn(totals);

            // ===== This takes the table data and builds it into HTML tables. ===== //
            tables.buildTables();
        }
        remakeTable({ target: { value: 0 } });
        HTML.selectTee.addEventListener("change", remakeTable)
    }
    remakeTeeSelect({ target: { value: golfCoursesData[0].id } });
    HTML.selectCourse.addEventListener("change", remakeTeeSelect);

    const addNewPlayer = () => {
        const newPlayer = new Player(prompt("Enter player's name:"));
        players.push(newPlayer);
        console.log("players:", players);

        // tables.front.addRow([
        //     newPlayer.name,
        //     ...repeatFn(1, 9, HTML.buildScoreInput, newPlayer.id, "current index"),
        //     HTML.buildTotalSpan(newPlayer.id, "in"),
        //     HTML.buildTotalSpan(newPlayer.id, "in-overall")
        // ]);
        // tables.back.addRow([
        //     newPlayer.name,
        //     ...repeatFn(10, 18, HTML.buildScoreInput, newPlayer.id, "current index"),
        //     HTML.buildTotalSpan(newPlayer.id, "out"),
        //     HTML.buildTotalSpan(newPlayer.id, "out-overall")
        // ]);
        tables.callBoth("log");
        console.log("Log the tables! (above)")

        tables.front.addRow([
            newPlayer.name,
            null, null, null, null, null, null, null, null, null,
            0,
            0
        ]);
        tables.back.addRow([
            newPlayer.name,
            null, null, null, null, null, null, null, null, null,
            0,
            0
        ]);

        tables.callBoth("log");

        tables.buildTables();
    }
    HTML.addPlayer.addEventListener("click", addNewPlayer);

    const scoreChange = (event) => {
        if (event.target.tagName === "TD" && event.target.className === "player-score") {
            console.log("Click Inside");
            const td = event.target;
            // I need to fix this for holes 10 through 18.
            const hole = HTML.siblingIndex(td);
            const player = Player.getPlayerByTd(td);
            console.log("player:", player);

            const input = document.createElement("input");
            input.value = td.textContent;
            td.appendChild(input);

            input.addEventListener("blur", (event) => {
                player.updateScore(hole, input.value);

                td.textContent = // ........................................................................

                tables.callBoth("log");
            }, { once: true });



            // const player = players[scoreInput.id.replace(/^input-\d+--player-(?<id>\d+)$/g, "$<id>")];
            // const hole = +(scoreInput.id.replace(/^input-(?<index>\d+)--player-\d+$/g, "$<index>"));

            

            // This updates the hole and the totals for the selected player.
            // player.updateScore(hole, scoreInput.value);

            // console.log("player:", player);
            // console.log("player.scores:", player.scores);

            

            // `total-${totalType}--player-${playerId}`
        }
    }
    document.addEventListener("click", scoreChange);
}
onLoad();