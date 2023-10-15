import { TestBed } from '@angular/core/testing';

import { RelacionesService } from './relaciones.service';

describe('RelacionesService', () => {
  let service: RelacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
