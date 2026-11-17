import { HOME_PATH, PRIVACY_POLICY_PATH } from '@libs/constants/routes.constants';
import { PageMeta } from '@libs/models/page-meta.model';

export const HOME_PAGE_META: PageMeta = {
  title: 'ZGA Trans — Straight to your goals. Haulage across England',
  description:
    'ZGA Trans is a haulage company moving full loads, part loads and express freight across England. Licensed, insured and GPS-tracked. Get a quote within the hour.',
  path: HOME_PATH,
  isIndexable: true,
};

export const PRIVACY_POLICY_PAGE_META: PageMeta = {
  title: 'Privacy Policy — ZGA Trans',
  description:
    'How ZGA Trans collects, uses and protects your personal data under UK GDPR, and the rights you have over it.',
  path: PRIVACY_POLICY_PATH,
  isIndexable: true,
};

export const NOT_FOUND_PAGE_META: PageMeta = {
  title: 'Wrong turn — ZGA Trans',
  description: 'This page took a wrong turn. Head back to ZGA Trans, haulage across England.',
  path: '/404',
  isIndexable: false,
};
