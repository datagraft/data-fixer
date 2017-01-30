import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
   }

  @Input() profileSubset: any;
  @Output() profileSubsetEmitter: EventEmitter<number>;
  
  @Input() public chartData01: number[];
  @Input() public chartLabels01: string[];
  @Input() public chartData02: number[];
  @Input() public chartLabels02: string[];
  @Input() public chartData03: any;
  @Input() public chartLabels03: any;
  @Input() public inferredType: boolean = false;

  public chartType01: string = 'doughnut';
  public chartType02: string = 'doughnut';
  public chartType03: string = 'horizontalBar';      
  public chartLegend01: boolean = false;
  public chartLegend02: boolean = false;
  public chartLegend03: boolean = false;

  private outliersTrace: any;
  private outliersData: any;
  private outliersLayout: any;

  public chartOptions01:any = {
    responsive: true,
    layout: {
      padding: {left: 35, right: 35}
    }
  };

  public chartOptions02:any = {
    responsive: true,
    layout: {
      padding: {left: 35, right: 35}
    }
  };    

  public chartColors01: Array<any> = [
    {
      backgroundColor: [
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
   }
   ];

  public chartColors02: Array<any> = [
    {
      backgroundColor: [
        '#00A896',
        '#FF1654',
        '#F9BE02'
      ]
   }
   ];

  public chartColors03: Array<any> = [
    {
      backgroundColor: [
        '#003459',
        '#46494C',
        '#8D99AE',
        '#247BA0'
        
      ]
   }
   ];

  ngOnInit() {
    this.chartData01 = [1];
    this.chartLabels01 = ['Init'];
    this.chartData02 = [1];
    this.chartLabels02 = ['Init'];
    this.chartData03 = [0.75, 5.25, 5.5, 6, 6.2, 6.6, 6.80, 7.0, 7.2, 7.5, 7.5, 7.75, 8.15, 8.15, 8.65, 8.93, 9.2, 9.5, 10, 10.25, 11.5, 12, 16, 20.90, 22.3, 23.25];
    this.chartLabels03 = ['First Quartile', 'Median', 'Third Quartile', 'Standard deviation'];
    
    this.getChartOptions03();
    Plotly.newPlot('chart03', this.outliersData, this.outliersLayout, {displayModeBar: false});
    Plotly.redraw('chart03');
   }

   refresh() {
     console.log(this.chartData03);
     this.getChartOptions03();
     Plotly.newPlot('chart03', this.outliersData, this.outliersLayout, {displayModeBar: false});
     Plotly.redraw('chart03');
   }

   getChartOptions03() {
      this.outliersTrace = {
        y: this.chartData03,
        type: 'box',
        showlegend: false,
        hoverinfo: "all",
        fillcolor: '#2D2F33',
        jitter: 0.5,
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
          zerolinecolor: '#A0A9B2'
        }
      };
   }

  chartSubsetEmit() {
    this.profileSubsetEmitter.emit(this.profileSubset);
  }

  // events chart01
  public chart01Clicked(e:any):void {
    this.profileSubset.selection = e.active["0"]._index;
    this.profileSubset.chart = 1;   
    this.chartSubsetEmit();
  }

  // events chart02
  public chart02Clicked(e:any):void {
    this.profileSubset.selection = e.active["0"]._index;
    this.profileSubset.chart = 2;   
    this.chartSubsetEmit();
  }

/*
  // events chart03
  public chart03Clicked(e:any):void {
    this.profileSubset.selection = e.active["0"]._index;
    this.profileSubset.chart = 3;   
    this.chartSubsetEmit();
  }
  */

}