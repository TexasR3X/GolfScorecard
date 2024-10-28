import { Player, players } from "./classes.js";

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

            if (i > 2 && j !== 0 && j < 10) td.className = "player-score";

            if (i > 2 && j === 0) {
                td.textContent = Player.getPlayerById(cell).name;
                td.dataset.id = cell;
            }
            else td.textContent = cell ?? "";

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

export const siblingIndex = (elm) => {
    const parentChildren = elm.parentNode.children;

    for (let i = 0; i < parentChildren.length; i++) { if (parentChildren[i] === elm) return i; }
}

export const prototypeAdditions = {
    clearContent() {
        const textContent = this.textContent;
        this.textContent = "";
        return textContent; // String
    },
    findTableParent() {
        if (this?.className === "table-container") return this.id.slice(16);
        else return this.parentNode.findTableParent();
    }
}
export const updateHTMLElementPrototype = () => { for (const prop in prototypeAdditions) { HTMLElement.prototype[prop] = prototypeAdditions[prop]; } }