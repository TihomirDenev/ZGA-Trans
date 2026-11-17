import { ContactChannel } from '@libs/models/contact.model';

// TODO: replace the placeholder phone, email and WhatsApp number with the real ones.
export const COMPANY_EMAIL: string = 'hello@zgatrans.co.uk';
export const COMPANY_PHONE: string = '+44 7000 000000';
export const COMPANY_WHATSAPP_NUMBER: string = '447000000000';

// TODO: UK law requires the company number and registered office on the website.
export const COMPANY_LEGAL_NAME: string = 'ZGA Trans Ltd';
export const COMPANY_REGISTRATION_NUMBER: string = '00000000';
export const COMPANY_REGISTERED_OFFICE: string = 'Registered office address, England';

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: 'phone',
    icon: 'bi-telephone-fill',
    label: 'Call dispatch',
    value: COMPANY_PHONE,
    href: `tel:${COMPANY_PHONE.replaceAll(' ', '')}`,
  },
  {
    id: 'email',
    icon: 'bi-envelope-fill',
    label: 'Email us',
    value: COMPANY_EMAIL,
    href: `mailto:${COMPANY_EMAIL}`,
  },
  {
    id: 'whatsapp',
    icon: 'bi-whatsapp',
    label: 'WhatsApp',
    value: 'Message us anytime',
    href: `https://wa.me/${COMPANY_WHATSAPP_NUMBER}`,
  },
];

export const LOAD_TYPES: string[] = [
  'Full Truckload',
  'Part Load',
  'Express / Same-Day',
  'Multi-Drop',
  'Contract Haulage',
  'Not sure yet',
];
