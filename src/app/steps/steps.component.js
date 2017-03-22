"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var StepsComponent = (function () {
    function StepsComponent() {
        this.stepSequence = [];
        this.striped = false;
        this.bordered = false;
        this.stepsCounter = 1;
        this.stepSequence = this.fillArray();
        this.stepsEmitter = new core_1.EventEmitter();
    }
    StepsComponent.prototype.init = function () {
        this.stepsCounter = 1;
        this.stepSelected = 0;
        this.transformationSelected = 0;
        this.stepSequence = this.fillArray();
    };
    StepsComponent.prototype.fillArray = function () {
        return [
            { transformation: 0, step: 0, title: '-', headers: [], data: [] },
            { transformation: 0, step: 0, title: '-', headers: [], data: [] },
            { transformation: 0, step: 0, title: '-', headers: [], data: [] },
            { transformation: 0, step: 0, title: '-', headers: [], data: [] },
            { transformation: 0, step: 0, title: '-', headers: [], data: [] },
            { transformation: 0, step: 0, title: '-', headers: [], data: [] }
        ];
    };
    StepsComponent.prototype.chartSubsetEmit = function () {
        this.stepsEmitter.emit(this.stepSequence);
    };
    StepsComponent.prototype.onRowClick = function ($event) {
        this.stepSelected = $event.data.step;
        this.transformationSelected = $event.data.transformation;
        this.stepsEmitter.emit(this.stepSequence);
    };
    StepsComponent.prototype.generateStepsArray = function (transformationSelected, dataset, headers) {
        var obj = {};
        obj.transformation = transformationSelected;
        obj.step = this.stepsCounter;
        obj.title = this.transformationTitle;
        obj.headers = headers;
        obj.data = dataset;
        this.stepSequence[this.stepsCounter - 1] = obj;
        this.stepsCounter++;
        // console.log(obj);
    };
    __decorate([
        core_1.Input()
    ], StepsComponent.prototype, "stepSequence", void 0);
    __decorate([
        core_1.Output()
    ], StepsComponent.prototype, "stepsEmitter", void 0);
    StepsComponent = __decorate([
        core_1.Component({
            selector: 'steps',
            templateUrl: './steps.component.html',
            styleUrls: ['./steps.component.css']
        })
    ], StepsComponent);
    return StepsComponent;
}());
exports.StepsComponent = StepsComponent;
