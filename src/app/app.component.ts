import { Component, ViewChild } from '@angular/core';
import { TableComponent } from './table/table.component';
import { SidebarImportComponent } from './sidebar.import/sidebar.import.component';

import {SharedService} from './shared.service';
import {SidebarImportService} from './sidebar.import/sidebar.import.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SharedService, SidebarImportService, TableComponent, SidebarImportComponent]
})
export class AppComponent {

  @ViewChild(SidebarImportComponent) sidebarImportComponent: SidebarImportComponent;
  @ViewChild(TableComponent) tableComponent: TableComponent;
  
  constructor(private sharedService: SharedService, private sidebarImportService: SidebarImportService) { }

    getDataRaw () {
    console.log(this.sidebarImportComponent.selectFile);
    this.sidebarImportComponent.getDataFromFile();
    console.log(this.sidebarImportComponent.data);
  }
  
}
