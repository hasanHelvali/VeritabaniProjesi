import { TestBed } from '@angular/core/testing';

import { MekanListeleService } from './mekan-listele.service';

describe('MekanListeleService', () => {
  let service: MekanListeleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MekanListeleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
