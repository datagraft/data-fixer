import { Injectable } from '@angular/core';

import * as datalib from 'datalib';

@Injectable()
export class SidebarImportService {

  data:any;

  constructor() { }

  getDataParsed (selectFile) {

    const promise = new Promise (
        (resolve, reject) => { 
            const data = this.getFile(selectFile);
            console.log('Promise: getFile()');
            resolve(data);
        }
    );

    const dataParsed = function (data) {

        let arrayParsed = [];

        for (let i = 0; i < data.length; i++) {      
          let tempArray = [];
            for (let key in data[i]) {        
              tempArray.push(data[i][key]);
              }
              arrayParsed.push(tempArray);
              tempArray = [];
              } 
            return Promise.resolve(arrayParsed);
        };
      
      promise
          .then(dataParsed)
          .then(fulfilled => {this.data = fulfilled});
  }

  getFile (selectFile) { 

    let filePath: String;

    if (selectFile == 'Airports') {
      filePath = '../data/airports.csv';
    }
    else if (selectFile == 'Stocks') {
      filePath = '../data/stocks.csv';
    }
    else if (selectFile == 'Flights 300K') {
      filePath = '../data/flights-3m.csv';
    }
    else if (selectFile == 'Statsbygg state of estate') {
      filePath = '../data/state-of-estate.csv';
    }
      this.data = datalib.csv({url: filePath});
      return this.data;
  }

}