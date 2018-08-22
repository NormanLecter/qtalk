import { TestBed, inject } from '@angular/core/testing';

import { RoomsHistoryService } from './rooms-history.service';

describe('RoomsHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomsHistoryService]
    });
  });

  it('should be created', inject([RoomsHistoryService], (service: RoomsHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
