import React from 'react';
import { BUSINESS_NAME, ADDRESS, PHONE, PHONE_URL } from '../constants';

const LAST_UPDATED = '09.02.2026';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 page-grain" aria-hidden="true" />

      <header className="sticky top-0 z-50 glass-dark border-b border-carbon-400/30">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-4">
          <a href="/" className="flex flex-col text-left" aria-label="Wróć na stronę główną">
            <span className="text-xl md:text-2xl font-bold tracking-[0.08em] text-white font-heading">KARPOL</span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.28em] text-blue-400 font-semibold">Auto Naprawa</span>
          </a>

          <div className="flex items-center gap-3">
            <a
              href={PHONE_URL}
              className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-blue-600/20"
            >
              {PHONE}
            </a>
            <a
              href="/"
              className="inline-flex items-center px-4 py-2.5 rounded-lg border border-carbon-400/40 text-sm font-semibold text-gray-300 hover:text-white hover:border-carbon-300/60 transition-colors"
            >
              Strona główna
            </a>
          </div>
        </div>
      </header>

      <section className="relative z-10 pt-16 md:pt-20 pb-24 md:pb-28">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="uppercase tracking-[0.24em] text-xs font-semibold text-blue-400 mb-4">Dokument prawny</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl leading-[0.92] text-white mb-5 font-heading">Polityka prywatności</h1>
            <p className="text-sm text-gray-500 mb-8">Ostatnia aktualizacja: {LAST_UPDATED}</p>

            <div className="space-y-6">
              <article className="rounded-2xl border border-carbon-400/30 bg-carbon-800/70 p-6 md:p-8">
                <h2 className="text-2xl text-white mb-3 font-heading">1. Administrator danych</h2>
                <p className="text-gray-300 leading-relaxed">
                  Administratorem danych osobowych jest {BUSINESS_NAME}, adres: {ADDRESS}. W sprawach związanych z
                  przetwarzaniem danych możesz skontaktować się telefonicznie: {PHONE}.
                </p>
              </article>

              <article className="rounded-2xl border border-carbon-400/30 bg-carbon-800/70 p-6 md:p-8">
                <h2 className="text-2xl text-white mb-3 font-heading">2. Jakie dane zbieramy</h2>
                <p className="text-gray-300 leading-relaxed mb-3">
                  Przetwarzamy dane podane dobrowolnie w formularzach i podczas kontaktu, w szczególności:
                </p>
                <ul className="text-gray-300 leading-relaxed list-disc pl-5 space-y-1">
                  <li>imię i numer telefonu,</li>
                  <li>dane dotyczące zapytania serwisowego,</li>
                  <li>dane techniczne związane z korzystaniem ze strony (np. adres IP, parametry przeglądarki).</li>
                </ul>
              </article>

              <article className="rounded-2xl border border-carbon-400/30 bg-carbon-800/70 p-6 md:p-8">
                <h2 className="text-2xl text-white mb-3 font-heading">3. Cele i podstawa przetwarzania</h2>
                <p className="text-gray-300 leading-relaxed mb-3">Dane przetwarzamy w celu:</p>
                <ul className="text-gray-300 leading-relaxed list-disc pl-5 space-y-1">
                  <li>obsługi zapytań i umawiania wizyt serwisowych,</li>
                  <li>realizacji usług i kontaktu z klientem,</li>
                  <li>zapewnienia bezpieczeństwa i poprawnego działania strony.</li>
                </ul>
              </article>

              <article className="rounded-2xl border border-carbon-400/30 bg-carbon-800/70 p-6 md:p-8">
                <h2 className="text-2xl text-white mb-3 font-heading">4. Okres przechowywania danych</h2>
                <p className="text-gray-300 leading-relaxed">
                  Dane przechowujemy przez czas niezbędny do realizacji celu, dla którego zostały zebrane, a także przez
                  okres wynikający z obowiązków prawnych lub do czasu wniesienia skutecznego sprzeciwu.
                </p>
              </article>

              <article className="rounded-2xl border border-carbon-400/30 bg-carbon-800/70 p-6 md:p-8">
                <h2 className="text-2xl text-white mb-3 font-heading">5. Pliki cookie</h2>
                <p className="text-gray-300 leading-relaxed mb-3">Na stronie wykorzystujemy pliki cookie:</p>
                <ul className="text-gray-300 leading-relaxed list-disc pl-5 space-y-1">
                  <li>niezbędne do działania serwisu,</li>
                  <li>opcjonalne (analityczne/statystyczne) wyłącznie po uzyskaniu zgody.</li>
                </ul>
                <p className="text-gray-300 leading-relaxed mt-3">
                  Zgodę możesz zmienić poprzez ustawienia przeglądarki lub usunięcie zapisanych cookie dla tej witryny.
                </p>
              </article>

              <article className="rounded-2xl border border-carbon-400/30 bg-carbon-800/70 p-6 md:p-8">
                <h2 className="text-2xl text-white mb-3 font-heading">6. Twoje prawa</h2>
                <p className="text-gray-300 leading-relaxed mb-3">Masz prawo do:</p>
                <ul className="text-gray-300 leading-relaxed list-disc pl-5 space-y-1">
                  <li>dostępu do danych,</li>
                  <li>sprostowania lub usunięcia danych,</li>
                  <li>ograniczenia przetwarzania,</li>
                  <li>sprzeciwu wobec przetwarzania,</li>
                  <li>złożenia skargi do organu nadzorczego.</li>
                </ul>
              </article>

              <article className="rounded-2xl border border-carbon-400/30 bg-carbon-800/70 p-6 md:p-8">
                <h2 className="text-2xl text-white mb-3 font-heading">7. Kontakt</h2>
                <p className="text-gray-300 leading-relaxed">
                  W sprawach związanych z prywatnością i przetwarzaniem danych skontaktuj się z nami telefonicznie:
                  {' '}
                  <a href={PHONE_URL} className="text-blue-400 hover:text-blue-300 underline font-semibold">
                    {PHONE}
                  </a>
                  .
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;
