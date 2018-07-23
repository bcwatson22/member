import { trigger, animate, style, state, sequence, group, animateChild, query, stagger, transition } from '@angular/animations';

export const RouterAnimation = trigger('routerAnimation', [

  transition('* => prev', [
    // initial state of new route
    query(':enter, :leave',
      style({
        position: 'fixed',
        width: 'calc(100% - (100vh / 7))',
        height: '100%'
      }),
      { optional: true }
    ),
    query(':enter',
      style({
        transform: 'translateY(-100%)'
      }),
      { optional: true }
    ),
    query(':leave',
      style({
        transform: 'translateY(0%)'
      }),
      { optional: true }
    ),
    sequence([
      group([
        // move page off screen bottom on leave
        query(':leave',
          animate('500ms ease',
            style({
              position: 'fixed',
              width: 'calc(100% - (100vh / 7))',
              height: '100%',
              transform: 'translateY(100%)'
            })
          ),
          { optional: true }
        ),
        // move page in screen from top to bottom
        query(':enter',
          animate('500ms ease',
            style({
              transform: 'translateY(0%)'
            })
          ),
          { optional: true }
        ),
      ]),
    ])
  ]),
  transition('* => next', [
    // Initial state of new route
    query(':enter, :leave',
      style({
        position: 'fixed',
        width: 'calc(100% - (100vh / 7))',
        height: '100%'
      }),
      { optional: true }
    ),
    query(':enter',
      style({
        transform: 'translateY(100%)'
      }),
      { optional: true }
    ),
    query(':leave',
      style({
        transform: 'translateY(0%)'
      }),
      { optional: true }
    ),
    sequence([
      group([
        // move page off screen bottom on leave
        query(':leave',
          animate('500ms ease',
            style({
              position: 'fixed',
              width: 'calc(100% - (100vh / 7))',
              height: '100%',
              transform: 'translateY(-100%)'
            })
          ),
          { optional: true }
        ),
        // move page in screen from top to bottom
        query(':enter',
          animate('500ms ease',
            style({
              transform: 'translateY(0%)'
            })
          ),
          { optional: true }
        ),
      ]),
    ])

  ])
])
