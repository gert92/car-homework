import { TestBed } from '@angular/core/testing';

import { CarResolverResolver } from './car-resolver.resolver';

describe('CarResolverResolver', () => {
  let resolver: CarResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CarResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
