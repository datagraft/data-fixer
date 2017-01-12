import { Component, OnInit, Input } from '@angular/core';
import {ChartService} from './chart.service';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  providers: [ChartService]
})
export class ChartComponent implements OnInit {

  constructor(private chartService: ChartService) { }
  
  @Input() public barChartData: any[];
  @Input() public barChartLabels: string[];
  
  public barChartType: string = 'horizontalBar';
  public barChartLegend: boolean = false;

  public barChartOptions:any = {
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

   public barChartColors: Array<any> = [
    {
      backgroundColor: '#607d8b'  // blue grey
   }];


   ngOnInit() {
    this.barChartData = [
    {data: [10, 30, 50, 70, 100]}
    ];
    this.barChartLabels = ['Count', 'Distinct', 'Valid', 'Invalid', 'Empty'];
   }

    // events
  public chartClicked(e:any):void {
    console.log()
    console.log(e);
  }

  public chartHovered(e:any):void {
    // console.log(e);
  }

}

/*
<div class="chart">
  <div style="display: block">
    <canvas baseChart height="100%"
            [datasets]="barChartData"
            [labels]="barChartLabels"
            [options]="barChartOptions"
            [legend]="barChartLegend"
            [colors]="barChartColors"
            [chartType]="barChartType"
            (chartHover)="chartHovered($event)"
            (chartClick)="chartClicked($event)"></canvas>
</div>
*/