import { Component, OnInit } from '@angular/core';
import { SharedService } from './../_data/services/shared.service';
import { UtilsService } from './../_data/services/utils.service';
import { WidgetAnimation } from './../_animations/widget';
import { SlideAnimation } from './../_animations/slide';
import { TabAnimation } from './../_animations/tab';

@Component({
  selector: 'phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss'],
  animations: [
    WidgetAnimation,
    SlideAnimation,
    TabAnimation
  ],
  providers: [
    UtilsService
  ]
})

export class PhoneComponent implements OnInit {

  title = 'Phone';

  public issues: any;

  public phone: any;
  public broadband: any;
  public calls: any;

  public sub: any;
  public widgetState: string;

  public phoneIssueState: string = 'inactive';
  public issueTab1State: string = 'inactive';

  constructor(
    private shared: SharedService,
    public utils: UtilsService
  ) {

    utils.getStatus();
    utils.getUserData();

  }

  // See the equivalent in AccountComponent.
  ngOnInit() {

    this.issues = this.utils.checkForIssues('phone');

    this.phone = this.utils.bindDataByKey('phone');
    this.broadband = this.utils.bindDataByKey('broadband');

    // Get the most recent calls to display in the table by using the reverseArray() method in our UtilsService. This is behind a
    // conditional to avoid async errors if called before the phone data has been retrieved.
    if (this.phone) this.calls = this.utils.reverseArray(this.phone.calls, 5);

    this.sub = this.shared.currentWidget.subscribe(state => this.widgetState = state);

    this.sub = this.shared.currentUi.subscribe(state => this[state.stateName] = state.stateValue);

  }

  // See the equivalent in AccountComponent.
  ngOnDestroy() {

    this.sub.unsubscribe();

  }

  // This calls our pie chart animation on hover of it in the view. This was built with CSS but isn't the best and ideally should be SVG!
  animateChart(event): void {

    let chart = event.currentTarget,
        spinner = chart.querySelectorAll('.spinner')[0],
        filler = chart.querySelectorAll('.filler')[0],
        mask = chart.querySelectorAll('.mask')[0];

    spinner.style.transform = 'rotate(.6turn)';

    filler.style.animation = 'fill 1s steps(1, end) forwards';
    mask.style.animation = 'mask 1s steps(1, end) forwards';

  }

}
