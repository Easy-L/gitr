import { TestBed, inject } from '@angular/core/testing';

import { MetaSetClassService } from './meta-set-class.service';

describe('MetaSetClassService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MetaSetClassService]
    });
  });

  it('should be created', inject([MetaSetClassService], (service: MetaSetClassService) => {
    expect(service).toBeTruthy();
  }));
});
