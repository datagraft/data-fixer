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
  }

  subjectSelect() {
    this.object = false;
  }

  setDetailMode() {
    let x = this.detailMode.isActive;
    this.detailMode.setDetailMode2();
  }
}
