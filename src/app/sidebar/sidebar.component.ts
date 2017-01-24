import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { SelectItem } from 'primeng/primeng';
import {INglDatatableSort, INglDatatableRowClick} from 'ng-lightning/ng-lightning';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [SidebarService]
})

export class SidebarComponent implements OnInit {

  public transformations = [
    { id: 0, transformation: 'Replace (,) with (.)' },    
    { id: 1, transformation: 'Set first row as header' },
    { id: 2, transformation: 'Map column: Set empty cells to zero' },
    { id: 3, transformation: 'Transform text: set string to uppercase letters' },
    { id: 4, transformation: 'Pad digits 0 to 4' },
    { id: 5, transformation: '(Statsbygg) Convert text to standard format' },
    { id: 6, transformation: '(Statsbygg) Reformat dates' },
    { id: 7, transformation: '(Statsbygg) Concatenate to string: cad-ref' },
    { id: 8, transformation: '(Statsbygg) Concatenate to string: cad-ref-id' },
  ];

  data = this.transformations;
  inputParameter: any;

  display: false;

  private striped: boolean = false;
  private bordered: boolean = false;
  public transformationSelected: number;

  cities: SelectItem[];
  selectedCity: string;

  constructor(private sidebarService: SidebarService) {
        this.cities = [];
        this.cities.push({label:'New York', value:'New York'});
        this.cities.push({label:'Rome', value:'Rome'});
        this.cities.push({label:'London', value:'London'});
        this.cities.push({label:'Istanbul', value:'Istanbul'});
        this.cities.push({label:'Paris', value:'Paris'});
   }

  ngOnInit() { }

  onRowClick($event: INglDatatableRowClick) {
    // console.log('Selected transformation: ', $event.data.transformation);
    this.transformationSelected = $event.data.id;    
    console.log('Selected transformation id: ', $event.data.id);
  }

}
