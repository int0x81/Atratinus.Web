import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-campaign-modal-info',
  templateUrl: './campaign-modal-info.component.html',
  styleUrls: ['./campaign-modal-info.component.sass']
})
export class CampaignModalInfoComponent {

  @Input() name: string;

  @Input() value: string;

  constructor() { }
}
