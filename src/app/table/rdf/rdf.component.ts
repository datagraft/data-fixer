import { Component, OnInit } from '@angular/core';
import { SharedTableService } from '../shared.service';

@Component({
  selector: 'rdf',
  templateUrl: './rdf.component.html',
  styleUrls: ['./rdf.component.css'],
  providers: [SharedTableService]
})

export class RdfComponent implements OnInit {

  // shared table resources  
  public data: any;
  public headers: any;
  public inferredTypes: any;

  // rdf mode, handsontable instance
  public hot: any;

  constructor(private sharedTableService: SharedTableService) { }

  ngOnInit() {
    let container = document.getElementById('rdf');
    console.log('init');
    // rdf mode, handsontable settings    
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

  render() {
    console.log('render', this.data);
    this.hot.render();
  }

}
