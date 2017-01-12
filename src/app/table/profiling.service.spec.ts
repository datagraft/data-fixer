/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProfilingService } from './profiling.service';

describe('ProfilingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfilingService]
    });
  });

  it('should ...', inject([ProfilingService], (service: ProfilingService) => {
    expect(service).toBeTruthy();
  }));
});
