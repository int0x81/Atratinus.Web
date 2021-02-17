import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import flatpickr from 'flatpickr';
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import { InvestmentActivityService } from '../investment-activity.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.sass']
})
export class DatePickerComponent implements AfterViewInit {

  @Input() dateRangeId: string;
  constructor(private investmentActivityService: InvestmentActivityService) { }
  ngAfterViewInit(): void {

    const htmlElement = document.getElementById(this.dateRangeId) as HTMLInputElement;

    flatpickr(htmlElement, {
      altInput: true,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",
      minDate: new Date(1998, 1, 17), // 1 == february; new SEC reform in place
      maxDate: Date.now(),
      defaultDate: new Date(2020, 3, 17),
      plugins: [
        rangePlugin()
      ],
      onReady: (dates) => this.investmentActivityService.acceptNewDateRange(dates),
      onValueUpdate: (dates) => this.investmentActivityService.acceptNewDateRange(dates)
    });
  }
}
