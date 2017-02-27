import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { TableComponent } from './table/table.component';
import { SidebarImportComponent } from './sidebar.import/sidebar.import.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChartComponent } from './chart/chart.component';
import { StepsComponent } from './steps/steps.component';

import { SharedService } from './shared.service';
import { SharedTableService } from './shared-table.service';
import { SidebarImportService } from './sidebar.import/sidebar.import.service';
import { SidebarService } from './sidebar/sidebar.service';
import { ProfilingService } from './table/profiling.service';
import { TransformationsService } from './table/transformations.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SharedService, SharedTableService, SidebarImportService, SidebarService, ProfilingService, TransformationsService, TableComponent, ChartComponent, SidebarImportComponent, SidebarComponent, StepsComponent]
})

export class AppComponent implements OnInit {

  @ViewChild(SidebarImportComponent) sidebarImportComponent: SidebarImportComponent;
  @ViewChild(SidebarComponent) sidebarComponent: SidebarComponent;
  @ViewChild(TableComponent) tableComponent: TableComponent;
  @ViewChild(StepsComponent) stepsComponent: StepsComponent;

  @Input() profileSubset: any;
  @Input() stepSequence: any;

  private tabularMode: boolean = true;
  private rdfMode: boolean = false;
  private linkTabular: String;
  private linkRDF: String;
  private activated = "active nav-link"
  private deactivated = "nav-link"

  private open0: boolean = true;
  private open1: boolean = true;
  private open2: boolean = false;
  private display: boolean = false;
  public dataParsed: any;
  public dataParsedRaw: any;
  public ruleBasedSelectionData: any[];

  constructor(private sharedService: SharedService, private sharedTableService: SharedTableService, private sidebarImportService: SidebarImportService, private sidebarService: SidebarService) {

    this.profileSubset = new Object();
    this.profileSubset.selection = 0;
    this.profileSubset.chart = 0;
    this.stepSequence = this.sharedService.initialiseStepSequence();
  }

  ngOnInit() {
    this.linkTabular = this.activated;
    this.linkRDF = this.deactivated;
  }

  setTabularMode() {
    this.tabularMode = true;
    this.rdfMode = false;
    this.linkTabular = this.activated;
    this.linkRDF = this.deactivated;
  }

  setRdfMode() {
    this.tabularMode = false;
    this.rdfMode = true;
    this.linkTabular = this.deactivated;
    this.linkRDF = this.activated;
  }

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
  }

  onTableSelectedEmitted(value: any) {
    this.getRuleBasedSelectionData();
  }

  onStepsEmitted(value: any) {
    this.stepSequence = value;
    this.applyTransformation(true, this.stepsComponent.stepSelected)
  }

  getDataRaw() {
    this.sidebarImportComponent.getDataFromFile();
    setTimeout(() => {
      this.getDataParsed();
    },
      500);
  };

  getDataParsed() {
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
    let _selected = this.tableComponent.selected;
    let _type = this.tableComponent.type;
    let type: any;
    let selected: any;
    let allowedTransformations = [];
    let matrix = this.sharedService.getRulesMatrix();

    if (_type == 'string') {
      type = 0
    }
    else if (_type == 'number' || 'integer') {
      type = 1
    }
    else if (_type == 'date') {
      type = 2
    }

    if (_selected[0] == 0) {
      selected = 3
    }
    else {
      selected = 4
    }

    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i][type] && matrix[i][selected]) {
        allowedTransformations.push(i);
      }
    }

    let tempArray = [];
    for (let i = 0; i < allowedTransformations.length; i++) {
      tempArray.push(this.sidebarComponent.transformationsEnumerated[allowedTransformations[i]]);
    }
    this.sidebarComponent.transformations = tempArray;
  }

  transformations(id) {
    switch (id) {
      case 0:
        console.log('Not yet implemented');
        break;
      case 1:
        console.log('Not yet implemented');
        break;
      case 2:
        console.log('Not yet implemented');
        break;
      case 3:
        console.log('Not yet implemented');
        break;
      case 4:
        console.log('Not yet implemented');
        break;
      case 5:
        console.log('Not yet implemented');
        break;
      case 6:
        this.tableComponent.replaceChar();
        this.stepsComponent.transformationTitle = 'Characters replaced';
        break;
      case 7:
        this.tableComponent.headersUpdate(this.tableComponent.headers);
        this.stepsComponent.transformationTitle = 'First row set as header';
        break;
      case 8:
        this.tableComponent.emptyToZero(this.sidebarComponent.input_1);
        this.stepsComponent.transformationTitle = 'Empty cells filled';
        break;
      case 9:
        this.tableComponent.upperCase();
        this.stepsComponent.transformationTitle = 'Text set to uppercase';
        break;
      case 10:
        this.tableComponent.convertToStandardFormat();
        this.stepsComponent.transformationTitle = 'Converted to standard format';
        break;
      case 11:
        this.tableComponent.pad(this.sidebarComponent.input_1, this.sidebarComponent.input_2);
        this.stepsComponent.transformationTitle = 'Trailing digits padded to value';
        break;
      case 12:
        this.tableComponent.reformatDates();
        this.stepsComponent.transformationTitle = 'Dates reformatted';
        break;
      case 13:
        this.tableComponent.concatenateCadRef();
        this.stepsComponent.transformationTitle = 'Cells concatenated';
        break;
      case 14:
        this.tableComponent.concatenateCadRefId();
        this.stepsComponent.transformationTitle = 'Cells concatenated';
        break;
    }
    this.generateTransformationSteps();
    this.setDisplay();
    this.sidebarComponent.input_1 = '';
    this.sidebarComponent.input_2 = '';
  }

  generateTransformationSteps() {
    if (this.stepsComponent.stepsCounter < 7) {
      this.stepsComponent.generateStepsArray(this.sidebarComponent.transformationSelected, this.datasetDeepCopy(), this.tableComponent.hot.getColHeader());
    }
  }
}
