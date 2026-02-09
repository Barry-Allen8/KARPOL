import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES, SEGMENTS, BASE_PRICES, SEGMENT_MULTIPLIER } from '../constants';
import { ServiceCategory, CarSegment } from '../types';

const Calculator: React.FC = () => {
  const [category, setCategory] = useState<ServiceCategory>('Silnik');
  const [segment, setSegment] = useState<CarSegment>('Miejskie');

  const estimate = useMemo(() => {
    const base = BASE_PRICES[category];
    const multiplier = SEGMENT_MULTIPLIER[segment];
    const total = base * multiplier;

    return {
      min: Math.floor(total * 0.84),
      max: Math.ceil(total * 1.18),
    };
  }, [category, segment]);

  const scrollToContact = () => {
    document.getElementById('kontakt')?.scrollIntoView({ block: 'start' });
  };

  return (
    <section id="kalkulator" className="py-24 md:py-32 bg-carbon-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12 md:mb-14">
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm font-semibold text-blue-400 mb-3">
              Szybka orientacyjna wycena
            </p>
            <h2 className="text-4xl md:text-6xl leading-[0.95] text-white mb-4">Kalkulator napraw</h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
              Wybierz typ usługi i segment auta, a my pokażemy realny zakres cenowy przed wizytą.
            </p>
          </div>

          <div className="rounded-2xl border border-carbon-400/50 bg-carbon-700/60 p-6 md:p-10 shadow-2xl backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
              <div className="space-y-8">
                <fieldset>
                  <legend className="block text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-[0.22em] mb-4">
                    Kategoria usługi
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        aria-pressed={category === cat}
                        className={`px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-carbon-700 ${
                          category === cat
                            ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20'
                            : 'bg-carbon-600/80 text-gray-300 border-carbon-400/40 hover:border-blue-500/50 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="block text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-[0.22em] mb-4">
                    Segment pojazdu
                  </legend>
                  <div className="grid grid-cols-3 gap-3">
                    {SEGMENTS.map((seg) => (
                      <button
                        key={seg}
                        type="button"
                        onClick={() => setSegment(seg)}
                        aria-pressed={segment === seg}
                        className={`px-3 md:px-4 py-3 rounded-lg text-sm font-semibold border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-carbon-700 ${
                          segment === seg
                            ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20'
                            : 'bg-carbon-600/80 text-gray-300 border-carbon-400/40 hover:border-blue-500/50 hover:text-white'
                        }`}
                      >
                        {seg}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>

              <div className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-carbon-950 via-carbon-900 to-carbon-800 p-7 md:p-10 text-center text-white flex flex-col justify-center items-center">
                <p className="text-blue-400/90 text-sm tracking-[0.18em] uppercase mb-3">Szacowany zakres cenowy</p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${category}-${segment}`}
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    aria-live="polite"
                    className="text-center"
                  >
                    <span className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                      {estimate.min} – {estimate.max}
                    </span>
                    <span className="text-xl font-semibold text-blue-400 ml-2">PLN</span>
                  </motion.div>
                </AnimatePresence>
                <p className="text-xs text-gray-500 mt-5 italic max-w-xs">
                  Kwota ma charakter orientacyjny. Dokładną wycenę potwierdzamy po diagnostyce auta.
                </p>
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="mt-8 px-8 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-carbon-900 shadow-lg shadow-blue-600/25"
                >
                  Umów wizytę
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Calculator;
