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

  @Input() colId: any;

  public type: String;
  public typeLabel: String;
  public property: String;
  public propertyLabel: String;
  public dataType: String;
  public dataTypeLabel: String;
  public isSubject: Boolean;

  constructor(private rdfService: RdfService, private annotationService: AnnotationService) {  }

  ngOnInit(){
    console.log("InitAnnotation"+ this.colId);
    //SHOULD BE !=
    if(this.annotationService.dataTypeLabel == null) {
      this.isSubject = this.annotationService.isSubject[this.colId];
      console.log("LETTO!");
      this.type = this.annotationService.type[this.colId];
      this.typeLabel = this.annotationService.typeLabel[this.colId];
      this.property = this.annotationService.property[this.colId];
      this.propertyLabel = this.annotationService.propertyLabel[this.colId];
      this.dataType = this.annotationService.dataType[this.colId];
      this.dataTypeLabel = this.annotationService.dataTypeLabel[this.colId];
    }
  }

  ngOnDestroy() {
    this.annotationService.isSubject[this.colId] = this.isSubject;
    this.annotationService.type[this.colId] = this.type;
    this.annotationService.typeLabel[this.colId] = this.typeLabel
    this.annotationService.property[this.colId] = this.property;
    this.annotationService.propertyLabel[this.colId] = this.propertyLabel;
    this.annotationService.dataType[this.colId] = this.dataType;
    this.annotationService.dataTypeLabel[this.colId] = this.dataTypeLabel;
  }


  objectSelect() {
    this.isSubject = false;
  }

  subjectSelect() {
    this.isSubject = true;
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
    if (this.isSubject) {
      this.property = (<HTMLInputElement> (document.getElementById("".concat(colId, ".Property")))).value;
      this.propertyLabel = (<HTMLInputElement> (document.getElementById("".concat(colId, ".PropertyLabel")))).value;
      this.dataTypeLabel = (<HTMLInputElement> (document.getElementById("".concat(colId, ".DataTypeLabel")))).value;
    }
  }

  setDetailMode(colId) {
    //cast into HTMLInputElement and after take value
    let property = "";
    let dataType = "";
    let type = (<HTMLInputElement> (document.getElementById("".concat(colId, ".Type")))).value;
    if (this.isSubject) {
      property = (<HTMLInputElement> (document.getElementById("".concat(colId, ".Property")))).value;
      dataType = (<HTMLInputElement> (document.getElementById("".concat(colId, ".dataType")))).value;
    }
  }

  hideDetailMode() {
    this.detailMode.isActive = false;
  }

  goToDetailMode(colId) {
    let property = "";
    let datatype = "";
    let type = (<HTMLInputElement> (document.getElementById("".concat(colId, ".type")))).value;
    if (this.isSubject) {
      property = (<HTMLInputElement> (document.getElementById("".concat(colId, ".Property")))).value;
      datatype = (<HTMLInputElement> (document.getElementById("".concat(colId, "datatype")))).value;
    }


    //this.detailMode.initializeDetailMode(this.object);
  }
}
