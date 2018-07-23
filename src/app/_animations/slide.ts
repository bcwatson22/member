import { trigger, animate, style, state, group, query, transition } from '@angular/animations';

export const SlideAnimation = trigger('slideAnimation', [

  state('active', style({
    overflow: 'hidden',
    height: '*'
  })),
  state('inactive', style({
    opacity: '0',
    overflow: 'hidden',
    height: '0px'
  })),
  transition('* <=> *', animate('300ms ease'))

])
