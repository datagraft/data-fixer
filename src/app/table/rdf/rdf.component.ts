import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedTableService } from '../shared.service';
import { RdfService } from './rdf.service';

@Component({
  selector: 'rdf',
  templateUrl: './rdf.component.html',
  styleUrls: ['./rdf.component.css'],
  providers: [SharedTableService, RdfService]
})

export class RdfComponent implements OnInit {

  // shared table resources
  @Input() data: Array<any>;
  @Input() hot: any;
  @Input() headers: Array<string>;
  @Input() inferredTypes: Object;
  @Output() emitter: EventEmitter<any>;

  // rdf mode settings
  public settings: any = {
    height: 800,
    /*colHeaders: (col) => {
      switch (col) {
        case 0:
          return '<div style="line-height:10px;padding:5px;margin:0px;"></div>';
        case 1:
          return '<div style="line-height:10px;padding:5px;margin:0px;"></div>';
      }
    },*/
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
    afterSelection: (r, c, r2, c2) => { },
  }

  constructor(private sharedTableService: SharedTableService, private rdfService: RdfService) {
    this.emitter = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  dataEmitter() {
    this.emitter.emit(this.data);
  }

  init() {
    //this.hot.updateSettings(this.updateSettings(460, this.headers));
    console.log('data: ', this.data);
    console.log('headers: ', this.headers);
    console.log('inferredTypes: ', this.inferredTypes);
  }

  updateSettings(height, headers) {
    return {
      height: height,
      colHeaders: headers
    }
  }
}
