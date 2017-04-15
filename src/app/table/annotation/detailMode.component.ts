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


//Detail Mode offers an accurate form for insert the annotation parameters, require the subject/object type and all off
//attributes for annotation (the same that you can add with annotation form)


export class DetailMode implements OnInit{

  //isObject is true if the reource is marked as object in annotation form
  @Input() isObject : String;
  @Input() entity : String; //maybe wrong name
  @Input() property : String;
  @Input() type : String;

  public isActive : boolean = false;


  ngOnInit() {
  }

  initializeDetailMode(entity, property, type, object){
    this.entity = entity;
    this.property = property;
    this.type = type;
    this.isObject = object;

    this.isActive = true;
  }

  saveChanges() {

  }
}
