import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  constructor() { }

  private rulesMatrix: any[];  

  initialiseStepSequence() {
    return [
    { transformation: 0, step: 0, title: '-', headers: [], data: [] },
    { transformation: 0, step: 0, title: '-', headers: [], data: [] },
    { transformation: 0, step: 0, title: '-', headers: [], data: [] },
    { transformation: 0, step: 0, title: '-', headers: [], data: [] },
    { transformation: 0, step: 0, title: '-', headers: [], data: [] },
    { transformation: 0, step: 0, title: '-', headers: [], data: [] }
  ];
  }

  getRulesMatrix() {
    return this.rulesMatrix = [
                                                // ['String', 'Number || Integer', 'Date', 'Column', 'Row'],
      [true, true, true, true, false],          // (0) Insert column right
      [true, true, true, true, false],          // (1) Insert column left
      [true, true, true, false, true],          // (2) Insert row above
      [true, true, true, false, true],          // (3) Insert row below
      [true, true, true, true, false],          // (4) Delete column
      [true, true, true, false, true],          // (5) Delete row
      [false, true, false, true, false],        // (6) Replace character (,) with (.)
      [false, false, false, false, false],      // (7) Set first row as header
      [false, true, false, true, true],         // (8) Empty to zero
      [true, false, false, true, false],        // (9) Set to uppercase
      [true, false, false, true, false],        // (10) Convert to standard format
      [false, true, false, true, true],         // (11) Pad digits 0 to 4
      [false, false, true, true, false],        // (12) Reformat dates
      [true, true, true, true, false]           // (13) cad-ref function
      // [true, true, true, true, false],          // (14) cad-ref-id function

    ]
  }
}
