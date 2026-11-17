import { FaqItem } from '@libs/models/trust.model';

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'quote-speed',
    question: 'How quickly can I get a quote?',
    answer:
      'Usually within the hour during working hours. Send the collection and delivery postcodes, what you are moving and when — we come back with a clear, fixed price.',
  },
  {
    id: 'collection-speed',
    question: 'How soon can you collect?',
    answer:
      'For urgent loads we can often collect the same day. For planned work, book a day or two ahead and we will confirm a collection window when we quote.',
  },
  {
    id: 'insurance',
    question: 'Are my goods insured?',
    answer:
      'Yes. Every load is covered by our Goods in Transit insurance from the moment it is loaded until it is signed for. We are happy to send you our certificate.',
  },
  {
    id: 'pallets',
    question: 'Do you move single pallets or part loads?',
    answer:
      'Yes. Alongside full truckloads we run part loads, so you only pay for the space you use — from a single pallet upwards.',
  },
  {
    id: 'tracking',
    question: 'Can I track my delivery?',
    answer:
      'Every vehicle has live GPS. We keep you updated from collection to delivery and email a signed proof of delivery (POD) as soon as the job is done.',
  },
  {
    id: 'coverage',
    question: 'Where do you deliver?',
    answer:
      'Anywhere in England — from Cornwall to Northumberland, city centres to industrial estates. If you are not sure, just ask.',
  },
];
