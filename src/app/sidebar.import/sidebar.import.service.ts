import { Injectable } from '@angular/core';

import * as datalib from 'datalib';

@Injectable()
export class SidebarImportService {

  data: any;
  headers: any;
  columnsTypesInferred: any;
  types: any;

  constructor() { }

  getDataParsed (selectFile) {

    const promise = new Promise (
        (resolve, reject) => { 
            const data = this.getFile(selectFile);
            this.headers = data.columns;
            this.columnsTypesInferred = data.__types__;
            // console.log(this.headers);
            // console.log('Type inference: ', this.columnsTypesInferred);            
            resolve(data);
        }
    );

    const dataParsed = (data) => {

        this.types = this.getTypesInferred();

        let arrayParsed = [];
        arrayParsed.push(this.headers);

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

  getTypesInferred() {
    let types = [];
    let tempArray = [];
    for (let i = 0; i < this.headers.length; i++) {
        tempArray.push(i);
        tempArray.push(this.headers[i]);
        tempArray.push(this.columnsTypesInferred[this.headers[i]]);        
        types.push(tempArray);
        tempArray = [];
    }
        // console.log(types);
        return types;    
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
    else if (selectFile == 'Weather') {
      filePath = '../data/seattle.csv';
    }
      this.data = datalib.csv({url: filePath});
      return this.data;
  }

}