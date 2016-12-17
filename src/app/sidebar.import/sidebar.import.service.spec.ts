/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SidebarImportService } from './sidebar.import.service';

describe('SidebarImportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidebarImportService]
    });
  });

  it('should ...', inject([SidebarImportService], (service: SidebarImportService) => {
    expect(service).toBeTruthy();
  }));
});
