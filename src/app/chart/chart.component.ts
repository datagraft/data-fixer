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
  
  @Input() public chartData: number[];
  @Input() public chartLabels: string[];
  
  public chartType: string = 'doughnut';
  public chartLegend: boolean = false;

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }


   ngOnInit() {
    this.chartData = [1, 2, 3, 4, 5];
    this.chartLabels = ['Count', 'Distinct', 'Valid', 'Invalid', 'Empty'];
   }

}


