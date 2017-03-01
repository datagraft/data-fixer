import { Component, OnInit } from '@angular/core';
// import { SharedTableService } from '../shared-table.service';

@Component({
  selector: 'rdf',
  templateUrl: './rdf.component.html',
  styleUrls: ['./rdf.component.css'],
  providers: []
})

export class RdfComponent implements OnInit {

  public data: any;
  public hot: any;

  constructor() { }

  ngOnInit() {
    let container = document.getElementById('datatable');

    let settings = {
      data: this.data,
      rowHeaders: true,
      colHeaders: true,
      columnSorting: false,
      visibleRows: 18,
      viewportColumnRenderingOffset: 40,
      contextMenu: {
        callback: (key, options) => {
          if (key === 'row_above' || 'row_below' || 'remove_col' || 'remove_row' || 'col_left' || 'col_right' || 'undo' || 'redo' || 'zero') {
            // do something
          }
          ;
          if (key === "zero") {
            // do something
          }
          ;
        },
        items: {
          "row_above": {},
          "row_below": {},
          "remove_col": {},
          "remove_row": {},
          "col_left": {},
          "col_right": {},
          "zero": { name: 'Empty cells to zero' },
          "undo": {},
          "redo": {}
        },
      },
      height: 460,
      stretchH: 'all',
      className: 'htCenter htMiddle',
      afterSelection: (r, c, r2, c2) => {
        // do something
      }
    };
    this.hot = new Handsontable(container, settings);
  }

}
