import { TestBed, inject } from '@angular/core/testing';

import { StartCallService } from './start-call.service';

describe('StartCallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StartCallService]
    });
  });

  it('should be created', inject([StartCallService], (service: StartCallService) => {
    expect(service).toBeTruthy();
  }));
});
