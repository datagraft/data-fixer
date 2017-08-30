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

  public annotation : Annotation;
  // public type: String;
  // public typeLabel: String;
  // public property: String;
  // public propertyLabel: String;
  // public dataType: String;
  // public dataTypeLabel: String;
  // public isSubject: Boolean;
  public first = false;


  constructor(private rdfService: RdfService, public annotationService: AnnotationService) { }



  ngOnInit(){
    this.annotation = new Annotation();
    if (this.annotationService.isFull)
      this.annotation = this.annotationService.getAnnotation(this.colId);
    console.log("AnnotationForm init");
    // console.log(this.annotation.dataTypeLabel);
    // this.isSubject = annotation.isSubject;
    // this.type = annotation.type;
    // this.typeLabel = annotation.typeLabel;
    // this.property = annotation.property;
    // this.propertyLabel = annotation.propertyLabel;
    // this.dataType = annotation.dataType;
    // this.dataTypeLabel = annotation.dataTypeLabel;
  }

  ngOnDestroy() {
    this.annotationService.setAnnotation(this.colId, this.annotation);
    this.annotationService.isFull = true;
    //   this.annotationService.isSubject[this.colId] = this.isSubject;
    //   this.annotationService.type[this.colId] = this.type;
    //   this.annotationService.typeLabel[this.colId] = this.typeLabel
    //   this.annotationService.property[this.colId] = this.property;
    //   this.annotationService.propertyLabel[this.colId] = this.propertyLabel;
    //   this.annotationService.dataType[this.colId] = this.dataType;
    //   this.annotationService.dataTypeLabel[this.colId] = this.dataTypeLabel;
    //
  }
  // dataTypeURL() {
  //   this.dataType = "URL";
  // }

  // dataTypeLiteral() {
  //   this.dataType = "Literal";
  // }

  saveChanges(colId) {
    this.annotation.index = colId;
    this.annotation.type = this.getInputValue(colId, ".Type");
    this.annotation.typeLabel = this.getInputValue(colId, ".TypeLabel");;
    if (!this.annotation.isSubject) {
      this.annotation.property = this.getInputValue(colId, ".Property");;
      this.annotation.propertyLabel = this.getInputValue(colId, ".PropertyLabel");
      this.annotation.dataTypeLabel = this.getInputValue(colId, ".DataTypeLabel");
    }
    if (this.annotation.type != "" && this.annotation.property == "" && this.annotation.dataType == "")
    {
      this.subjectMarker = "inverse";
      console.log("SUBJECT");
    }
    else if (this.annotation.type != "" && this.annotation.property != "" && this.annotation.dataType != "")
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
      this.annotation.dataType = dataType;
    }
    else {
      this.annotation.dataType = dataType;
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
}
