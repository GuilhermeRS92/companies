import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Company } from 'src/app/models/company.model';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CompaniesComponent {
  companies: Company[] = [];

  first: number = 0;

  rows = 10;

  constructor(
    private companiesService: CompaniesService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
      this.companiesService.getCompanies()
      .subscribe(companies => {
        this.companies = companies
        const page = this.route.snapshot.paramMap.get('page');
        const rows = this.route.snapshot.paramMap.get('rows');
        if(page && rows){
          this.rows = parseInt(rows);
          this.first = (parseInt(page) - 1) * this.rows;
        }
      });
  }
  viewCompany(company: string){
    this.router.navigate(['/empresas/detalhes', company]);

  }

  editCompany(company: string){
    this.router.navigate(['/empresas/editar', company]);
  }

  addCompany(){
    this.router.navigate(['/empresas/cadastrar']);
  }

  deleteCompany(companyId: string, companyName: string){
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir ${companyName}?`,
      acceptLabel: 'Sim',
      accept: () => {
        this.companiesService.deleteCompany(companyId)
        .subscribe(() => {
          this.companies = this.companies.filter(partner => partner.id !== companyId);
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Empresa excluída com sucesso!'
          });
        });
      },
      rejectLabel: 'Não'
    })
  }

  sharePage(first: number, rows: number){
    const baseUrl = `${location.protocol}//${location.host}`;
    const updatedUrl = `${baseUrl}/empresas/p/${(first / rows) + 1}/r/${rows}`;

    navigator.clipboard.writeText(updatedUrl)
      .then(() => {
        this.messageService.add({
          severity: 'info',
          summary: 'Compartilhado',
          detail: `Link para a página ${ first + 1 } copiada com sucesso!`
        });
      })
      .catch(err => {
        console.error('Erro ao copiar o link:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Erro ao copiar o link para a página ${ first / rows}.`
        });
      });
  }
}
