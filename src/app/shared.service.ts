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
    this.rulesMatrix = [
                                                // ['String', 'Number || Integer', 'Date', 'Column', 'Row'],
      [true, true, true, true, false],          // (1) Insert column right
      [true, true, true, true, false],          // (2) Insert column left
      [true, true, true, false, true],          // (3) Insert row above
      [true, true, true, false, true],          // (4) Insert row below
      [true, true, true, true, false],          // (5) Delete column
      [true, true, true, false, true],          // (6) Delete row
      [false, true, false, true, false],        // (7) Replace character (,) with (.)
      [false, false, false, false, false],      // (8) Set first row as header
      [false, true, false, true, true],         // (9) Empty to zero
      [true, false, false, true, false],        // (10) Set to uppercase
      [true, false, false, true, false],        // (11) Convert to standard format
      [false, true, false, true, true],         // (12) Pad digits 0 to 4
      [false, false, true, true, false],        // (13) Reformat dates
      [true, true, true, true, false],          // (14) cad-ref function
      [true, true, true, true, false],          // (15) cad-ref-id function

    ]
  }
}
