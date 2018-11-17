/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LockUpService } from './LockUp.service';

describe('Service: LockUp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LockUpService]
    });
  });

  it('should ...', inject([LockUpService], (service: LockUpService) => {
    expect(service).toBeTruthy();
  }));
});
