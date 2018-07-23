import { trigger, animate, style, state, sequence, group, animateChild, query, stagger, transition } from '@angular/animations';

export const WidgetAnimation = trigger('widgetAnimation', [

  transition('slide => routing', [

    query('widget',
      animate('500ms ease',
        style({
          opacity: '0'
        }),
      ),
      { optional: true }
    ),

  ]),

  transition('* => slide', [

    query('widget',
      style({
        transform: 'translateY(50px)',
        opacity: '0'
      }),
      { optional: true }
    ),

    query('widget', stagger('100ms', [
      animate('300ms ease',
        style({
          transform: 'translateY(0px)',
          opacity: '1'
        })
      )]),
      { optional: true }
    )

  ])

])
