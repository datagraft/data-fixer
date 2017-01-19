import { Component, ViewChild, Input } from '@angular/core';
import { TableComponent } from './table/table.component';
import { SidebarImportComponent } from './sidebar.import/sidebar.import.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChartComponent } from './chart/chart.component';
import { StepsComponent } from './steps/steps.component';

import { SharedService } from './shared.service';
import { SidebarImportService } from './sidebar.import/sidebar.import.service';
import { SidebarService } from './sidebar/sidebar.service';
import { ProfilingService } from './table/profiling.service';
import { TransformationsService } from './table/transformations.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SharedService, SidebarImportService, SidebarService, ProfilingService, TransformationsService, TableComponent, ChartComponent, SidebarImportComponent, SidebarComponent, StepsComponent]
})

export class AppComponent {

  constructor(private sharedService: SharedService, private sidebarImportService: SidebarImportService, private sidebarService: SidebarService) {
    this.profileSubset = new Object();
    this.profileSubset.selection = 0;
    this.profileSubset.chart = 0; 
  }  

  @ViewChild(SidebarImportComponent) sidebarImportComponent: SidebarImportComponent;
  @ViewChild(SidebarComponent) sidebarComponent: SidebarComponent;    
  @ViewChild(TableComponent) tableComponent: TableComponent;
  @ViewChild(StepsComponent) stepsComponent: StepsComponent;  

  @Input() profileSubset: any;
  
  data: any;
  dataParsed: any;

  getTypeInference = () => {
      return this.sidebarImportService.columnsTypesInferred;
  }

  onProfileSubsetEmitted(value: any) {
      this.profileSubset = value;
      console.log('Chart subset: ', this.profileSubset);
  }

  getDataRaw () {
    this.sidebarImportComponent.getDataFromFile();
        setTimeout(() => { 
            this.getDataParsed();            
            }, 
        500);
    };

  getDataParsed () {
      this.tableComponent.data = this.sidebarImportComponent.getData();
      this.tableComponent.headers = this.sidebarImportComponent.headers;
      this.dataParsed = this.tableComponent.data;
      this.tableComponent.hot.loadData(this.tableComponent.data);
      // console.log(this.dataParsed);
      // console.log(this.tableComponent.headers);
  }

  runTransformation () {
      if (this.sidebarComponent.transformationSelected == 1) {
          this.tableComponent.headersUpdate();                
      }
      else if (this.sidebarComponent.transformationSelected == 2) {
          this.tableComponent.emptyToZero();
          // console.log(this.sidebarImportComponent.types);                
      }
      else if (this.sidebarComponent.transformationSelected == 3) {
          this.tableComponent.upperCase();
      }
      else if (this.sidebarComponent.transformationSelected == 4) {
          this.tableComponent.pad();
      }
      else if (this.sidebarComponent.transformationSelected == 5) {
          this.tableComponent.convertToStandardFormat();
      }
      else if (this.sidebarComponent.transformationSelected == 6) {
          this.tableComponent.reformatDates();
      }
      else if (this.sidebarComponent.transformationSelected == 7) {
          this.tableComponent.concatenateToString();
      }
    }

}
