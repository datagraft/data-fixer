import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { SelectItem } from 'primeng/primeng';
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

  display: false;

  private striped: boolean = false;
  private bordered: boolean = false;
  public transformationSelected: number;

  public transformations: SelectItem[];

  constructor(private sidebarService: SidebarService) {
  this.transformations = [
    { value: 1, label: 'First row as header' },    
    { value: 0, label: 'Replace (,) with (.)' },
    { value: 3, label: 'To uppercase letters' },
    { value: 4, label: 'Pad digits 0 to 4' },                
    { value: 2, label: 'Empty cells to zero' },
    { value: 5, label: 'Text to standard format' },
    { value: 6, label: 'Reformat dates' },
    { value: 7, label: 'Concatenate: cad-ref' },
    { value: 8, label: 'Concatenate: cad-ref-id' },
  ];
   }

  ngOnInit() { }

}
