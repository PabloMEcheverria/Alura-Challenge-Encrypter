import { TestBed } from '@angular/core/testing';

import { TransformTextService } from './transform-text.service';

describe('TransformTextService', () => {
  let service: TransformTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
