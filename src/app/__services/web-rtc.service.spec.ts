import { TestBed, inject } from '@angular/core/testing';

import { WebRtcService } from './web-rtc.service';

describe('WebRtcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebRtcService]
    });
  });

  it('should be created', inject([WebRtcService], (service: WebRtcService) => {
    expect(service).toBeTruthy();
  }));
});
