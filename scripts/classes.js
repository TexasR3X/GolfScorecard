export class Matrix {
    constructor(rows = new Row()) {
        this.rows = rows // Array of Rows
        this.lastRow = rows[rows.length - 1]; // Row
    }

    appendLastRow(newCell) { this.lastRow.append(newCell); }
    addRow(rowItems) {
        this.rows.push(new Row(rowItems));
        this.lastRow = this.rows[this.rows.length - 1];
    }
}
export class Row {
    constructor(cells = []) {
        this.cells = cells; // Array of Strings
    }

    append(newCell) { this.cells.push(newCell); }
}


// export 