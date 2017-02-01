import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';

import { ProfilingService } from './profiling.service';
import { TransformationsService } from './transformations.service';

@Component({
  selector: 'datatable',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [ChartComponent, ProfilingService, TransformationsService]
})

export class TableComponent implements OnInit {

  // table
  public data: any;
  public hot: any;
  public selected: any;
  public headers: any;

  @Input() profileSubset: any;
  @Output() profileSubsetEmitter: EventEmitter<number>;

  // chart
  public chartData01: any;
  public chartLabels01: any;  
  public chartData02: any;
  public chartLabels02: any;
  public chartData03: any;
  public inferredType: boolean;
  public type: any;

  // transformations
  padParam: number = 4;
  columns01: any = [11, 12, 13, 14, 15];
  columns02: any = [11, 12, 13, 14, 15];
  columns03: any = [11, 12, 13, 14, 15];      
  separation: string = "/";

  constructor(private chartComponent: ChartComponent, private profilingService: ProfilingService, private transformationsService: TransformationsService) {
    let tempArray = [];
    for (let i = 0; i <= 18; i++) {
      tempArray.push(["-", "-", "-", "-", "-"]);
    }
    this.data = tempArray;

    this.profileSubset = new Object();
    this.profileSubset.selection = 0;
    this.profileSubset.chart = 0;
    this.inferredType = true;
    this.profileSubsetEmitter = new EventEmitter<number>();
  }

  onProfileSubsetEmitted(value: any) {
    this.profileSubset = value;
    this.profileSubsetEmitter.emit(this.profileSubset);
    this.selectCell();
  }

  ngOnInit() {

    let container = document.getElementById('datatable');
    
    let settings = {
    data: this.data,
    rowHeaders: true,
    colHeaders: true,
    columnSorting: false,
    visibleRows: 18,
    viewportColumnRenderingOffset: 40,
    contextMenu: {
      callback: (key, options) => {
        if (key === 'row_above' || 'row_below' || 'remove_col' || 'remove_row' || 'col_left' || 'col_right' || 'undo' || 'redo' || 'zero') {
          this.refresh();
        };
        if (key === "zero") {
          this.emptyToZero();
        };
      },
      items: {
        "row_above": {},
        "row_below": {},        
        "remove_col": {},
        "remove_row": {},
        "col_left": {},                
        "col_right": {},
        "zero": {name: 'Empty cells to zero'},
        "undo": {},                
        "redo": {}         
      },
    },
    height: 460,
    stretchH: 'all',
    className: 'htCenter htMiddle',
    afterSelection: (r, c, r2, c2) => {
      this.refresh();
    }
    };

    this.hot = new Handsontable(container, settings);
  }

  refresh() {
      this.profilingService.data = this.data;
      this.selected = this.hot.getSelected();
      this.profilingService.columnSelected = this.selected[1];
      this.refreshChartData();     
  }

  refreshChartData() {
   this.profilingService.getProfile();
   this.hot.render();                                   
   setTimeout(() => { 
      this.chartData01 = this.profilingService.profile[2];
      this.chartLabels01 = this.profilingService.profile[3];
      this.chartData02 = this.profilingService.profile[3];
      this.chartLabels02 = this.profilingService.profile[5];
      this.type = this.profilingService.typeInferred;
      if (this.profilingService.typeInferred == "string" || this.profilingService.typeInferred == "date" || this.profilingService.stdev == 0) {
        this.inferredType = false;
      }
      else {
        this.inferredType = true;        
        // this.chartData03 = this.profilingService.profile[6];
        // this.chartData03 = this.profilingService.columnData;
        this.chartComponent.chartData03 = this.profilingService.columnData;
        this.chartComponent.refreshPlotly();                                    
      }
    }, 
    300);
  };

  headersUpdate(headers) {
    this.hot.updateSettings({
      colHeaders: headers
    });
    this.data.shift();
    this.hot.render();
  }

  replaceChar() {
    this.transformationsService.replaceChar(this.data, this.selected[1]);
    this.refreshChartData();    
  }

  emptyToZero() {
    this.transformationsService.emptyToZero(this.data, this.selected[1]);
    this.refreshChartData();
  }

  upperCase() {
    this.transformationsService.upperCase(this.data, this.selected[1]);
    this.refreshChartData();
  }

  pad() {
    this.transformationsService.pad(this.data, this.selected[1], this.padParam);
    this.refreshChartData();
  }

  convertToStandardFormat() {
    this.transformationsService.convertToStandardFormat(this.data, this.selected[1]);
    this.refreshChartData();
  }

  reformatDates() {
    this.transformationsService.reformatDates(this.data, this.selected[1]);
    this.refreshChartData();
  }

  concatenateCadRef() {
    this.transformationsService.concatenateCadRef(this.data, this.columns01, this.separation);
    this.refreshChartData();
    this.headers.push("cad-ref");
    this.headersUpdate(this.headers);
  }

  concatenateCadRefId() {
    this.transformationsService.concatenateCadRefId(this.data, this.columns01);
    this.refreshChartData();
    this.headers.push("cad-ref-id");
    this.headersUpdate(this.headers);
  }

  concatenateRrId() {
    this.transformationsService.concatenateCadRefId(this.data, this.columns02);
    this.refreshChartData();
    this.headers.push("cad-ref-id");
    this.headersUpdate(this.headers);
  }

  concatenateRrIdB() {
    this.transformationsService.concatenateCadRefId(this.data, this.columns03);
    this.refreshChartData();
    this.headers.push("cad-ref-id");
    this.headersUpdate(this.headers);
  }

  selectChartLabels(chartID) {
    let chartLabels: any;
    if (chartID == 1) {
      chartLabels = this.chartLabels01;
    }
    else if (chartID == 2) {
      chartLabels = this.chartLabels02;
    }
    return chartLabels;
  }

  selectCell() {
    let rowStartEnd = this.profilingService.getRowStartEnd(this.data, this.profileSubset.chart, this.profileSubset.selection, this.selectChartLabels(this.profileSubset.chart));
    this.hot.selectCell(rowStartEnd[0], this.selected[1], rowStartEnd[1], this.selected[1]);
    // console.log('Data: ', this.data);
    // console.log('this.profileSubset.chart: ', this.profileSubset.chart);    
    // console.log('this.profileSubset.selection: ', this.profileSubset.selection);
    // console.log('this.selectChartLabels(this.profileSubset.chart): ', this.selectChartLabels(this.profileSubset.chart));
    // console.log('rowStartEnd[0]: ', rowStartEnd[0]);
    // console.log('this.selected[1]: ', this.selected[1]);
    // console.log('rowStartEnd[1] ', rowStartEnd[1]);
  }
}

