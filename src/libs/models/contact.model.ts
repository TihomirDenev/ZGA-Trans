export interface ContactChannel {
  id: string;
  icon: string;
  label: string;
  value: string;
  href: string;
}

export interface QuoteRequest {
  name: string;
  company: string;
  email: string;
  phone: string;
  collectionPostcode: string;
  deliveryPostcode: string;
  loadType: string;
  collectionDate: string;
  details: string;
}
