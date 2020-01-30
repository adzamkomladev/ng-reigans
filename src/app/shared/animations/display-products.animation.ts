import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const animateProducts = trigger('animateProducts', [
  transition('* => *', [
    query(':enter', style({ opacity: 0, transform: 'translateX(-40px)' }), {
      optional: true,
    }),

    query(
      ':enter',
      stagger('500ms', [
        animate(
          '800ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' }),
        ),
      ]),
      { optional: true },
    ),
    query(':enter', [animate(1000, style('*'))], { optional: true }),
    query(
      ':leave',
      stagger('300ms', [
        animate(
          '1s ease-in',
          style({ opacity: 0, transform: 'translateX(-40px)' }),
        ),
      ]),
      { optional: true },
    ),
  ]),
]);
