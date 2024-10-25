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







// export const buidSelect = (options, placeholder, valueProp, shownProp) => {
//     const useProps = valueProp !== undefined;

//     let selectHTML = ` <option value="select">Select ${placeholder}</option> `;

//     options.forEach((option) => {
//         selectHTML += ` <option value="${useProps? option[valueProp]: option}">${useProps? option[shownProp]: option}</option> `;
//     });

//     return selectHTML;
// }



// (holes: array of holes (1...9) or (10...18), tableSelector: element selector, direction: "In" or "Out" on table.)

export const buildTable = (courseData, holesStr) => {
    let holesArr;
    
    switch (holesStr) {
        case "front nine":
            holesArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "In"];
            break;
        case "back nine": 
            holesArr = ["10", "11", "12", "13", "14", "15", "16", "17", "18", "Out"];
            break;
        default:
            throw new Error(`Invalid value for holesStr: "${holesStr}"`);
    }

    const tableData = new Table();
    console.log("courseData:", courseData);

    tableData.addRow(["Holes", ...holesArr, "Total"]);
    tableData.addRow(["Yardage", ...(() => {
        return [];
    })()]);

    console.log("tableData:", tableData);
}