import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailActivitiePage } from './detail-activitie.page';

describe('DetailActivitiePage', () => {
  let component: DetailActivitiePage;
  let fixture: ComponentFixture<DetailActivitiePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailActivitiePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
