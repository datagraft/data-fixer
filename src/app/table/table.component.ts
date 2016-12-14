import { Component } from '@angular/core';
import { handsontable } from 'ng2-handsontable/components/index';
import * as Handsontable from 'handsontable/dist/handsontable.full.js';

@Component({
  selector: 'datatable',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  private data:Array<any>;
  private colHeaders:Array<string>;
  private options:any;

  constructor() {
    this.colHeaders = ['', 'Kia', 'Nissan', 'Toyota', 'Honda'];
    this.data = [
            ["2008", 10, 11, 12, 13],
            ["2009", 20, 11, 14, 13],
            ["2010", 30, 15, 12, 13]
        ];
    this.options = {
      height: 396,
      rowHeaders: true,
      stretchH: 'all',
      contextMenu: true,
      className: 'htCenter htMiddle'
    };
  }

  change() {
    console.log(this.data);
  }
}
