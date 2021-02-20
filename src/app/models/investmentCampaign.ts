export interface InvestmentCampaign {

  id: string;
  investorName: string,
  investorLat: number;
  investorLng: number;
  subjectCompanyName: string;
  subjectCompanyLat: number;
  subjectCompanyISIN: string;
  subjectCompanyLng: number;
  startOfCampaign: Date;
  endOfCampaign: Date;
  accessionNumberSEC: string;
}
