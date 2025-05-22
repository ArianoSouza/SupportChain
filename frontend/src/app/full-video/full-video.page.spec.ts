import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FullVideoPage } from './full-video.page';

describe('FullVideoPage', () => {
  let component: FullVideoPage;
  let fixture: ComponentFixture<FullVideoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FullVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
