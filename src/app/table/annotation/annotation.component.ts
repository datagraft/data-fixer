import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ChartComponent } from '../../chart/chart.component';
import { RdfComponent } from '../rdf/rdf.component';

import { SharedTableService } from '../shared.service';
import { ProfilingService } from '../tabular/profiling.service';
import { TransformationsService } from '../tabular/transformations.service';
import {TabularComponent} from "../tabular/tabular.component";

@Component({
  selector: 'annotation-form',
  templateUrl: './annotation.component.html',
  //styleUrls: ['./annotation.component.css'],
  providers: [ChartComponent, RdfComponent, SharedTableService, ProfilingService, TransformationsService, TabularComponent]
})

export class AnnotationForm implements OnInit {

  @Input() colId : any;

  public object : boolean = false;

  ngOnInit() {
  }

  getSubjectId() {
    return "Subject";
  }

  //Problem: with this two methods all input appears and disappear, but only input in the column of button will change state
  objectSelect() {
    this.object = true;
  }

  subjectSelect() {
    this.object = false;
  }
}
