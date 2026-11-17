export interface PolicySection {
  id: string;
  heading: string;
  paragraphs: string[];
  /** Optional bullet list shown after the paragraphs */
  listItems?: string[];
}
