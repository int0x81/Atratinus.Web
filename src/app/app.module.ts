import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvestorMapPageComponent } from './investor-map-page/investor-map-page.component';
import { PersonaComponent } from './persona/persona.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CampaignDetailModalComponent } from './campaign-detail-modal/campaign-detail-modal.component';
import { StockPriceCounterComponent } from './stock-price-counter/stock-price-counter.component';
import { CampaignModalInfoComponent } from './campaign-modal-info/campaign-modal-info.component';
import { StockChartComponent } from './stock-chart/stock-chart.component';
import { FilterOptionComponent } from './filter-option/filter-option.component';
import { DaterangePickerComponent } from './daterange-picker/daterange-picker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { DemoMaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    InvestorMapPageComponent,
    PersonaComponent,
    DatePickerComponent,
    HeaderComponent,
    FooterComponent,
    CampaignDetailModalComponent,
    StockPriceCounterComponent,
    CampaignModalInfoComponent,
    StockChartComponent,
    FilterOptionComponent,
    DaterangePickerComponent,
    AutocompleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    DemoMaterialModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
