import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {chart01_init, chart02_init} from './data';

declare var Plotly;

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() {
    this.profileSubset = new Object();
    this.profileSubset.selection = 0;
    this.profileSubset.chart = 0;
    this.profileSubsetEmitter = new EventEmitter<number>();
    Object.assign(this, {chart01_init, chart02_init})   
   }

  chart01_init: any[];
  chart02_init: any[];
  
  view: any[] = [700, 400];
  view2: any[] = [500, 400];
  
  // advanced pie chart
  showLabels = true;
  explodeSlices = false;
  doughnut = true;

  colorScheme1 = {
    domain: ['#00A896', '#FF1654', '#F9BE02']
  };

  colorScheme2 = {
    domain: [        
        '#003459',        
        '#00171F',
        '#007EA7',
        '#F4A261',        
        '#9BC1BC',                        
        '#00A8E8',
        '#F4F1BB',
        '#003459',        
        '#00171F',
        '#007EA7',
        '#F4A261',        
        '#9BC1BC',                        
        '#00A8E8',
        '#F4F1BB',
        '#003459',        
        '#00171F',
        '#007EA7',
        '#F4A261',        
        '#9BC1BC',                        
        '#00A8E8',
        '#F4F1BB',
        '#003459',        
        '#00171F',
        '#007EA7',
        '#F4A261',        
        '#9BC1BC',                        
        '#00A8E8',
        '#F4F1BB'  
      ]
  };
  
  onSelect(event) {
    console.log(event);
    console.log(event.index);    
  }

  @Input() profileSubset: any;
  @Output() profileSubsetEmitter: EventEmitter<number>;
  
  @Input() public chartData01: number[];
  // @Input() public chartLabels01: string[];
  @Input() public chartData02: number[];
  // @Input() public chartLabels02: string[];
  @Input() public chartData03: any;
  // @Input() public chartLabels03: any;
  @Input() public inferredType: boolean = false;

  private outliersTrace: any;
  private outliersData: any;
  private outliersLayout: any;

  ngOnInit() {
    this.chartData01 = this.chart02_init;
    // this.chartLabels01 = ['Init'];
    this.chartData02 = this.chart01_init;
    // this.chartLabels02 = ['Init'];
    this.chartData03 = [0.75, 5.25, 5.5, 6, 6.2, 6.6, 6.80, 7.0, 7.2, 7.5, 7.5, 7.75, 8.15, 8.15, 8.65, 8.93, 9.2, 9.5, 10, 10.25, 11.5, 12, 16, 20.90, 22.3, 23.25];
    // this.chartLabels03 = ['First Quartile', 'Median', 'Third Quartile', 'Standard deviation'];
    
    this.getChartOptions03();
    Plotly.newPlot('chart03', this.outliersData, this.outliersLayout, {displayModeBar: false});
    Plotly.redraw('chart03');
   }

   refreshPlotly() {
     // console.log(this.chartData03);
     this.getChartOptions03();
     Plotly.newPlot('chart03', this.outliersData, this.outliersLayout, {displayModeBar: false});
     Plotly.redraw('chart03');
   }

   getChartOptions03() {
      this.outliersTrace = {
        y: this.chartData03,
        type: 'box',
        showlegend: true,
        hoverinfo: "all",
        fillcolor: '#2D2F33',
        jitter: 0.6,
        whiskerwidth: 0.6,
        marker: {
          opacity: 1,
          color: '#2D2F33',
          outliercolor: '#FF1654',
          line: {
            color: '#151313',
            outliercolor: '#FF1654',
            outlierwidth: 2
          }
        },
        boxpoints: 'suspectedoutliers'
      };

      this.outliersData = [this.outliersTrace];

      this.outliersLayout = {
        margin: {
          t: 30,
          b: 0
        },
        yaxis: {
          showgrid: true,
          zerolinecolor: '#C4BBB8'
        }
      };
   }

  chartSubsetEmit() {
    this.profileSubsetEmitter.emit(this.profileSubset);
  }

  // events chart01
  public chart01Clicked(event):void {
    this.profileSubset.selection = event.name;
    this.profileSubset.chart = 1;   
    this.chartSubsetEmit();
  }

  // events chart02
  public chart02Clicked(event):void {
    if (event.name == 'Valid') {
    this.profileSubset.selection = 0;
    }
    else if (event.name == 'Invalid') {
    this.profileSubset.selection = 1;
    }
    else if (event.name == 'Outliers') {
    this.profileSubset.selection = 2;
    }
    this.profileSubset.chart = 2;   
    this.chartSubsetEmit();
  }


}