import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LineData } from 'lightweight-charts';

import { InvestmentCampaign } from '../models/investmentCampaign';
import { StockDataService } from '../stock-data.service';

@Component({
  selector: 'app-campaign-detail-modal',
  templateUrl: './campaign-detail-modal.component.html',
  styleUrls: ['./campaign-detail-modal.component.sass']
})
export class CampaignDetailModalComponent {

  investmentCampaign: InvestmentCampaign;

  stockData: LineData[];
  campaignStockPriceGain: number;

  constructor(private stockDataService: StockDataService, public activeModal: NgbActiveModal) { }

  setInvestmentCampaign(campaign: InvestmentCampaign) {

    this.investmentCampaign = campaign;

    this.stockData = this.stockDataService.getStockData(this.investmentCampaign.subjectCompanyISIN,
      this.investmentCampaign.startOfCampaign, this.investmentCampaign.endOfCampaign);

    const campaignPrices = this.getOpenAndClosingPrices()

    this.campaignStockPriceGain = (campaignPrices.end / campaignPrices.start - 1) * 100;
  }

  getOpenAndClosingPrices(): any {

    let start: number;
    let end: number;

    for(let datum of this.stockData) {

      if(datum.time.toLocaleString().localeCompare(this.investmentCampaign.startOfCampaign.toISOString().substring(0, 10)) === 0) {
        start = datum.value
      }
      else if(datum.time.toLocaleString().localeCompare(this.investmentCampaign.endOfCampaign.toISOString().substring(0, 10)) === 0) {
        end = datum.value
      }
    }

    return { start: start, end: end }
  }
}
