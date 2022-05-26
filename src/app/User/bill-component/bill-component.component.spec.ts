import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillComponentComponent } from './bill-component.component';

describe('BillComponentComponent', () => {
  let component: BillComponentComponent;
  let fixture: ComponentFixture<BillComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
