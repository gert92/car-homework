import { TestBed } from '@angular/core/testing';

import { CarownerResolver } from './carowner.resolver';

describe('CarownerResolver', () => {
  let resolver: CarownerResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CarownerResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
