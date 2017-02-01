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
  
  open: boolean = true;
  open1: boolean = true;
  open2: boolean = false; 

  display: boolean = false; 

  dataParsed: any;
  dataParsedRaw: any;

  ruleBasedSelectionData: any[];

  setDisplay() {
      this.display = true;
      setTimeout(() => {
          this.display = false;
      },
      4000);
  }

  getTypeInference = () => {
      return this.sidebarImportService.columnsTypesInferred;
  }

  onProfileSubsetEmitted(value: any) {
      this.profileSubset = value;
      console.log('profile subset emitted');                        
  }

  onStepsEmitted(value: any) {
      this.stepSequence = value;
      this.applyTransformation(true, this.stepsComponent.stepSelected)
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
            this.tableComponent.data = this.stepSequence[stepsIndex - 1].data;
            this.tableComponent.hot.render();
            this.tableComponent.headersUpdate(this.stepSequence[stepsIndex - 1].headers);
            this.stepsComponent.stepsCounter = stepsIndex + 1;
            this.stepSequence = this.stepSequence.slice(0, stepsIndex);
            for (let i = stepsIndex; i < 5; i++) {
                this.stepSequence.push({ transformation: 0, step: 0, title: '-', data: [] });
            }           
              }
      else {
          this.transformations(this.sidebarComponent.transformationSelected);
      }
      this.sidebarComponent.transformationSelected = null;             
  }

  datasetDeepCopy() {
    let deepCopy = [];
      for (let i = 0; i < this.dataParsed.length; i++) {
        deepCopy.push(this.dataParsed[i].slice(0));
      }
    return deepCopy;
  }

  getRuleBasedSelectionData() {
      console.log('Inferred type: ', this.tableComponent.type);
      console.log('Selection: ', this.tableComponent.selected);
  }

  transformations(id) {

      switch (id) {
          case 0:
          this.tableComponent.replaceChar();
          break;
          case 1:
          this.tableComponent.headersUpdate(this.tableComponent.headers);
          break;
          case 2:
          this.tableComponent.emptyToZero();
          break;
          case 3:
          this.tableComponent.upperCase();
          break;
          case 4:
          this.tableComponent.pad();
          break;
          case 5:
          this.tableComponent.convertToStandardFormat();
          break;
          case 6:
          this.tableComponent.reformatDates();
          break;
          case 7:
          this.tableComponent.concatenateCadRef();
          break;
          case 8:
          this.tableComponent.concatenateCadRefId();
          break;
      }
      this.generateTransformationSteps();
      this.setDisplay();
      this.getRuleBasedSelectionData();  
  }

    generateTransformationSteps() {
        if (this.stepsComponent.stepsCounter < 7) {
        this.stepsComponent.generateStepsArray(this.sidebarComponent.transformationSelected, this.datasetDeepCopy(), this.tableComponent.hot.getColHeader());
        }
    }
}
