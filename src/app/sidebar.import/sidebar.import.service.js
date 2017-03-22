"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var datalib = require('datalib');
var SidebarImportService = (function () {
    function SidebarImportService() {
    }
    SidebarImportService.prototype.getDataParsed = function (selectFile) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var data = _this.getFile(selectFile);
            _this.headers = data.columns;
            _this.columnsTypesInferred = data.__types__;
            resolve(data);
        });
        var dataParsed = function (data) {
            _this.types = _this.getTypesInferred();
            var arrayParsed = [];
            arrayParsed.push(_this.headers);
            for (var i = 0; i < data.length; i++) {
                var tempArray = [];
                for (var key in data[i]) {
                    tempArray.push(data[i][key]);
                }
                arrayParsed.push(tempArray);
                tempArray = [];
            }
            return Promise.resolve(arrayParsed);
        };
        promise
            .then(dataParsed)
            .then(function (fulfilled) {
            _this.data = fulfilled;
        });
    };
    SidebarImportService.prototype.getTypesInferred = function () {
        var types = [];
        var tempArray = [];
        for (var i = 0; i < this.headers.length; i++) {
            tempArray.push(i);
            tempArray.push(this.headers[i]);
            tempArray.push(this.columnsTypesInferred[this.headers[i]]);
            types.push(tempArray);
            tempArray = [];
        }
        return types;
    };
    SidebarImportService.prototype.getFile = function (selectFile) {
        var filePath;
        if (selectFile == 'Airports') {
            filePath = './src/data/airports.csv';
        }
        else if (selectFile == 'Stocks') {
            filePath = './src/data/stocks.csv';
        }
        else if (selectFile == 'Flights 300K') {
            filePath = './src/data/flights-3m.csv';
        }
        else if (selectFile == 'Weather') {
            filePath = './src/data/seattle.csv';
        }
        else if (selectFile == 'RDF') {
            filePath = './src/data/rdf.csv';
        }
        this.data = datalib.csv({ url: filePath });
        return this.data;
    };
    SidebarImportService = __decorate([
        core_1.Injectable()
    ], SidebarImportService);
    return SidebarImportService;
}());
exports.SidebarImportService = SidebarImportService;
