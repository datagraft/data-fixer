import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarVisualizationComponent } from './sidebar.visualization.component';

describe('SidebarVisualizationComponent', () => {
  let component: SidebarVisualizationComponent;
  let fixture: ComponentFixture<SidebarVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarVisualizationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
