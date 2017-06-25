import { TestBed, inject } from '@angular/core/testing';

import { SidebarVisualizationService } from './sidebar.visualization.service';

describe('SidebarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidebarVisualizationService]
    });
  });

  it('should ...', inject([SidebarVisualizationService], (service: SidebarVisualizationService) => {
    expect(service).toBeTruthy();
  }));
});
