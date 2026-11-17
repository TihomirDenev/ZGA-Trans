import {
  COMPANY_EMAIL,
  COMPANY_LEGAL_NAME,
  COMPANY_REGISTERED_OFFICE,
  COMPANY_REGISTRATION_NUMBER,
} from '@libs/constants/contact.constants';
import { PolicySection } from '@libs/models/policy-section.model';

// NOTE: this is a solid UK GDPR template for a small haulage business, not legal advice.
// Have it reviewed once the company details, email provider and form provider are final.
export const PRIVACY_POLICY_LAST_UPDATED: string = '17 November 2026';

export const PRIVACY_POLICY_SECTIONS: PolicySection[] = [
  {
    id: 'who-we-are',
    heading: 'Who we are',
    paragraphs: [
      `${COMPANY_LEGAL_NAME} ("ZGA Trans", "we", "us") is a haulage company registered in England and Wales under company number ${COMPANY_REGISTRATION_NUMBER}, with its registered office at ${COMPANY_REGISTERED_OFFICE}.`,
      `We are the controller of the personal data described in this policy. If you have any questions about it, email us at ${COMPANY_EMAIL}.`,
    ],
  },
  {
    id: 'data-we-collect',
    heading: 'The data we collect',
    paragraphs: ['We only collect what we need to quote for and move your freight:'],
    listItems: [
      'Contact details you give us — your name, company, email address and phone number.',
      'Job details — collection and delivery postcodes, load type, dates and any notes you add.',
      'Correspondence — emails, WhatsApp messages and notes from phone calls with us.',
      'Website statistics — anonymous, aggregated figures such as pages viewed, device type and country. These are collected without cookies and cannot identify you.',
    ],
  },
  {
    id: 'how-we-use-it',
    heading: 'How we use your data',
    paragraphs: ['We use your personal data to:'],
    listItems: [
      'reply to your quote request and answer your questions;',
      'plan, carry out and confirm the jobs you book with us;',
      'invoice you and keep the records the law requires;',
      'understand how the website is used so we can improve it.',
    ],
  },
  {
    id: 'lawful-basis',
    heading: 'Our lawful basis',
    paragraphs: [
      'Under UK GDPR we rely on: taking steps at your request before entering into a contract, and performing that contract (Article 6(1)(b)); our legitimate interests in running and improving our business and replying to enquiries (Article 6(1)(f)); and complying with legal obligations such as tax and accounting rules (Article 6(1)(c)).',
    ],
  },
  {
    id: 'sharing',
    heading: 'Who we share it with',
    paragraphs: [
      'We never sell your data. We only share it with trusted providers who help us run the business, and only as much as they need:',
    ],
    listItems: [
      'our email and office software providers;',
      'our website hosting and analytics provider (Vercel);',
      'partner hauliers, only when needed to complete a job you have booked;',
      'authorities such as HMRC or the police, when the law requires it.',
    ],
  },
  {
    id: 'international-transfers',
    heading: 'International transfers',
    paragraphs: [
      "Some of our providers may process data outside the UK, for example in the United States. When they do, we make sure it is protected — through the UK's adequacy regulations (including the UK-US data bridge) or the UK International Data Transfer Agreement or Addendum.",
    ],
  },
  {
    id: 'retention',
    heading: 'How long we keep it',
    paragraphs: ['We keep personal data only for as long as we need it:'],
    listItems: [
      'quote requests that do not lead to a booking — up to 12 months;',
      'customer, job and invoice records — 6 years after the end of the financial year, as required by HMRC.',
    ],
  },
  {
    id: 'cookies',
    heading: 'Cookies and storage',
    paragraphs: [
      'We do not use advertising or tracking cookies, so you will not see a cookie banner. Our website statistics are collected without cookies, and our fonts are hosted on our own site.',
      'If you install the site as an app, your browser keeps a copy of the website on your device so it loads quickly and works offline. This copy contains no personal data.',
    ],
  },
  {
    id: 'your-rights',
    heading: 'Your rights',
    paragraphs: [
      'You have the right to access the data we hold about you, to have it corrected or deleted, to restrict or object to how we use it, and to receive it in a portable format. Email us to use any of these rights — it is free, and we will reply within one month.',
    ],
  },
  {
    id: 'complaints',
    heading: 'Complaints',
    paragraphs: [
      "If you are unhappy with how we have handled your data, please contact us first so we can put it right. You also have the right to complain to the Information Commissioner's Office (ICO) at ico.org.uk or on 0303 123 1113.",
    ],
  },
  {
    id: 'changes',
    heading: 'Changes to this policy',
    paragraphs: [
      'We may update this policy from time to time. The date at the top of this page shows when it last changed.',
    ],
  },
];
