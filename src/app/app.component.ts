import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { RouterAnimation } from './_animations/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';
import { NavItem } from './_data/models/nav-item';
import { NavItemService } from './_data/services/nav-item.service';
import { SharedService } from './_data/services/shared.service';
import { UtilsService } from './_data/services/utils.service';
import { UserDataService } from './_data/services/user-data.service';
import * as globals from './_data/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    RouterAnimation
  ],
  providers: [
    NavItemService,
    UtilsService
  ]
})

export class AppComponent implements OnInit {

  // This is the 'master' component for the app and does not actually contain much template code itself. It serves more to control the
  // route animation and decide whether we can route (based on whether the route animation is currently happening) to avoid bugs.

  // Each component class has its own properties. These must be public (regardless of what the NG tutorials say) for production as they
  // are accessed in the HTML templates, and are referenced from the component methods (funcs) with 'this' - e.g. this.currentPage. It
  // is good practice to define an expected data type, and a default if possible. If the data is an object or array we can use 'any'.
  public currentPage: string;
  public targetPage: string;
  public routerState: string = 'none';
  public routerAnimating: boolean;

  public navItems: any;
  public userData: any;

  // The constructor is called before ngOnInit and isn't part of the component lifecycle; it is where things are prepared for use
  // further down in the component. It is used for dependency injection and services, and creates a local reference to an external
  // object or class which is imported at the top of a component. e.g. here we grab the userData at the first instance so that it is
  // available ASAP for use by other methods. Constructors shouldn't contain more code than is necessary!
  constructor(
    private router: Router,
    private navItemService: NavItemService,
    private shared: SharedService,
    public utils: UtilsService,
    private userDataService: UserDataService
  ) {

    // We call our user data service, which returns a resolved promise that we then bind to our userData above - referenced with
    // this.userData - through our utils service. The utils service is where common functions and methods live, and is imported into
    // most of the components in our app to avoid duplication of code and keep things nice and DRY. Here it is used to filter the entire
    // user database to just our target user, which we define in the globals data file.
    this.userDataService.getUserData().then(data => this.userData = this.utils.getTargetUser(data, globals.currentUser));

    // This is how we work out which way the 'scroll' animation on the router should go. E.g. if the user is on the Account route and
    // clicks Dashboard it should scroll up, whereas if they were to click Mobile it should scroll down. We reference the NG router,
    // filter just the events we're interested in (in this case NavigationStart), and use the pairwise function to put the previous and
    // new events into an array before subscribing to any change in the router.
    this.router.events
      .filter(event => event instanceof NavigationStart)
      .pairwise()
      .subscribe((value: [NavigationStart, NavigationStart]) => {

        // Here we bind the URL values to the current and targetPage properties of the component class, stripping out the leading slash.
        this.currentPage = value[0].url.substr(1);
        this.targetPage = value[1].url.substr(1);

        // Make sure we are looking at another route, and not a sub component. This was used for the BillsComponent.
        let sameBase = utils.matchBaseRoute(this.currentPage, this.targetPage);

        if (!sameBase) {

          // If we're navigating to a different route, use the ES2015 .find() function to match the new and previous routes to their
          // counterparts in the navItems data.
          let currentItem = this.navItems.find(o => o.id === this.currentPage);
          let targetItem = this.navItems.find(o => o.id === this.targetPage);

          // The navData has a 'position' property that is used to structure the nav order. Here we pass the position property to a
          // component method to work out whether to animate up or down based on the routes' corresponding position value.
          this.routerState = (this.navItems.length) ? this.animationDirection(currentItem.position, targetItem.position) : 'next';

        }

    });

  }

  // This is one of the most important lifecycle hooks we use in the app, and is called when the app is ready to go, after the
  // constructor has initialised all of the classes and services. Think of it kinda like document.ready!
  ngOnInit(): void {

    // Here we use it to call our nav item service and then sort the nav array based on each item's position property.
    this.navItemService.getNavItems().then(items => this.navItems = this.navItemService.sortNav(this.userData, items));

  }

  // This is used to work out whether to animate up or down, when a NavigationStart event is called on the router.
  animationDirection(current: number, target: number): string {

    let direction = (current < target) ? 'next' : 'prev';

    return direction;

  }

  // This is an NG callback method when the router starts animating. We set a boolean on the component to ensure we can't reroute halfway
  // through, and also update our 'widgetState' property on the shared service to keep everything in sync - and to work out when we can
  // animate the new route's widgets.
  animationStart(event: any): void {

    this.routerAnimating = true;

    this.shared.updateWidgetState('routing');

  }

  // Another NG callback - this time called when the route animation has finished. See the output in the app.component.html for how
  // it's called. We can now set the boolean to false - allowing us to reroute - then (very importantly) set the animation state to
  // 'none'. This is required so that whenever we reroute, we can go either up or down from a state of 'none' - otherwise it would never
  // animate as we would never reset the initial router animation state and there wouldn't be a change! Finally we tell our shared
  // service to set the widget state on the new route component to slide, which will cause the widgets to slide and fade in.
  animationDone(event: any): void {

    this.routerAnimating = false;
    this.routerState = 'none';

    this.shared.updateWidgetState('slide');

  }

  // This is called whenever the user clicks one of the links in the main nav. It only allows naviagtion to occur if the router isn't
  // currently routing - this.router.navigate is the equivalent of hardcoding routerLink="/dashboard" onto the HTML anchor itself,
  // kinda like window.location vs href="".
  canWeRoute(targetRoute: string): boolean {

    if (!this.routerAnimating) {

      this.router.navigate(['/' + targetRoute]);

      return true;

    } else {

      return false;

    }

  }

  // The below was used as an alternative to the boolean canWeRoute, but turned out to be a bit buggy. I decided to leave it in here
  // though, as it could prove useful for future dev!

  // handleDone(event: AnimationTransitionEvent): void {
  //
  //   // console.group( 'Done animating' );
  //   // console.log( 'From:', event.fromState );
  //   // console.log( 'To:', event.toState );
  //   // console.log( 'Actual State:', this.routerState );
  //   // console.groupEnd();
  //
  //   // If the animation was allowed to complete fully, then the event.toState should
  //   // match the actual state of the trigger (and the event.totalTime should be
  //   // accurate). HOWEVER, if the current transition was interrupted, and the 'done'
  //   // event is just a byproduct of that premature finish, then the event.toState
  //   // will NOT MATCH the current state (and the event.totalTime will not be accurate).
  //   if (( this.routerState !== 'none' ) && ( this.routerState === event.toState )) {
  //
  //     this.routerState = 'none';
  //
  //   }
  //
  // }

}
