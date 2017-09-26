import {
  Component, OnInit, ViewChild, Input, Output, EventEmitter,
  OnDestroy, AfterContentChecked, AfterViewChecked, ElementRef
} from '@angular/core';
import {ChartComponent} from '../../chart/chart.component';
import {RdfComponent} from '../rdf/rdf.component';
import {DetailModeComponent} from './detailMode.component';
import {Router, RouterModule} from '@angular/router';
import {Http, Response} from '@angular/http';

import {SharedTableService} from '../shared.service';
import {ProfilingService} from '../tabular/profiling.service';
import {TransformationsService} from '../tabular/transformations.service';
import {TabularComponent} from "../tabular/tabular.component";
import {Annotation, AnnotationService} from "./annotation.service";
import {RdfService} from "../rdf/rdf.service";
import {forEach} from "@angular/router/src/utils/collection";
import {isUndefined} from "util";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/switch'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/fromEvent'


@Component({
  selector: 'annotation-form',
  templateUrl: './annotation.component.html',
  //styleUrls: ['./annotation.component.css'],
  providers: [ChartComponent, RdfComponent, SharedTableService, ProfilingService, TransformationsService, TabularComponent,
    RouterModule]
})

export class AnnotationForm implements OnInit, OnDestroy {

  @ViewChild(DetailModeComponent) detailMode: DetailModeComponent;

  @Input() colId: number;
  @Input() colContent: any[];
  @Input() header: any;

  objectMarker = "shade";
  subjectMarker = "shade";
  myData = "primo";
  open = false;

  public annotation: Annotation;
  // public source: String;
  // public sourceLabel: String;
  // public property: String;
  // public propertyLabel: String\;
  // public columnType: String;
  // public columnTypeLabel: String;
  // public isSubject: Boolean;
  public first = false;
  typeSuggestions : string= "http://abstat.disco.unimib.it/api/v1/SolrSuggestions?query=:keyword,subj&rows=15&start=0";
  propertySuggestions: string = "http://abstat.disco.unimib.it/api/v1/SolrSuggestions?query=:keyword,pred&rows=15&start=0";
  listOfSubjects: string[] = [];
  colName;

  constructor(private rdfService: RdfService, public annotationService: AnnotationService, public http: Http)
  {  }

  ngOnInit() {
    this.annotation = new Annotation();
    this.colName = this.colId.toString().concat(": ", this.header);
    if (this.annotationService.isFull)
      this.annotation = this.annotationService.getAnnotation(this.colId);
    this.getSubjects();


    // console.log(this.annotation.columnTypeLabel);
    // this.isSubject = annotation.isSubject;
    // this.source = annotation.source;
    // this.sourceLabel = annotation.sourceLabel;
    // this.property = annotation.property;
    // this.propertyLabel = annotation.propertyLabel;
    // this.columnType = annotation.columnType;
    // this.columnTypeLabel = annotation.columnTypeLabel;
  }

  ngOnDestroy() {
    this.annotationService.setAnnotation(this.colId, this.annotation);
    this.annotationService.isFull = true;
    //   this.annotationService.isSubject[this.colId] = this.isSubject;
    //   this.annotationService.source[this.colId] = this.source;
    //   this.annotationService.sourceLabel[this.colId] = this.sourceLabel
    //   this.annotationService.property[this.colId] = this.property;
    //   this.annotationService.propertyLabel[this.colId] = this.propertyLabel;
    //   this.annotationService.columnType[this.colId] = this.columnType;
    //   this.annotationService.columnTypeLabel[this.colId] = this.columnTypeLabel;
    //
  }

  // dataTypeURL() {
  //   this.columnType = "URL";
  // }

  // dataTypeLiteral() {
  //   this.columnType = "Literal";
  // }

  saveChangesSmall(colId) {
    this.annotation.index = colId;
    this.annotation.source = this.getInputValue(colId, ".Source");
    console.log("source letto");
    if (!this.annotation.isSubject) {
      this.annotation.property = this.getInputValue(colId, ".Property");
      console.log("property letto");

      this.annotation.columnType = this.getInputValue(colId, ".ColumnType");
      console.log("columnType letto");

    }
    if (this.annotation.source == "" && this.annotation.property == "" && this.annotation.columnType != "") {
      this.subjectMarker = "inverse";
      this.objectMarker = "shade";
      console.log("SUBJECT");
    }
    else if (this.annotation.source != "" && this.annotation.property != "" && this.annotation.columnType != "") {
      this.objectMarker = "inverse";
      this.subjectMarker = "shade";
      console.log("OBJECT");
    }
    else {
      this.objectMarker = "shade";
      this.subjectMarker = "shade";
      console.log("NONE");
    }
  }

  goToDetailMode() {
    this.annotationService.colContent = this.colContent;
    this.annotationService.header = this.header;
    this.annotationService.colNum = this.colId;
  }

  subjectSelect(isSubject) {
    if (isSubject == 'O') {
      this.annotation.isSubject = false;
    }
    else {
      this.annotation.isSubject = true;
    }
  }

  dataTypeSelect(dataType) {
    if (dataType == "URL") {
      this.annotation.columnDataType = dataType;
    }
    else {
      this.annotation.columnDataType = dataType;
    }
  }

  getInputValue(colId, selector) {
    let temp = (document.querySelectorAll('[data-value]'));
    let i = 0;
    let string = "".concat(colId, selector);
    while ((<HTMLInputElement> temp[i]).getAttribute("data-value") !== string) {
      i++;
    }
    console.log((<HTMLInputElement> temp[i]).value);
    return (<HTMLInputElement> temp[i]).value;
  }

  // typeAutocomplete() {
  //   // console.log("dentro");
  //   let word = this.getInputValue(this.colId, ".ColumnType");
  //   console.log(word);
  //   let URL = "http://abstat.disco.unimib.it/api/v1/SolrSuggestions?query=".concat(word, ",subj&rows=100&start=0");
  //
  //   this.http.request(URL).subscribe((res: Response) => {
  //       this.typeSuggestions = res.json();
  //
  //       console.log("Api restituita");
  //       // console.log(this.typeSuggestions);
  //     },
  //     (err: any) => {
  //
  //     });
  //
  //   // this.typeSuggestions = this.annotationService.abstatAutofill(word, "subj", 100, 0);
  //   console.log(this.typeSuggestions);
  // }


  propertyAutocomplete() {
    // console.log("dentro");
    let word = this.getInputValue(this.colId, ".Property");


    this.annotationService.abstatAutofill(word, "pred", 100, 0).subscribe();


    this.propertySuggestions = this.annotationService.suggestion;
    console.log(this.propertySuggestions);

  }


  getSubjects() {

    for (let i = 0; i < this.annotationService.colNames.length; i++) {
      if (this.annotationService.colNames[i] != this.colName)
        this.listOfSubjects.push(this.annotationService.colNames[i]);

    }
    console.log(this.listOfSubjects);
    console.log(this.colName);
  }
}
