"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var chart_component_1 = require('../../chart/chart.component');
var rdf_component_1 = require('../rdf/rdf.component');
var shared_service_1 = require('../shared.service');
var profiling_service_1 = require('./profiling.service');
var transformations_service_1 = require('./transformations.service');
var TabularComponent = (function () {
    function TabularComponent(chartComponent, rdfComponent, sharedTableService, profilingService, transformationsService) {
        this.chartComponent = chartComponent;
        this.rdfComponent = rdfComponent;
        this.sharedTableService = sharedTableService;
        this.profilingService = profilingService;
        this.transformationsService = transformationsService;
        // tabular mode/ rdf mode
        this.tabularMode = true;
        this.statsData = [];
        // init table
        var initialize = [];
        for (var i = 0; i <= 18; i++) {
            initialize.push(["-", "-", "-", "-", "-"]);
        }
        this.data = initialize;
        // init profiling object
        this.profileSubset = new Object();
        this.profileSubset.selection = 0;
        this.profileSubset.chart = 0;
        this.inferredType = true;
        this.profileSubsetEmitter = new core_1.EventEmitter();
        this.tableSelectedEmitter = new core_1.EventEmitter();
    }
    TabularComponent.prototype.getEmittedRDFdata = function (value) {
        this.data = value;
        this.hot.render();
    };
    TabularComponent.prototype.tabMode = function () {
        this.hot.alter('remove_row', 0);
        this.hot.updateSettings(this.updateSettings(460, this.headers));
        this.hot.render();
    };
    TabularComponent.prototype.rdfMode = function () {
        this.rdfComponent.hot = this.hot;
        this.rdfComponent.data = this.data;
        this.rdfComponent.headers = this.headers;
        this.inferredTypes = this.profilingService.inferDataTypes(this.data);
        this.rdfComponent.inferredTypes = this.inferredTypes;
        this.rdfComponent.init();
    };
    TabularComponent.prototype.updateSettings = function (height, headers) {
        return {
            height: height,
            colHeaders: headers
        };
    };
    TabularComponent.prototype.ngOnInit = function () {
        var _this = this;
        var container = document.getElementById('tabular');
        this.settings = {
            data: this.data,
            rowHeaders: false,
            colHeaders: true,
            columnSorting: false,
            viewportColumnRenderingOffset: 40,
            contextMenu: {
                callback: function (key, options) {
                    if (key === 'row_above' || 'row_below' || 'remove_col' || 'remove_row' || 'col_left' || 'col_right' || 'undo' || 'redo' || 'zero') {
                        _this.refresh();
                    }
                    ;
                    if (key === "zero") {
                        _this.emptyToZero(0);
                    }
                    ;
                },
                items: {
                    "row_above": {},
                    "row_below": {},
                    "remove_col": {},
                    "remove_row": {},
                    "col_left": {},
                    "col_right": {},
                    "zero": { name: 'Empty cells to zero' },
                    "undo": {},
                    "redo": {}
                },
            },
            height: 460,
            stretchH: 'all',
            className: 'htCenter htMiddle',
            afterSelection: function (r, c, r2, c2) {
                _this.refresh();
            }
        };
        this.hot = new Handsontable(container, this.settings);
        this.statsData = this.statsDataInit();
    };
    TabularComponent.prototype.onProfileSubsetEmitted = function (value) {
        this.profileSubset = value;
        this.profileSubsetEmitter.emit(this.profileSubset);
        this.selectCell();
    };
    TabularComponent.prototype.onTableSelectedEmitted = function () {
        this.tableSelectedEmitter.emit('Table selection emitted to app component');
    };
    TabularComponent.prototype.statsDataInit = function () {
        return [
            { stat: 'Count', value: 0 },
            { stat: 'Distinct', value: 0 },
            { stat: 'Quartile 1', value: 0 },
            { stat: 'Mean', value: 0 },
            { stat: 'Quartile 3', value: 0 },
            { stat: 'Std. deviation', value: 0 },
            { stat: 'Min', value: 0 },
            { stat: 'Max', value: 0 },
        ];
    };
    TabularComponent.prototype.refresh = function () {
        this.profilingService.data = this.data;
        this.selected = this.hot.getSelected();
        this.profilingService.columnSelected = this.selected[1];
        this.refreshChartData();
    };
    TabularComponent.prototype.refreshChartData = function () {
        var _this = this;
        this.profilingService.getProfile();
        this.hot.render();
        setTimeout(function () {
            _this.chartData01 = _this.profilingService.profile[2];
            _this.chartLabels01 = _this.profilingService.profile[3];
            _this.chartData02 = _this.profilingService.profile[3];
            _this.chartLabels02 = _this.profilingService.profile[5];
            _this.type = _this.profilingService.typeInferred;
            if (_this.profilingService.typeInferred == "string" || _this.profilingService.typeInferred == "date" || _this.profilingService.stdev == 0) {
                _this.inferredType = false;
            }
            else {
                _this.inferredType = true;
                _this.chartComponent.chartData03 = _this.profilingService.columnData;
                _this.chartComponent.refreshPlotly();
            }
            _this.onTableSelectedEmitted();
            _this.refreshStats();
        }, 300);
    };
    ;
    TabularComponent.prototype.refreshStats = function () {
        var _this = this;
        this.statsData = this.statsDataInit();
        setTimeout(function () {
            _this.statsData = _this.profilingService.statData;
        }, 10);
    };
    TabularComponent.prototype.headersUpdate = function (headers) {
        this.hot.updateSettings({
            colHeaders: headers
        });
        this.data.shift();
        this.hot.render();
    };
    TabularComponent.prototype.replaceChar = function () {
        this.transformationsService.replaceChar(this.data, this.selected[1]);
        this.refreshChartData();
    };
    TabularComponent.prototype.emptyToZero = function (param_1) {
        this.transformationsService.emptyToZero(this.data, this.selected[1], param_1);
        this.refreshChartData();
    };
    TabularComponent.prototype.upperCase = function () {
        this.transformationsService.upperCase(this.data, this.selected[1]);
        this.refreshChartData();
    };
    TabularComponent.prototype.pad = function (param_1, param_2) {
        this.transformationsService.pad(this.data, this.selected[1], param_1, param_2);
        this.refreshChartData();
    };
    TabularComponent.prototype.convertToStandardFormat = function () {
        this.transformationsService.convertToStandardFormat(this.data, this.selected[1]);
        this.refreshChartData();
    };
    TabularComponent.prototype.reformatDates = function () {
        this.transformationsService.reformatDates(this.data, this.selected[1]);
        this.refreshChartData();
    };
    TabularComponent.prototype.concatenateCadRef = function () {
        var columns01 = [11, 12, 13, 14, 15];
        var separation = "/";
        this.transformationsService.concatenateCadRef(this.data, columns01, separation);
        this.refreshChartData();
        this.headers.push("cad-ref");
        this.headersUpdate(this.headers);
    };
    TabularComponent.prototype.concatenateCadRefId = function () {
        var columns01 = [11, 12, 13, 14, 15];
        this.transformationsService.concatenateCadRefId(this.data, columns01);
        this.refreshChartData();
        this.headers.push("cad-ref-id");
        this.headersUpdate(this.headers);
    };
    TabularComponent.prototype.concatenateRrId = function () {
        var columns02 = [11, 12, 13, 14, 15];
        this.transformationsService.concatenateCadRefId(this.data, columns02);
        this.refreshChartData();
        this.headers.push("cad-ref-id");
        this.headersUpdate(this.headers);
    };
    TabularComponent.prototype.concatenateRrIdB = function () {
        var columns03 = [11, 12, 13, 14, 15];
        this.transformationsService.concatenateCadRefId(this.data, columns03);
        this.refreshChartData();
        this.headers.push("cad-ref-id");
        this.headersUpdate(this.headers);
    };
    TabularComponent.prototype.selectChartLabels = function (chartID) {
        var chartLabels;
        if (chartID == 1) {
            chartLabels = this.chartLabels01;
        }
        else if (chartID == 2) {
            chartLabels = this.chartLabels02;
        }
        return chartLabels;
    };
    TabularComponent.prototype.selectCell = function () {
        var rowStartEnd = this.profilingService.getRowStartEnd(this.data, this.profileSubset.chart, this.profileSubset.selection, this.selectChartLabels(this.profileSubset.chart));
        this.hot.selectCell(rowStartEnd[0], this.selected[1], rowStartEnd[1], this.selected[1]);
    };
    __decorate([
        core_1.Input()
    ], TabularComponent.prototype, "profileSubset", void 0);
    __decorate([
        core_1.Output()
    ], TabularComponent.prototype, "profileSubsetEmitter", void 0);
    __decorate([
        core_1.Output()
    ], TabularComponent.prototype, "tableSelectedEmitter", void 0);
    TabularComponent = __decorate([
        core_1.Component({
            selector: 'tabular',
            templateUrl: './tabular.component.html',
            styleUrls: ['./tabular.component.css'],
            providers: [chart_component_1.ChartComponent, rdf_component_1.RdfComponent, shared_service_1.SharedTableService, profiling_service_1.ProfilingService, transformations_service_1.TransformationsService]
        })
    ], TabularComponent);
    return TabularComponent;
}());
exports.TabularComponent = TabularComponent;
