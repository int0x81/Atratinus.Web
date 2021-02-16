import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvestmentActivityService {

  constructor() { }

  public getInvestmentActivities(startDate: string, endDate: string) {

    const N = 20;

    const arcsData = [...Array(N).keys()].map(() => {
      const rand = Math.random() * 100;
      const mock = {
        startLat: rand > 30 ? 40.732 : 25.194980291662706,
        startLng: rand > 30 ? -73.99013151345478 : 51.41814117946225,
        endLat: Math.random() * 20 + 36,
        endLng: Math.random() * 22 - 4,
        color: 'white',
        labelSize: 1,
        investorName: rand > 30 ? 'Melvin Capital' : 'Qatar Holding Unlimited',
      }
      return mock;
    });

    return arcsData;
  }
}
