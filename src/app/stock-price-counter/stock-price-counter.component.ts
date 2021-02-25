import { Component, Input, OnInit } from '@angular/core';
import { CountUp, CountUpOptions } from 'countup.js';

@Component({
  selector: 'app-stock-price-counter',
  templateUrl: './stock-price-counter.component.html',
  styleUrls: ['./stock-price-counter.component.sass']
})
export class StockPriceCounterComponent implements OnInit {

  private animation: CountUp;
  @Input() value: number;

  constructor() { }

  ngOnInit(): void {

    const countUpOptions: CountUpOptions = {
        decimalPlaces: 2,
        duration: 1,
        suffix: '%',
        prefix: this.value > 0 ? '+' : ''
    };
    
    const stockCounter = document.getElementById('stock-price-counter');
    this.animation = new CountUp(stockCounter, this.value, countUpOptions);
  }

  ngAfterViewInit(): void {
    this.animation.start();
  }
}
