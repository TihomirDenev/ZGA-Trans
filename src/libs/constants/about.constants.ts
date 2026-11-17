import { CompanyValue } from '@libs/models/trust.model';

// TODO: personalise with the founder's own story (name, years on the road, why ZGA Trans).
export const ABOUT_PARAGRAPHS: string[] = [
  'ZGA Trans is a young, owner-run haulage company based in England. We started with one simple idea: treat every load as if our own name is on the side of the truck — because it is.',
  'We are small on purpose. When you call, you speak to the person who plans your job, not a call centre. No hand-offs, no chasing, no surprises on the invoice.',
];

export const ABOUT_QUOTE: string = 'Your goals are our destination.';
export const ABOUT_QUOTE_AUTHOR: string = 'Founder, ZGA Trans';

export const COMPANY_VALUES: CompanyValue[] = [
  {
    id: 'direct-line',
    icon: 'bi-telephone-fill',
    title: 'A direct line',
    description: 'One number, one person who knows your job from start to finish.',
  },
  {
    id: 'honest-pricing',
    icon: 'bi-receipt',
    title: 'Honest pricing',
    description: 'Clear, fixed quotes. What we quote is what you pay.',
  },
  {
    id: 'on-time',
    icon: 'bi-clock-fill',
    title: 'On time, every time',
    description: 'We plan around your deadlines, not the other way round.',
  },
];
