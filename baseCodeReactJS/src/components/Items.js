import React, { Component } from "react";
// import * as XLSX from 'xlsx';
import * as fs from "file-saver";
import { CSVLink } from "react-csv";
const Excel = require("exceljs");

class Items extends Component {
  state = {
    id: "",
    name: "",
    day: "",
    time: "",
    position: "",
    nameUpdate: "",
    dayUpdate: "",
    timeUpdate: "",
    positionUpdate: "",
    idUpdate: "",
    file: [],
    idLock: [],
    dateAll: [],
    thu: [],
  };

  handleId = (a) => {
    const idLockNew = [...this.state.idLock];
    if (idLockNew.includes(a)) {
      idLockNew.splice(idLockNew.indexOf(a), 1);
    } else {
      idLockNew.push(a);
    }
    console.log(idLockNew);
    this.setState({ idLock: idLockNew });
  };

  handleExport = async (sheetName) => {
    this.props.items.map((item, key) => (item._id = key + 1));
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet(sheetName);
    const rows = this.props.items.name;
    const columns = Object.keys(this.props.items[0]).map((items) => ({
      name: items,
      filterButton: false,
    }));
    //x
    ws.addTable({
      name: "test1",
      ref: "A1",
      columns,
      rows,
    });

    ws.columns = [{ header: "Name", key: "name", width: 32 }];

    ws.getTable("test1").removeColumns(0, 1);
    ws.getTable("test1").commit();
    ws.getTable("test1").removeRows(0, 1);
    ws.getTable("test1").commit();
    ws.getTable("test1").getColumn(0).name = "Vương Quốc Tuấn";
    for (let i = 1; i < this.props.items.length; i++) {
      console.log(this.props.items[i].day, "lllllll");
      ws.getTable("test1").getColumn(i).name = this.props.items[i].day;
      // ws.getTable("test1").getColumn(2).name = "02/12";
      // ws.getTable("test1").getColumn(3).name = "03/12";
    }
    // ws.getTable("test1").getColumn(1).name = "01/12";
    // ws.getTable("test1").getColumn(2).name = "02/12";
    // ws.getTable("test1").getColumn(3).name = "03/12";
    ws.getTable("test1").commit();
    ws.getTable("test1").addRow(["Thời gian làm việc"], 0);
    ws.getTable("test1").addRow(["Thời gian OT 150%"], 1);
    ws.getTable("test1").addRow(["Thời gian OT 200%"], 2);
    ws.getTable("test1").addRow(["Thời gian OT 300%"], 3);
    ws.getTable("test1").addRow(["Thưởng"], 4);
    ws.getTable("test1").addRow(["Hỗ trợ"], 5);
    ws.getTable("test1").addRow(["Bảo hiểm"], 6);
    ws.getTable("test1").addRow(["Vay tháng này"], 7);
    ws.getTable("test1").addRow(["Trừ nợ tháng này"], 8);
    ws.getTable("test1").addRow(["Còn nợ"], 9);
    ws.getTable("test1").addRow(["Lương thực tế nhận được"], 10);
    ws.getTable("test1").commit();

    function getDaysInMonth(year, month) {
      return new Date(year, month, 0).getDate();
    }
    const daysInDecember = getDaysInMonth(2022, 12);

    for (let i = 1; i <= daysInDecember; i++) {
      if (i < 10) {
        this.state.dateAll.push("0" + i + "/" + "12");
      } else {
        this.state.dateAll.push(i + "/" + "12");
      }
    }

    ws.addRow(this.state.dateAll);

    const thu = {
      0: "CN",
      1: "T2",
      2: "T3",
      3: "T4",
      4: "T5",
      5: "T6",
      6: "T7",
    };

    for (let i = 1; i <= 31; i++) {
      this.state.thu.push(
        thu[new Date(`December ${i}, 2022 00:00:00`).getDay()]
      );
    }
    // const rows1 = this.state.dateAll.map((items) => Object.values(items));
    // const rows2 = this.state.thu.map((items) => Object.values(items));
    // const columns1 = Object.keys(this.props.items[0]).map((items) => ({
    //   name: items,
    //   filterButton: false,
    // }));
    // ws.addTable({
    //   name: "test2",
    //   ref: "B1",
    //   columns1,
    //   rows1
    // });
    ws.addRow(this.state.thu);
    wb.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, "CarData.xlsx");
    });
  };

  handleExportAll = async (sheetName) => {
    this.props.items.map((item, key) => (item._id = key + 1));

    const workbook = new Excel.Workbook();
    const workSheet = workbook.addWorksheet(sheetName);

    const columns = Object.keys(this.props.items[0]).map((items) => ({
      name: items,
    }));
    console.log(columns, "aaaaaaaaaaaa");

    const rows = this.props.items.map((entry) => Object.values(entry));
    workbook.getWorksheet("sheet1").addTable({
      name: "sheet1",
      ref: "H1",
      columns,
      rows,
    });

    workSheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        console.log(rowNumber);
        if (rowNumber === 1) {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFFF00" },
          };
        }

        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });

      row.commit();
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, "CarData.xlsx");
    });
  };

  render() {
    console.log(this.props.items, "this props item o day");
    let listData = [];
    if (this.props.items) {
      listData = this.props.items.map((item, index) => {
        return (
          <tr key={index}>
            <th>{item.name}</th>
            <th>{item.day}</th>
            <th>{item.position}</th>
            <th>{item.time}</th>
            <th>
              <button onClick={() => this.props.updateItems({ id: item._id })}>
                UPDATE
              </button>
              <button onClick={() => this.props.deleteItems({ id: item._id })}>
                DELETE
              </button>
            </th>
            <th>
              <input
                type="checkbox"
                onClick={() => this.handleId(item._id)}
                value={item._id}
                checked={this.state.idLock.includes(item._id)}
                onChange={() => {}}
              />
            </th>
          </tr>
        );
      });
    }

    return (
      <div>
        <input
          type="file"
          onChange={(e) => this.setState({ file: e.target.files })}
        />
        <button
          onClick={() => this.props.addExcelItems({ file: this.state.file })}
        >
          IMPORT
        </button>
        <br />
        <input
          onChange={(e) => this.setState({ name: e.target.value })}
          value={this.state.name}
        />

        <input
          type="date"
          placeholder="dd-mm-yyyy"
          id="date-picker"
          onChange={(e) => this.setState({ day: e.target.value })}
          value={this.state.day}
        />

        <input
          onChange={(e) => this.setState({ position: e.target.value })}
          value={this.state.position}
        />
        <input
          onChange={(e) => this.setState({ time: e.target.value })}
          value={this.state.time}
        />
        <button
          onClick={() =>
            this.props.addItems({
              name: this.state.name,
              day: this.state.day,
              position: this.state.position,
              time: this.state.time,
            })
          }
        >
          ADD
        </button>
        <br />
        <input
          onChange={(e) => this.setState({ name: e.target.value })}
          value={this.state.nameUpdate}
        ></input>
        <input
          type="date"
          onChange={(e) => this.setState({ day: e.target.value })}
          value={this.state.dayUpdate}
        ></input>
        <input
          onChange={(e) => this.setState({ position: e.target.value })}
          value={this.state.positionUpdate}
        ></input>
        <input
          type="time"
          onChange={(e) => this.setState({ time: e.target.value })}
          value={this.state.timeUpdate}
        ></input>
        <button
          onClick={() =>
            this.props.updateItems({
              name: this.state.nameUpdate,
              day: this.state.dayUpdate,
              position: this.state.positionUpdate,
              time: this.state.timeUpdate,
            })
          }
        >
          UPDATE
        </button>

        <button
          onClick={() =>
            this.props.deleteAllItems({ idLock: this.state.idLock })
          }
        >
          DELETEALL
        </button>

        {/* <a href="http://localhost:3001/item/downloadExcel" variant="contained"  >
              <button>export</button>
                </a>  */}

        <button variant="contained" onClick={() => this.handleExportAll()}>
          Export All
        </button>

        <button onClick={() => this.handleExport()}>Export</button>

        {/* <CSVLink
                filename={"my-file.csv"}
                target="_blank"
                data={this.props.items}
                asyncOnClick={true}
            >
                Download me
            </CSVLink>    */}

        <table className="table table-striped table-inverse table-responsive">
          <thead className="thead-inverse">
            <tr>
              <th>Name</th>
              <th>Day</th>
              <th>Position</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>{listData}</tbody>
        </table>
      </div>
    );
  }
}

export default Items;
