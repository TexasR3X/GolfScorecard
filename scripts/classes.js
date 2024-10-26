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

    static create2GolfTables(courseData, teeIndex) {
        // This a table without the last column.
        const buildPartOfTable = (table, holes, inOrOut) => {
            table.addRow(["Holes", ...holes, inOrOut]);
            table.addRow(["Yardage", ...getDataForAllHoles("yards", holes)]);
            table.addRow(["Par", ...getDataForAllHoles("par", holes)]);
            table.addRow(["Handicap", ...getDataForAllHoles("hcp", holes)]);
        }
        // This gets the data from courseData, finds the sum of all data points, and returns an array of each data point.
        const getDataForAllHoles = (prop, holes) => {
            let outputArr = [];
            let sum = 0;
    
            holes.forEach((num) => {
                let newDataPoint = getDataForHole(num, prop)
                outputArr.push(newDataPoint);
                sum += newDataPoint;
            });
    
            outputArr.push(sum);
    
            return outputArr;
        }
        // Returns a specific data point from courseData.
        const getDataForHole = (holeNum, prop) => courseData.holes[holeNum - 1].teeBoxes[teeIndex][prop];
    
        // A Table class is created for the front and back scorecards.
        const frontTable = new Table();
        const backTable = new Table();

        // All of the data points for each table will be built, aside from the last column of each.
        buildPartOfTable(frontTable, [1, 2, 3, 4, 5, 6, 7, 8, 9], "In");
        buildPartOfTable(backTable, [10, 11, 12, 13, 14, 15, 16, 17, 18], "Out");

        // This gets the totals for the last column.
        let totals = ["Totals"];
        for (let i = 1; i < frontTable.rows.length; i++) { totals.push(frontTable.getCell(10, i) + backTable.getCell(10, i)); }

        // This adds the last column to each table.
            // Both tables have the same totals column.
        frontTable.addColumn(totals);
        backTable.addColumn(totals);

        // This returns the front and back tables.
        return {
            front: frontTable,
            back: backTable
        }
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