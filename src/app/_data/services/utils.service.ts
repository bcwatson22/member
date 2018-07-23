import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { SharedService } from './shared.service';
import { StatusService } from './status.service';
import { UserDataService } from './user-data.service';
import * as globals from './../globals';

// This is a file containing common methods and functions that are used in various places across the app. They are called in components
// by calling something like 'this.utils.reverseArray()' and most of them either return something, or fetch data in preparation for it
// to be then used in the component. A lot of it is fairly sef-explanatory vanillaJS, but I've commented the toggleUiStates() as that is
// a little bit more complex.

@Injectable()
export class UtilsService {

  private status;

  private userData;
  private currentUser;

  private account;
  private billing;
  private latestBill;
  private broadband;
  private phone;
  private mobile;
  private tv;

  private currentUiStates: any = {};

  constructor(
    private location: Location,
    private sharedService: SharedService,
    private statusService: StatusService,
    private userDataService: UserDataService
  ) {
  }

  // getUserData(): void {
  //
  //   this.userDataService.getUserData().subscribe(
  //     (val) => {
  //       this.userData = val;
  //     },
  //     (err) => console.log(err),
  //     () => {
  //       this.getTargetUser(1);
  //     }
  //   );
  //
  // }

  getUserData(): any {

    this.userDataService.getUserData().then(
      (val) => {
        this.userData = val;
        this.getTargetUser(val, globals.currentUser);
      }
    );

  }

  getTargetUser(data: any, id: number): any {

    let targetUser = data.find(o => o.id === id);

    this.currentUser = targetUser;

    return targetUser;

  }

  getStatus(): void {

    this.statusService.getStatus().then(
      (val) => {
        this.status = val[0];
      }
    );

  }

  reverseArray(array: any, selection: any): any {

    array.sort(function(a, b) {

      return b.id - a.id;

    });

    if (selection !== 'all') {

      let range = array.slice(0, selection);

      return range;

    } else {

      return array;

    }

  }

  getLatestBill(bills: any[]): any {

    let latestBill = bills.slice(bills.length -1);

    return latestBill[0];

  }

  bindData(object: any): any {

    let binding;

    binding = this[object];

    return binding;

  }

  bindDataByKey(key: string): any {

    let targetObject = this.currentUser,
        binding;

    if (key === 'latestBill') {

      binding = this.getLatestBill(targetObject.billing.bills);

    } else {

      binding = targetObject[key];

    }

    return binding;

  }

  matchBaseRoute(current: string, target: string): any {

    current = current.indexOf('/') >= 0 ? current.substring(0, current.indexOf('/')) : current;
    target = target.indexOf('/') >= 0 ? target.substring(0, target.indexOf('/')) : target;

    if (current === target) {

      return true;

    } else {

      return false;

    }

  }

  getRouteParam(): string {

    let urlPath = this.location.path().substr(1);

    let parameter;

    if (urlPath.indexOf('/') >= 0) {

      parameter = urlPath.substring(urlPath.lastIndexOf('/') + 1, urlPath.length);

    }

    return parameter;

  }

  checkForIssues(service: string): any {

    let target = this.status[service];

    let issues = target.filter(o => o.status.resolved === false);

    if (issues.length) {

      return issues;

    } else {

      return null;

    }

  }

  getClosest(elem: any, selector: string): any {

    for ( ; elem && elem !== document; elem = elem.parentNode ) {

        if (elem.matches(selector)) return elem;

    }

    return null;

  }

  toggleButton(event: any): any {

    let $button = event.currentTarget,
        $icon = $button.querySelectorAll('.fa')[0],
        $text = $button.querySelectorAll('span strong')[0];

    if ($icon.classList.contains('fa-toggle-on')) {

      this.updateElemClass($icon, false, ['fa-toggle-on']);
      this.updateElemClass($icon, true, ['fa-toggle-off']);
      this.updateElemText($text, 'OFF');

    } else {

      this.updateElemClass($icon, false, ['fa-toggle-off']);
      this.updateElemClass($icon, true, ['fa-toggle-on']);
      this.updateElemText($text, 'ON');

    }

  }

  updateElemClass(elem: any, add: boolean, classes: any): void {

    add ? elem.classList.add(...classes) : elem.classList.remove(...classes);

  }

  updateElemText(elem: any, text: string): void {

      elem.innerHTML = text;

  }

  calculatePercentage(findValue: number, ofValue: number): string {

    let percentage = ((findValue / ofValue) * 100).toFixed(2);

    return percentage;

  }

  revealPassword(event: any): void {

    let $parent = this.getClosest(event.currentTarget, '.text-input');

    if ($parent) {

      let $input = $parent.querySelectorAll('input')[0];

      ($input.getAttribute('type') === 'password') ? $input.setAttribute('type', 'text') : $input.setAttribute('type', 'password');

    }

  }

  toCamelCase(str: string): string {

    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');

  }

  // This originally lived in one route component, but when I used it across different ones it made sense to move it to here, and update
  // animation values for UI states though the SharedService.
  toggleUiStates(toggleState: string, element: any, addState: string, removeStates: any): void {

    // First off, remove the active states back to their default 'inactive' state. We have a local record of what state is what in the
    // currentUiStates object, to keep track of where everything is at at any given moment. The 'removeStates' parameter is an arary,
    // which we loop through and set both the local state by referencing our UtilsService property with 'this.currentUiStates[state]',
    // and then set the actual component state through our SharedService.
    if (removeStates) {

      for (let state of removeStates) {

        this.currentUiStates[state] = 'inactive';
        this.sharedService.updateUiState({stateName: state, stateValue: 'inactive'});

      }

    }

    // We then toggle the desired state by checking our local record, and either assigning it to be 'active' or 'inactive' depending on
    // its current value. We then update the actual state in the component through the SharedService.
    this.currentUiStates[toggleState] = (this.currentUiStates[toggleState] === 'active') ? 'inactive' : 'active';
    this.sharedService.updateUiState({stateName: toggleState, stateValue: this.currentUiStates[toggleState]});

    // If we want to add (rather than remove or toggle, e.g. for the first tab in a hidden set of tabs) a state, we again update both
    // our local record and the actual state in the component.
    this.currentUiStates[addState] = 'active';
    this.sharedService.updateUiState({stateName: addState, stateValue: this.currentUiStates[addState]});

    // If we want to update a CSS class on the parent of the clicked button we do that here, by using the getClosest() method above -
    // which is kinda a vanillaJS mimic of jQuery's .parents() or .closest() functions.
    if (element) {

      let $parent,
          toggleClass;

      if (typeof(element) === 'object') {

        $parent = this.getClosest(element.currentTarget, 'widget');
        toggleClass = 'toggle-active';

      } else {

        $parent = this.getClosest(document.querySelectorAll('.' + element)[0], 'widget');
        toggleClass = element + '-dynamic';

      }

      if ($parent) $parent.classList.toggle(toggleClass);

    }

  }

}
