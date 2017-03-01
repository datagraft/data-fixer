/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TransformationsService } from './transformations.service';

describe('TransformationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransformationsService]
    });
  });

  it('should ...', inject([TransformationsService], (service: TransformationsService) => {
    expect(service).toBeTruthy();
  }));
});
