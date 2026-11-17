export interface PageMeta {
  title: string;
  description: string;
  /** Path of the page, e.g. '/privacy-policy' */
  path: string;
  /** False for pages that shouldn't appear in Google, like the 404 page */
  isIndexable: boolean;
}
