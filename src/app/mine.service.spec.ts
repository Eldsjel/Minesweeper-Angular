import { TestBed } from '@angular/core/testing';

import { MineService } from './mine.service';

describe('MineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MineService = TestBed.get(MineService);
    expect(service).toBeTruthy();
  });
});
