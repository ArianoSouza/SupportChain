import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicalAssistancePage } from './medical-assistance.page';

describe('MedicalAssistancePage', () => {
  let component: MedicalAssistancePage;
  let fixture: ComponentFixture<MedicalAssistancePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalAssistancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
