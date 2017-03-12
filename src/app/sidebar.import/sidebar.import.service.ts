import { Injectable } from '@angular/core';

import * as datalib from 'datalib';

@Injectable()
export class SidebarImportService {

  public data: any;
  public headers: any;
  public columnsTypesInferred: any;
  public types: any;

  constructor() {
  }

  getDataParsed(selectFile) {

    const promise = new Promise(
      (resolve, reject) => {
        const data = this.getFile(selectFile);
        this.headers = data.columns;
        this.columnsTypesInferred = data.__types__;

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
      .then(fulfilled => {
        this.data = fulfilled
      });
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
    return types;
  }

  getFile(selectFile) {

    let filePath: String;

    if (selectFile == 'Airports') {
      filePath = './src/data/airports.csv';
    }
    else if (selectFile == 'Stocks') {
      filePath = './src/data/stocks.csv';
    }
    else if (selectFile == 'Flights 300K') {
      filePath = './src/data/flights-3m.csv';
    }
    else if (selectFile == 'State of estate') {
      filePath = './src/data/SoE.csv';
    }
    else if (selectFile == 'Weather') {
      filePath = './src/data/seattle.csv';
    }
    else if (selectFile == 'RDF') {
      filePath = './src/data/rdf.csv';
    }
    this.data = datalib.csv({ url: filePath });
    return this.data;
  }

}
