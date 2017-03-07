import { Injectable } from '@angular/core';

import * as datalib from 'datalib';

@Injectable()
export class ProfilingService {

  public data: any;
  public statData: any;
  public columnData = [];
  public profile: any;
  public columnSelected: any;
  public typesInferred: any;
  public typeInferred: any;
  public stdev: number;
  public outlierExample: any;

  constructor() {
    this.statData = [
      { stat: 'Count', value: 0 },
      { stat: 'Distinct', value: 0 },
      { stat: 'Quartile 1', value: 0 },
      { stat: 'Mean', value: 0 },
      { stat: 'Quartile 3', value: 0 },
      { stat: 'Std. deviation', value: 0 },
      { stat: 'Min', value: 0 },
      { stat: 'Max', value: 0 },
    ];
  }

  inferDataTypes(data) {
    return datalib.type.inferAll(data);
  }

  // returns data profile of selected column
  getProfile() {

    this.columnData = [];

    // returns table values of selected column
    const promise = new Promise(
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
      let min = datalib.min(data);
      let max = datalib.max(data);
      let mean = datalib.mean(data);
      this.stdev = datalib.stdev(data);
      let quartiles = datalib.quartile(data);

      let histogram_data = [];
      let chartLabels01 = [];

      // outlier detection
      let outliers = 0;
      let first_quartile = quartiles[0];
      let median = quartiles[1];
      let third_quartile = quartiles[2];
      let IQR_below = first_quartile - (1.5 * (third_quartile - first_quartile));
      let IQR_above = third_quartile + (1.5 * (third_quartile - first_quartile));

      for (let i = 0; i < data.length; i++) {
        if (data[i] < IQR_below || data[i] > IQR_above && data[i] != null) {
          this.outlierExample = data[i];
          outliers++;
          valid--;
        }
      }

      // histogram or distinct map
      if (distinct <= 13) {
        let distinctMap = datalib.count.map(data);
        let counter = 0;
        for (let key in distinctMap) {
          let obj = { name: "", value: 0, index: 0 };
          obj.name = key;
          obj.value = distinctMap[key];
          obj.index = counter;
          counter++;
          chartLabels01.push(key);
          histogram_data.push(obj);
        }
      }
      else if (distinct > 13) {
        let histogram = datalib.histogram(data);
        for (let i = 0; i < histogram.length; i++) {
          let obj = { name: "", value: 0, index: 0 };
          for (let key in histogram[i]) {
            if (key == 'count') {
              obj.value = histogram[i][key];
            }
            if (key == 'value') {
              obj.name = histogram[i][key];
              chartLabels01.push(histogram[i][key]);
            }
            obj.index = i;
          }
          histogram_data.push(obj);
        }
      }

      let validity_chartData = [];
      validity_chartData.push(valid);
      validity_chartData.push(missing);
      validity_chartData.push(outliers);

      let chartLabels02 = ['Valid', 'Invalid', 'Outliers'];

      let validity_data = [];
      for (let i = 0; i < 3; i++) {
        let obj1 = { name: "", value: 0, index: 0 };
        obj1.name = chartLabels02[i];
        obj1.value = validity_chartData[i];
        obj1.index = i;
        validity_data.push(obj1);
      }

      let tempArray = [];

      tempArray.push(quartiles[0]);
      tempArray.push(quartiles[1]);
      tempArray.push(quartiles[2]);
      tempArray.push(this.stdev);

      let obj2 = { data: [] };
      obj2.data = tempArray;
      let chartData_03 = [];
      chartData_03.push(obj2);

      this.statData[0].value = countTotal;
      this.statData[1].value = distinct;
      this.statData[2].value = Math.round(first_quartile);
      this.statData[3].value = Math.round(mean);
      this.statData[4].value = Math.round(third_quartile);
      this.statData[5].value = Math.round(this.stdev);
      this.statData[6].value = Math.round(min);
      this.statData[7].value = Math.round(max);

      profile.push(countTotal);
      profile.push(distinct);
      profile.push(histogram_data);
      profile.push(validity_data);
      profile.push(chartData_03);
      profile.push(chartLabels01);
      profile.push(chartLabels02);

      return Promise.resolve(profile);
    };

    promise
      .then(profileSummary)
      .then(fulfilled => {
        this.profile = fulfilled
      });
  }

  // returns count
  getCount(data) {
    return datalib.count(data);
  }

  // returns count of distinct values
  getDistint() {
    return datalib.distinct();
  }

  // returns count of valid values
  getValid() {

  }

  // returns count of invalid values
  getInvalid() {

  }

  // returns count of empty values
  getEmpty() {

  }

  // returns table values of selected column
  getColumnData() {

    this.typesInferred = datalib.type.inferAll(this.data);

    for (let i = 0; i < this.data.length; i++) {
      this.columnData.push(this.data[i][this.columnSelected]);
    }
    return this.columnData;
  }

  getRowStartEnd(data, chartType, chartSelection, chartLabels) {
    let rowStart = 0;
    let rowEnd = 0;
    let check = true;
    let chartSubset: any;

    if (chartType == 1) {
      chartSubset = chartSelection;
    }
    else if (chartType == 2) {
      if (chartSelection == 0) {
        chartSubset = "-";
        console.log('Not implemented yet');
      }
      else if (chartSelection == 1) {
        chartSubset = null;
      }
      else if (chartSelection == 2) {
        chartSubset = this.outlierExample;
      }
    }

    for (let i = 0; i < data.length; i++) {
      if (check) {
        if (data[i][this.columnSelected] == chartSubset) {
          rowStart = i;
          rowEnd = i;
          check = false;
        }
      }
    }
    for (let i = rowEnd; i < data.length; i++) {
      if (data[i][this.columnSelected] == chartSubset) {
        rowEnd += 1;
      }
    }

    let tempArray = [];
    tempArray.push(rowStart, rowEnd - 1);
    return tempArray;
  }

}
