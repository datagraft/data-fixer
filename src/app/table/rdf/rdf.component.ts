import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedTableService } from '../shared.service';

@Component({
  selector: 'rdf',
  templateUrl: './rdf.component.html',
  styleUrls: ['./rdf.component.css'],
  providers: [SharedTableService]
})

export class RdfComponent implements OnInit {

  // shared table resources  
  @Input() data: Array<any>;
  @Input() hot: any;
  @Input() headers: Array<string>;
  @Input() inferredTypes: Object;
  @Output() emitter: EventEmitter<any>;

  // rdf mode settings
  public settings: any;

  constructor(private sharedTableService: SharedTableService) {
    this.emitter = new EventEmitter<any>();
    this.settings = {
      rowHeaders: true,
      colHeaders: true,
      columnSorting: false,
      viewportColumnRenderingOffset: 40,
      contextMenu: {
        callback: (key, options) => { },
        items: {
          "row_above": {},
          "row_below": {},
          "remove_col": {},
          "remove_row": {},
          "col_left": {},
          "col_right": {},
          "undo": {},
          "redo": {}
        },
      },
      height: 800,
      stretchH: 'all',
      className: 'htCenter htMiddle',
      afterSelection: (r, c, r2, c2) => { }
    };
  }

  dataEmitter() {
    this.emitter.emit(this.data);
  }

  test() {
    this.data[0][1] = 200;
    this.dataEmitter();
    this.hot.updateSettings(this.settings);
  }

  ngOnInit() { }

  updateSettings(height) {
    return {
      height: height,
      colHeaders: (col) => {
        switch (col) {
          case 0:
            return '<b>Bold</b> and <em>Beautiful</em>';
        }
      }
    }
  }

}
