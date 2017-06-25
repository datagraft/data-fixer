import { Component, OnInit } from '@angular/core';
import { SidebarVisualizationService } from './sidebar.visualization.service';

@Component({
  selector: 'sidebarvisualization',
  templateUrl: './sidebar.visualization.component.html',
  styleUrls: ['./sidebar.visualization.component.css'],
  providers: [SidebarVisualizationService]
})
export class SidebarVisualizationComponent implements OnInit {

  constructor(private sidebarVisualizationService: SidebarVisualizationService) { }

  ngOnInit() {
    this.sidebarVisualizationService.getDataVisualization();
  }

}
