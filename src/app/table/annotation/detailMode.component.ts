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


export class DetailModeComponent implements OnInit{

  //isObject is true if the reource is marked as object in annotation form
  @Input() isObject : boolean;
  @Input() entity : String; //maybe wrong name
  @Input() property : String;
  @Input() type : String;

  public isActive : boolean = false;


  ngOnInit() {
  }

  initializeDetailMode(object){
    this.isObject = object;
    this.isActive = true;
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
