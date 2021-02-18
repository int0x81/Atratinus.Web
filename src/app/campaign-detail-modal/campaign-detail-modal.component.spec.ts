import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignDetailModalComponent } from './campaign-detail-modal.component';

describe('CampaignDetailModalComponent', () => {
  let component: CampaignDetailModalComponent;
  let fixture: ComponentFixture<CampaignDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
