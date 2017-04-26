import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ChartComponent } from '../../chart/chart.component';
import { RdfComponent } from '../rdf/rdf.component';
import { DetailModeComponent } from './detailMode.component';
import { AppComponent } from '../../app.component'
import { ModuleWithProviders }  from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';


import { SharedTableService } from '../shared.service';
import { ProfilingService } from '../tabular/profiling.service';
import { TransformationsService } from '../tabular/transformations.service';
import {TabularComponent} from "../tabular/tabular.component";
import {type} from "os";

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
  //@Input() colWidth : any;


  public entity = "" ;
  public property = "";
  public type = "";
  public object : boolean = false;

  ngOnInit() {
  }

  getSubjectId() {
    return "Subject";
  }

  objectSelect() {
    this.object = true;
    this.detailMode.isObject = true;
  }

  subjectSelect() {
    this.object = false;
    this.detailMode.isObject = false;
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

    this.detailMode.initializeDetailMode(entity, property, type, this.object);
  }

  hideDetailMode(){
    this.detailMode.isActive = false;
  }

  saveChanges(colId){
    this.entity = (<HTMLInputElement> (document.getElementById("".concat(colId, ".Entity")))).value;
    if(this.object) {
      this.property = (<HTMLInputElement> (document.getElementById("".concat(colId, ".Property")))).value;
      this.type = (<HTMLInputElement> (document.getElementById("".concat(colId, "Type")))).value;
    }
    this.detailMode.initializeDetailMode(this.entity, this.property, this.type, this.object);
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
