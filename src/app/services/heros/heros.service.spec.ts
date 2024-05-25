import { TestBed } from '@angular/core/testing';

import { Heros } from './heros.service';

describe('Heros', () => {
  let service: Heros;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Heros);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
