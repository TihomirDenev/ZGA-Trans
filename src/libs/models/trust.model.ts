export interface Credential {
  id: string;
  icon: string;
  title: string;
  detail: string;
}

export interface FleetSpec {
  label: string;
  value: string;
}

export interface FleetItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  specs: FleetSpec[];
}

export interface CompanyValue {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
