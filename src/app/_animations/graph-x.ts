import { trigger, animate, style, state, group, query, transition } from '@angular/animations';

export const GraphXAnimation = trigger('graphXAnimation', [

  state('inactive', style({
    opacity: '0',
    width: '0%'
  })),
  state('active',
    style({
      opacity: '1',
      width: '{{ width }}%',
      backgroundColor: '{{ colour }}'
    }),
    {
      params: {
        width: '0',
        colour: '$border'
      }
    }
  ),
  transition('active => inactive', animate('100ms ease')),
  transition('inactive => active', animate('700ms ease'))

])
