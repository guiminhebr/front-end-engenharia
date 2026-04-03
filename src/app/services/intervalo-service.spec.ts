import { TestBed } from '@angular/core/testing';

import { IntervaloService } from './intervalo-service';

describe('IntervaloService', () => {
  let service: IntervaloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntervaloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
