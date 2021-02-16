import { TestBed } from '@angular/core/testing';

import { InvestmentActivityService } from './investment-activity.service';

describe('InvestmentActivitiesService', () => {
  let service: InvestmentActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
