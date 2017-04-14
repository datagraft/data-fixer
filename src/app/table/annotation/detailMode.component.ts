import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ChartComponent } from '../../chart/chart.component';
import { RdfComponent } from '../rdf/rdf.component';

import { SharedTableService } from '../shared.service';
import { ProfilingService } from '../tabular/profiling.service';
import { TransformationsService } from '../tabular/transformations.service';
import {TabularComponent} from "../tabular/tabular.component";
import {AnnotationForm} from "./annotation.component";


@Component({
  selector: 'detailMode',
  templateUrl: './detailMode.component.html',
  //styleUrls: ['./annotation.component.css'],
  providers: [ChartComponent, RdfComponent, SharedTableService, ProfilingService, TransformationsService, TabularComponent]
})

export class DetailMode implements OnInit{

  public isActive : boolean = false;

  ngOnInit() {
  }

  setDetailMode2(){
    this.isActive = true;
  }
}
