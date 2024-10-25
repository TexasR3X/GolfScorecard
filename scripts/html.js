import { Table } from "./classes.js";

export const thumbnailImage = document.querySelector("#thumbnail-image");
export const selectTee = document.querySelector("#select-tee");
export const selectCourse = document.querySelector("#select-course");

export const buildOption0 = (value, content) => ` <option value="${value}">Select ${content}</option> `;

export const buildOption = (value, content) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = content;
    return option;
}

// (holes: array of holes (1...9) or (10...18), tableSelector: element selector, direction: "In" or "Out" on table.)

/*
export const buildDataTables = (courseData, teeIndex) => {
    console.log("=".repeat(15) + " buildTable() " + "=".repeat(15));
    console.log("courseData:", courseData);
    console.log("teeIndex:", teeIndex);
    console.log("");

    // let holes;
    // switch (holeValues) {
    //     case "front nine":
    //         holes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    //         break;
    //     case "back nine": 
    //         holes = [10, 11, 12, 13, 14, 15, 16, 17, 18];
    //         break;
    //     default:
    //         throw new Error(`Invalid value for holeValues: "${holeValues}"`);
    // }

    const getDataforAllHoles = (prop, holes) => {
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
    const getDataForHole = (holeNum, prop) => courseData.holes[holeNum - 1].teeBoxes[teeIndex][prop];

    const buildMostOfTable = (table, holes, inOrOut) => {
        table.addRow(["Holes", ...holes, inOrOut]);
        table.addRow(["Yardage", ...getDataforAllHoles("yards", holes)]);
        table.addRow(["Par", ...getDataforAllHoles("par", holes)]);
        table.addRow(["Handicap", ...getDataforAllHoles("hcp", holes)]);
    }

    const frontTable = new Table();
    buildMostOfTable(frontTable, [1, 2, 3, 4, 5, 6, 7, 8, 9], "In");
    frontTable.log("Front");

    const backTable = new Table();
    buildMostOfTable(backTable, [10, 11, 12, 13, 14, 15, 16, 17, 18], "Out");
    backTable.log("Back");
}
*/