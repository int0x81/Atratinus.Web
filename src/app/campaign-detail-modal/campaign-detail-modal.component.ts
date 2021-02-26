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
  stockPriceGain: number;

  constructor(private stockDataService: StockDataService, public activeModal: NgbActiveModal) { }

  setInvestmentCampaign(campaign: InvestmentCampaign) {

    this.investmentCampaign = campaign;

    this.stockData = this.stockDataService.getStockData(this.investmentCampaign.subjectCompanyISIN,
      this.investmentCampaign.startOfCampaign, this.investmentCampaign.endOfCampaign);

    this.stockPriceGain = (this.stockData[this.stockData.length - 1].value / this.stockData[0].value - 1) * 100;
  }
}
