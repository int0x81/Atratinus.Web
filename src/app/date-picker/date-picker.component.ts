import { AfterViewInit, Component, Input } from '@angular/core';
import flatpickr from 'flatpickr';
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import { InvestmentActivityService } from '../investment-activity.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.sass']
})
export class DatePickerComponent implements AfterViewInit {

  @Input() datePickerId: string;

  @Input() start: boolean;
  constructor(private investmentActivityService: InvestmentActivityService) { }
  ngAfterViewInit(): void {

    const htmlElement = document.getElementById(this.datePickerId) as HTMLInputElement;

    flatpickr(htmlElement, {
      altInput: true,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",
      minDate: new Date(1998, 1, 17), // 1 == february; new SEC reform in place
      maxDate: Date.now(),
      defaultDate: new Date(2020, 10, 17),
      onReady: (dates) => {
        this.investmentActivityService.acceptNewDate(this.start, dates[0])
      },
      onValueUpdate: (dates) => {
        this.investmentActivityService.acceptNewDate(this.start, dates[0])
      }
    });
  }
}
