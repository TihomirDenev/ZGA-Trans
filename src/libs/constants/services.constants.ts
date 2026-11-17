import { ServiceItem } from '@libs/models/service-item.model';

export const SERVICES: ServiceItem[] = [
  {
    id: 'full-load',
    icon: 'bi-truck-front-fill',
    title: 'Full Truckload',
    description:
      'A dedicated 13.6m trailer, just for your goods. Collected and delivered direct — no stops, no swaps, no surprises.',
    tags: ['Dedicated', 'Direct', 'Curtainsider'],
  },
  {
    id: 'part-load',
    icon: 'bi-boxes',
    title: 'Part Load',
    description:
      'Pay only for the space you use. Smart groupage that keeps your costs down without slowing you down.',
    tags: ['Pallets', 'Groupage', 'Cost-effective'],
  },
  {
    id: 'express',
    icon: 'bi-lightning-charge-fill',
    title: 'Express & Same-Day',
    description:
      'When it can’t wait. Rapid dispatch, priority routing and a driver on the road within hours of your call.',
    tags: ['Urgent', 'Priority', '24/7'],
  },
  {
    id: 'multi-drop',
    icon: 'bi-signpost-split-fill',
    title: 'Multi-Drop',
    description:
      'One trailer, several stops. We plan the smartest route across England so every drop lands on time.',
    tags: ['Route planning', 'Multiple stops', 'Nationwide'],
  },
  {
    id: 'contract',
    icon: 'bi-arrow-repeat',
    title: 'Contract Haulage',
    description:
      'Regular routes for growing businesses. Guaranteed capacity, fixed pricing and one dedicated contact.',
    tags: ['Scheduled', 'Fixed rates', 'Dedicated'],
  },
  {
    id: 'tracking',
    icon: 'bi-broadcast-pin',
    title: 'Live Tracking',
    description:
      'Know exactly where your freight is. GPS tracking and proactive updates from collection to signed POD.',
    tags: ['GPS', 'Real-time', 'POD'],
  },
];
