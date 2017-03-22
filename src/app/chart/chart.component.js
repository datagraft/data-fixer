"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var data_1 = require('./data');
var ChartComponent = (function () {
    function ChartComponent() {
        this.statsData = [];
        this.inferredType = false;
        // chart01 and chart02  
        this.view = [700, 400];
        this.view2 = [500, 400];
        // advanced pie chart02
        this.showLabels = true;
        this.explodeSlices = false;
        this.doughnut = true;
        // chart 04
        this.bordered = true;
        this.striped = false;
        this.colorScheme1 = {
            domain: ['#00A896', '#FF1654', '#F9BE02']
        };
        this.colorScheme2 = {
            domain: [
                '#003459',
                '#00171F',
                '#007EA7',
                '#F4A261',
                '#9BC1BC',
                '#00A8E8',
                '#F4F1BB',
                '#003459',
                '#00171F',
                '#007EA7',
                '#F4A261',
                '#9BC1BC',
                '#00A8E8',
                '#F4F1BB',
                '#003459',
                '#00171F',
                '#007EA7',
                '#F4A261',
                '#9BC1BC',
                '#00A8E8',
                '#F4F1BB',
                '#003459',
                '#00171F',
                '#007EA7',
                '#F4A261',
                '#9BC1BC',
                '#00A8E8',
                '#F4F1BB'
            ]
        };
        this.profileSubset = new Object();
        this.profileSubset.selection = 0;
        this.profileSubset.chart = 0;
        this.profileSubsetEmitter = new core_1.EventEmitter();
        Object.assign(this, { chart01_init: data_1.chart01_init, chart02_init: data_1.chart02_init });
    }
    ChartComponent.prototype.onSelect = function (event) {
        console.log(event);
        console.log(event.index);
    };
    ChartComponent.prototype.ngOnInit = function () {
        this.chartData01 = this.chart02_init;
        this.chartData02 = this.chart01_init;
        this.chartData03 = [0.75, 5.25, 5.5, 6, 6.2, 6.6, 6.80, 7.0, 7.2, 7.5, 7.5, 7.75, 8.15, 8.15, 8.65, 8.93, 9.2, 9.5, 10, 10.25, 11.5, 12, 16, 20.90, 22.3, 23.25];
        this.getChartOptions03();
        Plotly.newPlot('chart03', this.outliersData, this.outliersLayout, { displayModeBar: false });
        Plotly.redraw('chart03');
    };
    ChartComponent.prototype.refreshPlotly = function () {
        this.getChartOptions03();
        Plotly.newPlot('chart03', this.outliersData, this.outliersLayout, { displayModeBar: false });
        Plotly.redraw('chart03');
    };
    ChartComponent.prototype.getChartOptions03 = function () {
        this.outliersTrace = {
            y: this.chartData03,
            type: 'box',
            showlegend: true,
            hoverinfo: "all",
            fillcolor: '#2D2F33',
            jitter: 0.6,
            whiskerwidth: 0.6,
            marker: {
                opacity: 1,
                color: '#2D2F33',
                outliercolor: '#FF1654',
                line: {
                    color: '#151313',
                    outliercolor: '#FF1654',
                    outlierwidth: 2
                }
            },
            boxpoints: 'suspectedoutliers'
        };
        this.outliersData = [this.outliersTrace];
        this.outliersLayout = {
            paper_bgcolor: 'rgb(250,250,250)',
            plot_bgcolor: 'rgb(250,250,250)',
            margin: {
                t: 30,
                b: 0
            },
            yaxis: {
                showgrid: true,
                zerolinecolor: '#C4BBB8'
            }
        };
    };
    ChartComponent.prototype.chartSubsetEmit = function () {
        this.profileSubsetEmitter.emit(this.profileSubset);
    };
    // events chart01
    ChartComponent.prototype.chart01Clicked = function (event) {
        this.profileSubset.selection = event.name;
        this.profileSubset.chart = 1;
        this.chartSubsetEmit();
    };
    // events chart02
    ChartComponent.prototype.chart02Clicked = function (event) {
        if (event.name == 'Valid') {
            this.profileSubset.selection = 0;
        }
        else if (event.name == 'Invalid') {
            this.profileSubset.selection = 1;
        }
        else if (event.name == 'Outliers') {
            this.profileSubset.selection = 2;
        }
        this.profileSubset.chart = 2;
        this.chartSubsetEmit();
    };
    __decorate([
        core_1.Input()
    ], ChartComponent.prototype, "profileSubset", void 0);
    __decorate([
        core_1.Output()
    ], ChartComponent.prototype, "profileSubsetEmitter", void 0);
    __decorate([
        core_1.Input()
    ], ChartComponent.prototype, "statsData", void 0);
    __decorate([
        core_1.Input()
    ], ChartComponent.prototype, "chartData01", void 0);
    __decorate([
        core_1.Input()
    ], ChartComponent.prototype, "chartData02", void 0);
    __decorate([
        core_1.Input()
    ], ChartComponent.prototype, "chartData03", void 0);
    __decorate([
        core_1.Input()
    ], ChartComponent.prototype, "inferredType", void 0);
    ChartComponent = __decorate([
        core_1.Component({
            selector: 'chart',
            templateUrl: './chart.component.html',
            styleUrls: ['./chart.component.css']
        })
    ], ChartComponent);
    return ChartComponent;
}());
exports.ChartComponent = ChartComponent;
