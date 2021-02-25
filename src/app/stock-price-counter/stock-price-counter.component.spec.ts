import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPriceCounterComponent } from './stock-price-counter.component';

describe('StockPriceCounterComponent', () => {
  let component: StockPriceCounterComponent;
  let fixture: ComponentFixture<StockPriceCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockPriceCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockPriceCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
