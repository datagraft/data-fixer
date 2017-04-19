import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ChartComponent } from '../../chart/chart.component';
import { RdfComponent } from '../rdf/rdf.component';
import { DetailMode } from './detailMode.component';
import { AppComponent } from '../../app.component'

import { SharedTableService } from '../shared.service';
import { ProfilingService } from '../tabular/profiling.service';
import { TransformationsService } from '../tabular/transformations.service';
import {TabularComponent} from "../tabular/tabular.component";

@Component({
  selector: 'annotation-form',
  templateUrl: './annotation.component.html',
  //styleUrls: ['./annotation.component.css'],
  providers: [ChartComponent, RdfComponent, SharedTableService, ProfilingService, TransformationsService, TabularComponent, DetailMode]
})

export class AnnotationForm implements OnInit {

  @ViewChild (DetailMode) detailMode : DetailMode;

  @Input() colId : any;
  //@Input() colWidth : any;

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
    let type ="";
    let entity = (<HTMLInputElement> (document.getElementById("".concat(colId, ".Entity")))).value;
    if (this.object){
      property = (<HTMLInputElement> (document.getElementById("0.Property"))).value;
      type = (<HTMLInputElement> (document.getElementById("0.Type"))).value;
    }

    this.detailMode.initializeDetailMode(entity, property, type, this.object);
  }

  hideDetailMode(){
    this.detailMode.isActive = false;
  }

  saveChanges(colId){
    this.detailMode.entity = (<HTMLInputElement> (document.getElementById("".concat(colId, ".Entity")))).value;
    if(this.object) {
      this.detailMode.property = (<HTMLInputElement> (document.getElementById("0.Property"))).value;
      this.detailMode.type = (<HTMLInputElement> (document.getElementById("0.Type"))).value;
    }
  }
}
