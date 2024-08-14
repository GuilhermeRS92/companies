import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsCompaniesComponent } from './forms-companies.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MessageService } from 'primeng/api';

describe('FormsCompaniesComponent', () => {
  let component: FormsCompaniesComponent;
  let fixture: ComponentFixture<FormsCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MessageService],
      declarations: [ FormsCompaniesComponent, HeaderComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, ToastModule, FormsModule, ReactiveFormsModule, ButtonModule, ConfirmDialogModule, TableModule,]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
