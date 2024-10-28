import * as HTML from "./html.js";

export class Table {
    constructor() {
        this.rows = [];
    }

    addRow(row) { this.rows.push(row); }
    addColumn(column) { for (let i = 0; i < this.rows.length; i++) { this.rows[i].push(column[i]); } }

    updateRow(rowIndex, newRow) { this.rows[rowIndex] = newRow; }

    getCell(x, y) { return this.rows[y][x]; }
    setCell(x, y, newValue) { this.rows[y][x] = newValue; }
    // This returns the top row.
    getHeadRow() { return this.rows[0]; }
    // This returns all the rows other than the top one.
    getBodyRows() {
        let bodyRows = [...this.rows];
        bodyRows.shift();
        return bodyRows;
    }

    clear() { this.rows = []; }

    log() {
        console.log("=".repeat(50));
        console.log(`${this.rows[0].includes("In")? "Front": "Back"} Table:`);
        this.rows.forEach((_items, i) => console.log(this.rows[i]));
        console.log("=".repeat(50));
    }
}


const createIterable = (first = 0) => {
    return {
        current: first,
        next() { return this.current++; }
    }
}
const idIterable = createIterable();

export class Player {
    constructor(name, id = idIterable.next(), scores = ["placeholder", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]) {
        this.name = name; // String
        this.id = id; // Number
        this.scores = scores; // Array

        // This method will do the following:
            // this.totalIn = 0;
            // this.totalOut = 0;
            // this.totalOverall = 0;
        this.updateTotals();
    }

    updateScore(hole, newValue) {
        this.scores[hole] = (newValue === "")? null: +(newValue);

        this.updateTotals();
    }
    updateTotals() {
        // Note that in mathematical operations nulls are treated as 0.

        // This sets the totals to 0.
        this.totalIn = 0;
        this.totalOut = 0;

        // This updates this.totalIn and this.totalOut
        for (let i = 1; i <= 9; i++) { this.totalIn += this.scores[i]; }
        for (let i = 10; i <= 18; i++) { this.totalOut += this.scores[i]; }
        // This updates this.totalOverall
        this.totalOverall = this.totalIn + this.totalOut;
    }

    static getPlayerById(id) { for (const player of players) { if (player.id === id) return player; } }

    static getPlayerByTd(td) {
        const playerId = td.parentNode.children[0].dataset.id;
        const tbodyChildren = td.parentNode.parentNode.children;

        for (let i = 0; i < tbodyChildren.length; i++) { if (tbodyChildren[i].children[0].dataset.id === playerId) return players[i - 3]; }
    }
}



export const tables = {
    front: new Table(),
    back: new Table(),
    callBoth(methodName, ...args) {
        this.front[methodName].apply(this.front, args);
        this.back[methodName].apply(this.back, args);
    },
    buildTables() {
        HTML.tableContainerFront.innerHTML = "";
        HTML.tableContainerBack.innerHTML = "";

        HTML.tableContainerFront.appendChild(HTML.buildTable(this.front));
        HTML.tableContainerBack.appendChild(HTML.buildTable(this.back));
    },
    updateTableRow(frontOrBack, rowIndex, newRow) {
        // Note that when one table is edited, both tables need to have new overall totals, so they both need to be updated.

        if (frontOrBack === "front") {
            this.front.updateRow(rowIndex, newRow);

            this.back.rows[rowIndex][this.back.rows[rowIndex].length - 1] = this.front.rows[rowIndex][this.front.rows[rowIndex].length - 1];
        }
        else {
            this.back.updateRow(rowIndex, newRow);

            this.front.rows[rowIndex][this.front.rows[rowIndex].length - 1] = this.back.rows[rowIndex][this.back.rows[rowIndex].length - 1];
        }
    }
}
export const players = [];