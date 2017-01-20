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
    this.stepSequence = this.sharedService.initialiseStepSequence();
  }  

  @ViewChild(SidebarImportComponent) sidebarImportComponent: SidebarImportComponent;
  @ViewChild(SidebarComponent) sidebarComponent: SidebarComponent;    
  @ViewChild(TableComponent) tableComponent: TableComponent;
  @ViewChild(StepsComponent) stepsComponent: StepsComponent;  

  @Input() profileSubset: any;
  @Input() stepSequence: any;
  
  dataParsed: any;
  dataParsedRaw: any;

  getTypeInference = () => {
      return this.sidebarImportService.columnsTypesInferred;
  }

  onProfileSubsetEmitted(value: any) {
      this.profileSubset = value;
      console.log('Chart subset: ', this.profileSubset);
  }

  onStepsEmitted(value: any) {
      this.stepSequence = value;
      this.applyTransformation(true, this.stepsComponent.stepSelected)
      console.log('Step sequence from app component: ', this.stepSequence);
      // console.log('onStepsEmitted: ', this.dataParsedRaw);
  }

  getDataRaw () {
    this.sidebarImportComponent.getDataFromFile();
        setTimeout(() => { 
            this.getDataParsed();            
            }, 
        500);
    };

  getDataParsed () {
      this.dataParsed = this.sidebarImportComponent.getData();
      this.tableComponent.data = this.dataParsed;
      this.tableComponent.headers = this.sidebarImportComponent.headers;
      this.tableComponent.hot.loadData(this.tableComponent.data);
      this.tableComponent.headersUpdate(this.tableComponent.headers);
      this.stepSequence = this.sharedService.initialiseStepSequence();
      this.stepsComponent.stepsCounter = 1;    
      // deep copy of dataParsed to keep original dataset in dataParsedRaw
      this.dataParsedRaw = [];
      for (let i = 0; i < this.dataParsed.length; i++) {
        this.dataParsedRaw.push(this.dataParsed[i].slice(0));
      }
  }

  applyTransformation(recreateSteps?: boolean, stepsIndex?: number) {
      if (recreateSteps) {
            this.tableComponent.hot.loadData(this.stepSequence[stepsIndex - 1].data);
            this.tableComponent.hot.render();
            this.tableComponent.headersUpdate(this.stepSequence[stepsIndex - 1].headers);
            this.stepsComponent.stepsCounter = stepsIndex + 1;
            for (let i = stepsIndex; i < this.stepSequence.length; i++) {
                this.stepSequence[i] = { transformation: 0, step: 0, title: '-', data: [] };
                i++;
            }           
              }
      else {
          this.transformations(this.sidebarComponent.transformationSelected);
      }             
  }

  datasetDeepCopy() {
    let deepCopy = [];
      for (let i = 0; i < this.dataParsed.length; i++) {
        deepCopy.push(this.dataParsed[i].slice(0));
      }
    return deepCopy;
  }

  transformations(id) {
      if (id == 1) {
          this.tableComponent.headersUpdate(this.tableComponent.headers);
      }
      else if (id == 2) {
          this.tableComponent.emptyToZero();          
      }
      else if (id == 3) {
          this.tableComponent.upperCase();          
      }
      else if (id == 4) {
          this.tableComponent.pad();          
      }
      else if (id == 5) {
          this.tableComponent.convertToStandardFormat();          
      }
      else if (id == 6) {
          this.tableComponent.reformatDates();          
      }
      else if (id == 7) {
          this.tableComponent.concatenateToString();          
      }
      this.generateTransformationSteps();  
  }

    generateTransformationSteps() {
        this.stepsComponent.generateStepsArray(this.sidebarComponent.transformationSelected, this.datasetDeepCopy(), this.tableComponent.hot.getColHeader());
    }

}
