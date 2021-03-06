import { AfterViewInit, Component, Input } from '@angular/core';
import flatpickr from 'flatpickr';
import { InvestmentCampaignMockService } from '../services/investment-campaign.service.mock';

@Component({
  selector: 'app-daterange-picker',
  templateUrl: './daterange-picker.component.html',
  styleUrls: ['./daterange-picker.component.sass']
})
export class DaterangePickerComponent implements AfterViewInit {

  @Input() dateRangeId: string;

  constructor(private investmentCampaignService: InvestmentCampaignMockService) { }

  ngAfterViewInit(): void {

    const htmlElement = document.getElementById(this.dateRangeId) as HTMLInputElement;

    flatpickr(htmlElement, {
      mode: 'range',
      dateFormat: "Y-m-d",
      minDate: new Date(1998, 1, 17), // 1 == february; new SEC reform in place
      maxDate: Date.now(),
      defaultDate: [new Date(2020, 2, 10), new Date(2021, 1, 10)],
      onReady: (dates) => this.investmentCampaignService.acceptNewDateRange(dates),
      onValueUpdate: (dates) => this.investmentCampaignService.acceptNewDateRange(dates)
    });
  }
}
