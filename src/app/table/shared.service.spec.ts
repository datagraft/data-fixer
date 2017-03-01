/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SharedTableService } from './shared.service';

describe('SharedTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedTableService]
    });
  });

  it('should ...', inject([SharedTableService], (service: SharedTableService) => {
    expect(service).toBeTruthy();
  }));
});
