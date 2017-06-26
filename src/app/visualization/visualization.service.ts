import { Injectable } from '@angular/core';

import * as datalib from 'datalib';
import * as papaparse from 'papaparse';

/*
var data_t2;

function saveToCSV(data) {
  data_t2 = data;
  console.log(data);
}

function parseData(url, callBack) {
  papaparse.parse(url, {
    download: true,
    dynamicTyping: true,
    complete: function (results) {
      callBack(results.data);
    }
  });
}
*/

@Injectable()
export class VisualizationService {

  constructor() { }

}  