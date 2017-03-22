"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var sidebar_service_1 = require('./sidebar.service');
var SidebarComponent = (function () {
    function SidebarComponent(sidebarService) {
        this.sidebarService = sidebarService;
        this.data = this.transformations;
        this.striped = false;
        this.bordered = false;
        this.transformationsEnumerated = [
            { value: 0, label: 'Insert column to the right' },
            { value: 1, label: 'Insert column to the left' },
            { value: 2, label: 'Insert row above' },
            { value: 3, label: 'Insert row below' },
            { value: 4, label: 'Delete column' },
            { value: 5, label: 'Delete row' },
            { value: 6, label: 'Replace (p1) with (p2)' },
            { value: 7, label: 'Set first row as header' },
            { value: 8, label: 'Set empty cells to value (p1)' },
            { value: 9, label: 'Set text to uppercase' },
            { value: 10, label: 'Convert to standard format' },
            { value: 11, label: 'Pad trailing (p1) to value of length (p2)' },
            { value: 12, label: 'Reformat dates' },
            { value: 13, label: 'Concatenate cells' }
        ];
        this.transformations = [
            { value: 7, label: 'Set first row as header' }
        ];
    }
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'sidebar',
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.css'],
            providers: [sidebar_service_1.SidebarService]
        })
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
