import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleItemPage } from './detalle-item.page';

describe('DetalleItemPage', () => {
  let component: DetalleItemPage;
  let fixture: ComponentFixture<DetalleItemPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
