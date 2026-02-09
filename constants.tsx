import { ServiceCategory, CarSegment, ServiceItem, ContactLink, Testimonial } from './types';

export const BUSINESS_NAME = 'Auto Naprawa KARPOL';
export const OWNER_NAME = 'Paweł Malewicz';
export const ADDRESS = 'Gnieźnieńska 6/2, 85-313 Bydgoszcz';

const DEFAULT_PHONE = '+48 52 320 00 00';
const configuredPhone = (import.meta.env.VITE_BUSINESS_PHONE as string | undefined)?.trim();
const activePhone = configuredPhone && configuredPhone.length >= 7 ? configuredPhone : DEFAULT_PHONE;

export const PHONE = activePhone;
export const PHONE_URL = `tel:${activePhone.replace(/[^\d+]/g, '')}`;
export const LEAD_WEBHOOK_URL = (import.meta.env.VITE_LEAD_WEBHOOK_URL as string | undefined)?.trim() ?? '';

export const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Mechanika',
    description: 'Kompleksowa obsługa silnika, napędu i osprzętu zgodnie ze standardami producenta.',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
  },
  {
    id: '2',
    title: 'Diagnostyka',
    description: 'Precyzyjna diagnostyka komputerowa i mechaniczna z raportem usterek i planem działań.',
    icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z'
  },
  {
    id: '3',
    title: 'Hamulce',
    description: 'Serwis tarcz, klocków, zacisków i płynu hamulcowego z testem skuteczności.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z'
  },
  {
    id: '4',
    title: 'Klimatyzacja',
    description: 'Napełnianie, odgrzybianie i test szczelności układu klimatyzacji.',
    icon: 'M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18'
  }
];

export const CATEGORIES: ServiceCategory[] = ['Silnik', 'Zawieszenie', 'Elektronika', 'Układ Hamulcowy', 'Klimatyzacja'];
export const SEGMENTS: CarSegment[] = ['Miejskie', 'Sedan', 'SUV / Premium'];

export const BASE_PRICES: Record<ServiceCategory, number> = {
  Silnik: 700,
  Zawieszenie: 460,
  Elektronika: 320,
  'Układ Hamulcowy': 390,
  Klimatyzacja: 290,
};

export const SEGMENT_MULTIPLIER: Record<CarSegment, number> = {
  Miejskie: 1,
  Sedan: 1.35,
  'SUV / Premium': 1.8,
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Marcin K.',
    car: 'BMW 320d',
    text: 'Profesjonalna diagnostyka i szybka naprawa. Wszystko wyjaśnione przed rozpoczęciem prac. Polecam każdemu.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Anna W.',
    car: 'VW Golf VII',
    text: 'Uczciwa wycena i terminowa realizacja. Serwis klimatyzacji wykonany bez zastrzeżeń. Wracam tu regularnie.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Tomasz P.',
    car: 'Audi A4 B9',
    text: 'Wymiana hamulców w rozsądnej cenie. Pełna dokumentacja wykonanych prac. Godny zaufania warsztat.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Katarzyna M.',
    car: 'Toyota Corolla',
    text: 'Szybka naprawa zawieszenia. Pan Paweł dokładnie wyjaśnił problem i zaproponował optymalne rozwiązanie.',
    rating: 5,
  },
];

export const CONTACT_LINKS: ContactLink[] = [
  {
    id: 'maps',
    label: 'Google Maps',
    href: 'https://www.google.com/maps/search/?api=1&query=Gnie%C5%BAnie%C5%84ska+6%2F2%2C+Bydgoszcz',
    external: true,
  },
  {
    id: 'route',
    label: 'Wyznacz trasę',
    href: 'https://www.google.com/maps/dir/?api=1&destination=Gnie%C5%BAnie%C5%84ska+6%2F2%2C+Bydgoszcz',
    external: true,
  },
  {
    id: 'phone',
    label: 'Zadzwoń',
    href: PHONE_URL,
  },
  {
    id: 'privacy',
    label: 'Polityka prywatności',
    href: '/polityka-prywatnosci',
  },
];
