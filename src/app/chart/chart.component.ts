import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  
  public chartType01: string = 'doughnut';
  public chartType02: string = 'doughnut';
  public chartType03: string = 'horizontalBar';      
  public chartLegend01: boolean = false;
  public chartLegend02: boolean = false;
  public chartLegend03: boolean = false;

  public chartOptions03:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
          gridLines: {
            display: false
          }
            }],
      yAxes: [{
          gridLines: {
            display: false
          }
            }]
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
        '#F4F1BB'              
      ]
   }];

  public chartColors02: Array<any> = [
    {
      backgroundColor: [
        '#02C39A',
        '#FF1654'
      ]
   }];

  public chartColors03: Array<any> = [
    {
      backgroundColor: [
        '#FF1654',
        '#46494C',
        '#8D99AE',
        '#00A896',
        '#247BA0'
        
      ]
   }];

  ngOnInit() {
    this.chartData01 = [1];
    this.chartLabels01 = ['Init'];
    this.chartData02 = [1];
    this.chartLabels02 = ['Init'];
    this.chartData03 = [{data: [10, 30, 50, 70, 100]}];
    this.chartLabels03 = ['Outliers', 'Min', 'Max', 'Average', 'Standard deviation'];
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

  public chart01Hovered(e:any):void {    
      }

  // events chart02
  public chart02Clicked(e:any):void {
    this.profileSubset.selection = e.active["0"]._index;
    this.profileSubset.chart = 1;   
    this.chartSubsetEmit();
  }

  public chart02Hovered(e:any):void {    
      }

  // events chart03
  public chart03Clicked(e:any):void {
    this.profileSubset.selection = e.active["0"]._index;
    this.profileSubset.chart = 1;   
    this.chartSubsetEmit();
  }

  public chart03Hovered(e:any):void {    
      }

}


