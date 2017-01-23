import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';
import {INglDatatableSort, INglDatatableRowClick} from 'ng-lightning/ng-lightning';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [SidebarService]
})

export class SidebarComponent implements OnInit {

  public transformations = [
    { id: 1, transformation: 'Set first row as header' },
    { id: 2, transformation: 'Map column: Set empty cells to zero' },
    { id: 3, transformation: 'Transform text: set string to uppercase letters' },
    { id: 4, transformation: 'Pad digits 0 to 4' },
    { id: 5, transformation: '(Statsbygg) Convert text to standard format' },
    { id: 6, transformation: '(Statsbygg) Reformat dates' },
    { id: 7, transformation: '(Statsbygg) Concatenate to string - sep. by (/)' },
  ];

  data = this.transformations;
  inputParameter: any;

  display: false;

  private striped: boolean = false;
  private bordered: boolean = false;
  public transformationSelected: number;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() { }

  onRowClick($event: INglDatatableRowClick) {
    this.transformationSelected = $event.data.transformation;
    // console.log('Selected transformation: ', $event.data);
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
    else if ($event.data.id == 4) {
      this.transformationSelected = 4;
    }
    else if ($event.data.id == 5) {
      this.transformationSelected = 5;
    }
    else if ($event.data.id == 6) {
      this.transformationSelected = 6;
    }
    else if ($event.data.id == 7) {
      this.transformationSelected = 7;
    }
  }

}
