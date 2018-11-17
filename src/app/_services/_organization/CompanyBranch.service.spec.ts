/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompanyBranchService } from './CompanyBranch.service';

describe('Service: CompanyBranch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyBranchService]
    });
  });

  it('should ...', inject([CompanyBranchService], (service: CompanyBranchService) => {
    expect(service).toBeTruthy();
  }));
});
