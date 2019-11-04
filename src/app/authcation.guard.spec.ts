import { TestBed, async, inject } from '@angular/core/testing';

import { AuthcationGuard } from './authcation.guard';

describe('AuthcationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthcationGuard]
    });
  });

  it('should ...', inject([AuthcationGuard], (guard: AuthcationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
