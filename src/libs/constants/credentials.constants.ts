import { Credential } from '@libs/models/trust.model';

// TODO: confirm every detail with the owner before launch — licence number, insurance amounts.
// UK customers check these, so they must be accurate. Add FORS / RHA here if the company joins.
export const CREDENTIALS: Credential[] = [
  {
    id: 'operator-licence',
    icon: 'bi-patch-check-fill',
    title: 'Operator Licence',
    detail:
      'Standard National O-Licence, issued by the Traffic Commissioner. Licence no. OB0000000.',
  },
  {
    id: 'driver-cpc',
    icon: 'bi-person-badge-fill',
    title: 'CPC-qualified drivers',
    detail:
      'Every driver holds a Driver CPC and a digital tachograph card — trained, checked, legal.',
  },
  {
    id: 'goods-in-transit',
    icon: 'bi-shield-fill-check',
    title: 'Goods in Transit cover',
    detail: 'Every load insured up to £100,000 from collection to signed delivery.',
  },
  {
    id: 'public-liability',
    icon: 'bi-umbrella-fill',
    title: 'Public liability',
    detail: '£5 million public liability insurance on every site we visit.',
  },
];
