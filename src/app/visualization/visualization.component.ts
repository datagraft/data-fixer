import { Component, OnInit } from '@angular/core';
import { VisualizationService } from './visualization.service';

import * as datalib from 'datalib';
import * as papaparse from 'papaparse';

let data;

function parseData(url) {
  papaparse.parse(url, {
    download: true,
    complete: function (results) {
      this.data = results.data;
      console.log(this.data);
    }
  });
}

@Component({
  selector: 'visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css'],
  providers: [VisualizationService]
})

export class VisualizationComponent implements OnInit {

  constructor(private visualizationService: VisualizationService) { }

  ngOnInit() {
    parseData('./src/data/aladin/t2_24h.csv');
  }

}
