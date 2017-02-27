/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RdfComponent } from './rdf.component';

describe('RdfComponent', () => {
  let component: RdfComponent;
  let fixture: ComponentFixture<RdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
