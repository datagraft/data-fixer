"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var shared_service_1 = require('../shared.service');
var rdf_service_1 = require('./rdf.service');
var RdfComponent = (function () {
    function RdfComponent(sharedTableService, rdfService) {
        this.sharedTableService = sharedTableService;
        this.rdfService = rdfService;
        this.title = 'dbo:Film';
        this.actor = 'A:Title';
        // rdf mode settings
        this.settings = {
            height: 800,
            colHeaders: function (col) {
                switch (col) {
                    case 0:
                        return '<div style="line-height:10px;padding:5px;margin:0px;">A:Title</div><div style="line-height:10px;padding:0px;padding-top:5px;margin:0;"><span class="label label-warning" style="font-size:90%;background-color:#FFA500;">S</span><span class="label label-info" style="font-size:90%;background-color:#483D8B;color:white">U</span></div>';
                    case 1:
                        return '<div style="line-height:10px;padding:5px;margin:0px;">B:Actor</div><div style="line-height:10px;padding:0px;padding-top:5px;margin:0;"><span class="label label-warning" style="font-size:90%;background-color:#FFA500;">O</span><span class="label label-info" style="font-size:90%;background-color:#483D8B;color:white">U</span></div>';
                }
            },
            contextMenu: {
                callback: function (key, options) { },
                items: {
                    "row_above": {},
                    "row_below": {},
                    "remove_col": {},
                    "remove_row": {},
                    "col_left": {},
                    "col_right": {},
                    "undo": {},
                    "redo": {}
                },
            },
            afterSelection: function (r, c, r2, c2) { },
            cell: [
                /* -- Custom cell renderer --
                  {
                    row: 0, col: 0, renderer: function (instance, TD, row, col, prop, value, cellProperties) {
                      TD.style.backgroundColor = '#F3F3F3';
                      TD.innerHTML = value;
                    }
                  },
                  */
                {
                    row: 0, col: 0, type: 'text'
                },
                {
                    row: 0, col: 1, type: 'dropdown', source: ['A:Title', 'Option 2', 'Option 3']
                }
            ]
        };
        this.emitter = new core_1.EventEmitter();
    }
    RdfComponent.prototype.ngOnInit = function () {
    };
    RdfComponent.prototype.dataEmitter = function () {
        this.emitter.emit(this.data);
    };
    RdfComponent.prototype.init = function () {
        // ex. handsontable instance methods
        this.hot.alter('insert_row', 0);
        this.hot.setDataAtCell(0, 0, this.title);
        this.hot.setDataAtCell(0, 1, this.actor);
        this.hot.updateSettings(this.settings);
        console.log('data: ', this.data);
        console.log('headers: ', this.headers);
        console.log('inferredTypes: ', this.inferredTypes);
    };
    __decorate([
        core_1.Input()
    ], RdfComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input()
    ], RdfComponent.prototype, "hot", void 0);
    __decorate([
        core_1.Input()
    ], RdfComponent.prototype, "headers", void 0);
    __decorate([
        core_1.Input()
    ], RdfComponent.prototype, "inferredTypes", void 0);
    __decorate([
        core_1.Output()
    ], RdfComponent.prototype, "emitter", void 0);
    RdfComponent = __decorate([
        core_1.Component({
            selector: 'rdf',
            templateUrl: './rdf.component.html',
            styleUrls: ['./rdf.component.css'],
            providers: [shared_service_1.SharedTableService, rdf_service_1.RdfService]
        })
    ], RdfComponent);
    return RdfComponent;
}());
exports.RdfComponent = RdfComponent;
