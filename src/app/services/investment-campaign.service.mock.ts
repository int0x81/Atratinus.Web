import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { InvestmentCampaign } from '../models/investmentCampaign';

@Injectable({
  providedIn: 'root'
})
export class InvestmentCampaignMockService {
  
  readonly mockedInvestors = [
    {
      name: 'GAMCO INVESTORS, INC. ET AL',
      long: -73.69814512544758,
      lat: 40.97426910728413, 
    },
    {
      name: 'Saba Capital Management, L.P.',
      long: -73.97559738877787,
      lat: 40.75150682288953, 
    },
    {
      name: 'Coliseum Capital Management, LLC',
      long: -73.54181647330894,
      lat: 41.045321804074554, 
    },
    {
      name: 'Qatar Ventures Limited',
      long: 51.41814117946225,
      lat: 25.194980291662706
    },
    {
      name: 'ICAHN CARL C',
      long: -118.17948732863553,
      lat: 33.95655546326215, 
    },
    {
      name: 'Spectrum Equity Investors V L P',
      long: -0.1375419287189178,
      lat: 51.48295361826403, 
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

  acceptNewDate(start: boolean, date: Date): void {

    if(start) {
      this.startDate = date
    }
    else {
      this.endDate = date
    }
    
    if(this.startDate && this.endDate) {
      const investments = this.getInvestmentActivities();
      this.investmentActivitiesSubject.next(investments);
    }
  }

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
