import { JourneyStep } from '@libs/models/journey-step.model';

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 'book',
    icon: 'bi-chat-dots-fill',
    title: 'Book',
    place: 'Quote within the hour',
    description:
      'Tell us what, where and when. You get a clear, fixed price — no hidden extras, no chasing.',
  },
  {
    id: 'collect',
    icon: 'bi-box-seam-fill',
    title: 'Collect',
    place: 'Loaded & secured',
    description:
      'Our driver arrives on time, loads with care and straps everything down by the book.',
  },
  {
    id: 'ride',
    icon: 'bi-geo-alt-fill',
    title: 'Ride',
    place: 'Live GPS, day & night',
    description:
      'M1, M6 or the A-roads in between — you can follow every mile while we keep you updated.',
  },
  {
    id: 'deliver',
    icon: 'bi-flag-fill',
    title: 'Deliver',
    place: 'Signed POD, on time',
    description:
      'Delivered exactly where it needs to be, with proof of delivery straight to your inbox.',
  },
];

/** Heights of the buildings in the background skyline (view box is 160 high) */
export const SKYLINE_BUILDING_HEIGHTS: number[] = [
  38, 64, 52, 96, 70, 128, 84, 44, 58, 110, 142, 90, 60, 36, 72, 100, 66, 120, 80, 48, 30, 56, 88,
  136, 104, 62, 40, 76, 118, 92, 54, 34, 68, 98, 126, 74, 50, 86, 112, 58,
];
export const SKYLINE_BUILDING_WIDTH: number = 40;
export const SKYLINE_VIEW_HEIGHT: number = 160;
