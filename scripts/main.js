import * as HTML from "./html.js";
HTML.updateHTMLElementPrototype();
import { Table, tables, Player, players } from "./classes.js";

const loadedCourses = [];
const loadedCourseIds = [];

const fetchData = async (url) => await (await fetch(url)).json();
const getCourse = async (courseId) => {
    if (!loadedCourseIds.includes(courseId)) {
        const newCourse = await fetchData(`https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${courseId}.json`);

        loadedCourses.push(newCourse);
        loadedCourseIds.push(courseId);
    }

    return loadedCourses[loadedCourseIds.indexOf(courseId)];
}

const onLoad = async () => {
    const golfCoursesData = await fetchData("https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json");

    golfCoursesData.forEach((course) => HTML.selectCourse.appendChild(HTML.buildOption(course.id, course.name)));

    const remakeTeeSelect = async (event) => {
        const course = await getCourse(event.target.value);

        HTML.thumbnailImage.src = course.thumbnail;
        
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
        
        if (newPlayer.name === null || newPlayer.name === "") return; // Don't allow empty player names to be empty.

        players.push(newPlayer);

        tables.callBoth("addRow", [
            newPlayer.id,
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
            const td = event.target;

            const player = Player.getPlayerByTd(td);

            const isFront = td.findTableParent() === "front";

            let hole;
            if (isFront) hole = HTML.siblingIndex(td);
            else hole = HTML.siblingIndex(td) + 9;

            const rowIndex = player.id + 4;

            const input = document.createElement("input");
            input.value = td.clearContent();
            input.type = "number";
            td.appendChild(input);

            input.focus();
            input.addEventListener("keydown", (event) => { if (event.key === "Enter") input.blur(); });
            input.addEventListener("blur", () => {
                player.updateScore(hole, input.value);

                const newRow = [player.id];
                if (isFront) {
                    newRow.push(...player.scores.slice(1, 10), player.totalIn, player.totalOverall);

                    tables.updateTableRow("front", rowIndex, newRow);
                }
                else {
                    newRow.push(...player.scores.slice(10), player.totalOut, player.totalOverall);

                    tables.updateTableRow("back", rowIndex, newRow);
                }

                tables.callBoth("log");

                tables.buildTables();
            }, { once: true });
        }
    }
    document.addEventListener("click", scoreChange);
}
onLoad();