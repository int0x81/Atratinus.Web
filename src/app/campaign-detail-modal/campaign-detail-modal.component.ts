import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-campaign-detail-modal',
  templateUrl: './campaign-detail-modal.component.html',
  styleUrls: ['./campaign-detail-modal.component.sass']
})
export class CampaignDetailModalComponent {

  constructor(public activeModal: NgbActiveModal) { }
}
