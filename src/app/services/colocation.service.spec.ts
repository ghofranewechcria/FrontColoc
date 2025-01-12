import { TestBed } from '@angular/core/testing';

import { ColocationService } from './colocation.service';

describe('ColocationService', () => {
  let service: ColocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
