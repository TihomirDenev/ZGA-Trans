import { FaqItem } from '@libs/models/trust.model';

/** schema.org FAQPage data, so search engines can show the questions and answers directly */
export function buildFaqStructuredData(faqItems: FaqItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((faqItem) => ({
      '@type': 'Question',
      name: faqItem.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faqItem.answer,
      },
    })),
  };
}
