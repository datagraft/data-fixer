import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { TabularComponent } from './table/tabular/tabular.component';
import { RdfComponent } from './table/rdf/rdf.component';
import { AnnotationForm } from './table/annotation/annotation.component'
import { SidebarImportComponent } from './sidebar.import/sidebar.import.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChartComponent } from './chart/chart.component';
import { StepsComponent } from './steps/steps.component';
import { DetailModeComponent } from './table/annotation/detailMode.component';

import { SharedService } from './shared.service';
import { SidebarImportService } from './sidebar.import/sidebar.import.service';
import { SidebarService } from './sidebar/sidebar.service';
import { ProfilingService } from './table/tabular/profiling.service';
import { TransformationsService } from './table/tabular/transformations.service';
import { SharedTableService } from './table/shared.service';
import { RdfService } from './table/rdf/rdf.service';
import {AnnotationService} from "./table/annotation/annotation.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SharedService, SidebarImportService, SidebarService, ProfilingService, TransformationsService,
    SharedTableService, RdfService, TabularComponent, RdfComponent, ChartComponent, SidebarImportComponent,
    SidebarComponent, StepsComponent, DetailModeComponent, AnnotationService]

})

export class AppComponent implements OnInit {

  @ViewChild(SidebarImportComponent) sidebarImportComponent: SidebarImportComponent;
  @ViewChild(SidebarComponent) sidebarComponent: SidebarComponent;
  @ViewChild(TabularComponent) tabularComponent: TabularComponent;
  @ViewChild(RdfComponent) rdfComponent: RdfComponent;
  @ViewChild(StepsComponent) stepsComponent: StepsComponent;

  @ViewChild(AnnotationForm) annotationForm : AnnotationForm;
  @ViewChild(DetailModeComponent) detailMode : DetailModeComponent;


  @Input() profileSubset: any;
  @Input() stepSequence: any;

  private sharedResources: any;

  private tabularMode: boolean = true;
  private rdfMode: boolean = false;
  private isDetailMode : boolean = false;
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

  constructor(private sharedService: SharedService, private sidebarImportService: SidebarImportService, private sidebarService: SidebarService, private sharedTableService: SharedTableService) { }

  ngOnInit() {
    this.profileSubset = new Object();
    this.profileSubset.selection = 0;
    this.profileSubset.chart = 0;
    this.stepSequence = this.sharedService.initialiseStepSequence();
    this.linkTabular = this.activated;
    this.linkRDF = this.deactivated;
  }

  setTabularMode() {
    this.setViewMode(true, this.activated, this.deactivated);
    this.tabularComponent.tabularMode = true;
    this.rdfMode = false;
    this.tabularComponent.tabMode();
  }

  setRdfMode() {
    //because 'false' as first parameter we can show different sidebar, in fact we check the value of tabularMode
    this.setViewMode(false, this.deactivated, this.activated);
    this.tabularComponent.tabularMode = false;
    this.rdfMode = true;
    this.tabularComponent.rdfMode();

  }

  setViewMode(tabularMode, tabularStatus, rdfStatus) {
    this.linkTabular = tabularStatus;
    this.linkRDF = rdfStatus;
    this.tabularMode = tabularMode;
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
    this.tabularComponent.data = this.dataParsed;
    this.tabularComponent.headers = this.sidebarImportComponent.headers;
    this.tabularComponent.hot.loadData(this.tabularComponent.data);
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
      this.tabularComponent.hot.loadData(this.stepSequence[stepsIndex - 1].data);
      this.tabularComponent.data = this.stepSequence[stepsIndex - 1].data;
      this.tabularComponent.hot.render();
      this.tabularComponent.headersUpdate(this.stepSequence[stepsIndex - 1].headers);
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
    let _selected = this.tabularComponent.selected;
    let _type = this.tabularComponent.type;
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
        this.tabularComponent.replaceChar();
        this.stepsComponent.transformationTitle = 'Characters replaced';
        break;
      case 7:
        this.tabularComponent.headersUpdate(this.tabularComponent.headers);
        this.stepsComponent.transformationTitle = 'First row set as header';
        break;
      case 8:
        this.tabularComponent.emptyToZero(this.sidebarComponent.input_1);
        this.stepsComponent.transformationTitle = 'Empty cells filled';
        break;
      case 9:
        this.tabularComponent.upperCase();
        this.stepsComponent.transformationTitle = 'Text set to uppercase';
        break;
      case 10:
        this.tabularComponent.convertToStandardFormat();
        this.stepsComponent.transformationTitle = 'Converted to standard format';
        break;
      case 11:
        this.tabularComponent.pad(this.sidebarComponent.input_1, this.sidebarComponent.input_2);
        this.stepsComponent.transformationTitle = 'Trailing digits padded to value';
        break;
      case 12:
        this.tabularComponent.reformatDates();
        this.stepsComponent.transformationTitle = 'Dates reformatted';
        break;
      case 13:
        this.tabularComponent.concatenateCadRef();
        this.stepsComponent.transformationTitle = 'Cells concatenated';
        break;
      case 14:
        this.tabularComponent.concatenateCadRefId();
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
      this.stepsComponent.generateStepsArray(this.sidebarComponent.transformationSelected, this.datasetDeepCopy(), this.tabularComponent.hot.getColHeader());
    }
  }

}
