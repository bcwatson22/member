import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// A shared service is used for when two components need to communciate with each other (or have synced values) and they are not child
// and parent - in which case they can use Input and Output a la the HeaderComponent. It is only imported once - in the AppModule -
// making it a singleton and allowing us to ensure that certain properties and states are in sync throughout the app. In our app it is
// currently used for two things - maintaining the widgetState, which is updated in the AppComponent but read in all seven of our route
// components (DashboardComponent, AccountComponent etc), and also for updating the UI states which are used for UI animations (such as
// the speed test in BroadbandComponent).

// The latter is necessary because various components use the toggleUiStates() method in our UtilsService, and to keep things DRY it is
// best to update the relevant animation states in various components from one place: here.

// If the app grows it is advisable to prefix these animation states with the component name, otherwise there may be conflicts. - e.g.
// when the BroadbandComponent has its own 'issueState' (like in PhoneComponent) and therefore its own 'issueTab1State', clicking the
// 'See issues' button on the Broadband view could inadvertently update the same state in the Phone view. This wouldn't happen if they
// were 'broadbandIssueTab1State' and 'phoneIssueTab1State' respectively.

@Injectable()
export class SharedService {

  // We use a BehaviourSubject in our SharedService. It is a type of Subject, and a Subject is a special type of Observable, so you can
  // subscribe to messages and data that inform decisions in the app when they change. A Subject differs to an Observable in that it is
  // an 'observer' as well as an observable so you can send values to a Subject in addition to subscribing to it. Unique features of a
  // BehaviourSubject are:
  // - needs an initial value - widgetSubject = 'none' - as it always returns a value on subscription even if it hasn't received a next()
  // - upon subscription it returns the last value of the subject. A regular observable only triggers when it receives an onnext()
  // - at any point you can retrieve the last value of the subject in a non-observable code using the getValue() method
  private widgetSubject = new BehaviorSubject<string>('none');

  // This asObservable value is what we subscribe to in our component, and use to bind to component class properties on change, e.g.
  // this.shared.currentWidget.subscribe(state => this.widgetState = state);
  currentWidget = this.widgetSubject.asObservable();

  // For the uiSubject we use an object as opposed to the string used for the widgetSubject (as this only consists of two possibilities -
  // 'routing' and 'slide') as for the uiSubject we need to update various state properties with different values (through the
  // toggleUiStates() method in UtilsService). Note the data type definition - <any>.
  private uiSubject = new BehaviorSubject<any>({
      stateName: 'default',
      stateValue: 'inactive'
    });

  // Again, this is what we subscribe to in our component, updating the values in our animation states through referencing them using
  // square brack notation, e.g. this.shared.currentUi.subscribe(state => this[state.stateName] = state.stateValue);
  currentUi = this.uiSubject.asObservable();

  constructor() {
  }

  // When we want to update the subject, we simply call the next() method on it, passing the string value as a parameter. For the
  // widgetSubject this is only called from AppComponent - but calling 'this.shared.updateWidgetState('slide')' will update the current
  // value for this across the app, as all seven of our route components is subscribed to it.
  updateWidgetState(state: string): void {

    this.widgetSubject.next(state);

  }

  // Again, we update the uiSubject by calling next(), passing the state object as a parameter. This is called whenever the user clicks a
  // button linked to a uiToggle, through the toggleUiStates() method in UtilsService.
  updateUiState(state: any): void {

    this.uiSubject.next(state);

  }

}
