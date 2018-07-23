import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NavItemService } from './../../_data/services/nav-item.service';
import { UtilsService } from './../../_data/services/utils.service';
import { UserDataService } from './../../_data/services/user-data.service';
import * as globals from './../../_data/globals';

@Component({
  selector: 'navigation',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [
    NavItemService
  ]
})

export class NavComponent implements OnInit {

  // One of the ways we can communicate between components (if they're parent and child) is to use Input and Output decorators. Here, we
  // set up an EventEmitter to communicate with our parent (AppComponent) - this is called from the emitRoute method when a nav item
  // is clicked, see (click)="emitRoute(item.id)"" in the nav.component.html.
  @Output() newRoute = new EventEmitter<any>();

  public navSorted: any;

  public navData: any;

  public userData: any;

  constructor(
    private router: Router,
    private navItemService: NavItemService,
    public utils: UtilsService,
    private userDataService: UserDataService
  ) {

    this.getUserData();

  }

  ngOnInit(): void {

    this.getNavData();

  }

  getUserData(): void {

    this.userDataService.getUserData().then(data => this.userData = this.utils.getTargetUser(data, globals.currentUser));

  }

  getNavData(): void {

    this.navItemService.getNavItems().then(items => this.navSorted = this.navItemService.sortNav(this.userData, items));

  }

  // This method is called when the user clicks a nav item, and passes the clicked item's id to the parent component by 'emitting' through
  // our Output EventEmitter. This is then interpreted in the canWeRoute() method in AppComponent and decides whether we can route based
  // on whether the router is currently animating.
  emitRoute(targetRoute: string): void {

    this.newRoute.emit(targetRoute);

  }

}
