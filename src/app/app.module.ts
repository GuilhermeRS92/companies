import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { FormsCompaniesComponent } from './pages/forms-companies/forms-companies.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompaniesService } from './services/companies.service';
import { StatusPipe } from './pipes/status.pipe';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

registerLocaleData(localeBr, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CompaniesComponent,
    FormsCompaniesComponent,
    StatusPipe
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    TableModule,
    ButtonModule,
    ToastModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule
  ],
  providers: [CompaniesService, {provide: LOCALE_ID, useValue: 'pt'}, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
