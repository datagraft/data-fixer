import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'datatable',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public data: any;
  public hot: any;
  public selected: any;

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
    afterSelection: function (r, c, r2, c2) {
      this.selected = this.getSelected();
      console.log(this.selected);
    }
    });

    this.test();

  }

  test() {
    this.hot.updateSettings({
    contextMenu: {
      callback: function (key, options) {
        if (key === 'about') {
          return console.log(this.getSelected());
        }
      },
      items: {
        "about": {name: 'About this menu'}
      }
    }
  })
  };
  
}
