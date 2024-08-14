import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { FormsCompaniesComponent } from './pages/forms-companies/forms-companies.component';

const COMPANIES_ROUTES: Routes = [
  {
    path: '',
    component: CompaniesComponent,
  },
  {
    path: 'cadastrar',
    component: FormsCompaniesComponent
  },
  {
    path: 'editar/:id',
    component: FormsCompaniesComponent
  },
  {
    path: 'detalhes/:id',
    component: FormsCompaniesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(COMPANIES_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}