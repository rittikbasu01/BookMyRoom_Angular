import { TestBed, inject } from '@angular/core/testing';

import { ConfirmserviceService } from './confirmservice.service';

describe('ConfirmserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmserviceService]
    });
  });

  it('should be created', inject([ConfirmserviceService], (service: ConfirmserviceService) => {
    expect(service).toBeTruthy();
  }));
});
