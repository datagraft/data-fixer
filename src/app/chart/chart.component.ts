import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }
  
  @Input() public chartData01: number[];
  @Input() public chartLabels01: string[];
  @Input() public chartData02: number[];
  @Input() public chartLabels02: string[];
  
  public chartType: string = 'doughnut';
  public chartLegend01: boolean = false;
  public chartLegend02: boolean = false;

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


  // events
  public chartClicked(e:any):void {
    // console.log(e);
  }

  public chartHovered(e:any):void {
    // console.log(e);
  }


   ngOnInit() {
    this.chartData01 = [1];
    this.chartLabels01 = ['Init'];
    this.chartData02 = [1];
    this.chartLabels02 = ['Init'];
   }

}


