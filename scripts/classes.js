export class Table {
    constructor() {
        this.rows = [];
    }

    addRow(row) { this.rows.push(row); }
    addColumn(column) { for (let i = 0; i < this.rows.length; i++) { this.rows[i].push(column[i]); } }

    log() {
        console.log("=".repeat(50));
        console.log(`${this.rows[0].includes("In")? "Front": "Back"} Table:`);
        this.rows.forEach((_items, i) => console.log(this.rows[i]));
        console.log("=".repeat(50));
    }

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
        this.name = name;
        this.id = id;
        this.scores = scores;

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
        // Note that in math all nulls are treated as 0.

        // This sets the totals to 0.
        this.totalIn = 0;
        this.totalOut = 0;

        // This updates this.totalIn and this.totalOut
        for (let i = 1; i <= 9; i++) { this.totalIn += this.scores[i]; }
        for (let i = 10; i <= 18; i++) { this.totalOut += this.scores[i]; }
        // This updates this.totalOverall
        this.totalOverall = this.totalIn + this.totalOut;
    }

    static myFn() {
        
    }
}