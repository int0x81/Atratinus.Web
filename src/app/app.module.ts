import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvestorMapPageComponent } from './investor-map-page/investor-map-page.component';
import { PersonaComponent } from './persona/persona.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CampaignDetailModalComponent } from './campaign-detail-modal/campaign-detail-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    InvestorMapPageComponent,
    PersonaComponent,
    DatePickerComponent,
    HeaderComponent,
    FooterComponent,
    CampaignDetailModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
