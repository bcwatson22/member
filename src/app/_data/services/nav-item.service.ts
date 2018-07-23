import { Injectable } from '@angular/core';

import { NavItem } from './../models/nav-item';
import { NAVITEMS } from './../mock-nav-items';

@Injectable()

export class NavItemService {

  // Simple method to provide the components with the navData through a resolved promise, which the component will invariably bind to one 
  // of its class properties e.g. this.navItemService.getNavItems().then.....
  getNavItems(): Promise<NavItem[]> {

    return Promise.resolve(NAVITEMS);

  }

  // This builds an array of the nav items, for the NavComponent template to loop through and build the nav. This functionality was
  // originally written when I thought the nav would only show the routes//products that the user had, hence the fact 'dashboard' and
  // 'bills' were going to be omnipresent. However, I figured it's probably desirable - both from a design and upsell point of view - for
  // the nav to always have seven items.
  createUserSections(data: any): any {

    let sections = Object.keys(data);

    sections.push('dashboard', 'bills');

    return sections;

  }

  // As above, this will check that the nav items that the user is getting corresponds to the products they have. Fuck that for a bag of
  // chips! But if a dynamic nav were to be a thing in the future you could simply omit "mobile" or "tv" as one of the principle keys in
  // the userData and it would therefore not make it into the nav.
  matchNavItems(sections: any, data: any): any {

    let matched = [];

    for (let item of data) {

      let id = item.id;

      sections.indexOf(item.id) >= 0 ? matched.push(item) : sections;

    }

    return matched;

  }

  // Call the above two methods (to build the array and match user-owned products), then sort the nav based on each nav item's position
  // value - this is also used to calculate the direction for the router animation in AppComponent. I thought it might be cool to have a
  // drag and drop functionality that would allow the user to rearrange their nav into a desired order, e.g. for Bills to sit second,
  // which would update the position values in the data - but I ran outta time!
  sortNav(userData: any, navData: any): any {

    let userSections = this.createUserSections(userData);

    let filtered = this.matchNavItems(userSections, navData);

    filtered.sort(function(a, b) {

      return a.position - b.position;

    });

    return filtered;

  }

}
