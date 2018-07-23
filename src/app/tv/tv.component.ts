import { Component, OnInit } from '@angular/core';
import { SharedService } from './../_data/services/shared.service';
import { UtilsService } from './../_data/services/utils.service';
import { WidgetAnimation } from './../_animations/widget';

@Component({
  selector: 'tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss'],
  animations: [
    WidgetAnimation
  ],
  providers: [
    UtilsService
  ]
})

export class TvComponent implements OnInit {

  title = 'TV';

  public issues: any;

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

    this.issues = this.utils.checkForIssues('tv');

    this.tv = this.utils.bindDataByKey('tv');

    this.sub = this.shared.currentWidget.subscribe(state => this.widgetState = state);

  }

  // See the equivalent in AccountComponent.
  ngOnDestroy() {

    this.sub.unsubscribe();

  }

}
