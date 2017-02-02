import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import {INglDatatableSort, INglDatatableRowClick} from 'ng-lightning/ng-lightning';

@Component({
  selector: 'steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {

  constructor() {
    this.stepSequence = this.fillArray();
    this.stepsEmitter = new EventEmitter<any>();
   }

  ngOnInit() { }

  @Output() stepsEmitter: EventEmitter<any>;

  @Input() stepSequence = [];

  private striped: boolean = false;
  private bordered: boolean = false;
  public transformationSelected: number;
  public stepSelected: number;
  public stepsCounter = 1;

  init() {
    this.stepsCounter = 1;
    this.stepSelected = 0;
    this.transformationSelected = 0;
    this.stepSequence = this.fillArray();
  }

  fillArray() {
    return [
    { transformation: 0, step: 0, title: '-', headers: [], data: [] },
    { transformation: 0, step: 0, title: '-', headers: [], data: [] },
    { transformation: 0, step: 0, title: '-', headers: [], data: [] },
    { transformation: 0, step: 0, title: '-', headers: [], data: [] },
    { transformation: 0, step: 0, title: '-', headers: [], data: [] },
    { transformation: 0, step: 0, title: '-', headers: [], data: [] }    
  ];
  }

  chartSubsetEmit() {
    this.stepsEmitter.emit(this.stepSequence);
  }

  onRowClick($event: INglDatatableRowClick) {
    this.stepSelected = $event.data.step;
    this.transformationSelected = $event.data.transformation;
    // console.log('Selected step transformation: ', this.transformationSelected);
    // console.log('Selected step id: ', this.stepSelected);
    this.stepsEmitter.emit(this.stepSequence);    
  }

  generateStepsArray(transformationSelected, dataset, headers) {
    let obj: any = {};
    obj.transformation = transformationSelected;
    obj.step = this.stepsCounter;
    obj.title = 'Step ' + this.stepsCounter;
    obj.headers = headers;
    obj.data = dataset;
    this.stepSequence[this.stepsCounter - 1] = obj;    
    this.stepsCounter++;
  }

}
