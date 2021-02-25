import { Injectable } from '@angular/core';
import { LineData } from 'lightweight-charts';

@Injectable({
  providedIn: 'root'
})
export class StockDataService {

  constructor() { }

  getStockData(isin: string, startOfCampaign: Date, endOfCampaign: Date): LineData[] {

    const results = new Array<LineData>();

    const index = new Date(startOfCampaign); 
    index.setMonth(startOfCampaign.getMonth() - 1);

    
    const oneMonthAhead = new Date(endOfCampaign);
    oneMonthAhead.setMonth(oneMonthAhead.getMonth() + 1);
    
    let endOfStockDataInterval: Date;

    if(endOfCampaign === null)
      endOfStockDataInterval = new Date();
    else
      endOfStockDataInterval = new Date(endOfCampaign);

    if(oneMonthAhead <= new Date()) 
      endOfStockDataInterval.setMonth(endOfCampaign.getMonth() + 1);

    let lastValue: number = 40;
    const lowerBound = 20;
    while (index <= endOfStockDataInterval) {

      let isWithinCampaign: boolean = index < startOfCampaign || index > endOfCampaign;
      let weight = isWithinCampaign ? 0.4 : 0.55;

      const direction = Math.random() > weight && lastValue > lowerBound ? -1 : 1;

      results.push({
        time: index.toISOString().substring(0, 10),
        value: direction === 1 ? ++lastValue : --lastValue
      });
      index.setHours(index.getHours() + 24);
    }

    return results;
  }
}
