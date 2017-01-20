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

  // transformations
  padParam: number = 4;
  columns: any = [11, 12, 13, 14, 15];
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
    this.profileSubsetEmitter = new EventEmitter<number>();
  }

  onProfileSubsetEmitted(value: any) {
    this.profileSubset = value;
    this.profileSubsetEmitter.emit(this.profileSubset);
  }

  ngOnInit() {

    let container = document.getElementById('datatable');
    
    let settings = {
    data: this.data,
    rowHeaders: true,
    colHeaders: true,
    viewportColumnRenderingOffset: 40,
    contextMenu: {
      callback: (key, options) => {
        if (key === 'row_above' || 'row_below' || 'remove_col' || 'remove_row' || 'col_left' || 'col_right' || 'undo' || 'redo') {
          this.refresh();
          this.hot.render();
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
    columnSorting: true,
    className: 'htCenter htMiddle',
    afterSelection: (r, c, r2, c2) => {
      this.refresh();
      console.log('Selected column: ', this.selected[1]);
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
   setTimeout(() => { 
      this.chartData01 = this.profilingService.profile[2];
      this.chartLabels01 = this.profilingService.profile[3];
      this.chartData02 = this.profilingService.profile[4];
      this.chartLabels02 = this.profilingService.profile[5];
      this.chartData03 = this.profilingService.profile[6];      
    }, 
    300);
  };

  headersUpdate(headers) {
    this.hot.updateSettings({
      colHeaders: headers
    });
    this.hot.render();
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

  concatenateToString() {
    this.transformationsService.concatenateToString(this.data, this.columns, this.separation);
    this.refreshChartData();
    this.headers.splice(16, 0, "cad-ref");
    this.headersUpdate();
  }
}

