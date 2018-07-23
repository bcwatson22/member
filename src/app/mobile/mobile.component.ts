import { Component, OnInit } from '@angular/core';
import { SharedService } from './../_data/services/shared.service';
import { UtilsService } from './../_data/services/utils.service';
import { WidgetAnimation } from './../_animations/widget';

@Component({
  selector: 'mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss'],
  animations: [
    WidgetAnimation
  ],
  providers: [
    UtilsService
  ]
})

export class MobileComponent implements OnInit {

  title = 'Mobile';

  public mobile: any;

  public sub: any;
  public widgetState: string;

  constructor(
    private shared: SharedService,
    public utils: UtilsService
  ) {

    utils.getUserData();

  }

  // See the equivalent in AccountComponent.
  ngOnInit() {

    this.mobile = this.utils.bindDataByKey('mobile');

    this.sub = this.shared.currentWidget.subscribe(state => this.widgetState = state);

  }

  // See the equivalent in AccountComponent.
  ngOnDestroy() {

    this.sub.unsubscribe();

  }

}
