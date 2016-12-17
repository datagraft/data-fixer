import { Injectable } from '@angular/core';

import * as datalib from 'datalib';

@Injectable()
export class SidebarImportService {

  constructor() { }

  getFile (selectFile) { 

    let filePath: String;
    let data: any;

    if (selectFile == 'Stocks') {
      filePath = '../data/stocks.csv';
    }

    data = datalib.load({url: filePath});
    return data;
    }

}
