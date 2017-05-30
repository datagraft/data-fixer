import {Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router'
import { ChartComponent } from '../../chart/chart.component';
import { RdfComponent } from '../rdf/rdf.component';

import { SharedTableService } from '../shared.service';
import { ProfilingService } from '../tabular/profiling.service';
import { TransformationsService } from '../tabular/transformations.service';
import { TabularComponent } from "../tabular/tabular.component";
import {Annotation, AnnotationService} from "./annotation.service";
import {INglDatatableSort, INglDatatableRowClick} from 'ng-lightning/ng-lightning';

@Component({
  selector: 'detailMode',
  templateUrl: './detailMode.component.html',
  //styleUrls: ['./annotation.component.css'],
  providers: [ChartComponent, RdfComponent, SharedTableService, ProfilingService, TransformationsService]
})

//Detail Mode offers an accurate form for insert the annotation parameters, require the subject/object type and all off
//attributes for annotation (the same that you can add with annotation form)

export class DetailModeComponent implements OnInit, OnDestroy{

  //isSubject is true if the resource is marked as object in annotation form
  private annotation : Annotation;
  // isSubject : Boolean;
  // type : String ;
  // typeLabel : String;
  // property : String;
  // propertyLabel : String;
  // dataType : String;
  // dataTypeLabel : String;
  colContent : any[];
  colId : any;
  header : any;
  data = [{value : 3}, {value : 4}];

  public isActive : boolean = false;

  //ng-lightning attribute

  // Initial sort
  sort: INglDatatableSort = { key: 'value', order: 'asc' };



  constructor(private annotationService: AnnotationService, route: ActivatedRoute) { }


  ngOnInit() {
    this.colId = this.annotationService.colNum;
    this.annotation = this.annotationService.getAnnotation(this.colId);

    // this.isSubject = this.annotationService.isSubject[this.colId];
    // this.type = this.annotationService.type[this.colId];
    // this.typeLabel = this.annotationService.typeLabel[this.colId];
    // this.property = this.annotationService.property[this.colId];
    // this.propertyLabel = this.annotationService.propertyLabel[this.colId];
    // this.dataType = this.annotationService.dataType[this.colId];
    // this.dataTypeLabel = this.annotationService.dataTypeLabel[this.colId];
    this.colContent = this.annotationService.colContent.map(function makeObject( x ) { return { value: x }});
    // console.log(this.colContent);
    // console.log(this.data);
    this.header = this.annotationService.header;
  }

  ngOnDestroy() {
    this.annotationService.setAnnotation(this.colId, this.annotation);
    //there will be n entities for n column, so onDestroy we need to send the data at the correct instance of
    // annotationForm, identify by colId I think
  //   this.annotationService.isSubject[this.colId] = this.isSubject;
  //   this.annotationService.type[this.colId] = this.type;
  //   this.annotationService.typeLabel[this.colId] = this.typeLabel;
  //   this.annotationService.property[this.colId] = this.property;
  //   this.annotationService.propertyLabel[this.colId] = this.propertyLabel;
  //   this.annotationService.dataType[this.colId] = this.dataType;
  //   this.annotationService.dataTypeLabel[this.colId] = this.dataTypeLabel;
  }

  saveChanges() {

    let typeInput = (<HTMLInputElement> (document.getElementById("Type"))).value;
    let typeLabelInput = (<HTMLInputElement> (document.getElementById("TypeLabel"))).value;
    if ("" != typeInput)
        this.annotation.type = typeInput;
    if ("" != typeLabelInput)
      this.annotation.typeLabel = typeLabelInput;

    if (!this.annotation.isSubject){
      let propertyInput = (<HTMLInputElement> (document.getElementById("Property"))).value;
      let propertyLabelInput = (<HTMLInputElement> (document.getElementById("PropertyLabel"))).value;
      let dataTypeLabelInput = (<HTMLInputElement> (document.getElementById("DataTypeLabel"))).value;

      if ("" != propertyInput)
        this.annotation.property = propertyInput;
      if ("" != propertyLabelInput)
        this.annotation.propertyLabel = propertyLabelInput;
      if ("" != dataTypeLabelInput)
        this.annotation.dataTypeLabel = dataTypeLabelInput;


    }
  }

  // objectSelect() {
  //   this.isSubject = false;
  // }

  subjectSelect(isSubject) {
    if (isSubject == 'O'){
      this.annotation.isSubject = false;
    }
    else{
      this.annotation.isSubject = true;
    }
  }

  // dataTypeURL(){
  //   this.dataType = "URL";
  // }
  //
  // dataTypeLiteral(){
  //   this.dataType = "Literal";
  // }

  dataTypeSelect(dataType){
    if (dataType == "URL"){
      this.annotation.dataType = dataType;
    }
    else{
      this.annotation.dataType = dataType;
    }
  }

  onRowClick($event: INglDatatableRowClick) {
    console.log('clicked row', $event.data);
  }

}
