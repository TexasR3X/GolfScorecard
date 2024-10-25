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

export const buildTable = (courseData, holeValues, teeIndex) => {
    console.log("=".repeat(15) + " buildTable() " + "=".repeat(15));
    console.log("courseData:", courseData);
    console.log("holeValues:", holeValues);
    console.log("teeIndex:", teeIndex);
    console.log("");


    

    let holesArr;
    switch (holeValues) {
        case "front nine":
            holesArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
            break;
        case "back nine": 
            holesArr = ["10", "11", "12", "13", "14", "15", "16", "17", "18"];
            break;
        default:
            throw new Error(`Invalid value for holeValues: "${holeValues}"`);
    }

    const getDataforAllHoles = (prop) => {
        // debugger;
        let outputArr = [];
        holesArr.forEach((nums) => outputArr.push(getDataForHole(+(nums), prop)));
        return outputArr;
    }
    const getDataForHole = (holeNum, prop) => courseData.holes[holeNum - 1].teeBoxes[teeIndex][prop];

    const tableData = new Table();
    console.log("courseData:", courseData);

    tableData.addRow(["Holes", ...holesArr, (holeValues[0] === "1")? "In": "Out", "Total"]);
    tableData.addRow(["Yardage", ...getDataforAllHoles("yards")]);
    tableData.addRow(["Par", ...getDataforAllHoles("par")]);
    tableData.addRow(["Handicap", ...getDataforAllHoles("hcp")]);

    tableData.log();
}