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

  

}
