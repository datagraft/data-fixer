import { Injectable } from '@angular/core';

import * as datalib from 'datalib';
import * as papaparse from 'papaparse';

@Injectable()
export class SidebarVisualizationService {

  public data: any;
  public headers: any;
  public columnsTypesInferred: any;
  public types: any;

  constructor() { }

  getDataVisualization() {
    // let filePath = './src/data/t2_24h.csv';
    // this.data = datalib.csv({ url: filePath });
    // console.log(this.data);

    papaparse.parse('./src/data/t2_24h.csv', {
      download: true,
      complete: function (results) {
        console.log(results);
      }
    });
  }
}  
