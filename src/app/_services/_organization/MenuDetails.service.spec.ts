/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MenuDetailsService } from './MenuDetails.service';

describe('Service: MenuDetails', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuDetailsService]
    });
  });

  it('should ...', inject([MenuDetailsService], (service: MenuDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
