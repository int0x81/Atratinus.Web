import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { InvestmentCampaign } from './models/investmentCampaign';

@Injectable({
  providedIn: 'root'
})
export class InvestmentActivityService {
  
  readonly mockedInvestors = [
    {
      name: 'Melvin Capital',
      long: -73.99013151345478,
      lat: 40.732
    },
    {
      name: 'Qatar Ventures Limited',
      long: 51.41814117946225,
      lat: 25.194980291662706
    },
  ]

  readonly mockedSubjects = [
    {
      name: 'Saudi Aramco',
      ISIN: 'blablablawhatever',
      long: 46.813735829446095,
      lat:  24.52792939543635
    },
    {
      name: 'United Arabian Shipping Cooperation',
      ISIN: 'blablablawhatever',
      long: 54.47065263472806,
      lat:  24.418904415638757, 
    },
    {
      name: 'Carl ZEISS Meditech',
      ISIN: 'blablablawhatever',
      long: 10.10535372666695,
      lat:  48.786239734126, 
    },
    {
      name: 'Marquard & Bahls AG',
      ISIN: 'blablablawhatever',
      long: 10.002930764634934,
      lat:  53.54402308227203,//, 
    },
    {
      name: 'NPX Semiconducters SE',
      ISIN: 'blablablawhatever',
      long: 5.112243667759915,
      lat:  52.07463490378207, 
    },
    {
      name: 'Alphabet Inc',
      ISIN: 'blablablawhatever',
      long: -122.10722015421457,
      lat:  37.42077434166638,
    },
    {
      name: 'Microsoft Cooperation',
      ISIN: 'blablablawhatever',
      long: -122.10427993381138,
      lat:  47.71908907536549, 
    },
    {
      name: 'UBISOFT Studios SE',
      ISIN: 'blablablawhatever',
      long: -79.41975953268016,
      lat:  43.783936473038246, 
    },
    {
      name: 'Bank of China',
      ISIN: 'blablablawhatever',
      long: 121.25750944437658,
      lat:  31.086396382043922,
    },
    {
      name: 'Sydney Farmers United',
      ISIN: 'blablablawhatever',
      long: 151.01520554479902,
      lat:  -33.91661409700432,
    },
    {
      name: 'Johannesburg Blood Diamonds Limited',
      ISIN: 'blablablawhatever',
      long: 18.853112642437328,
      lat:  -33.898176489029524,
    },
  ]
  public readonly investmentActivitiesSubject: Subject<any> = new Subject<any>();

  startDate: Date;

  endDate: Date;

  constructor() { }

  acceptNewDateRange(dateRange: Date[]): void {

    this.startDate = dateRange[0];
    this.endDate = dateRange[1];
    const investments = this.getInvestmentActivities();
    this.investmentActivitiesSubject.next(investments);
  }

  getInvestmentActivities(): Map<string, InvestmentCampaign> {

    const amountMocks = Math.ceil(Math.random() * 30);
    const mockData = new Map<string, InvestmentCampaign>();

    for(let c = 0; c < amountMocks; c++) {

      const investor = this.getRandomInvestor();
      const subject = this.getRandomSubjectCompany();
      const endOfCampaign = new Date(this.endDate);
      endOfCampaign.setMonth(this.endDate.getMonth() - 1);
      const mock: InvestmentCampaign = {
        id: c.toString(),
        startOfCampaign: this.startDate,
        endOfCampaign: endOfCampaign,
        investorLat: investor.lat,
        investorLng: investor.long,
        subjectCompanyName: subject.name,
        subjectCompanyISIN: subject.ISIN,
        subjectCompanyLat: subject.lat,
        subjectCompanyLng: subject.long,
        investorName: investor.name,
        accessionNumberSEC: '000089183600000120'
      }
      mockData.set(c.toString(), mock);
    }

    return mockData;
  }

  getRandomInvestor() {
    return this.mockedInvestors[Math.floor(Math.random() * this.mockedInvestors.length)];
  }

  getRandomSubjectCompany() {
    return this.mockedSubjects[Math.floor(Math.random() * this.mockedSubjects.length)];
  }
}
