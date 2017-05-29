import {Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {ChartComponent} from '../../chart/chart.component';
import {RdfComponent} from '../rdf/rdf.component';
import {DetailModeComponent} from './detailMode.component';
import {Router, RouterModule} from '@angular/router';


import {SharedTableService} from '../shared.service';
import {ProfilingService} from '../tabular/profiling.service';
import {TransformationsService} from '../tabular/transformations.service';
import {TabularComponent} from "../tabular/tabular.component";
import {AnnotationService} from "./annotation.service";
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
  public type: String;
  public typeLabel: String;
  public property: String;
  public propertyLabel: String;
  public dataType: String;
  public dataTypeLabel: String;
  public isSubject: Boolean;
  public first = false;


  constructor(private rdfService: RdfService, public annotationService: AnnotationService) {  }



  ngOnInit(){
  //     this.isSubject = this.annotationService.isSubject[this.colId];
  //     this.type = this.annotationService.type[this.colId];
  //     this.typeLabel = this.annotationService.typeLabel[this.colId];
  //     this.property = this.annotationService.property[this.colId];
  //     this.propertyLabel = this.annotationService.propertyLabel[this.colId];
  //     this.dataType = this.annotationService.dataType[this.colId];
  //     this.dataTypeLabel = this.annotationService.dataTypeLabel[this.colId];
  }

  ngOnDestroy() {
  //   this.annotationService.isSubject[this.colId] = this.isSubject;
  //   this.annotationService.type[this.colId] = this.type;
  //   this.annotationService.typeLabel[this.colId] = this.typeLabel
  //   this.annotationService.property[this.colId] = this.property;
  //   this.annotationService.propertyLabel[this.colId] = this.propertyLabel;
  //   this.annotationService.dataType[this.colId] = this.dataType;
  //   this.annotationService.dataTypeLabel[this.colId] = this.dataTypeLabel;
  //
  }
  dataTypeURL() {
    this.dataType = "URL";
  }

  dataTypeLiteral() {
    this.dataType = "Literal";
  }

  saveChanges(colId) {
    this.type = (<HTMLInputElement> (document.getElementById("".concat(colId, ".Type")))).value;
    this.typeLabel = (<HTMLInputElement> (document.getElementById("".concat(colId, ".TypeLabel")))).value;
    if (!this.isSubject) {
      this.property = (<HTMLInputElement> (document.getElementById("".concat(colId, ".Property")))).value;
      this.propertyLabel = (<HTMLInputElement> (document.getElementById("".concat(colId, ".PropertyLabel")))).value;
      this.dataTypeLabel = (<HTMLInputElement> (document.getElementById("".concat(colId, ".DataTypeLabel")))).value;
    }
  }
  goToDetailMode() {
    this.annotationService.col = this.colContent;
    this.annotationService.header = this.header;
    this.annotationService.colNum = this.colId;
  }

  subjectSelect(isSubject) {
    this.first = true;
    if (isSubject == 'O'){
      this.isSubject = false;
    }
    else{
      this.isSubject = true;
    }
  }
  dataTypeSelect(dataType) {
    if (dataType == "URL") {
      this.dataType = dataType;
    }
    else {
      this.dataType = dataType;
    }
  }
}
