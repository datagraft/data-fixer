import { Injectable } from '@angular/core';

import * as datalib from 'datalib';

@Injectable()
export class SidebarService {

  csv_data: any;

  constructor() { }

  getFile () {
    this.csv_data = datalib.load({url: '../data/state-of-estate.csv'}, function(err, data) {
      if (err) {
      console.log("Import error");
    } else {
      console.log(data);
    }
  });
  }

}
