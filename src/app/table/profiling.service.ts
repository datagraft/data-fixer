import { Injectable } from '@angular/core';

import * as datalib from 'datalib';

@Injectable()
export class ProfilingService {

  constructor() { }

  data: any;
  columnData = [];
  profile: any;
  columnSelected: any;
  typesInferred: any;
  typeInferred: any;
  stdev: number;

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
    const profileSummary = (data) => {

      this.typeInferred = this.typesInferred[this.columnSelected];

      let profile = [];

      let countTotal = datalib.count(data);
      let distinct = datalib.count.distinct(data);
      let valid = datalib.count.valid(data);
      let missing = datalib.count.missing(data);
      // let min = datalib.min(data);
      // let max = datalib.max(data);
      let mean = datalib.mean(data);
      this.stdev = datalib.stdev(data);
      let quartiles = datalib.quartile(data);                  

      let histogram_chartData = [];
      let histogram_chartLabels = [];

      // outlier detection
      let outliers = 0;
      let first_quartile = quartiles[0];
      let median = quartiles[1];
      let third_quartile = quartiles[2];
      let IQR_below = first_quartile - (1.5 * (third_quartile - first_quartile));
      console.log('IQR below: ', IQR_below);
      let IQR_above = third_quartile + (1.5 * (third_quartile - first_quartile));
      console.log('IQR above: ', IQR_above);            

      for (let i = 0; i < data.length; i++) {
        if (data[i] < IQR_below || data[i] > IQR_above && data[i] != null) {
          outliers++;
          valid--;
        }
      }      

      // histogram or distinct map
      if (distinct <= 13) {
        let distinctMap = datalib.count.map(data);        
        for (let key in distinctMap) {
          histogram_chartData.push(distinctMap[key]);
          histogram_chartLabels.push(key);
        }
      }
      else if (distinct > 13) {
      let histogram = datalib.histogram(data);
      console.log('Histogram: ', histogram);      
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
      }

      let validity_chartData = [];
      validity_chartData.push(valid);
      validity_chartData.push(missing);
      validity_chartData.push(outliers);                              
      
      let validity_chartLabels = ['Valid', 'Invalid', 'Outliers'];

      let tempArray = [];

      tempArray.push(quartiles[0]);
      tempArray.push(quartiles[1]);
      tempArray.push(quartiles[2]);
      tempArray.push(this.stdev);      
      // tempArray.push(min);    
      // tempArray.push(max);      
      let obj = {data: []};
      obj.data = tempArray;
      let chartData_03 = [];
      chartData_03.push(obj);      

      profile.push(countTotal);
      console.log('Count: ', countTotal);      
      profile.push(distinct);
      console.log('Distinct: ', distinct);
      profile.push(histogram_chartData);
      console.log('Histogram data: ', histogram_chartData);  
      profile.push(histogram_chartLabels);
      console.log('Histogram labels: ', histogram_chartLabels);
      profile.push(validity_chartData);
      console.log('Validity data: ', validity_chartData);
      profile.push(validity_chartLabels);
      console.log('Validity labels: ', validity_chartLabels);
      profile.push(chartData_03);  
      console.log('Stats numeric values: ', tempArray);
      console.log('Quartiles: ', quartiles);                                  
      
      // console.log('Data profile selected column: ', profile);
      console.log('Types: ', this.typesInferred);   

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
    // console.log('Inferred types: ', this.typesInferred);

    for (let i = 0; i < this.data.length; i++) {
      this.columnData.push(this.data[i][this.columnSelected]);
    }
    return this.columnData;

  }


}
