import {Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { ChartComponent } from '../../chart/chart.component';
import { RdfComponent } from '../rdf/rdf.component';
import { DetailModeComponent } from './detailMode.component';
import {Router, RouterModule} from '@angular/router';


import { SharedTableService } from '../shared.service';
import { ProfilingService } from '../tabular/profiling.service';
import { TransformationsService } from '../tabular/transformations.service';
import {TabularComponent} from "../tabular/tabular.component";
import {AnnotationService} from "./annotation.service";

@Component({
  selector: 'annotation-form',
  templateUrl: './annotation.component.html',
  //styleUrls: ['./annotation.component.css'],
  providers: [ChartComponent, RdfComponent, SharedTableService, ProfilingService, TransformationsService, TabularComponent,
    RouterModule, AnnotationService]
})

export class AnnotationForm implements OnInit, OnDestroy{

  @ViewChild (DetailModeComponent) detailMode : DetailModeComponent;

  @Input() colId : any;

  public entity : String;
  public property : String;
  public type : String;
  public value : String;
  public isObject : boolean = false;

  constructor(private annotationService: AnnotationService) { }

  ngOnInit() {
    this.isObject = this.annotationService.object;
    this.entity = this.annotationService.entity;
    this.property = this.annotationService.property;
    this.type = this.annotationService.type;
    this.value = this.annotationService.value;
  }

  ngOnDestroy() {
    this.annotationService.object = this.isObject;
    this.annotationService.entity = this.entity;
    this.annotationService.property = this.property;
    this.annotationService.type = this.type;
    this.annotationService.value = this.value;
  }


  objectSelect() {
    this.isObject = true;
  }

  subjectSelect() {
    this.isObject = false;
  }

  typeURL(){
    this.type = "URL";
  }

  typeLiteral(){
    this.type = "Literal";
  }

  typeBoolean(){
    this.type = "Boolean";
  }

  saveChanges(colId){
    this.entity = (<HTMLInputElement> (document.getElementById("".concat(colId, ".Entity")))).value;
    if(this.isObject) {
      this.property = (<HTMLInputElement> (document.getElementById("".concat(colId, ".Property")))).value;
      this.value = (<HTMLInputElement> (document.getElementById("".concat(colId, ".Value")))).value;
    }
  }

  setDetailMode(colId) {
    //cast into HTMLInputElement and after take value
    let property = "";
    let type = "";
    let entity = (<HTMLInputElement> (document.getElementById("".concat(colId, ".Entity")))).value;
    if (this.isObject){
      property = (<HTMLInputElement> (document.getElementById("".concat(colId, ".Property")))).value;
      type = (<HTMLInputElement> (document.getElementById("".concat(colId, ".Type")))).value;
    }

  }

  hideDetailMode(){
    this.detailMode.isActive = false;
  }



  goToDetailMode(colId){
    let property = "";
    let type ="";
    let entity = (<HTMLInputElement> (document.getElementById("".concat(colId, ".Entity")))).value;
    if (this.isObject){
      property = (<HTMLInputElement> (document.getElementById("".concat(colId, ".Property")))).value;
      type = (<HTMLInputElement> (document.getElementById("".concat(colId, "Type")))).value;
    }


    //this.detailMode.initializeDetailMode(this.object);
  }
}
