import { TestBed } from '@angular/core/testing';

import { CompaniesService } from './companies.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company.model';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let http: HttpClient;
  const API = 'https://655cf25525b76d9884fe3153.mockapi.io/v1/external-companies';

  const dummyCompany: Company = {
    createdAt: new Date(),
    companyName: 'Dummy Company',
    collaboratorsCount: 100,
    isActive: true,
    lastSubmit: new Date(),
    id: 'company1'
};

const dummyCompanies: Company[] = [
    {
        createdAt: new Date(),
        companyName: 'Dummy Company One',
        collaboratorsCount: 50,
        isActive: true,
        lastSubmit: new Date(),
        id: 'company1'
    },
    {
        createdAt: new Date(),
        companyName: 'Dummy Company Two',
        collaboratorsCount: 75,
        isActive: false,
        lastSubmit: new Date(),
        id: 'company2'
    }
];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompaniesService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CompaniesService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get companies', () => {
    const spy = spyOn(http, 'get').and.callThrough();
    service.getCompanies().subscribe(companies => {
      expect(companies).toEqual(dummyCompanies);
    })
    expect(spy).toHaveBeenCalledWith(`${API}`);
  });

  it('should get company by id', () => {
    const spy = spyOn(http, 'get').and.callThrough();
    service.getCompanyById('company1').subscribe(company => {
      expect(company).toEqual(dummyCompany);
    })
    expect(spy).toHaveBeenCalledWith(`${API}/company1`);
  });

  it('should post company', () => {
    const spy = spyOn(http, 'post').and.callThrough();
    service.postCompany(dummyCompany).subscribe(company => {
      expect(company).toEqual(dummyCompany);
    })
    expect(spy).toHaveBeenCalledWith(`${API}`, dummyCompany);
  })

  it('should put company', () => {
    const spy = spyOn(http, 'put').and.callThrough();
    service.putCompany(dummyCompany).subscribe(company => {
      expect(company).toEqual(dummyCompany);
    })
    expect(spy).toHaveBeenCalledWith(`${API}/company1`, dummyCompany);
  })

  it('should delete company', () => {
    const spy = spyOn(http, 'delete').and.callThrough();
    service.deleteCompany('company1').subscribe(company => {
      expect(company).toEqual(company);
    })
    expect(spy).toHaveBeenCalledWith(`${API}/company1`);
  })
});
