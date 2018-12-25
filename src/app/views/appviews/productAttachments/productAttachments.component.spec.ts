/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductAttachmentsComponent } from './productAttachments.component';

describe('ProductAttachmentsComponent', () => {
  let component: ProductAttachmentsComponent;
  let fixture: ComponentFixture<ProductAttachmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAttachmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
