import { Component, OnInit } from '@angular/core';
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

  public data = this.transformations;
  private inputParameter: any;

  private striped: boolean = false;
  private bordered: boolean = false;
  public transformationSelected: number;

  public input_1: any;
  public input_2: any;

  public transformationsEnumerated: SelectItem[];

  public transformations: SelectItem[];

  constructor(private sidebarService: SidebarService) {
    this.transformationsEnumerated = [
      { value: 0, label: 'Insert column to the right' },
      { value: 1, label: 'Insert column to the left' },
      { value: 2, label: 'Insert row above' },
      { value: 3, label: 'Insert row below' },
      { value: 4, label: 'Delete column' },
      { value: 5, label: 'Delete row' },
      { value: 6, label: 'Replace (p1) with (p2)' },
      { value: 7, label: 'Set first row as header' },
      { value: 8, label: 'Set empty cells to value (p1)' },
      { value: 9, label: 'Set text to uppercase' },
      { value: 10, label: 'Convert to standard format' },
      { value: 11, label: 'Pad trailing (p1) to value of length (p2)' },
      { value: 12, label: 'Reformat dates' },
      { value: 13, label: 'Concatenate cells' }
    ];

    this.transformations = [
      { value: 7, label: 'Set first row as header' }
    ]
  }

}
