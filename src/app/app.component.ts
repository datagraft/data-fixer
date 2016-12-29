import { Component, ViewChild } from '@angular/core';
import { TableComponent } from './table/table.component';
import { SidebarImportComponent } from './sidebar.import/sidebar.import.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import {SharedService} from './shared.service';
import {SidebarImportService} from './sidebar.import/sidebar.import.service';
import {SidebarService} from './sidebar/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SharedService, SidebarImportService, SidebarService, TableComponent, SidebarImportComponent, SidebarComponent]
})

export class AppComponent {

  @ViewChild(SidebarImportComponent) sidebarImportComponent: SidebarImportComponent;
  @ViewChild(SidebarComponent) sidebarComponent: SidebarComponent;    
  @ViewChild(TableComponent) tableComponent: TableComponent;
  
  constructor(private sharedService: SharedService, private sidebarImportService: SidebarImportService, private sidebarService: SidebarService) { }

    dataParsed: any;

    getDataRaw () {
      this.sidebarImportComponent.getDataFromFile();
  }

    getDataParsed () {
      this.tableComponent.data = this.sidebarImportComponent.getData();
      this.dataParsed = this.tableComponent.data;
      this.tableComponent.hot.loadData(this.tableComponent.data);
      console.log(this.dataParsed);
      // console.log(this.tableComponent.hot.countRows());
  }
  
}
