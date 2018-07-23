import { Component, OnInit } from '@angular/core';
import { SharedService } from './../_data/services/shared.service';
import { UtilsService } from './../_data/services/utils.service';
import { WidgetAnimation } from './../_animations/widget';
import { SlideAnimation } from './../_animations/slide';
import { TabAnimation } from './../_animations/tab';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: [
    WidgetAnimation,
    SlideAnimation,
    TabAnimation
  ],
  providers: [
    UtilsService
  ]
})

export class AccountComponent implements OnInit {

  title = 'Account';

  // Our data bings for data referenced in our template.
  public account: any;
  public broadband: any;

  // Store the authorised person when the user creates one.
  public authorisedPerson: any;

  // Animation states.
  public authorisedInfoState: string = 'inactive';
  public authorisedInfoBarState: string = 'inactive';

  public authorisedPersonState: string = 'inactive';
  public authorisedTab1State: string = 'inactive';
  public authorisedTab2State: string = 'inactive';

  // Keeping tings DRY.
  public authorisedPersonArray: any = ['authorisedPersonName', 'authorisedPersonEmailAddress', 'authorisedPersonPhoneNumber'];

  // Animation states.
  public accessDetailsState: string = 'inactive';
  public accessTab1State: string = 'inactive';
  public accessTab2State: string = 'inactive';
  public accessTab3State: string = 'inactive';
  public accessTab4State: string = 'inactive';

  // Variable to store our SharedService.
  public sub: any;

  // Animation state.
  public widgetState: string;

  constructor(
    private shared: SharedService,
    public utils: UtilsService
  ) {

    // Get the userData, ready to be bound to the class properties in ngOnInit.
    utils.getUserData();

  }

  ngOnInit() {

    // Bind the bits of the userData that this view is concerned with, making it clean and easy to reference in the HTML template e.g.
    // {{account?.email.secondary}}. The question mark is called the 'Elvis Operator' and is used for async data - basically means
    // 'inject when receieved' instead of throwing an undefined error. There are other ways to do this, e.g. the | async pipe, but the
    // King of Pop wins for brevity!
    this.account = this.utils.bindDataByKey('account');
    this.broadband = this.utils.bindDataByKey('broadband');

    // Subscribe to changes in the widget state from our SharedService, animating in and out when the route changes.
    this.sub = this.shared.currentWidget.subscribe(state => this.widgetState = state);

    // Subscribe to changes in the UI state from our SharedService, in this instance it could be that the user is trying to 'Add another
    // authorised person' or 'Change password'. We reference the SharedService with 'this.sub' which is one of our component
    // classes above.
    this.sub = this.shared.currentUi.subscribe(state => this[state.stateName] = state.stateValue);

    // Check the sessionStorage to see if there is an authorised person defined, in which case show their details and not the 'We can
    // only talk to you about your account' info bar. In production this would obviously read from a database but I used SS for ease and
    // to illustrate the UI changes for the prototype.
    this.checkSession(this.authorisedPersonArray, 'hidden-content');

  }

  // In our route components where we have subscribed to our SharedService, we use the ngOnDestroy lifecycle hook to unsubscribe when
  // the user navigates to another route. Angular is generally pretty good at memory 'garbage collection', but it is good practise to
  // unsubscribe where we can to ensure less chance of memory leaks. The only place we don't need to do this is when we're subscribed to
  // router events, e.g. in our AppComponent.
  ngOnDestroy() {

    this.sub.unsubscribe();

  }

  // This saves the user-inputted values for their authorised person. In production this would write to a database (ideally Mongo or
  // another JS framework if the app eventually sits in a MEAN stack or similar.)
  saveToSession($event: any): void {

    let $parent = this.utils.getClosest(event.currentTarget, '.authorised-person-input'),
        inputDivs = $parent.querySelectorAll('.text-input'),
        valid = 0;

    // Loop through the inputs and grab their values.
    for (let input of inputDivs) {

      let value = input.children[0].value,
          label = input.children[1],
          camel = this.utils.toCamelCase('authorisedPerson' + label.innerHTML);

      // Primitive form validation. Store the item and continue the loop if valid, otherwise inform the user with a red background.
      if (value && sessionStorage) {

        sessionStorage.setItem(camel, value) ;
        valid++;

      } else {

        label.style.backgroundColor = 'crimson';
        label.style.color = 'white';

      }

    }

    // If we have three valid inputs, we can update our UI to animate out of the input tab and display non-editable versions of the
    // authorised person's details.
    if (valid === 3) {

      let classToggle = (this.authorisedInfoState === 'active') ? $event : null;

      this.checkSession(this.authorisedPersonArray, false);
      this.utils.toggleUiStates('authorisedTab1State', classToggle, 'authorisedTab2State', ['authorisedInfoState', 'authorisedInfoBarState']);

    }

  }

  removeFromSession(items: any): void {

    for (let item of items) {

      if (sessionStorage) {

        sessionStorage.removeItem(item);

      }

    }

  }

  // Check the sessionStorage for the presence of an authorised person, and prompt if necessary.
  checkSession(array: any, prompt: any): any {

    let object = {};

    for (let item of array) {

      let value = sessionStorage[item];

      if (sessionStorage[item]) {

        object[item] = value;

      }

    }

    this.authorisedPerson = Object.keys(object).length === 3 ? object : false;

    if (prompt) this.authorisedPersonPrompt();

  }

  // Toggle the UI states to prompt the user to add an authorised person to their account, or remove the user-input fields.
  authorisedPersonPrompt(): void {

    if (this.authorisedPerson) {

      this.utils.toggleUiStates('authorisedPersonState', 'info-source', 'authorisedTab2State', null);

    } else {

      this.utils.toggleUiStates('authorisedInfoState', 'info-source', 'authorisedInfoBarState', null);

    }

  }

}
