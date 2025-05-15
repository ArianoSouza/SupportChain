import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrilhasPage } from './trilhas.page';

describe('TrilhasPage', () => {
  let component: TrilhasPage;
  let fixture: ComponentFixture<TrilhasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrilhasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
