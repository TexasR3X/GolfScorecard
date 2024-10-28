export const thumbnailImage = document.querySelector("#thumbnail-image");
export const selectTee = document.querySelector("#select-tee");
export const selectCourse = document.querySelector("#select-course");
export const tableContainerFront = document.querySelector("#table-container-front");
export const tableContainerBack = document.querySelector("#table-container-back");
export const addPlayer = document.querySelector("#add-player");

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
    for (let i = 0; i < tableData.getBodyRows().length; i++) {
        const row = tableData.getBodyRows()[i];
        const tr = document.createElement("tr");
        
        for (let j = 0; j < row.length; j++) {
            const cell = row[j]
            const td = document.createElement("td");

            if (j > 3 && i !== 0 && i > 9) {

            }

            td.textContent = cell ?? "";

            // if (typeof cell === "string" || typeof cell === "number") td.textContent = cell;
            // else if (typeof cell === "object") td.appendChild(cell);
            // else throw new Error(`In valid "cell" data type`);

            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    const table = document.createElement("table");
    table.appendChild(thead);
    table.appendChild(tbody);

    return table;
}

export const buildScoreInput = (playerId, tableXCoor, value = "") => {
    const input = document.createElement("input");
    input.id = `input-${tableXCoor}--player-${playerId}`;
    input.className = "score-input";
    input.type = "number";
    input.value = value;
    return input;
}

export const buildTotalSpan = (playerId, totalType, value = 0) => {
    const span = document.createElement("span");
    span.id = `total-${totalType}--player-${playerId}`;
    span.textContent = value;
    return span;
}