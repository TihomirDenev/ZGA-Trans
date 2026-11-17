import { FleetItem } from '@libs/models/trust.model';

// TODO: confirm the fleet (vehicle types and numbers) with the owner and swap in real photos.
export const FLEET_ITEMS: FleetItem[] = [
  {
    id: 'tractor-units',
    icon: 'bi-truck-front-fill',
    title: 'Tractor units',
    description: 'Modern, clean-running tractors with telematics and live GPS in every cab.',
    specs: [
      { label: 'Emissions', value: 'Euro 6' },
      { label: 'Tracking', value: 'Live GPS' },
      { label: 'Max gross weight', value: '44 t' },
    ],
  },
  {
    id: 'curtainsiders',
    icon: 'bi-layout-three-columns',
    title: '13.6-metre curtainsiders',
    description:
      'Side and rear loading for quick, flexible collections — the workhorse of UK haulage.',
    specs: [
      { label: 'Capacity', value: '26 UK / 33 Euro pallets' },
      { label: 'Payload', value: 'Up to 26 t' },
      { label: 'Loading', value: 'Side & rear' },
    ],
  },
  {
    id: 'box-trailers',
    icon: 'bi-box-seam-fill',
    title: '13.6-metre box trailers',
    description: 'Fully enclosed and lockable — weatherproof and secure for high-value goods.',
    specs: [
      { label: 'Capacity', value: '26 UK / 33 Euro pallets' },
      { label: 'Security', value: 'Lockable rear doors' },
      { label: 'Protection', value: 'Weatherproof' },
    ],
  },
];
