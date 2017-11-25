import { TestBed, inject } from '@angular/core/testing';

import { ConversationDataService } from './conversation-data.service';

describe('ConversationDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConversationDataService]
    });
  });

  it('should be created', inject([ConversationDataService], (service: ConversationDataService) => {
    expect(service).toBeTruthy();
  }));
});
