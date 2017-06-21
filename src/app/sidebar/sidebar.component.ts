import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { SelectItem } from 'primeng/primeng';
import { ListboxModule } from 'primeng/primeng';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [SidebarService]
})

export class SidebarComponent {

  @Output() sidebarEmitter: EventEmitter<any>;

  private inputParameter: any;

  private striped: boolean = false;
  private bordered: boolean = false;
  public transformationSelected: number;

  public input_1: any;
  public input_2: any;

  public transformationsEnumerated: SelectItem[];

  public transformations: SelectItem[];
  public data = this.transformations;

  constructor(private sidebarService: SidebarService) {
    this.transformationsEnumerated = [
      { value: 0, label: 'Insert column on the right' },
      { value: 1, label: 'Insert column on the left' },
      { value: 2, label: 'Insert row above' },
      { value: 3, label: 'Insert row below' },
      { value: 4, label: 'Remove column' },
      { value: 5, label: 'Remove row' },
      { value: 6, label: 'Replace (p1) with (p2)' },
      { value: 7, label: 'Set first row as header' },
      { value: 8, label: 'Set empty cells to value (p1)' },
      { value: 9, label: 'Set text to uppercase' },
      { value: 10, label: 'Convert to standard format' },
      { value: 11, label: 'Add (p1) to the end of values, max length is (p2)' },
      { value: 12, label: 'Reformat dates' },
      { value: 13, label: 'Concatenate cells' }
    ];

    this.transformations = [
      { value: 7, label: 'Set first row as header' }
    ]

    this.sidebarEmitter = new EventEmitter<any>();

  }

  onChange($event) {
    this.sidebarEmitter.emit(true);
    console.log('Test OK');
  }

}
