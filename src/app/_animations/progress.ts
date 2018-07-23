import { trigger, animate, style, state, group, query, transition } from '@angular/animations';

export const ProgressAnimation = trigger('progressAnimation', [

  state('prev',
    style({
      width: '{{ widthPrev }}%'
    }),
    {
      params: {
        widthPrev: '0'
      }
    }
  ),
  state('active',
    style({
      width: '{{ widthCurrent }}%'
    }),
    {
      params: {
        widthCurrent: '0'
      }
    }
  ),
  transition('prev => active', animate('300ms ease'))

])
