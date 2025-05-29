import { TestBed } from '@angular/core/testing';

import { ApiEstadosService } from './api-estados.service';

describe('ApiEstadosService', () => {
  let service: ApiEstadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiEstadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
