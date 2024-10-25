export class Table {
    constructor() { this.rows = []; }

    addRow(cells) {
        // This will add a new row to the Table object.
        this.rows.push(cells);
        // Returning the Table will allow createRow() to be chained.
        return this;
    }

    addColumn(cells) { for (let i = 0; i < this.rows.length; i++) { this.rows[i].push(cells[i]); } }

    log(tableName) {
        console.log("=".repeat(50));
        console.log("Table:", tableName ?? "");
        this.rows.forEach((_items, i) => console.log(this.rows[i]));
        console.log("=".repeat(50));
    }

    getCell(x, y) { return this.rows[y][x] }

    static create2GolfTables(courseData, teeIndex) {
        const buildPartofTable = (table, holes, inOrOut) => {
            table.addRow(["Holes", ...holes, inOrOut]);
            table.addRow(["Yardage", ...getDataforAllHoles("yards", holes)]);
            table.addRow(["Par", ...getDataforAllHoles("par", holes)]);
            table.addRow(["Handicap", ...getDataforAllHoles("hcp", holes)]);
        }
        const getDataforAllHoles = (prop, holes) => {
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
        const getDataForHole = (holeNum, prop) => courseData.holes[holeNum - 1].teeBoxes[teeIndex][prop];
    
        const frontTable = new Table();
        buildPartofTable(frontTable, [1, 2, 3, 4, 5, 6, 7, 8, 9], "In");
    
        const backTable = new Table();
        buildPartofTable(backTable, [10, 11, 12, 13, 14, 15, 16, 17, 18], "Out");

        let totals = ["Totals"];
        for (let i = 1; i < frontTable.rows.length; i++) {
            totals.push(frontTable.getCell(10, i) + backTable.getCell(10, i));
        }

        frontTable.addColumn(totals);
        backTable.addColumn(totals);

        return {
            front: frontTable,
            back: backTable
        }
    }
}