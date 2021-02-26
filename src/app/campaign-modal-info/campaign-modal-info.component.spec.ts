import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignModalInfoComponent } from './campaign-modal-info.component';

describe('CampaignModalInfoComponent', () => {
  let component: CampaignModalInfoComponent;
  let fixture: ComponentFixture<CampaignModalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignModalInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignModalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
