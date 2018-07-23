import { trigger, animate, style, state, group, query, transition } from '@angular/animations';

export const LoaderAnimation = trigger('loaderAnimation', [

  state('active', style({
    display: 'block',
    opacity: '1'
  })),
  state('inactive', style({
    display: 'none',
    opacity: '0'
  })),
  transition('* <=> *', animate('200ms ease'))

])
