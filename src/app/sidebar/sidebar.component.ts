import {Component, OnInit} from '@angular/core';
import {SidebarService} from './sidebar.service';
import {SelectItem} from 'primeng/primeng';
import {ListboxModule} from 'primeng/primeng';

import {INglDatatableSort, INglDatatableRowClick} from 'ng-lightning/ng-lightning';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [SidebarService]
})

export class SidebarComponent implements OnInit {

  data = this.transformations;
  inputParameter: any;

  display: boolean = false;

  private striped: boolean = false;
  private bordered: boolean = false;
  public transformationSelected: number;

  public transformationsEnumerated: SelectItem[];

  public transformations: SelectItem[];

  constructor(private sidebarService: SidebarService) {
    this.transformationsEnumerated = [
      {value: 0, label: 'Insert column to the right'},
      {value: 1, label: 'Insert column to the left'},
      {value: 2, label: 'Insert row above'},
      {value: 3, label: 'Insert row below'},
      {value: 4, label: 'Delete column'},
      {value: 5, label: 'Delete row'},
      {value: 6, label: 'Replace (,) with (.)'},
      {value: 7, label: 'Set first row as header'},
      {value: 8, label: 'Set empty cells to zero'},
      {value: 9, label: 'Set text to uppercase'},
      {value: 10, label: 'Convert to standard format'},
      {value: 11, label: 'Pad digits 0 to 4'},
      {value: 12, label: 'Reformat dates'},
      {value: 13, label: 'Concatenate cells'}
    ];

    this.transformations = [
      {value: 7, label: 'Set first row as header'}
    ]
  }

  ngOnInit() {
  }

}
