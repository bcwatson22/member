import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BroadbandComponent } from './broadband/broadband.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PhoneComponent } from './phone/phone.component';
import { HeaderComponent } from './_common/header/header.component';
import { NavComponent } from './_common/nav/nav.component';
import { WidgetComponent } from './_common/widget/widget.component';
import { AccountComponent } from './account/account.component';
import { BreadcrumbComponent } from './_common/breadcrumb/breadcrumb.component';
import { BillsComponent } from './bills/bills.component';
import { ModalComponent } from './_common/modal/modal.component';
import { BillComponent } from './_common/modal/bill/bill.component';
import { MobileComponent } from './mobile/mobile.component';
import { TvComponent } from './tv/tv.component';

import { SharedService } from './_data/services/shared.service';
import { StatusService } from './_data/services/status.service';
import { UserDataService } from './_data/services/user-data.service';

import { BillingDatePipe } from './_pipes/billing-date.pipe';
import { FormatDatePipe } from './_pipes/format-date.pipe';
import { FormatPhoneNoPipe } from './_pipes/format-phone-no.pipe';
import { MultiplyPipe } from './_pipes/multiply.pipe';
import { SearchPipe } from './_pipes/search.pipe';
import { SubtractPipe } from './_pipes/subtract.pipe';
import { ObjectLoopPipe } from './_pipes/object-loop.pipe';
import { SearchResultsComponent } from './_common/modal/search-results/search-results.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    BroadbandComponent,
    DashboardComponent,
    NavComponent,
    PhoneComponent,
    HeaderComponent,
    WidgetComponent,
    AccountComponent,
    BreadcrumbComponent,
    BillsComponent,
    ModalComponent,
    MobileComponent,
    TvComponent,
    BillComponent,
    SearchResultsComponent,
    BillingDatePipe,
    FormatDatePipe,
    FormatPhoneNoPipe,
    MultiplyPipe,
    SearchPipe,
    SubtractPipe,
    ObjectLoopPipe
  ],
  providers: [
    StatusService,
    SharedService,
    UserDataService
  ],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AppModule { }
