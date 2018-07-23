import { Component, OnInit } from '@angular/core';
import { UtilsService } from './../_data/services/utils.service';
import { SharedService } from './../_data/services/shared.service';
import { WidgetAnimation } from './../_animations/widget';
import { SlideAnimation } from './../_animations/slide';
import { TabAnimation } from './../_animations/tab';
import { LoaderAnimation } from './../_animations/loader';
import { GraphXAnimation } from './../_animations/graph-x';

@Component({
  selector: 'broadband',
  templateUrl: './broadband.component.html',
  styleUrls: ['./broadband.component.scss'],
  animations: [
    WidgetAnimation,
    SlideAnimation,
    TabAnimation,
    LoaderAnimation,
    GraphXAnimation
  ],
  providers: [
    UtilsService
  ]
})

export class BroadbandComponent implements OnInit {

  title = 'Broadband';

  public issues: any;

  public broadband: any;

  public sub: any;
  public widgetState: string;

  public speedTestState: string = 'inactive';
  public speedTab1State: string = 'inactive';
  public speedTab2State: string = 'inactive';
  public speedLoaderState: string = 'inactive';

  public downloadValues: any = {};
  public uploadValues: any = {};

  public downloadState: string = 'inactive';
  public uploadState: string = 'inactive';

  public iconClasses: any = ['fa-check', 'fa-exclamation-triangle'];

  constructor(
    private shared: SharedService,
    public utils: UtilsService
  ) {

    utils.getStatus();
    utils.getUserData();

  }

  // See the equivalent in AccountComponent.
  ngOnInit() {

    // Check for any unresolved Broadband issues, which will display a different UI if so.
    this.issues = this.utils.checkForIssues('broadband');

    this.broadband = this.utils.bindDataByKey('broadband');

    this.sub = this.shared.currentWidget.subscribe(state => this.widgetState = state);

    this.sub = this.shared.currentUi.subscribe(state => this[state.stateName] = state.stateValue);

  }

  // See the equivalent in AccountComponent.
  ngOnDestroy() {

    this.sub.unsubscribe();

  }

  // This mimics an API call to get values from abroadband speed test. It wil display a CSS loader while we 'fetch' the data, then a
  // second later bind the values to our class properties, disable the loader and run the speed test.
  getSpeedValues(): any {

    this.speedLoaderState = 'active';

    setTimeout(() => {

      this.downloadValues.upper = 100;
      this.downloadValues.lower = 6;
      this.downloadValues.speed = 53;
      this.uploadValues.upper = 20;
      this.uploadValues.lower = 5;
      this.uploadValues.speed = 4;

      this.speedLoaderState = 'inactive';

      this.runSpeedTest();

    }, 1000);

  }

  // Calculate the percentages to pass to our GraphXAnimation, both for the bar widths and for the range keys.
  runSpeedTest(): void {

    this.downloadValues.barWidth = this.utils.calculatePercentage(this.downloadValues.speed, this.downloadValues.upper);
    this.uploadValues.barWidth = this.utils.calculatePercentage(this.uploadValues.speed, this.uploadValues.upper)
    this.downloadValues.range = this.utils.calculatePercentage(this.downloadValues.lower, this.downloadValues.upper);
    this.uploadValues.range = this.utils.calculatePercentage(this.uploadValues.lower, this.uploadValues.upper);

    // Work out whether the speed is in the expected range, which decides whether a bar is orange, which icon to use and which message
    // to display in the info bar.
    this.downloadValues.expected = (this.downloadValues.speed < this.downloadValues.lower) ? false : true;
    this.uploadValues.expected = (this.uploadValues.speed < this.uploadValues.lower) ? false : true;

    // Run the speed test animations for download and upload speeds.
    this.updateSpeedTestUi('download');
    this.updateSpeedTestUi('upload');

    // Update the info speed banner depending on whether the speeds are expected or not.
    this.updateSpeedInfoBanner();

  }

  // Bind all of the speed test values to the UI.
  updateSpeedTestUi(metric: string): void {

    // Target metric.
    let $metric = <HTMLElement>document.querySelectorAll('.speed.' + metric)[0];

    if ($metric) {

      // Store our elements in variables to avoid multiple costly DOM lookups.
      let $bar = <HTMLElement>$metric.querySelectorAll('.bar')[0],
          $icon = <HTMLElement>$metric.querySelectorAll('.bar-indicator')[0],
          $range = <HTMLElement>$metric.querySelectorAll('.range')[0],
          $upper = <HTMLElement>$metric.querySelectorAll('.range-upper')[0],
          $lower = <HTMLElement>$metric.querySelectorAll('.range-lower')[0],
          $speed = <HTMLElement>$metric.querySelectorAll('.speed-actual')[0];

      // Reference our target component classes through our metric parameter.
      let values = metric + 'Values',
          state = metric + 'State',
          expected = this[values].expected,
          barColour = (expected === true) ? '#6ca754' : '#fe9927',
          iconClass = (expected === true) ? this.iconClasses[0] : this.iconClasses[1],
          perSecond = 'MB/s';

      // Add the speed data values to the UI, show correct icon and bar colours, add margin to make the range accurate and finally once
      // the UI is ready update the animation state to animate in the tab and bars.
      if (typeof(expected) !== 'undefined') {

        this.utils.updateElemText($upper, this[values].upper + perSecond);
        this.utils.updateElemText($lower, this[values].lower + perSecond);
        this.utils.updateElemText($speed, this[values].speed + perSecond);

        this.utils.updateElemClass($icon, true, [iconClass]);

        $range.style.marginLeft = this[values].range + '%';

        this[values].barColour = barColour;

        this[state] = 'active';

      // This is called through revertSpeedTest(), when the user collapses the tab.
      } else {

        this.utils.updateElemClass($icon, false, this.iconClasses);

        this[state] = 'inactive';

      }

    }

  }

  // Update the info speed banner depending on whether the speeds are expected or not.
  updateSpeedInfoBanner(): void {

    let $info = <HTMLElement>document.querySelectorAll('.speed-results .info')[0],
        $infoIcon = <HTMLElement>$info.querySelectorAll('.fa')[0],
        $infoMessage = <HTMLElement>$info.querySelectorAll('.message')[0],
        expectedDownload = (this.downloadValues.expected === true),
        expectedUpload = (this.uploadValues.expected === true);

    this.utils.updateElemClass($infoIcon, false, this.iconClasses);

    if (expectedDownload && expectedUpload) {

      this.utils.updateElemClass($infoIcon, true, [this.iconClasses[0]]);
      this.utils.updateElemText($infoMessage, 'Speeds are within the expected range for your line.');

    } else {

      this.utils.updateElemClass($infoIcon, true, [this.iconClasses[1]]);
      this.utils.updateElemText($infoMessage, 'It looks like your speed is below what\'s expected.');

    }

  }

  // Revert all o de above if the user collapses the tab.
  revertSpeedTest(): void {

    this.downloadValues = {};
    this.uploadValues = {};

    this.updateSpeedTestUi('download');
    this.updateSpeedTestUi('upload');

  }

}
