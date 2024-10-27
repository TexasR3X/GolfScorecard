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
    constructor(name, id = idIterable.next(), scores = []) {
        this.name = name;
        this.id = id;
        this.scores = [];
    }
}