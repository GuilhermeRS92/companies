import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Company } from 'src/app/models/company.model';
import { MessageService } from 'primeng/api';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-forms-companies',
  templateUrl: './forms-companies.component.html',
  styleUrls: ['./forms-companies.component.scss']
})
export class FormsCompaniesComponent  implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  companyForm!: FormGroup;
  companyInformation?: Company = undefined
  errorMessage: boolean = false;
  isViewMode: boolean = true;
  
  headerTitle: string = 'Cadastrar Empresa';
  headerCaption: string = 'Preencha os campos abaixo para cadastrar uma nova empresa';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private companiesService: CompaniesService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const url = this.route.snapshot.url.map(segment => segment.path).join('/');
    this.isViewMode = url.includes('detalhes');

    if(id){
      const companySubscription = this.companiesService.getCompanyById(id)
        .subscribe({
          next: (company) => {
            this.companyInformation = company;
            if(this.isViewMode){
              this.headerTitle = `Detalhes: ${company.companyName}`;
              this.headerCaption = 'Veja abaixo as informações do empresa.';
            } else{
              this.headerTitle = `Editar: ${company.companyName}`;
              this.headerCaption = 'Preencha os campos abaixo para editar o empresa.';
            }
            this.generateFormBuild();
          },
          error: (error) => {
            this.errorMessage = true;
            console.error('Error getting company', error);
          }
        })
        this.subscription.add(companySubscription);
    } else {
      this.generateFormBuild();
    }
  }

  generateFormBuild(){
    this.companyForm = this.formBuilder.group({
      id: [this.companyInformation?.id || null],
      createdAt: [this.companyInformation?.createdAt || new Date()],
      companyName: [this.companyInformation?.companyName || '', Validators.required],
      collaboratorsCount: [this.companyInformation?.collaboratorsCount || '', Validators.required],
      isActive: [this.companyInformation?.isActive || true, Validators.required],
      lastSubmit: [this.companyInformation?.lastSubmit || new Date()]
    });

    if(this.isViewMode){
      this.companyForm.disable();
    }
  }

  save(){
    if(this.companyForm.valid){
      const company: Company = this.companyForm.value;
      console.log(company);
      if(company.id){
        const putCompanySubscription = this.companiesService.putCompany(company)
          .subscribe({
            next: () => {
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Empresa atualizada com sucesso!' });
            },
            error: (error) => {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar empresa!' });
              console.error('Error updating company', error);
            }
          });
        this.subscription.add(putCompanySubscription);
      } else {
        const postCompanySubscription = this.companiesService.postCompany(company)
          .subscribe({
            next: (company) => {
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Empresa criada com sucesso!' });
              setTimeout(() => {
                this.router.navigate([`/empresas/editar/${company.id}`]);
              }, 2500);
            },
            error: (error) => {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar empresa!' });
            }
          });
        this.subscription.add(postCompanySubscription);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
