import { trigger, animate, style, state, group, query, transition } from '@angular/animations';

export const ModalAnimation = trigger('modalAnimation', [

  state('*', style({
    display: 'none'
  })),
  state('animate, active', style({
    display: 'block'
  })),

  transition('* => animate', [

    query('.modal-bg',
      style({
        opacity: 0
      }),
      { optional: true }
    ),
    query('.modal-content',
      style({
        opacity: 0,
        transform: 'scale(0.9)'
      }),
      { optional: true }
    ),

    group([
      query('.modal-bg',
        animate('400ms ease',
          style({
            opacity: 1
          })
        ),
        { optional: true }
      ),
      query('.modal-content',
        animate('400ms ease',
          style({
            opacity: 1,
            transform: 'scale(1)'
          })
        ),
        { optional: true }
      )
    ])
  ]),

  transition('animate => *, active => *', [

    query('.modal-bg',
      style({
        opacity: 1
      }),
      { optional: true }
    ),
    query('.modal-content',
      style({
        opacity: 1,
        transform: 'scale(1)'
      }),
      { optional: true }
    ),

    group([
      query('.modal-bg',
        animate('300ms ease',
          style({
            opacity: 0
          })
        ),
        { optional: true }
      ),
      query('.modal-content',
        animate('300ms ease',
          style({
            opacity: 0,
            transform: 'scale(0)'
          })
        ),
        { optional: true }
      )
    ])

  ])

])
