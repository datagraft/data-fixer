import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';

import {ProfilingService} from './profiling.service';

@Component({
  selector: 'datatable',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [ChartComponent, ProfilingService]
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

  constructor(private chartComponent: ChartComponent, private profilingService: ProfilingService) {
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
        if (key === 'refresh') {
       
        }
      },
      items: {
        "refresh": {name: 'Get profile'}
      }
    },
    height: 460,
    stretchH: 'all',
    columnSorting: true,
    className: 'htCenter htMiddle',
    afterSelection: (r, c, r2, c2) => {
      this.profilingService.data = this.data;
      this.selected = this.hot.getSelected();
      this.profilingService.columnSelected = this.selected[1];
      this.refreshChartData();      
      // console.log(this.profilingService.columnSelected);
      // console.log(this.selected);
    }
    };
    this.hot = new Handsontable(container, settings);
  }

  refreshChartData() {
   this.profilingService.getProfile();
   setTimeout(() => { 
      this.chartData01 = this.profilingService.profile[2];
      this.chartLabels01 = this.profilingService.profile[3];
      this.chartData02 = this.profilingService.profile[4];
      this.chartLabels02 = this.profilingService.profile[5];
    }, 
    300);
  };

  headersUpdate() {
    this.hot.updateSettings({
      colHeaders: this.headers
    })
  }
  
}
