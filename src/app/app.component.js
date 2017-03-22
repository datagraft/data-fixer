"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var tabular_component_1 = require('./table/tabular/tabular.component');
var rdf_component_1 = require('./table/rdf/rdf.component');
var sidebar_import_component_1 = require('./sidebar.import/sidebar.import.component');
var sidebar_component_1 = require('./sidebar/sidebar.component');
var chart_component_1 = require('./chart/chart.component');
var steps_component_1 = require('./steps/steps.component');
var shared_service_1 = require('./shared.service');
var sidebar_import_service_1 = require('./sidebar.import/sidebar.import.service');
var sidebar_service_1 = require('./sidebar/sidebar.service');
var profiling_service_1 = require('./table/tabular/profiling.service');
var transformations_service_1 = require('./table/tabular/transformations.service');
var shared_service_2 = require('./table/shared.service');
var rdf_service_1 = require('./table/rdf/rdf.service');
var AppComponent = (function () {
    function AppComponent(sharedService, sidebarImportService, sidebarService, sharedTableService) {
        var _this = this;
        this.sharedService = sharedService;
        this.sidebarImportService = sidebarImportService;
        this.sidebarService = sidebarService;
        this.sharedTableService = sharedTableService;
        this.tabularMode = true;
        this.rdfMode = false;
        this.activated = "active nav-link";
        this.deactivated = "nav-link";
        this.open0 = true;
        this.open1 = true;
        this.open2 = false;
        this.display = false;
        this.getTypeInference = function () {
            return _this.sidebarImportService.columnsTypesInferred;
        };
    }
    AppComponent.prototype.ngOnInit = function () {
        this.profileSubset = new Object();
        this.profileSubset.selection = 0;
        this.profileSubset.chart = 0;
        this.stepSequence = this.sharedService.initialiseStepSequence();
        this.linkTabular = this.activated;
        this.linkRDF = this.deactivated;
    };
    AppComponent.prototype.setTabularMode = function () {
        this.setViewMode(true, this.activated, this.deactivated);
        //remove 3 rows used to annotate table
        if (!this.tabularComponent.tabularMode) {
            this.tabularComponent.hot.alter('remove_row', 0);
            this.tabularComponent.hot.alter('remove_row', 0);
            this.tabularComponent.hot.alter('remove_row', 0);
            this.tabularComponent.hot.alter('remove_row', 0);
            this.tabularComponent.hot.alter('remove_row', 0);
        }
        this.tabularComponent.tabularMode = true;
        this.tabularComponent.tabMode();
    };
    AppComponent.prototype.setRdfMode = function () {
        //because 'false' as first parameter we can show different sidebar, in fact we check the value of tabularMode
        this.setViewMode(false, this.deactivated, this.activated);
        //only if i come from Tabular mode add 3 rows (the annotation rows)
        if (this.tabularComponent.tabularMode) {
            this.tabularComponent.hot.alter('insert_row', 0);
            this.tabularComponent.hot.alter('insert_row', 0);
            this.tabularComponent.hot.alter('insert_row', 0);
            this.tabularComponent.hot.alter('insert_row', 0);
            this.tabularComponent.hot.alter('insert_row', 0);
        }
        this.tabularComponent.tabularMode = false;
        this.tabularComponent.rdfMode();
    };
    AppComponent.prototype.setViewMode = function (tabularMode, tabularStatus, rdfStatus) {
        this.linkTabular = tabularStatus;
        this.linkRDF = rdfStatus;
        this.tabularMode = tabularMode;
    };
    AppComponent.prototype.setDisplay = function () {
        var _this = this;
        this.display = true;
        setTimeout(function () {
            _this.display = false;
        }, 4000);
    };
    AppComponent.prototype.onProfileSubsetEmitted = function (value) {
        this.profileSubset = value;
    };
    AppComponent.prototype.onTableSelectedEmitted = function (value) {
        this.getRuleBasedSelectionData();
    };
    AppComponent.prototype.onStepsEmitted = function (value) {
        this.stepSequence = value;
        this.applyTransformation(true, this.stepsComponent.stepSelected);
    };
    AppComponent.prototype.getDataRaw = function () {
        var _this = this;
        this.sidebarImportComponent.getDataFromFile();
        setTimeout(function () {
            _this.getDataParsed();
        }, 500);
    };
    ;
    AppComponent.prototype.getDataParsed = function () {
        this.dataParsed = this.sidebarImportComponent.getData();
        this.tabularComponent.data = this.dataParsed;
        this.tabularComponent.headers = this.sidebarImportComponent.headers;
        this.tabularComponent.hot.loadData(this.tabularComponent.data);
        this.stepSequence = this.sharedService.initialiseStepSequence();
        this.stepsComponent.stepsCounter = 1;
        // deep copy of dataParsed to keep original dataset in dataParsedRaw
        this.dataParsedRaw = [];
        for (var i = 0; i < this.dataParsed.length; i++) {
            this.dataParsedRaw.push(this.dataParsed[i].slice(0));
        }
    };
    AppComponent.prototype.applyTransformation = function (recreateSteps, stepsIndex) {
        if (recreateSteps) {
            this.tabularComponent.hot.loadData(this.stepSequence[stepsIndex - 1].data);
            this.tabularComponent.data = this.stepSequence[stepsIndex - 1].data;
            this.tabularComponent.hot.render();
            this.tabularComponent.headersUpdate(this.stepSequence[stepsIndex - 1].headers);
            this.stepsComponent.stepsCounter = stepsIndex + 1;
            this.stepSequence = this.stepSequence.slice(0, stepsIndex);
            for (var i = stepsIndex; i < 5; i++) {
                this.stepSequence.push({ transformation: 0, step: 0, title: '-', data: [] });
            }
        }
        else {
            this.transformations(this.sidebarComponent.transformationSelected);
        }
        this.sidebarComponent.transformationSelected = null;
    };
    AppComponent.prototype.datasetDeepCopy = function () {
        var deepCopy = [];
        for (var i = 0; i < this.dataParsed.length; i++) {
            deepCopy.push(this.dataParsed[i].slice(0));
        }
        return deepCopy;
    };
    AppComponent.prototype.getRuleBasedSelectionData = function () {
        var _selected = this.tabularComponent.selected;
        var _type = this.tabularComponent.type;
        var type;
        var selected;
        var allowedTransformations = [];
        var matrix = this.sharedService.getRulesMatrix();
        if (_type == 'string') {
            type = 0;
        }
        else if (_type == 'number' || 'integer') {
            type = 1;
        }
        else if (_type == 'date') {
            type = 2;
        }
        if (_selected[0] == 0) {
            selected = 3;
        }
        else {
            selected = 4;
        }
        for (var i = 0; i < matrix.length; i++) {
            if (matrix[i][type] && matrix[i][selected]) {
                allowedTransformations.push(i);
            }
        }
        var tempArray = [];
        for (var i = 0; i < allowedTransformations.length; i++) {
            tempArray.push(this.sidebarComponent.transformationsEnumerated[allowedTransformations[i]]);
        }
        this.sidebarComponent.transformations = tempArray;
    };
    AppComponent.prototype.transformations = function (id) {
        switch (id) {
            case 0:
                console.log('Not yet implemented');
                break;
            case 1:
                console.log('Not yet implemented');
                break;
            case 2:
                console.log('Not yet implemented');
                break;
            case 3:
                console.log('Not yet implemented');
                break;
            case 4:
                console.log('Not yet implemented');
                break;
            case 5:
                console.log('Not yet implemented');
                break;
            case 6:
                this.tabularComponent.replaceChar();
                this.stepsComponent.transformationTitle = 'Characters replaced';
                break;
            case 7:
                this.tabularComponent.headersUpdate(this.tabularComponent.headers);
                this.stepsComponent.transformationTitle = 'First row set as header';
                break;
            case 8:
                this.tabularComponent.emptyToZero(this.sidebarComponent.input_1);
                this.stepsComponent.transformationTitle = 'Empty cells filled';
                break;
            case 9:
                this.tabularComponent.upperCase();
                this.stepsComponent.transformationTitle = 'Text set to uppercase';
                break;
            case 10:
                this.tabularComponent.convertToStandardFormat();
                this.stepsComponent.transformationTitle = 'Converted to standard format';
                break;
            case 11:
                this.tabularComponent.pad(this.sidebarComponent.input_1, this.sidebarComponent.input_2);
                this.stepsComponent.transformationTitle = 'Trailing digits padded to value';
                break;
            case 12:
                this.tabularComponent.reformatDates();
                this.stepsComponent.transformationTitle = 'Dates reformatted';
                break;
            case 13:
                this.tabularComponent.concatenateCadRef();
                this.stepsComponent.transformationTitle = 'Cells concatenated';
                break;
            case 14:
                this.tabularComponent.concatenateCadRefId();
                this.stepsComponent.transformationTitle = 'Cells concatenated';
                break;
        }
        this.generateTransformationSteps();
        this.setDisplay();
        this.sidebarComponent.input_1 = '';
        this.sidebarComponent.input_2 = '';
    };
    AppComponent.prototype.generateTransformationSteps = function () {
        if (this.stepsComponent.stepsCounter < 7) {
            this.stepsComponent.generateStepsArray(this.sidebarComponent.transformationSelected, this.datasetDeepCopy(), this.tabularComponent.hot.getColHeader());
        }
    };
    __decorate([
        core_1.ViewChild(sidebar_import_component_1.SidebarImportComponent)
    ], AppComponent.prototype, "sidebarImportComponent", void 0);
    __decorate([
        core_1.ViewChild(sidebar_component_1.SidebarComponent)
    ], AppComponent.prototype, "sidebarComponent", void 0);
    __decorate([
        core_1.ViewChild(tabular_component_1.TabularComponent)
    ], AppComponent.prototype, "tabularComponent", void 0);
    __decorate([
        core_1.ViewChild(rdf_component_1.RdfComponent)
    ], AppComponent.prototype, "rdfComponent", void 0);
    __decorate([
        core_1.ViewChild(steps_component_1.StepsComponent)
    ], AppComponent.prototype, "stepsComponent", void 0);
    __decorate([
        core_1.Input()
    ], AppComponent.prototype, "profileSubset", void 0);
    __decorate([
        core_1.Input()
    ], AppComponent.prototype, "stepSequence", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
            providers: [shared_service_1.SharedService, sidebar_import_service_1.SidebarImportService, sidebar_service_1.SidebarService, profiling_service_1.ProfilingService, transformations_service_1.TransformationsService, shared_service_2.SharedTableService, rdf_service_1.RdfService, tabular_component_1.TabularComponent, rdf_component_1.RdfComponent, chart_component_1.ChartComponent, sidebar_import_component_1.SidebarImportComponent, sidebar_component_1.SidebarComponent, steps_component_1.StepsComponent]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
