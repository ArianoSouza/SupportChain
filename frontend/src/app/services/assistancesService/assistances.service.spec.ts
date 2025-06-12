import { TestBed } from '@angular/core/testing';

import { AssistancesService } from './assistances.service';

describe('AssistancesService', () => {
  let service: AssistancesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssistancesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
