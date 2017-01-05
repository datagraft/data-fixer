import { Injectable } from '@angular/core';

import * as datalib from 'datalib';

@Injectable()
export class SidebarImportService {

  data: any;
  headers: any;
  columnsTypesInferred: any;

  constructor() { }

  getDataParsed (selectFile) {

    const promise = new Promise (
        (resolve, reject) => { 
            const data = this.getFile(selectFile);
            this.headers = data.columns;
            this.columnsTypesInferred = data.__types__;
            // console.log(this.headers);
            // console.log(this.columnsTypesInferred);            
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
      filePath = '../data/SoE.csv';
    }
      this.data = datalib.csv({url: filePath});
      return this.data;
  }

}