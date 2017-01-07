import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }
  
  @Input() public barChartData: any[];
  @Input() public barChartLabels: string[];
  
  public barChartType: string = 'bar';
  public barChartLegend: boolean = false;

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

   public barChartColors: Array<any> = [
    {
      backgroundColor: '#607d8b'  // blue grey
   }];


   ngOnInit() {
    this.barChartData = [
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    ];
    this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
   }

    // events
  public chartClicked(e:any):void {
    // console.log(e);
  }

  public chartHovered(e:any):void {
    // console.log(e);
  }

}


