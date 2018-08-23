import { TestBed, inject } from '@angular/core/testing';

import { ConversationWindowService } from './conversation-window.service';

describe('ConversationWindowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConversationWindowService]
    });
  });

  it('should be created', inject([ConversationWindowService], (service: ConversationWindowService) => {
    expect(service).toBeTruthy();
  }));
});
