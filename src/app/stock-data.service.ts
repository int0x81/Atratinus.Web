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

    console.log(`Is ${oneMonthAhead} smaller then ${new Date()}`);
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
    // return [
    //   { time: '2018-10-19', value: 46.33 },
    //   { time: '2018-10-22', value: 45.97 },
    //   { time: '2018-10-23', value: 46.36 },
    //   { time: '2018-10-24', value: 46.73 },
    //   { time: '2018-10-25', value: 46.51 },
    //   { time: '2018-10-26', value: 45.92 },
    //   { time: '2018-10-29', value: 46.46 },
    //   { time: '2018-10-30', value: 47.63 },
    //   { time: '2018-10-31', value: 47.88 },
    //   { time: '2018-11-01', value: 47.74 },
    //   { time: '2018-11-02', value: 48.00 },
    //   { time: '2018-11-05', value: 48.69 },
    //   { time: '2018-11-06', value: 49.11 },
    //   { time: '2018-11-07', value: 49.37 },
    //   { time: '2018-11-08', value: 49.33 },
    //   { time: '2018-11-09', value: 49.68 },
    //   { time: '2018-11-12', value: 49.87 },
    //   { time: '2018-11-13', value: 49.86 },
    //   { time: '2018-11-14', value: 49.76 },
    //   { time: '2018-11-15', value: 49.74 },
    //   { time: '2018-11-16', value: 50.17 },
    //   { time: '2018-11-19', value: 50.51 },
    //   { time: '2018-11-20', value: 49.38 },
    //   { time: '2018-11-21', value: 48.73 },
    //   { time: '2018-11-23', value: 49.02 },
    //   { time: '2018-11-26', value: 48.87 },
    //   { time: '2018-11-27', value: 49.37 },
    //   { time: '2018-11-28', value: 49.71 },
    //   { time: '2018-11-29', value: 48.98 },
    //   { time: '2018-11-30', value: 50.40 },
    //   { time: '2018-12-03', value: 49.69 },
    //   { time: '2018-12-04', value: 49.58 },
    //   { time: '2018-12-06', value: 49.38 },
    //   { time: '2018-12-07', value: 49.09 },
    //   { time: '2018-12-10', value: 49.24 },
    //   { time: '2018-12-11', value: 49.54 },
    //   { time: '2018-12-12', value: 49.22 },
    //   { time: '2018-12-13', value: 49.47 },
    //   { time: '2018-12-14', value: 49.34 },
    //   { time: '2018-12-17', value: 48.33 },
    //   { time: '2018-12-18', value: 48.32 },
    //   { time: '2018-12-19', value: 47.90 },
    //   { time: '2018-12-20', value: 47.54 },
    //   { time: '2018-12-21', value: 47.57 },
    //   { time: '2018-12-24', value: 45.96 },
    //   { time: '2018-12-26', value: 46.94 },
    //   { time: '2018-12-27', value: 47.53 },
    //   { time: '2018-12-28', value: 47.20 },
    //   { time: '2018-12-31', value: 47.35 },
    //   { time: '2019-01-02', value: 46.93 },
    //   { time: '2019-01-03', value: 46.64 },
    //   { time: '2019-01-04', value: 47.57 },
    //   { time: '2019-01-07', value: 46.95 },
    //   { time: '2019-01-08', value: 47.48 },
    //   { time: '2019-01-09', value: 46.57 },
    //   { time: '2019-01-10', value: 47.07 },
    //   { time: '2019-01-11', value: 47.34 },
    //   { time: '2019-01-14', value: 47.15 },
    //   { time: '2019-01-15', value: 47.57 },
    //   { time: '2019-01-16', value: 46.92 },
    //   { time: '2019-01-17', value: 47.06 },
    //   { time: '2019-01-18', value: 47.61 },
    //   { time: '2019-01-22', value: 47.72 },
    //   { time: '2019-01-23', value: 48.27 },
    //   { time: '2019-01-24', value: 47.69 },
    //   { time: '2019-01-25', value: 47.37 },
    //   { time: '2019-01-28', value: 47.17 },
    //   { time: '2019-01-29', value: 47.40 },
    //   { time: '2019-01-30', value: 47.86 },
    //   { time: '2019-01-31', value: 48.13 },
    //   { time: '2019-02-01', value: 48.70 },
    //   { time: '2019-02-04', value: 49.25 },
    //   { time: '2019-02-05', value: 49.26 },
    //   { time: '2019-02-06', value: 49.26 },
    //   { time: '2019-02-07', value: 49.42 },
    //   { time: '2019-02-08', value: 49.50 },
    //   { time: '2019-02-11', value: 49.61 },
    //   { time: '2019-02-12', value: 49.66 },
    //   { time: '2019-02-13', value: 49.79 },
    //   { time: '2019-02-14', value: 45.59 },
    //   { time: '2019-02-15', value: 45.24 },
    //   { time: '2019-02-19', value: 44.83 },
    //   { time: '2019-02-20', value: 45.10 },
    //   { time: '2019-02-21', value: 45.86 },
    //   { time: '2019-02-22', value: 45.28 },
    //   { time: '2019-02-25', value: 44.94 },
    //   { time: '2019-02-26', value: 44.69 },
    //   { time: '2019-02-27', value: 44.94 },
    //   { time: '2019-02-28', value: 45.34 },
    //   { time: '2019-03-01', value: 45.38 },
    //   { time: '2019-03-04', value: 45.65 },
    //   { time: '2019-03-05', value: 45.60 },
    //   { time: '2019-03-06', value: 45.45 },
    //   { time: '2019-03-07', value: 45.28 },
    //   { time: '2019-03-08', value: 44.84 },
    //   { time: '2019-03-11', value: 46.18 },
    //   { time: '2019-03-12', value: 46.05 },
    //   { time: '2019-03-13', value: 46.22 },
    //   { time: '2019-03-14', value: 45.70 },
    //   { time: '2019-03-15', value: 45.30 },
    //   { time: '2019-03-18', value: 45.41 },
    //   { time: '2019-03-19', value: 45.56 },
    //   { time: '2019-03-20', value: 45.53 },
    //   { time: '2019-03-21', value: 45.51 },
    //   { time: '2019-03-22', value: 45.93 },
    //   { time: '2019-03-25', value: 46.03 },
    //   { time: '2019-03-26', value: 46.64 },
    //   { time: '2019-03-27', value: 46.61 },
    //   { time: '2019-03-28', value: 46.58 },
    //   { time: '2019-03-29', value: 46.86 },
    //   { time: '2019-04-01', value: 46.72 },
    //   { time: '2019-04-02', value: 46.57 },
    //   { time: '2019-04-03', value: 46.18 },
    //   { time: '2019-04-04', value: 46.48 },
    //   { time: '2019-04-05', value: 46.47 },
    //   { time: '2019-04-08', value: 46.55 },
    //   { time: '2019-04-09', value: 46.67 },
    //   { time: '2019-04-10', value: 46.64 },
    //   { time: '2019-04-11', value: 46.71 },
    //   { time: '2019-04-12', value: 46.74 },
    //   { time: '2019-04-15', value: 47.00 },
    //   { time: '2019-04-16', value: 46.95 },
    //   { time: '2019-04-17', value: 47.28 },
    //   { time: '2019-04-18', value: 47.48 },
    //   { time: '2019-04-22', value: 47.40 },
    //   { time: '2019-04-23', value: 48.21 },
    //   { time: '2019-04-24', value: 47.98 },
    //   { time: '2019-04-25', value: 47.84 },
    //   { time: '2019-04-26', value: 48.26 },
    //   { time: '2019-04-29', value: 48.42 },
    //   { time: '2019-04-30', value: 49.06 },
    //   { time: '2019-05-01', value: 48.59 },
    //   { time: '2019-05-02', value: 48.39 },
    //   { time: '2019-05-03', value: 48.72 },
    //   { time: '2019-05-06', value: 48.47 },
    //   { time: '2019-05-07', value: 48.00 },
    //   { time: '2019-05-08', value: 47.85 },
    //   { time: '2019-05-09', value: 47.40 },
    //   { time: '2019-05-10', value: 48.19 },
    //   { time: '2019-05-13', value: 48.05 },
    //   { time: '2019-05-14', value: 48.69 },
    //   { time: '2019-05-15', value: 49.18 },
    //   { time: '2019-05-16', value: 49.58 },
    //   { time: '2019-05-17', value: 49.20 },
    //   { time: '2019-05-20', value: 48.85 },
    //   { time: '2019-05-21', value: 48.60 },
    //   { time: '2019-05-22', value: 49.65 },
    //   { time: '2019-05-23', value: 49.85 },
    //   { time: '2019-05-24', value: 49.61 },
    //   { time: '2019-05-28', value: 49.24 },
    // ];
  }
}
