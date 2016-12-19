import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'datatable',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  data:any;
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
  }

  ngOnInit() {
    var container = document.getElementById('datatable');
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

}
