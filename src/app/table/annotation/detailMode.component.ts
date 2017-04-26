import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { ChartComponent } from '../../chart/chart.component';
import { RdfComponent } from '../rdf/rdf.component';

import { SharedTableService } from '../shared.service';
import { ProfilingService } from '../tabular/profiling.service';
import { TransformationsService } from '../tabular/transformations.service';
import {TabularComponent} from "../tabular/tabular.component";


@Component({
  selector: 'detailMode',
  templateUrl: './detailMode.component.html',
  //styleUrls: ['./annotation.component.css'],
  providers: [ChartComponent, RdfComponent, SharedTableService, ProfilingService, TransformationsService, TabularComponent]
})

//Detail Mode offers an accurate form for insert the annotation parameters, require the subject/object type and all off
//attributes for annotation (the same that you can add with annotation form)

export class DetailModeComponent implements OnInit{

  //isObject is true if the resource is marked as object in annotation form
  isObject : boolean = false;
  entity : String ; //maybe wrong name
  property : String;
  type : String;

  public isActive : boolean = false;

  constructor(private route : ActivatedRoute){
    this.isObject = this.route.params['isObject'];
    this.isActive = true;
    this.entity = this.route.params['entity'];
    this.property = this.route.params['property'];
    this.type = this.route.params['type'];
  }

  ngOnInit() {/*
    ;*/
  }

  saveChanges() {

    let entityInput = (<HTMLInputElement> (document.getElementById("Entity"))).value;
    if ("" != entityInput)
        this.entity = entityInput;

    if (this.isObject){
      let propertyInput = (<HTMLInputElement> (document.getElementById("Property"))).value;
      let typeInput = (<HTMLInputElement> (document.getElementById("Type"))).value;

      if ("" != propertyInput)
        this.property = propertyInput;
      if ("" != typeInput)
        this.type = typeInput;
    }
  }
}
