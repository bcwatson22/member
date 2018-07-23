import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, PlatformLocation } from '@angular/common';
import { ModalAnimation } from './../_animations/modal';
import { WidgetAnimation } from './../_animations/widget';
import { SharedService } from './../_data/services/shared.service';
import { UtilsService } from './../_data/services/utils.service';

@Component({
  selector: 'bills',
  exportAs: 'tooltip',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
  animations: [
    ModalAnimation,
    WidgetAnimation
  ],
  providers: [
    UtilsService
  ]
})

export class BillsComponent implements OnInit {

  title = 'Bills';

  // Create variables to bind our data to.
  public currentUser: any;
  public account: any;
  public billing: any;
  public bills: any;
  public latestBill: any;
  public activatedBill: any;

  // Animation properties.
  public billModalState: string;
  public widgetTop: string = '50%';
  public widgetLeft: string = '50%';

  // Variable to store our SharedService.
  public sub: any;

  // Animation state.
  public widgetState: string;

  constructor(
    private location: Location,
    private platform: PlatformLocation,
    private router: Router,
    private shared: SharedService,
    public utils: UtilsService
  ) {

    // See AccountComponent.
    utils.getUserData();

    // As we're fucking about with the HTML5 History API when a user views an individual bill, e.g. http://localhost:4200/bills/12, we
    // need to handle the forward and back buttons.
    platform.onPopState((e) => {

      // Get the route parameter from our UtilsService.
      let billParam = utils.getRouteParam();

      // Animate the bill being opened if the user goes 'forward' or 'back' to a bill overview.
      if (billParam) {

        this.showOverview(billParam, true, false);

      // Otherwise, close the bill modal.
      } else {

        this.modalClose(false);

      }

    });

  }

  ngOnInit() {

    // See the equivalent in AccountComponent.
    this.account = this.utils.bindDataByKey('account');
    this.billing = this.utils.bindDataByKey('billing');

    // Make sure the bills are displayed new to old, so that thir latest one appears first with more detail.
    this.bills = this.utils.reverseArray(this.billing.bills, 'all');
    this.latestBill = this.utils.bindDataByKey('latestBill');

    // Get the route parameter.
    let billParam = this.utils.getRouteParam();

    // If the user loads the page to a URL with a bill route parameter, show the relevant bill overview state, but don't animate.
    if (billParam) {

      this.showOverview(billParam, false, false);

    }

    // See the equivalent in AccountComponent.
    this.sub = this.shared.currentWidget.subscribe(state => this.widgetState = state);

  }

  // See the equivalent in AccountComponent.
  ngOnDestroy() {

    this.sub.unsubscribe();

  }

  // Get layout information about which widget the user has clicked. This was originally used to animate the bill modal from it's
  // releavnt bill in the page, but I'm now just using 'transform: scale()' in the ModalAnimation.
  getWidgetCoordinates(event: any): void {

    let widget = event.currentTarget,
        width = widget.offsetWidth,
        height = widget.offsetHeight,
        offset = widget.getBoundingClientRect(),
        top = offset.top + (height / 2),
        left = offset.left + (width / 2);

    this.widgetTop = top + 'px';
    this.widgetLeft = left + 'px';

  }

  // Show our bill modal overview.
  showOverview(id: string, animate: boolean, clickEvent: any): void {

    // Grab the relevant bill from our data using the ES6 Array.find() method to match its id to the parameter passed to this method.
    let targetBill = this.billing.bills.find(o => o.id == id);

    // Use Angular's built in router method to construct a URL tree.
    let url = this.router.createUrlTree(['/bills', id]).toString();

    // If we want to animate the bill opening, update the animation state to trigger it.
    if (animate) {

      this.billModalState = 'animate';

      // If it was launched from a click rather than a page load or 'popstate', get the origin widget's layout information and then
      // update the URL through the History API.
      if (clickEvent) {

        this.getWidgetCoordinates(clickEvent);
        this.location.go(url);

      }

    // If we don't want to animate (e.g. on page load) simply set the animation state to 'active' - for which there is no transition defined in the ModalAnimation so it will just set it to 'display: block'.
    } else {

      this.billModalState = 'active';
      this.location.replaceState(url);

    }

    // Set the activatedBill Input property in the child component (BillComponent) to feed it the relevant bill data.
    this.activatedBill = targetBill;

  }

  // Close the modal, by clicking either the close button, the mdoal bg, or 'back' or 'forward'.
  modalClose(history: boolean): void {

    // Update the aniamtion state.
    this.billModalState = null;

    // If we're closing NOT through 'popstate', update the URL to read '/bills';
    if (history) {

      let url = this.router.createUrlTree(['/bills']).toString();

      this.location.go(url);

    }

  }

  // This is a performance enhancement we use when iterating over large arrays with ngFor. It basically helps Angular remember which
  // items are in the collection through a unique identifier - so that if one is added or removed Angular will create or destroy only 
  // the things that changed. You'd expect this to be built in, but there you go!
  trackFunction(index, item) {

    return index;

  }

}
