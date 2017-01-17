import { Injectable } from '@angular/core';

import * as datalib from 'datalib';
import * as stats from 'stats-analysis';

@Injectable()
export class ProfilingService {

  constructor() { }

  data: any;
  columnData = [];
  profile: any;
  columnSelected: any;
  typesInferred: any;

  // returns data profile of selected column
  getProfile() {

    this.columnData = [];

    // returns table values of selected column
    const promise = new Promise (
      (resolve, reject) => {
        const data = this.getColumnData();
        resolve(data);        
      }
    );

    // generates data profile: count, distinct, histogram, valid, invalid and empty
    const profileSummary = function (data) {

      let profile = [];

      let countTotal = datalib.count(data);
      let distinct = datalib.count.distinct(data);
      let histogram = datalib.histogram(data);
      let valid = datalib.count.valid(data);
      let missing = datalib.count.missing(data);
      let min = datalib.min(data);
      let max = datalib.max(data);
      let mean = datalib.mean(data);
      let stdev = datalib.stdev(data);                  

      let outliers = stats.indexOfOutliers(data, 100);

      let histogram_chartData = [];
      let histogram_chartLabels = [];

      console.log('Histogram selected column: ', histogram);

      for (let i = 0; i < histogram.length; i++) {    
          for (let key in histogram[i]) {
            if (key == 'count') {
            histogram_chartData.push(histogram[i][key]);
            }        
            if (key == 'value') {
            histogram_chartLabels.push(histogram[i][key]);
            }             
          }
      }

      let validity_chartData = [];
      validity_chartData.push(valid);
      validity_chartData.push(missing);            
      
      let validity_chartLabels = ['Valid', 'Missing'];

      let tempArray = [];
      tempArray.push(outliers.length);
      tempArray.push(min);    
      tempArray.push(max);      
      tempArray.push(mean);      
      tempArray.push(stdev);

      let obj = {data: []};
      obj.data = tempArray;
      let chartData_03 = [];
      chartData_03.push(obj);      

      profile.push(countTotal);
      profile.push(distinct);      
      profile.push(histogram_chartData);
      profile.push(histogram_chartLabels);
      profile.push(validity_chartData);
      profile.push(validity_chartLabels);
      profile.push(chartData_03);      
      
      console.log('Data profile selected column: ', profile);   

      return Promise.resolve(profile);
    };

    promise
          .then(profileSummary)
          .then(fulfilled => {this.profile = fulfilled});
    }

  // returns count
  getCount (data) {
    return datalib.count(data);
  }

  // returns count of distinct values
  getDistint () {
    return datalib.distinct();
  }

  // returns count of valid values
  getValid () {
    
  }

  // returns count of invalid values
  getInvalid () {
    
  }

  // returns count of empty values
  getEmpty () {
    
  }

  // returns table values of selected column
  getColumnData () {

    this.typesInferred = datalib.type.inferAll(this.data);
    console.log('Inferred types: ', this.typesInferred);

    for (let i = 0; i < this.data.length; i++) {
      this.columnData.push(this.data[i][this.columnSelected]);
    }
    return this.columnData;

  }


}
