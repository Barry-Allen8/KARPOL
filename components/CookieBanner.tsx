import React, { useEffect, useState } from 'react';

type CookieConsentValue = 'accepted' | 'rejected';

interface CookieConsentState {
  value: CookieConsentValue;
  updatedAt: string;
  version: number;
}

const COOKIE_CONSENT_STORAGE_KEY = 'karpol_cookie_consent_v1';

const readConsent = (): CookieConsentValue | null => {
  try {
    const rawValue = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!rawValue) return null;

    const parsed = JSON.parse(rawValue) as Partial<CookieConsentState>;
    if (parsed.value === 'accepted' || parsed.value === 'rejected') {
      return parsed.value;
    }

    return null;
  } catch {
    return null;
  }
};

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(readConsent() === null);
  }, []);

  const handleConsent = (value: CookieConsentValue) => {
    const payload: CookieConsentState = {
      value,
      updatedAt: new Date().toISOString(),
      version: 1,
    };

    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(payload));
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[120] p-4 sm:p-6 pointer-events-none">
      <section
        role="dialog"
        aria-live="polite"
        aria-label="Informacja o plikach cookie"
        className="pointer-events-auto mx-auto max-w-5xl rounded-2xl border border-carbon-400/40 bg-carbon-800/95 backdrop-blur-xl shadow-2xl p-5 sm:p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
          <div className="flex-1">
            <h3 className="text-lg text-white font-heading mb-1">Używamy plików cookie</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Korzystamy z niezbędnych cookie do działania strony oraz opcjonalnych cookie statystycznych po Twojej zgodzie.
              Szczegóły znajdziesz w{' '}
              <a href="/polityka-prywatnosci" className="text-blue-400 hover:text-blue-300 underline">
                Polityce prywatności
              </a>
              .
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => handleConsent('rejected')}
              className="px-4 py-2.5 rounded-lg border border-carbon-400/40 text-gray-300 font-semibold hover:text-white hover:border-carbon-300/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              Odrzuć opcjonalne
            </button>
            <button
              type="button"
              onClick={() => handleConsent('accepted')}
              className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Akceptuję cookie
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookieBanner;
