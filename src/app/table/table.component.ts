import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'datatable',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  data:any;
  data2:any;
  hot:any;

  constructor() {
    this.data = [
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"]
      ];
    this.data2 = [
      ["", "Ford", "Volvo", "Toyota", "Honda"],
      ["2016", 10, 11, 12, 13]
      ];
  }

  ngOnInit() {
    var container = document.getElementById('example');
    this.hot = new Handsontable(container, {
    data: this.data,
    rowHeaders: true,
    colHeaders: true,
    contextMenu: true,
    height: 300,
    stretchH: 'all',
    columnSorting: true,
    className: 'htCenter htMiddle',
    });
  }

  change() {
    this.data = this.data2;
    this.hot.loadData(this.data);
    console.log(this.data);
    }
  }
