import { Injectable } from '@angular/core';

@Injectable()
export class SharedTableService {

  public sharedResources: any;

  constructor() {
    this.sharedResources = new Object();
    this.sharedResources.data = 0;
    this.sharedResources.headers = 0;
    this.sharedResources.inferredTypes = 0;
  }


}
