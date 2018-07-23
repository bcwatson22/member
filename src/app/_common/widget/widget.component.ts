import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})

export class WidgetComponent implements OnInit {

  // Input decorators are useful for when we want to pass data from parent to child components. In this example, the WidgetComponent is
  // used extensively throughout the app, and consists of common elements as well as optional ones.
  // e.g. every widget has a header, which is referenced in the widget's HTML declararion through what's called 'transclusion' through the
  // widget-header attribute - if a widget doesn't have this attribute it won't have a header. However, not every widget has an info bar,
  // so if we want one we need to include an [info] Input binding (the content of which is used in the Font Awesome icon) on the <widget>
  // element and add the info-message attribute to our <span class="message"> so that we can include this with transclusion.
  // The action button works in a similar way, with the content of the [action] binding being applied to a class to determine its layout.
  @Input() public action: false;
  @Input() public info: false;

  constructor() { }

  ngOnInit() {
  }

}
