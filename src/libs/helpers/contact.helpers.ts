import { COMPANY_EMAIL } from '@libs/constants/contact.constants';
import { QuoteRequest } from '@libs/models/contact.model';

/** Builds a `mailto:` link with the quote request pre-filled, so it works without a backend */
export function buildQuoteEmailLink(quoteRequest: QuoteRequest): string {
  const subject = `Quote request — ${quoteRequest.collectionPostcode} → ${quoteRequest.deliveryPostcode}`;
  const body = buildQuoteEmailBody(quoteRequest);

  return `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function buildQuoteEmailBody(quoteRequest: QuoteRequest): string {
  const emailLines = [
    `Name: ${quoteRequest.name}`,
    `Company: ${quoteRequest.company || '-'}`,
    `Email: ${quoteRequest.email}`,
    `Phone: ${quoteRequest.phone || '-'}`,
    '',
    `Collection postcode: ${quoteRequest.collectionPostcode}`,
    `Delivery postcode: ${quoteRequest.deliveryPostcode}`,
    `Load type: ${quoteRequest.loadType}`,
    `Collection date: ${quoteRequest.collectionDate || 'Flexible'}`,
    '',
    'Details:',
    quoteRequest.details || '-',
  ];

  return emailLines.join('\n');
}
