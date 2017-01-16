import { Component, ViewChild, Input } from '@angular/core';
import { TableComponent } from './table/table.component';
import { SidebarImportComponent } from './sidebar.import/sidebar.import.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChartComponent } from './chart/chart.component';

import {SharedService} from './shared.service';
import {SidebarImportService} from './sidebar.import/sidebar.import.service';
import {SidebarService} from './sidebar/sidebar.service';
import {ProfilingService} from './table/profiling.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SharedService, SidebarImportService, SidebarService, ProfilingService, TableComponent, ChartComponent, SidebarImportComponent, SidebarComponent]
})

export class AppComponent {

  constructor(private sharedService: SharedService, private sidebarImportService: SidebarImportService, private sidebarService: SidebarService) {
    //this.profileSubset = 'init';
    this.profileSubset = new Object();
    this.profileSubset.selection = 0;
    this.profileSubset.chart = 0; 
  }  

  @ViewChild(SidebarImportComponent) sidebarImportComponent: SidebarImportComponent;
  @ViewChild(SidebarComponent) sidebarComponent: SidebarComponent;    
  @ViewChild(TableComponent) tableComponent: TableComponent;

  @Input() profileSubset: any;
  
  dataParsed: any;

  onProfileSubsetEmitted(value: any) {
      this.profileSubset = value;
      console.log(this.profileSubset);
  }

  getDataRaw () {
      this.sidebarImportComponent.getDataFromFile();
  }

  getDataParsed () {
      this.tableComponent.data = this.sidebarImportComponent.getData();
      this.tableComponent.headers = this.sidebarImportComponent.headers;
      this.dataParsed = this.tableComponent.data;
      this.tableComponent.hot.loadData(this.tableComponent.data);
      console.log(this.dataParsed);
      console.log(this.tableComponent.headers);
  }

  runTransformation () {
      if (this.sidebarComponent.selectFile == "Headers") {
          this.tableComponent.headersUpdate();                
      }
    }
  
}
