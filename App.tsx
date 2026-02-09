import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CarModel3D from './components/CarModel3D';
import Calculator from './components/Calculator';
import LeadMagnet from './components/LeadMagnet';
import Testimonials from './components/Testimonials';
import SmoothScroll from './components/SmoothScroll';
import MagneticButton from './components/MagneticButton';
import GradientCursor from './components/GradientCursor';
import MorphingBlobs from './components/MorphingBlobs';
import ScrollProgress from './components/ScrollProgress';
import ScrollAnimations from './components/ScrollAnimations';
import CookieBanner from './components/CookieBanner';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import { SERVICES, BUSINESS_NAME, OWNER_NAME, ADDRESS, PHONE, PHONE_URL, CONTACT_LINKS } from './constants';

const NAV_LINKS = [
  { id: 'o-nas', label: 'O nas' },
  { id: 'uslugi', label: 'Usługi' },
  { id: 'kalkulator', label: 'Wycena' },
  { id: 'opinie', label: 'Opinie' },
  { id: 'kontakt', label: 'Kontakt' },
];

const INSPIRATION_SHOTS = [
  {
    id: 'car-1',
    src: '/Car%201.png',
    alt: 'Ciemnozielony samochód koncepcyjny w profilu bocznym na ciemnym tle.',
  },
];
const PRIVACY_POLICY_PATH = '/polityka-prywatnosci';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const normalizedPath = typeof window !== 'undefined' ? window.location.pathname.replace(/\/+$/, '') || '/' : '/';
  const isPrivacyPolicyPage = normalizedPath === PRIVACY_POLICY_PATH;

  useEffect(() => {
    if (isPrivacyPolicyPage) return;

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPrivacyPolicyPage]);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const currentYear = new Date().getFullYear();

  if (isPrivacyPolicyPage) {
    return (
      <SmoothScroll>
        <div className="relative min-h-screen bg-black">
          <PrivacyPolicyPage />
          <CookieBanner />
        </div>
      </SmoothScroll>
    );
  }

  return (
    <SmoothScroll>
      <div className="relative overflow-hidden bg-black">
        <GradientCursor />
        <ScrollProgress />
        <ScrollAnimations />
        <MorphingBlobs />
        <LeadMagnet />

        <div className="pointer-events-none absolute inset-0 page-grain" aria-hidden="true" />

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'glass-dark py-3 border-b border-carbon-400/30 shadow-2xl' : 'py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center gap-3">
          <button
            type="button"
            className="flex flex-col text-left"
            onClick={() => scrollToSection('o-nas')}
            aria-label="Przejdź do sekcji O nas"
          >
            <span className="text-xl md:text-2xl font-bold tracking-[0.08em] text-white font-heading">KARPOL</span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.28em] text-blue-400 font-semibold">{OWNER_NAME}</span>
          </button>

          <div className="hidden md:flex items-center gap-8 text-xs lg:text-sm font-semibold uppercase tracking-[0.16em] text-gray-400">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={PHONE_URL}
              className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-blue-600/20"
            >
              {PHONE}
            </a>

            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-carbon-400/40 bg-carbon-800/80 text-white"
              onClick={() => setIsMenuOpen((value) => !value)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden px-4 pt-3"
            >
              <div className="rounded-xl border border-carbon-400/30 bg-carbon-800/95 shadow-2xl p-4 space-y-1 backdrop-blur-xl">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-gray-300 font-semibold hover:bg-carbon-700 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <a
                  href={PHONE_URL}
                  className="block mt-2 px-3 py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-center"
                >
                  {PHONE}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen pt-36 pb-20 md:pt-44 md:pb-24 flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 hero-dashboard-bg" aria-hidden="true" />
        <CarModel3D />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-5xl"
          >
            <p className="uppercase tracking-[0.3em] text-xs md:text-sm font-semibold text-blue-400 mb-6">Profesjonalny serwis w Bydgoszczy</p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.92] mb-6 font-heading">
              Auto Naprawa KARPOL –
              <span className="block text-blue-400 mt-2">Twoje auto w rękach profesjonalistów.</span>
            </h1>
            <p className="text-base md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
              Precyzyjna diagnostyka, uczciwa wycena i transparentna obsługa. Gnieźnieńska 6/2, Bydgoszcz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <MagneticButton
                onClick={() => scrollToSection('kontakt')}
                className="px-10 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-all hover:shadow-lg hover:shadow-blue-600/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                Umów wizytę
              </MagneticButton>
              <MagneticButton
                onClick={() => scrollToSection('uslugi')}
                className="px-10 py-4 bg-transparent border border-carbon-400/50 text-white font-bold rounded-lg hover:border-blue-500/50 hover:bg-carbon-800/50 transition-all"
              >
                Zobacz usługi
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        <button
          type="button"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 hover:text-blue-400 transition-colors"
          onClick={() => scrollToSection('o-nas')}
          aria-label="Przewiń do sekcji O nas"
        >
          <motion.svg
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </button>
      </header>

      <div className="section-divider" aria-hidden="true" />

      {/* About Section */}
      <section id="o-nas" className="py-24 md:py-32 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              className="space-y-7"
            >
              <p className="uppercase tracking-[0.24em] text-xs font-semibold text-blue-400">O serwisie</p>
              <h2 className="text-4xl md:text-6xl text-white leading-[0.95]">Doświadczenie, które czuć za kierownicą.</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Auto Naprawa KARPOL to warsztat, w którym łączymy dokładną diagnostykę z odpowiedzialnym rzemiosłem. Każdą naprawę
                omawiamy jasno: zakres, części, czas i koszt.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Pracujemy na sprawdzonych procedurach i dokumentujemy wykonane czynności, dzięki czemu klient ma pełną kontrolę nad
                stanem auta.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="stat-card">
                  <p className="text-4xl text-white font-heading">15+</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-1">Lat doświadczenia</p>
                </div>
                <div className="stat-card">
                  <p className="text-4xl text-white font-heading">100%</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-1">Transparentnej wyceny</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-600/10 rounded-2xl blur-2xl" aria-hidden="true" />
              <div className="relative rounded-2xl p-8 md:p-10 border border-carbon-400/30 bg-gradient-to-br from-carbon-700 via-carbon-800 to-carbon-900 text-white shadow-2xl">
                <p className="uppercase tracking-[0.22em] text-xs text-blue-400 mb-4">KARPOL Signature Care</p>
                <h3 className="text-3xl md:text-4xl leading-[0.92] text-white mb-5 font-heading">Serwis, który dba o Twój spokój.</h3>
                <div className="space-y-4 text-sm md:text-base text-gray-300">
                  <div className="flex gap-3 items-start">
                    <svg className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p>Diagnostyka komputerowa i mechaniczna prowadzona etapowo, bez zgadywania.</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <svg className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p>Stały kontakt z klientem i akceptacja kosztów przed rozpoczęciem kluczowych prac.</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <svg className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p>Kontrola końcowa po naprawie oraz zalecenia eksploatacyjne na kolejne miesiące.</p>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-carbon-400/20">
                  <p className="text-xs uppercase tracking-[0.18em] text-blue-400 mb-2">Adres serwisu</p>
                  <p className="text-gray-300">{ADDRESS}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-black" aria-label="Galeria inspiracji motoryzacyjnych">
        {INSPIRATION_SHOTS.map((shot, index) => (
          <motion.figure
            key={shot.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.06 }}
            className="w-full bg-black"
          >
            <img
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              decoding="async"
              className="block w-full h-auto"
            />
          </motion.figure>
        ))}
      </section>

      {/* Services Grid */}
      <section id="uslugi" className="py-24 md:py-32 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14 md:mb-16">
            <p className="uppercase tracking-[0.24em] text-xs md:text-sm font-semibold text-blue-400 mb-3">Zakres prac</p>
            <h2 className="text-4xl md:text-6xl text-white mb-4">Nasze usługi</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Kompleksowa obsługa mechaniczna i diagnostyczna dla aut miejskich, sedanów i klasy premium.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08 }}
                className="card-glow rounded-xl p-7 bg-carbon-800 border border-carbon-400/30"
              >
                <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mb-5">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl text-white mb-3 leading-tight font-heading">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* Calculator */}
      <Calculator />

      <div className="section-divider" aria-hidden="true" />

      {/* Testimonials */}
      <Testimonials />

      <div className="section-divider" aria-hidden="true" />

      {/* Free Safety Check CTA */}
      <section className="py-20 md:py-28 bg-carbon-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-blue-600/5" aria-hidden="true" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm font-semibold text-blue-400 mb-3">Darmowy przegląd bezpieczeństwa</p>
            <h2 className="text-3xl md:text-5xl text-white mb-5 font-heading">Sprawdź hamulce i zawieszenie — za darmo</h2>
            <p className="text-gray-400 text-lg mb-8">
              Umów się na bezpłatny przegląd bezpieczeństwa. Skontrolujemy układ hamulcowy i zawieszenie Twojego auta.
            </p>
            <a
              href={PHONE_URL}
              className="inline-flex px-10 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-all hover:shadow-lg hover:shadow-blue-600/25"
            >
              Zadzwoń i umów termin
            </a>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* Contact & Map */}
      <section id="kontakt" className="py-24 md:py-32 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              className="space-y-10"
            >
              <div>
                <p className="uppercase tracking-[0.24em] text-xs font-semibold text-blue-400 mb-3">Kontakt</p>
                <h2 className="text-4xl md:text-6xl text-white mb-6">Bądźmy w kontakcie</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Zadzwoń, napisz lub odwiedź nas osobiście. Doradzimy najlepsze rozwiązanie i umówimy dogodny termin.
                </p>
              </div>

              <div className="space-y-4">
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg text-white mb-1 font-heading">Adres</h4>
                    <p className="text-gray-400">{ADDRESS}</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg text-white mb-1 font-heading">Telefon</h4>
                    <a href={PHONE_URL} className="text-gray-400 hover:text-blue-400 transition-colors font-semibold">
                      {PHONE}
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg text-white mb-1 font-heading">Godziny otwarcia</h4>
                    <p className="text-gray-400">Pon – Pt: 08:00 – 17:00</p>
                    <p className="text-gray-400">Sob: 09:00 – 14:00</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="h-[420px] md:h-[520px] rounded-2xl overflow-hidden shadow-2xl border border-carbon-400/30"
            >
              <iframe
                title="Mapa dojazdu do Auto Naprawa KARPOL"
                aria-label="Mapa dojazdu do Auto Naprawa KARPOL"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2393.755431604593!2d17.962059376997097!3d53.12074367222019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4703138b7609a565%3A0x6b4987031d9774d6!2sGnie%C5%BAnie%C5%84ska%206%2F2%2C%2085-313%20Bydgoszcz%2C%20Poland!5e0!3m2!1sen!2sus!4v1711223456789!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.95) contrast(1.1)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-carbon-400/20 bg-carbon-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <span className="text-2xl text-white font-heading">{BUSINESS_NAME}</span>
              <p className="text-gray-600 text-sm mt-2">&copy; {currentYear} Wszelkie prawa zastrzeżone.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer noopener' : undefined}
                  className="px-4 py-2 rounded-lg border border-carbon-400/30 text-sm font-semibold text-gray-400 hover:text-blue-400 hover:border-blue-500/40 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-gray-700 uppercase tracking-[0.18em]">Projekt i realizacja: Premium Auto Web Solutions</div>
        </div>
      </footer>
      <CookieBanner />
      </div>
    </SmoothScroll>
  );
};

export default App;
