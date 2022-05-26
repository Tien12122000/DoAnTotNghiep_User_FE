import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDeltailComponent } from './product-deltail.component';

describe('ProductDeltailComponent', () => {
  let component: ProductDeltailComponent;
  let fixture: ComponentFixture<ProductDeltailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDeltailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDeltailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
