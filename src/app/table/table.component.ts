import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'datatable',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [ChartComponent]
})

export class TableComponent implements OnInit {

  // table
  public data: any;
  public hot: any;
  public selected: any;
  public headers: any;

  // chart
  public barChartData: any;
  public barChartLabels: any;  

  constructor(private chartComponent: ChartComponent) {
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
          this.barChartData = this.refreshChartData();
        }
      },
      items: {
        "refresh": {name: 'Refresh chart data'}
      }
    },
    height: 400,
    stretchH: 'all',
    columnSorting: true,
    className: 'htCenter htMiddle',
    afterSelection: (r, c, r2, c2) => {
      this.selected = this.hot.getSelected();
      console.log(this.selected);
    }
    };
    this.hot = new Handsontable(container, settings);
  }

  refreshChartData() {
    // console.log('All OK');
    return [
    {data: [22, 22, 22, 22, 22, 22, 90], label: 'Series B'}
  ]
  };

  headersUpdate() {
    this.hot.updateSettings({
      colHeaders: this.headers
    })
  }
  
}
