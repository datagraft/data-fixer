/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RdfService } from './rdf.service';

describe('RdfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RdfService]
    });
  });

  it('should ...', inject([RdfService], (service: RdfService) => {
    expect(service).toBeTruthy();
  }));
});
