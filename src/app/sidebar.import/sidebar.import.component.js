"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var sidebar_import_service_1 = require('./sidebar.import.service');
var SidebarImportComponent = (function () {
    function SidebarImportComponent(sidebarImportService) {
        this.sidebarImportService = sidebarImportService;
        this.required = false;
        this.hasError = false;
        this.error = 'The input has an error!';
    }
    SidebarImportComponent.prototype.getDataFromFile = function () {
        this.sidebarImportService.getDataParsed(this.selectFile);
    };
    SidebarImportComponent.prototype.getData = function () {
        this.headers = this.sidebarImportService.headers;
        this.types = this.sidebarImportService.types;
        return this.sidebarImportService.data;
    };
    SidebarImportComponent = __decorate([
        core_1.Component({
            selector: 'sidebarImport',
            templateUrl: './sidebar.import.component.html',
            styleUrls: ['./sidebar.import.component.css'],
            providers: [sidebar_import_service_1.SidebarImportService]
        })
    ], SidebarImportComponent);
    return SidebarImportComponent;
}());
exports.SidebarImportComponent = SidebarImportComponent;
