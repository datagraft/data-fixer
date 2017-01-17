import { Component, OnInit } from '@angular/core';
import {INglDatatableSort, INglDatatableRowClick} from 'ng-lightning/ng-lightning';

@Component({
  selector: 'steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {

  public transformations = [
    { id: 1, transformation: 'Step 1' },
    { id: 2, transformation: 'Step 2' },
    { id: 3, transformation: 'Step 3' },
    { id: 4, transformation: 'Step 4' },
    { id: 5, transformation: 'Step 5' },
  ];

  data = this.transformations;

  private striped: boolean = false;
  private bordered: boolean = false;
  public transformationSelected: number;

  constructor() { }

  ngOnInit() { }

  onRowClick($event: INglDatatableRowClick) {
    this.transformationSelected = $event.data.transformation;
    console.log('Selected transformation: ', $event.data);
    console.log('Selected transformation id: ', $event.data.id);

    if ($event.data.id == 1) {
      this.transformationSelected = 1;
    }
    else if ($event.data.id == 2) {
      this.transformationSelected = 2;
    }
    else if ($event.data.id == 3) {
      this.transformationSelected = 3;
    }
  }

}
