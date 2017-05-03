import {Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router'
import { ChartComponent } from '../../chart/chart.component';
import { RdfComponent } from '../rdf/rdf.component';

import { SharedTableService } from '../shared.service';
import { ProfilingService } from '../tabular/profiling.service';
import { TransformationsService } from '../tabular/transformations.service';
import { TabularComponent } from "../tabular/tabular.component";
import {AnnotationService} from "./annotation.service";


@Component({
  selector: 'detailMode',
  templateUrl: './detailMode.component.html',
  //styleUrls: ['./annotation.component.css'],
  providers: [ChartComponent, RdfComponent, SharedTableService, ProfilingService, TransformationsService, AnnotationService]
})

//Detail Mode offers an accurate form for insert the annotation parameters, require the subject/object type and all off
//attributes for annotation (the same that you can add with annotation form)

export class DetailModeComponent implements OnInit, OnDestroy{

  //isObject is true if the resource is marked as object in annotation form
  isObject : boolean = false;
  entity : String ; //maybe wrong name
  property : String;
  type : String;
  value : String;

  public isActive : boolean = false;

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

  saveChanges() {

    let entityInput = (<HTMLInputElement> (document.getElementById("Entity"))).value;
    if ("" != entityInput)
        this.entity = entityInput;

    if (this.isObject){
      let propertyInput = (<HTMLInputElement> (document.getElementById("Property"))).value;
      let valueInput = (<HTMLInputElement> (document.getElementById("Value"))).value;

      if ("" != propertyInput)
        this.property = propertyInput;
      if("" != valueInput)
        this.value = valueInput;
    }
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
}
