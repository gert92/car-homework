import { TestBed } from '@angular/core/testing';

import { AllcarsResolver } from './allcars.resolver';

describe('AllcarsResolver', () => {
  let resolver: AllcarsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AllcarsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
