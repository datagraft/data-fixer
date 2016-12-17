import { Injectable } from '@angular/core';

import * as datalib from 'datalib';

@Injectable()
export class SidebarService {

  constructor() { }

  getFile (selectFile) { 

    let _url: String;
    let _data: any;

    if (selectFile == 'Stocks') {
      _url = '../data/stocks.csv';
    }

    let data = datalib.load({url: _url});
    return data;
    }

}
