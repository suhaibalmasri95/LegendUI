/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CoversComponent } from './covers.component';

describe('CoversComponent', () => {
  let component: CoversComponent;
  let fixture: ComponentFixture<CoversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
