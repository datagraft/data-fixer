import { TestBed, inject } from '@angular/core/testing';

import { VisualizationService } from './visualization.service';

describe('VisualizationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisualizationService]
    });
  });

  it('should ...', inject([VisualizationService], (service: VisualizationService) => {
    expect(service).toBeTruthy();
  }));
});
