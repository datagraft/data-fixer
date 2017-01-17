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

  constructor(private chartComponent: ChartComponent, private profilingService: ProfilingService, private transformationsService: TransformationsService) {
    this.data = [
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-"]
      ];

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
    contextMenu: {
      callback: (key, options) => {
        if (key === 'remove_row' || 'remove_col') {
          this.refresh();
          // console.log('Column headers: ', this.hot.getColHeader());
        }
      },
      items: {
        "row_above": {},
        "row_below": {},        
        "remove_col": {},
        "remove_row": {},
        "col_left": {},                
        "col_right": {},
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
      // console.log(this.profilingService.columnSelected);
      // console.log(this.selected);
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

  headersUpdate() {
    this.hot.updateSettings({
      colHeaders: this.headers
    })
  }

  emptyToZero() {
    this.transformationsService.emptyToZero(this.data, this.selected[1]);
    this.refreshChartData();          
    console.log('Selected column: ', this.selected[1])
    console.log(this.data);
  }
  
}
