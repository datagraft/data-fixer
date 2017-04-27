import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ChartComponent } from '../../chart/chart.component';
import { RdfComponent } from '../rdf/rdf.component';
import { DetailModeComponent } from './detailMode.component';
import {Routes, RouterModule, Router} from '@angular/router';


import { SharedTableService } from '../shared.service';
import { ProfilingService } from '../tabular/profiling.service';
import { TransformationsService } from '../tabular/transformations.service';
import {TabularComponent} from "../tabular/tabular.component";

@Component({
  selector: 'annotation-form',
  templateUrl: './annotation.component.html',
  //styleUrls: ['./annotation.component.css'],
  providers: [ChartComponent, RdfComponent, SharedTableService, ProfilingService, TransformationsService, TabularComponent,
    DetailModeComponent,RouterModule]
})

export class AnnotationForm implements OnInit {

  @ViewChild (DetailModeComponent) detailMode : DetailModeComponent;

  @Input() colId : any;

  public entity = "null" ;
  public property = "null";
  public type = "null";
  public value = "null";
  public object : boolean = false;

  ngOnInit() {
  }

  objectSelect() {
    this.object = true;
  }

  subjectSelect() {
    this.object = false;
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
    if(this.object) {
      this.property = (<HTMLInputElement> (document.getElementById("".concat(colId, ".Property")))).value;
      this.value = (<HTMLInputElement> (document.getElementById("".concat(colId, ".Value")))).value;
    }
  }

  setDetailMode(colId) {
    //cast into HTMLInputElement and after take value
    let property = "";
    let type = "";
    let entity = (<HTMLInputElement> (document.getElementById("".concat(colId, ".Entity")))).value;
    if (this.object){
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
    if (this.object){
      property = (<HTMLInputElement> (document.getElementById("".concat(colId, ".Property")))).value;
      type = (<HTMLInputElement> (document.getElementById("".concat(colId, "Type")))).value;
    }


    //this.detailMode.initializeDetailMode(this.object);
  }
}
