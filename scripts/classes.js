export class Table {
    constructor() {
        this.rows = [];
    }

    addRow(cells) { this.rows.push(cells); }
    addColumn(cells) { for (let i = 0; i < this.rows.length; i++) { this.rows[i].push(cells[i]); } }

    log(tableName) {
        console.log("=".repeat(50));
        console.log("Table:", tableName ?? "");
        this.rows.forEach((_items, i) => console.log(this.rows[i]));
        console.log("=".repeat(50));
    }

    getCell(x, y) { return this.rows[y][x]; }
    // This returns the top row.
    getHeadRow() { return this.rows[0]; }
    // This returns all the rows other than the top one.
    getBodyRows() {
        let bodyRows = [...this.rows];
        bodyRows.shift();
        return bodyRows;
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
    constructor(name, id = idIterable.next(), scores = []) {
        this.name = name;
        this.id = id;
        this.scores = [];
    }
}