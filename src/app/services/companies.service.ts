import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private readonly API = 'https://655cf25525b76d9884fe3153.mockapi.io/v1/external-companies'

  constructor(
    private http: HttpClient
  ) { }

  getCompanies(){
    return this.http.get<Company[]>(this.API)
  }

  getCompanyById(id: string){
    return this.http.get<Company>(`${this.API}/${id}`)
  }

  postCompany(Company: Company){
    return this.http.post<Company>(this.API, Company)
  }

  putCompany(Company: Company){
    return this.http.put<Company>(`${this.API}/${Company.id}`, Company)
  }

  deleteCompany(id: string){
    return this.http.delete(`${this.API}/${id}`)
  }
}
