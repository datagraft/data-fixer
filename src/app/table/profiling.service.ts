import { Injectable } from '@angular/core';

import * as datalib from 'datalib';

@Injectable()
export class ProfilingService {

  constructor() { }

  data: any;
  columnData = [];
  profile: any;
  columnSelected: any;

  getProfile() {

    this.columnData = [];

    const promise = new Promise (
      (resolve, reject) => {
        const data = this.getColumnData();
        resolve(data);        
      }
    );

    const profileSummary = function (data) {

      let profile = [];

      let countTotal = datalib.count(data);
      profile.push(countTotal);
      let distinct = datalib.count.distinct(data);
      profile.push(distinct);
      let histogram = datalib.histogram(data);

      let count = [];
      let distinctValues = [];

      for (let i = 0; i < histogram.length; i++) {    
          for (let key in histogram[i]) {
            if (key == 'count') {
            count.push(histogram[i][key]);
            }        
            if (key == 'value') {
            distinctValues.push(histogram[i][key]);
            }             
          }
      }

      profile.push(count);
      profile.push(distinctValues);       
      console.log(profile);

      return Promise.resolve(profile);
    };

    promise
          .then(profileSummary)
          .then(fulfilled => {this.profile = fulfilled});
    }

  getCount (data) {
    return datalib.count(data);
  }

  getDistint () {
    return datalib.distinct();
  }

  getDuplicate () {
    
  }

  getValid () {
    
  }

  getInvalid () {
    
  }

  getEmpty () {
    
  }

  getColumnData () {

    for (let i = 0; i < this.data.length; i++) {
      this.columnData.push(this.data[i][this.columnSelected]);
    }
    return this.columnData;

  }


}
