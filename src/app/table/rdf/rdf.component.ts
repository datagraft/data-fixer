import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedTableService } from '../shared.service';
import { RdfService } from './rdf.service';
import {AnnotationService} from "../annotation/annotation.service";
import {type} from "os";
import {forEach} from "@angular/router/src/utils/collection";
import {id} from "@swimlane/ngx-charts/release/utils";

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

  public id = -1;

  // rdf mode settings
  public settings: any = {
    height: 800,
    //colHeaders: function (index, this.headers){
      //return '<h1>' + headers[index] +' <h1>';
    //},

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

  constructor(private sharedTableService: SharedTableService, private rdfService: RdfService,
              public annotationService : AnnotationService) {
    this.emitter = new EventEmitter<any>();
  }

  ngOnInit() {
    let col = this.hot.countCols();
    console.log("OnInit RDF");
    this.annotationService.type = Array.apply(null, Array(5)).map(function () {return ""});
    console.log(typeof this.annotationService.type);
    this.annotationService.typeLabel = Array.apply(null, Array(5)).map(function () {return ""});
    this.annotationService.property = Array.apply(null, Array(5)).map(function () {return ""});
    this.annotationService.propertyLabel = Array.apply(null, Array(5)).map(function () {return ""});
    this.annotationService.dataType = Array.apply(null, Array(5)).map(function () {return ""});
    this.annotationService.dataTypeLabel = Array.apply(null, Array(5)).map(function () {return ""});
    this.annotationService.isSubject = Array.apply(null, Array(5)).map(function () {return false});

    if (this.annotationService.dataType == null){ console.log("NULL");}
        else {console.log("CIAONE")};
  }

  dataEmitter() {
    this.emitter.emit(this.data);
  }

  init() {
    this.hot.updateSettings(this.settings);
    console.log('data: ', this.data);
    console.log('headers: ', this.headers);
    console.log('inferredTypes: ', this.inferredTypes);
  }


}
