import { trigger, animate, style, state, group, query, transition } from '@angular/animations';

export const TabAnimation = trigger('tabAnimation', [

  state('active', style({
    opacity: '1'
  })),
  state('inactive', style({
    opacity: '0',
    position: 'absolute',
    transform: 'translateX(-100px)',
    display: 'none'
  })),
  transition('active => inactive', animate('300ms ease')),
  transition('inactive => active', animate('300ms ease'))

])
