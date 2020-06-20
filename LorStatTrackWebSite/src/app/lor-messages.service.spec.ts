import { TestBed } from '@angular/core/testing';

import { LorMessagesService } from './lor-messages.service';

describe('LorMessagesService', () => {
  let service: LorMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LorMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
