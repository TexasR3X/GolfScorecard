import * as HTML from "./html.js";
import { Table, Player } from "./classes.js";

const fetchData = async (url) => await (await fetch(url)).json();

const loadedCourses = [];
const loadedCourseIds = [];
const tables = {
    front: new Table(),
    back: new Table(),
    callBoth(methodName, ...args) {
        this.front[methodName].apply(this.front, args);
        this.back[methodName].apply(this.back, args);
    }
}
const players = [];

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

            // ===== The following section takes the table data and puts it into HTML. ===== //
            console.log("tables:", tables);

            HTML.tableContainerFront.innerHTML = "";
            HTML.tableContainerBack.innerHTML = "";

            HTML.tableContainerFront.appendChild(HTML.buildTable(tables.front));
            HTML.tableContainerBack.appendChild(HTML.buildTable(tables.back));
        }
        remakeTable({ target: { value: 0 } });
        HTML.selectTee.addEventListener("change", remakeTable)
    }
    remakeTeeSelect({ target: { value: golfCoursesData[0].id } });
    HTML.selectCourse.addEventListener("change", remakeTeeSelect);

    const addNewPlayer = (event) => {
        const newPlayer = new Player(prompt("Enter player's name:"));
        players.push(newPlayer);

        console.log("players:", players);

        console.log(`HTML.buildInput(12345, 2):`, HTML.buildInput(12345, 2));
        let inputArr = [];
        for (let i = 1; i < 10; i++) {
            inputArr.push(HTML.buildInput(newPlayer.id, i));
        }

        tables.callBoth("addRow", [
            newPlayer.name,

        ]);
        

        tables.callBoth("log");
    }
    HTML.addPlayer.addEventListener("click", addNewPlayer);
}
onLoad();