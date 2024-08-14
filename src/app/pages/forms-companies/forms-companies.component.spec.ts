import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsCompaniesComponent } from './forms-companies.component';

describe('FormsCompaniesComponent', () => {
  let component: FormsCompaniesComponent;
  let fixture: ComponentFixture<FormsCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsCompaniesComponent ]
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
