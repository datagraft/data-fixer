import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  constructor() { }

  initialiseStepSequence() {
    return [
    { transformation: 0, step: 0, title: '-', data: [] },
    { transformation: 0, step: 0, title: '-', data: [] },
    { transformation: 0, step: 0, title: '-', data: [] }
  ];
  } 
}
