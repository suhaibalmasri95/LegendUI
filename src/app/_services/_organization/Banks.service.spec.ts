/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BanksService } from './Banks.service';

describe('Service: Banks', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BanksService]
    });
  });

  it('should ...', inject([BanksService], (service: BanksService) => {
    expect(service).toBeTruthy();
  }));
});
