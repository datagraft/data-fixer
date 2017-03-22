"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var TransformationsService = (function () {
    function TransformationsService() {
    }
    TransformationsService.prototype.emptyToZero = function (data, selectedColumn, param_1) {
        for (var i = 0; i < data.length; i++) {
            if (data[i][selectedColumn] == null) {
                data[i][selectedColumn] = param_1;
            }
        }
    };
    TransformationsService.prototype.upperCase = function (data, selectedColumn) {
        for (var i = 0; i < data.length; i++) {
            data[i][selectedColumn] = data[i][selectedColumn].toUpperCase();
        }
    };
    TransformationsService.prototype.pad = function (data, selectedColumn, param_1, param_2) {
        for (var i = 0; i < data.length; i++) {
            var temp1 = data[i][selectedColumn].toString();
            var temp2 = "";
            if (temp1.length < param_2) {
                for (var j = temp1.length; j < param_2; j++) {
                    temp2 = temp1.concat(param_1.toString());
                }
                data[i][selectedColumn] = parseFloat(temp2);
            }
        }
    };
    TransformationsService.prototype.convertToStandardFormat = function (data, selectedColumn) {
        for (var i = 0; i < data.length; i++) {
            if (data[i][selectedColumn] == "EID") {
                data[i][selectedColumn] = "HJEMMELSHAVER";
            }
            else if (data[i][selectedColumn] == "FESTET") {
                data[i][selectedColumn] = "FESTER";
            }
        }
    };
    TransformationsService.prototype.reformatDates = function (data, selectedColumn) {
        for (var i = 0; i < data.length; i++) {
            if (data[i][selectedColumn] == null || data[i][selectedColumn].toString().length < 8) {
                data[i][selectedColumn] = "01.01.1753";
            }
            else {
                var temp = data[i][selectedColumn].toString();
                data[i][selectedColumn] = temp.slice(6).concat(".").concat(temp.slice(4, 6)).concat(".").concat(temp.slice(0, 4));
            }
        }
    };
    TransformationsService.prototype.concatenateCadRef = function (data, columns, separation) {
        for (var i = 0; i < data.length; i++) {
            var concatenated = "";
            for (var j = 0; j < columns.length - 1; j++) {
                concatenated = concatenated.concat(data[i][columns[j]]).concat(separation);
            }
            data[i].push(concatenated.concat(data[i][columns[columns.length - 1]]));
        }
    };
    TransformationsService.prototype.concatenateCadRefId = function (data, columns) {
        for (var i = 0; i < data.length; i++) {
            var concatenated = "";
            for (var j = 0; j < columns.length - 1; j++) {
                concatenated = concatenated.concat(data[i][columns[j]]);
            }
            data[i].push(concatenated.concat(data[i][columns[columns.length - 1]]));
        }
    };
    TransformationsService.prototype.replaceChar = function (data, selectedColumn) {
        for (var i = 0; i < data.length; i++) {
            if (data[i][selectedColumn].toString().includes(",")) {
                data[i][selectedColumn] = parseFloat(data[i][selectedColumn].replace(",", "."));
            }
        }
    };
    TransformationsService = __decorate([
        core_1.Injectable()
    ], TransformationsService);
    return TransformationsService;
}());
exports.TransformationsService = TransformationsService;
