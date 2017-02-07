import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';

@Component({
  selector: 'steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent {

  @Input() stepSequence = [];
  @Output() stepsEmitter: EventEmitter<any>;

  private striped: boolean = false;
  private bordered: boolean = false;
  public transformationSelected: number;
  public stepSelected: number;
  public stepsCounter = 1;

  constructor() {
    this.stepSequence = this.fillArray();
    this.stepsEmitter = new EventEmitter<any>();
  }

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
