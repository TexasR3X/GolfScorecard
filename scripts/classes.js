export class Table {
    constructor() { this.rows = []; }

    addRow(cells) {
        // This will add a new row to the Table object.
        this.rows.push(cells);
        // Returning the Table will allow createRow() to be chained.
        return this;
    }

    log() {
        console.log("=".repeat(50));
        console.log("Table:");
        this.rows.forEach((_items, i) => console.log(this.rows[i]));
        console.log("=".repeat(50));
    }
}