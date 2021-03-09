import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.sass']
})
export class SingleSelectComponent implements OnInit {

  @Input() id: string;
  @Input() placeholder: string;
  @Input() elements: Array<string>;

  constructor() { }

  ngOnInit(): void {
  }

}
