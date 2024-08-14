import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { FormsCompaniesComponent } from './pages/forms-companies/forms-companies.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CompaniesComponent,
    FormsCompaniesComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
