"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var SharedService = (function () {
    function SharedService() {
    }
    SharedService.prototype.initialiseStepSequence = function () {
        return [
            { transformation: 0, step: 0, title: '-', headers: [], data: [] },
            { transformation: 0, step: 0, title: '-', headers: [], data: [] },
            { transformation: 0, step: 0, title: '-', headers: [], data: [] },
            { transformation: 0, step: 0, title: '-', headers: [], data: [] },
            { transformation: 0, step: 0, title: '-', headers: [], data: [] },
            { transformation: 0, step: 0, title: '-', headers: [], data: [] }
        ];
    };
    SharedService.prototype.getRulesMatrix = function () {
        return this.rulesMatrix = [
            // ['String', 'Number || Integer', 'Date', 'Column', 'Row'],
            [true, true, true, true, false],
            [true, true, true, true, false],
            [true, true, true, false, true],
            [true, true, true, false, true],
            [true, true, true, true, false],
            [true, true, true, false, true],
            [false, true, false, true, false],
            [false, false, false, false, false],
            [false, true, false, true, true],
            [true, false, false, true, false],
            [true, false, false, true, false],
            [false, true, false, true, true],
            [false, false, true, true, false],
            [true, true, true, true, false] // (13) cad-ref function
        ];
    };
    SharedService = __decorate([
        core_1.Injectable()
    ], SharedService);
    return SharedService;
}());
exports.SharedService = SharedService;
