import { Table } from "./classes.js";

// I might not need this.
HTMLElement.prototype.createAndAppend = function (elm) {
    this.appendChild(document.createElement(elm));
    return this;
}

export const thumbnailImage = document.querySelector("#thumbnail-image");
export const selectTee = document.querySelector("#select-tee");
export const selectCourse = document.querySelector("#select-course");
export const tableContainerFront = document.querySelector("#table-container-front");
export const tableContainerBack = document.querySelector("#table-container-back");

// This should be deleted.
export const buildOption0 = (value, content) => ` <option value="${value}">Select ${content}</option> `;

export const buildOption = (value, content) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = content;
    return option;
}

export const buildTable = (tableData) => {
    const thead = document.createElement("thead");
    const trInHead = document.createElement("tr");
    for (let cell of tableData.getHeadRow()) {
        const th = document.createElement("th");
        th.textContent = cell;
        trInHead.appendChild(th);
    }
    thead.appendChild(trInHead);
    
    const tbody = document.createElement("tbody");
    for (let row of tableData.getBodyRows()) {
        const tr = document.createElement("tr");
        for (let cell of row) {
            const td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    const table = document.createElement("table");
    table.appendChild(thead);
    table.appendChild(tbody);

    return table;
}