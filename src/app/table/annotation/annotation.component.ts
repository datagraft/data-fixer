import {Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {ChartComponent} from '../../chart/chart.component';
import {RdfComponent} from '../rdf/rdf.component';
import {DetailModeComponent} from './detailMode.component';
import {Router, RouterModule} from '@angular/router';


import {SharedTableService} from '../shared.service';
import {ProfilingService} from '../tabular/profiling.service';
import {TransformationsService} from '../tabular/transformations.service';
import {TabularComponent} from "../tabular/tabular.component";
import {Annotation, AnnotationService} from "./annotation.service";
import {RdfService} from "../rdf/rdf.service";


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
  @Input() colContent : any[];
  @Input() header : any;

  objectMarker = "default";
  subjectMarker = "default";
  myData = "primo";

  public annotation : Annotation;
  // public source: String;
  // public sourceLabel: String;
  // public property: String;
  // public propertyLabel: String;
  // public columnType: String;
  // public columnTypeLabel: String;
  // public isSubject: Boolean;
  public first = false;
  typeSuggestions = ['dbo:person', 'foaf:person', 'person'];
  propertySuggestions = ['dbo:person', 'foaf:person', 'person'];
  listOfSubjects = this.annotationService.colNames;


  constructor(private rdfService: RdfService, public annotationService: AnnotationService) { }



  ngOnInit(){
    this.annotation = new Annotation();
    if (this.annotationService.isFull)
      this.annotation = this.annotationService.getAnnotation(this.colId);
    this.annotationService.colNames[this.colId] = "".concat(this.colId.toString(), ": ", this.header)
    console.log(this.annotation.colName);
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
    if (!this.annotation.isSubject) {
      this.annotation.property = this.getInputValue(colId, ".Property");;
      this.annotation.columnType= this.getInputValue(colId, ".ColumnType");
    }
    if (this.annotation.source != "" && this.annotation.property == "" && this.annotation.columnType == "")
    {
      this.subjectMarker = "inverse";
      console.log("SUBJECT");
    }
    else if (this.annotation.source != "" && this.annotation.property != "" && this.annotation.columnType != "")
    {
      this.objectMarker = "inverse";
      console.log("OBJECT")
    }
    else {
      this.objectMarker = "default";
      this.subjectMarker = "default";
      console.log("NONE");
    }
  }
  goToDetailMode() {
    this.annotationService.colContent = this.colContent;
    this.annotationService.header = this.header;
    this.annotationService.colNum = this.colId;
  }

  subjectSelect(isSubject) {
    if (isSubject == 'O'){
      this.annotation.isSubject = false;
    }
    else{
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

  getInputValue(colId, selector){
    let temp = (document.querySelectorAll('[data-value]'));
    let i =0;
    let string = "".concat(colId, selector);
    while((<HTMLInputElement> temp[i]).getAttribute("data-value") !== string) {
      i++;
    }

    return (<HTMLInputElement> temp[i]).value;
  }

  autocomplete(word){
    console.log("dentro");
    this.typeSuggestions = this.annotationService.abstatAutofill(word);
  }
}
