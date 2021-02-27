import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-option',
  templateUrl: './filter-option.component.html',
  styleUrls: ['./filter-option.component.sass']
})
export class FilterOptionComponent implements OnInit {

  @Input() label: string;

  constructor() { }

  ngOnInit(): void {
  }

}
