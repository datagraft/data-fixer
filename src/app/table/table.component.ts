import { Component, OnInit, ViewChild } from '@angular/core';
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

  // chart
  public chartData: any;
  public chartLabels: any;  

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
      this.chartData = this.profilingService.profile[2];
      this.chartLabels = this.profilingService.profile[3];
    }, 
    300);
  };

  headersUpdate() {
    this.hot.updateSettings({
      colHeaders: this.headers
    })
  }
  
}
