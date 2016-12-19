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

    dataParsed: any;

    getDataRaw () {
      this.sidebarImportComponent.getDataFromFile();
  }

    getDataParsed () {
      console.log(this.sidebarImportComponent.getData());
      this.tableComponent.data = this.sidebarImportComponent.getData();
      this.tableComponent.hot.loadData(this.tableComponent.data);
  }

  
}
