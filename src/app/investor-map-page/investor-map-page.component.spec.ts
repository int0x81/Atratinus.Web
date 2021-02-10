import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorMapPageComponent } from './investor-map-page.component';

describe('InvestorMapPageComponent', () => {
  let component: InvestorMapPageComponent;
  let fixture: ComponentFixture<InvestorMapPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestorMapPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorMapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
