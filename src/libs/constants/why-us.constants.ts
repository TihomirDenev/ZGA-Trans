import { Stat } from '@libs/models/stat.model';

export const STATS: Stat[] = [
  { id: 'dispatch', value: 24, suffix: '/7', label: 'Dispatch & support' },
  { id: 'tracking', value: 100, suffix: '%', label: 'GPS-tracked loads' },
  { id: 'pallets', value: 33, suffix: '', label: 'Euro pallets per trailer' },
  { id: 'weight', value: 44, suffix: 't', label: 'Max gross weight' },
];

export const WHY_US_MANIFESTO: string =
  'We don’t just move freight. We move ambitions — yours. Every load is a promise, every mile is a step closer, and every delivery lands exactly where it should. Straight to your goals.';
