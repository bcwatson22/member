import { Component, OnInit, OnChanges, SimpleChanges, SimpleChange, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from './../modal.component';
import { ProgressAnimation } from './../../../_animations/progress';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  animations: [
    ProgressAnimation
  ]
})

export class SearchResultsComponent implements OnChanges, OnInit {

  @Input() results: any;
  @Input() searchTerm: any;
  @Input() progressPercent: string;
  @Input() progressValue: string;

  public progressState: string;
  public progressPrev: string;
  public progressCurrent: string;
  public numOfResults: string;

  @Output() revertSearch = new EventEmitter<any>();

  constructor() {
  }

  // The only place in the app where we use the ngOnChanges lifecycle hook. It is called before ngOnInit, and is basically a way of
  // listening for changes in the value of an Input property - in this case when the user performs a keypress on the search bar in the
  // parent HeaderComponent. The reason the progress values are separate and not in an object (e.g. progressValues.percent and
  // progressValues.value) is that the SimpleChange(s) that we subscribe to only accepts primitive data types like string//number//bool.
  // The SimpleChange object contains previous and current values, but we are only interested the current as we will use this to /
  // overwrite the previous value (in this.progressCurrent) on update. When there is a change we assign the percent (for animation
  // parameter) and results (to tell the user how many results) as well as updating the animation state for the progress bar, prompting
  // the bar to change width.
  ngOnChanges(changes: SimpleChanges) {

    const percent: SimpleChange = changes.progressPercent,
          value: SimpleChange = changes.progressValue;

    if (percent && value) {

      this.progressCurrent = percent.currentValue;
      this.progressState = 'active';
      this.numOfResults = value.currentValue;

    }

  }

  ngOnInit() {
  }

  // This emits an event up to the parent HeaderComponent, when the user clicks the modal bg.
  clearSearch(): void {

    this.revertSearch.emit();

  }

  // Once the progress bar has finished animating, we use this callback to assign the current value to be previous (in preparation for
  // another keypress on the search bar) and update the animtion state, which also prepares the progress animation for a new state -
  // kinda like the router animation in AppComponent. There isn't a transition between 'active' and 'prev' states in the
  // ProgressAnimation so this happens without the user knowing or the interface changing.
  animationDone(): void {

    this.progressPrev = this.progressCurrent;
    this.progressState = 'prev';

  }

}
