import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LEAD_WEBHOOK_URL, PHONE_URL } from '../constants';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const LeadMagnet: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const shown = localStorage.getItem('lead_magnet_shown');
      if (!shown) {
        setIsVisible(true);
      }
    }, 6000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    previousFocusedElementRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (!dialogRef.current) {
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements: HTMLElement[] = Array.from(dialogRef.current.querySelectorAll(FOCUSABLE_SELECTOR)) as HTMLElement[];
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const first: HTMLElement = focusableElements[0];
      const last: HTMLElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      previousFocusedElementRef.current?.focus();
    };
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const close = () => {
    setIsVisible(false);
    localStorage.setItem('lead_magnet_shown', 'true');

    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      close();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    if (!LEAD_WEBHOOK_URL) {
      setSubmitStatus('error');
      setErrorMessage('Formularz online jest chwilowo niedostępny. Skontaktuj się telefonicznie.');
      return;
    }

    try {
      setSubmitStatus('loading');

      const response = await fetch(LEAD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          source: 'website-lead-magnet',
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      setSubmitStatus('success');
      localStorage.setItem('lead_magnet_shown', 'true');

      closeTimerRef.current = window.setTimeout(() => {
        setIsVisible(false);
      }, 2600);
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Nie udało się wysłać zgłoszenia. Spróbuj ponownie lub zadzwoń do serwisu.');
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/70 backdrop-blur-sm"
          onMouseDown={handleOverlayClick}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-magnet-title"
            aria-describedby="lead-magnet-description"
            initial={{ opacity: 0, scale: 0.97, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 18 }}
            className="relative w-full max-w-lg bg-carbon-800 border border-carbon-400/50 rounded-2xl p-7 md:p-8 shadow-[0_24px_90px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full -mr-20 -mt-20" aria-hidden="true" />

            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Zamknij okno promocji"
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {submitStatus !== 'success' ? (
              <>
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-xs uppercase tracking-[0.22em] text-blue-400 font-semibold mb-3">Darmowy przegląd bezpieczeństwa</p>
                <h3 id="lead-magnet-title" className="text-2xl md:text-3xl text-white leading-tight mb-3 pr-8 font-heading">
                  Bezpłatna kontrola hamulców i zawieszenia
                </h3>
                <p id="lead-magnet-description" className="text-gray-400 mb-6 text-sm">
                  Zostaw imię i numer telefonu — oddzwonimy i umówimy dogodny termin przeglądu. Bez zobowiązań.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="lead-name" className="block text-sm font-semibold text-gray-300 mb-2">
                      Imię
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      autoComplete="given-name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                      placeholder="np. Jan"
                      className="w-full bg-carbon-700 border border-carbon-400/40 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="lead-phone" className="block text-sm font-semibold text-gray-300 mb-2">
                      Numer telefonu
                    </label>
                    <input
                      id="lead-phone"
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      required
                      placeholder="np. 500 600 700"
                      className="w-full bg-carbon-700 border border-carbon-400/40 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:text-blue-300 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-blue-600/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    {submitStatus === 'loading' ? 'Wysyłanie...' : 'Rezerwuję darmowy przegląd'}
                  </button>
                </form>

                <p className="text-xs text-gray-600 mt-4 text-center">
                  Szanujemy Twoją prywatność. Dane wykorzystujemy wyłącznie do kontaktu w sprawie wizyty.
                </p>

                <div className="mt-3 min-h-5" aria-live="polite">
                  {submitStatus === 'error' && (
                    <p className="text-sm text-red-400 text-center">
                      {errorMessage}{' '}
                      <a href={PHONE_URL} className="underline font-semibold text-blue-400">
                        Zadzwoń teraz
                      </a>
                      .
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-500/15 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl text-white mb-2 font-heading">Dziękujemy za zgłoszenie</h3>
                <p className="text-gray-400">Skontaktujemy się, aby potwierdzić termin Twojej wizyty.</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LeadMagnet;
