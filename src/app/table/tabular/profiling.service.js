"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var datalib = require('datalib');
var ProfilingService = (function () {
    function ProfilingService() {
        this.columnData = [];
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
    ProfilingService.prototype.inferDataTypes = function (data) {
        return datalib.type.inferAll(data);
    };
    // returns data profile of selected column
    ProfilingService.prototype.getProfile = function () {
        var _this = this;
        this.columnData = [];
        // returns table values of selected column
        var promise = new Promise(function (resolve, reject) {
            var data = _this.getColumnData();
            resolve(data);
        });
        // generates data profile: count, distinct, histogram, valid, invalid and empty
        var profileSummary = function (data) {
            _this.typeInferred = _this.typesInferred[_this.columnSelected];
            var profile = [];
            var countTotal = datalib.count(data);
            var distinct = datalib.count.distinct(data);
            var valid = datalib.count.valid(data);
            var missing = datalib.count.missing(data);
            var min = datalib.min(data);
            var max = datalib.max(data);
            var mean = datalib.mean(data);
            _this.stdev = datalib.stdev(data);
            var quartiles = datalib.quartile(data);
            var histogram_data = [];
            var chartLabels01 = [];
            // outlier detection
            var outliers = 0;
            var first_quartile = quartiles[0];
            var median = quartiles[1];
            var third_quartile = quartiles[2];
            var IQR_below = first_quartile - (1.5 * (third_quartile - first_quartile));
            var IQR_above = third_quartile + (1.5 * (third_quartile - first_quartile));
            for (var i = 0; i < data.length; i++) {
                if (data[i] < IQR_below || data[i] > IQR_above && data[i] != null) {
                    _this.outlierExample = data[i];
                    outliers++;
                    valid--;
                }
            }
            // histogram or distinct map
            if (distinct <= 13) {
                var distinctMap = datalib.count.map(data);
                var counter = 0;
                for (var key in distinctMap) {
                    var obj = { name: "", value: 0, index: 0 };
                    obj.name = key;
                    obj.value = distinctMap[key];
                    obj.index = counter;
                    counter++;
                    chartLabels01.push(key);
                    histogram_data.push(obj);
                }
            }
            else if (distinct > 13) {
                var histogram = datalib.histogram(data);
                for (var i = 0; i < histogram.length; i++) {
                    var obj = { name: "", value: 0, index: 0 };
                    for (var key in histogram[i]) {
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
            var validity_chartData = [];
            validity_chartData.push(valid);
            validity_chartData.push(missing);
            validity_chartData.push(outliers);
            var chartLabels02 = ['Valid', 'Invalid', 'Outliers'];
            var validity_data = [];
            for (var i = 0; i < 3; i++) {
                var obj1 = { name: "", value: 0, index: 0 };
                obj1.name = chartLabels02[i];
                obj1.value = validity_chartData[i];
                obj1.index = i;
                validity_data.push(obj1);
            }
            var tempArray = [];
            tempArray.push(quartiles[0]);
            tempArray.push(quartiles[1]);
            tempArray.push(quartiles[2]);
            tempArray.push(_this.stdev);
            var obj2 = { data: [] };
            obj2.data = tempArray;
            var chartData_03 = [];
            chartData_03.push(obj2);
            _this.statData[0].value = countTotal;
            _this.statData[1].value = distinct;
            _this.statData[2].value = Math.round(first_quartile);
            _this.statData[3].value = Math.round(mean);
            _this.statData[4].value = Math.round(third_quartile);
            _this.statData[5].value = Math.round(_this.stdev);
            _this.statData[6].value = Math.round(min);
            _this.statData[7].value = Math.round(max);
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
            .then(function (fulfilled) {
            _this.profile = fulfilled;
        });
    };
    // returns count
    ProfilingService.prototype.getCount = function (data) {
        return datalib.count(data);
    };
    // returns count of distinct values
    ProfilingService.prototype.getDistint = function () {
        return datalib.distinct();
    };
    // returns count of valid values
    ProfilingService.prototype.getValid = function () {
    };
    // returns count of invalid values
    ProfilingService.prototype.getInvalid = function () {
    };
    // returns count of empty values
    ProfilingService.prototype.getEmpty = function () {
    };
    // returns table values of selected column
    ProfilingService.prototype.getColumnData = function () {
        this.typesInferred = datalib.type.inferAll(this.data);
        for (var i = 0; i < this.data.length; i++) {
            this.columnData.push(this.data[i][this.columnSelected]);
        }
        return this.columnData;
    };
    ProfilingService.prototype.getRowStartEnd = function (data, chartType, chartSelection, chartLabels) {
        var rowStart = 0;
        var rowEnd = 0;
        var check = true;
        var chartSubset;
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
        for (var i = 0; i < data.length; i++) {
            if (check) {
                if (data[i][this.columnSelected] == chartSubset) {
                    rowStart = i;
                    rowEnd = i;
                    check = false;
                }
            }
        }
        for (var i = rowEnd; i < data.length; i++) {
            if (data[i][this.columnSelected] == chartSubset) {
                rowEnd += 1;
            }
        }
        var tempArray = [];
        tempArray.push(rowStart, rowEnd - 1);
        return tempArray;
    };
    ProfilingService = __decorate([
        core_1.Injectable()
    ], ProfilingService);
    return ProfilingService;
}());
exports.ProfilingService = ProfilingService;
