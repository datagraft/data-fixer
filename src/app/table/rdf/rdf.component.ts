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
    colHeaders: (col) => {
      switch (col) {
        case 0:
          return '<div style="line-height:10px;padding:5px;margin:0px;"></div>' +
            '<div style="line-height:10px;padding:0px;padding-top:5px;margin:0;">' +
            '<span class="label label-warning" style="font-size:90%;background-color:#FFA500;">S</span>' +
            '<span class="label label-info" style="font-size:90%;background-color:#483D8B;color:white">U</span></div>';
        case 1:
          return '<div style="line-height:10px;padding:5px;margin:0px;"></div>' +
            '<div style="line-height:10px;padding:0px;padding-top:5px;margin:0;">' +
            '<span class="label label-warning" style="font-size:90%;background-color:#FFA500;">O</span>' +
            '<span class="label label-info" style="font-size:90%;background-color:#483D8B;color:white">U</span></div>';
      }
    },
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
    cell: [
      /* -- Custom cell renderer --
        {
          row: 0, col: 0, renderer: function (instance, TD, row, col, prop, value, cellProperties) {
            TD.style.backgroundColor = '#F3F3F3';
            TD.innerHTML = value;
          }
        },
        */
      {
        row: 0, col: 0, type: 'text'
      },
      {
        row: 0, col: 1, type: 'dropdown', source: ['A:Title', 'Option 2', 'Option 3']
      }
    ]
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
    // ex. handsontable instance methods

    for (let col = 0; col < this.hot.countCols(); col++)
    {
      this.hot.setDtaAtCell(0, col, this.subjectObject[col]);
      this.hot.setDataAtCell(1, col, this.urlLiteral[col]);
      this.hot.setDataAtCell(2, col, this.entity[col]);
      this.hot.setDataAtCell(3, col, this.property[col]);
      this.hot.setDataAtCell(4, col, this.value[col]);
    }

    this.hot.updateSettings(this.settings);

    console.log('data: ', this.data);
    console.log('headers: ', this.headers);
    console.log('inferredTypes: ', this.inferredTypes);
  }

}
