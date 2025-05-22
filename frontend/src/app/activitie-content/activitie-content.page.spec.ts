import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivitieContentPage } from './activitie-content.page';

describe('ActivitieContentPage', () => {
  let component: ActivitieContentPage;
  let fixture: ComponentFixture<ActivitieContentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitieContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
