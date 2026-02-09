export type ServiceCategory = 'Silnik' | 'Zawieszenie' | 'Elektronika' | 'Układ Hamulcowy' | 'Klimatyzacja';

export type CarSegment = 'Miejskie' | 'Sedan' | 'SUV / Premium';

export interface CalculatorState {
  category: ServiceCategory;
  segment: CarSegment;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ContactLink {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  car: string;
  text: string;
  rating: number;
}
