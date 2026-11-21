import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import SEO from "../components/SEO";

export default function FAQPage() {
  const { t } = useLanguage();
  const questions = t("faqPage.items");

  return (
    <main className="min-h-[70vh] bg-[#FFF9EE] px-5 py-16 text-[#242820] sm:px-8 sm:py-20 lg:px-16">
      <SEO
        title={`${t("faqPage.title")} | GheeLagbe`}
        description={t("faqPage.description")}
        canonical="https://gheelagbe.com/faq"
      />

      <div className="mx-auto max-w-4xl">
        <header className="mb-10 max-w-2xl sm:mb-14">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#A17C32]">
            {t("faqPage.eyebrow")}
          </p>
          <h1 className="mt-4 font-heading text-4xl leading-tight text-[#193B26] sm:text-5xl">
            {t("faqPage.title")}
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#6F746B] sm:text-base">
            {t("faqPage.description")}
          </p>
        </header>

        <section aria-label={t("faqPage.title")} className="space-y-3">
          {Array.isArray(questions) && questions.map(({ question, answer }) => (
            <details key={question} className="group rounded-2xl border border-[#E8E4D9] bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-5 font-semibold text-[#193B26] sm:px-6">
                <span>{question}</span>
                <ChevronDown size={20} className="shrink-0 text-[#254D32] transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="mx-5 border-t border-[#E8E4D9] px-0 pb-5 pt-4 text-sm leading-7 text-[#6F746B] sm:mx-6">
                {answer}
              </div>
            </details>
          ))}
        </section>

        <div className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl bg-[#E8F0E8] p-5 text-sm text-[#193B26] sm:mt-12 sm:p-6">
          <p>{t("faqPage.contactPrompt")}</p>
          <Link to="/contact" className="inline-flex items-center gap-2 font-bold text-[#254D32] transition-colors hover:text-[#D9A441]">
            {t("faqPage.contactLink")} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
