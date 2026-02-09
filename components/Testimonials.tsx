import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index: number) => {
    setActiveIndex(index);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="opinie" className="py-24 md:py-32 bg-carbon-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="text-center mb-14 md:mb-16">
            <p className="uppercase tracking-[0.24em] text-xs md:text-sm font-semibold text-blue-400 mb-3">Opinie klientów</p>
            <h2 className="text-4xl md:text-6xl text-white mb-4">Co mówią nasi klienci</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Zaufanie budowane latami rzetelnej pracy.</p>
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-xl border border-carbon-400/30 bg-carbon-700/40 p-6 backdrop-blur-sm"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-5">"{testimonial.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-carbon-400/20">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-gray-500 text-xs">{testimonial.car}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile slider */}
          <div className="md:hidden">
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl border border-carbon-400/30 bg-carbon-700/40 p-6 backdrop-blur-sm"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: TESTIMONIALS[activeIndex].rating }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-5">"{TESTIMONIALS[activeIndex].text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-carbon-400/20">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-sm">
                      {TESTIMONIALS[activeIndex].name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{TESTIMONIALS[activeIndex].name}</p>
                      <p className="text-gray-500 text-xs">{TESTIMONIALS[activeIndex].car}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Poprzednia opinia"
                className="w-10 h-10 rounded-full border border-carbon-400/40 bg-carbon-700/50 text-gray-400 hover:text-white hover:border-blue-500/50 transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Opinia ${index + 1}`}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === activeIndex ? 'bg-blue-500' : 'bg-carbon-400/50 hover:bg-carbon-400'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={goNext}
                aria-label="Następna opinia"
                className="w-10 h-10 rounded-full border border-carbon-400/40 bg-carbon-700/50 text-gray-400 hover:text-white hover:border-blue-500/50 transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
