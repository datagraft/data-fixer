import { Injectable } from '@angular/core';

@Injectable()
export class TransformationsService {

  constructor() { }

  emptyToZero(data, selectedColumn) {
    for (let i = 0; i < data.length; i++) {
      if (data[i][selectedColumn] == null) {
        data[i][selectedColumn] = 0;
      }
    }
  }

  upperCase(data, selectedColumn) {
    for (let i = 0; i < data.length; i++) {
        data[i][selectedColumn] = data[i][selectedColumn].toUpperCase();
    }
  }

  pad(data, selectedColumn, padParam) {
    for (let i = 0; i < data.length; i++) {
        let temp1 = data[i][selectedColumn].toString();
        let temp2 = "";        
        if (temp1.length < padParam) {
          for (let j = temp1.length; j < padParam; j++) {
            temp2 = temp1.concat("0");
          }
          data[i][selectedColumn] = parseFloat(temp2);                
        }
    }
  }

  convertToStandardFormat(data, selectedColumn) {
    for (let i = 0; i < data.length; i++) {
        if (data[i][selectedColumn] == "EID") {
          data[i][selectedColumn] = "HJEMMELSHAVER";
        }
        else if (data[i][selectedColumn] == "FESTET") {
          data[i][selectedColumn] = "FESTER";
        }
    }
  }

  reformatDates(data, selectedColumn) {
    for (let i = 0; i < data.length; i++) {
      if (data[i][selectedColumn] == null || data[i][selectedColumn].toString().length < 8) {
        data[i][selectedColumn] = "01.01.1753";
      }
      else {
        let temp = data[i][selectedColumn].toString();
        data[i][selectedColumn] = temp.slice(6).concat(".").concat(temp.slice(4, 6)).concat(".").concat(temp.slice(0, 4));
      }
    }
  }

  concatenateCadRef(data, columns, separation) {
    for (let i = 0; i < data.length; i++) {
      let concatenated = "";
      for (let j = 0; j < columns.length - 1; j++) { 
        concatenated = concatenated.concat(data[i][columns[j]]).concat(separation);
      }
      data[i].push(concatenated.concat(data[i][columns[columns.length - 1]]));
    }
  }

  concatenateCadRefId(data, columns) {
    for (let i = 0; i < data.length; i++) {
      let concatenated = "";
      for (let j = 0; j < columns.length - 1; j++) { 
        concatenated = concatenated.concat(data[i][columns[j]]);
      }
      data[i].push(concatenated.concat(data[i][columns[columns.length - 1]]));      
    }
  }

  replaceChar(data, selectedColumn) {
    for (let i = 0; i < data.length; i++) {
      if (data[i][selectedColumn].toString().includes(",")) {
        console.log('Replaced: ', data[i][selectedColumn]);
        data[i][selectedColumn] = parseFloat(data[i][selectedColumn].replace(",", "."));
      }
    }
  }

}