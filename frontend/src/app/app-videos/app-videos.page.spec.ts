import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppVideosPage } from './app-videos.page';

describe('AppVideosPage', () => {
  let component: AppVideosPage;
  let fixture: ComponentFixture<AppVideosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppVideosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
