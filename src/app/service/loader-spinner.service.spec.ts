import { TestBed } from '@angular/core/testing';

import { LoaderSpinnerService } from './loader-spinner.service';

describe('LoaderSpinnerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoaderSpinnerService = TestBed.get(LoaderSpinnerService);
    expect(service).toBeTruthy();
  });
});
