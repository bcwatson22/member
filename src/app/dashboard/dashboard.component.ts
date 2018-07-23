import { Component, OnInit } from '@angular/core';
import { SharedService } from './../_data/services/shared.service';
import { UtilsService } from './../_data/services/utils.service';
import { WidgetAnimation } from './../_animations/widget';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    WidgetAnimation
  ],
  providers: [
    UtilsService
  ]
})

export class DashboardComponent implements OnInit {

  title = 'Dashboard';

  public status: any;
  public issuesBB: any;
  public issuesPhone: any;
  public issuesTV: any;

  public account: any;
  public billing: any;
  public latestBill: any;
  public broadband: any;
  public phone: any;
  public mobile: any;
  public tv: any;

  public sub: any;
  public widgetState: string;

  constructor(
    private shared: SharedService,
    public utils: UtilsService
  ) {

    utils.getStatus();
    utils.getUserData();

  }

  // See the equivalent in AccountComponent.
  ngOnInit() {

    // Because this is the 'homepage' as such, we need to grab more data than in our other route components as we display a smorgasbord
    // of info to the user. These issues will display a different icon and message in the 'Products and services' widget if there are
    // unresolved issues for either BB, Phone or TV (and if the user has these as products).
    this.issuesBB = this.utils.checkForIssues('broadband');
    this.issuesPhone = this.utils.checkForIssues('phone');
    this.issuesTV = this.utils.checkForIssues('tv');

    // Bind each relevant area of data in its own properties for cleanliness, brevity and ease of reference.
    this.account = this.utils.bindDataByKey('account');
    this.broadband = this.utils.bindDataByKey('broadband');
    this.billing = this.utils.bindDataByKey('billing');
    this.latestBill = this.utils.bindDataByKey('latestBill');
    this.phone = this.utils.bindDataByKey('phone');
    this.mobile = this.utils.bindDataByKey('mobile');
    this.tv = this.utils.bindDataByKey('tv');

    this.sub = this.shared.currentWidget.subscribe(state => this.widgetState = state);

  }

  // See the equivalent in AccountComponent.
  ngOnDestroy() {

    this.sub.unsubscribe();

  }

}
