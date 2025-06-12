import { TestBed } from '@angular/core/testing';

import { ActivitieStageService } from './stages.service';

describe('StagesService', () => {
  let service: ActivitieStageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitieStageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
