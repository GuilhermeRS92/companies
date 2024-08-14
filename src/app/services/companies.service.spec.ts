import { TestBed } from '@angular/core/testing';

import { CompaniesService } from './companies.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CompaniesService', () => {
  let service: CompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompaniesService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
