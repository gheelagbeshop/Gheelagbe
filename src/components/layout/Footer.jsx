import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const shopLinks = [
  { key: "products", to: "/products" },
  { key: "ghee", to: "/products?category=ghee" },
  { key: "oil", to: "/products?category=oil" },
  { key: "honey", to: "/products?category=honey" },
  { key: "spices", to: "/products?category=spices" },
  { key: "jaggery", to: "/products?category=gur" },
  { key: "flour", to: "/products?category=ata" },
  { key: "lentils", to: "/products?category=dal" },
];

const exploreLinks = [
  { key: "home", to: "/" },
  { key: "ourStory", to: "/about" },
  { key: "storeLocator" },
  { key: "faqs", to: "/faq" },
  { key: "contact", to: "/contact" },
];

const socialItems = [
  { name: "Facebook", icon: <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.6v8h3.4z" /> },
  { name: "Instagram", icon: <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2.4" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2.4" /><circle cx="18" cy="6" r="1.3" /></> },
];

function FooterLinkList({ title, links, t, isBangla }) {
  return (
    <section>
      <h2 className={`mb-6 text-[15px] font-bold text-[#07533a] ${isBangla ? "tracking-normal" : "tracking-[.08em]"}`}>{title}</h2>
      <ul className="space-y-3 text-[15px] leading-6 text-[#07533a] sm:text-[16px]">
        {links.map(({ key, to }) => (
          <li key={key}>
            {to ? (
              <Link className="transition-colors hover:text-[#d99a18]" to={to}>{t(`footer.reference.${key}`)}</Link>
            ) : (
              <span className="cursor-default">{t(`footer.reference.${key}`)}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Footer() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const isBangla = language === "bn";
  const bengaliTypography = isBangla
    ? "font-[var(--font-bangla)] leading-relaxed tracking-normal"
    : "";

  const handleSubscribe = (event) => {
    event.preventDefault();
    setMessage(true);
  };

  return (
    <footer className={`overflow-hidden bg-[#fffdf2] text-[#07533a] ${bengaliTypography}`}>
      <div className="mx-auto max-w-[1600px] px-6 pb-10 pt-12 sm:px-10 lg:px-12 lg:pb-7 lg:pt-14">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10">
          <Link to="/" aria-label={`GheeLagbe ${t("footer.reference.home")}`} className="order-1 col-span-2 inline-flex w-fit md:col-span-4 lg:order-1 lg:col-span-1 lg:row-span-2 lg:items-start">
            <img src="/gheelagbe-leaf-mark.png" alt="GheeLagbe" className="h-[94px] w-[94px] object-contain sm:h-[112px] sm:w-[112px] lg:h-[132px] lg:w-[132px]" />
          </Link>

          <div className="order-3 col-span-1 lg:order-2"><FooterLinkList title={t("footer.reference.shop")} links={shopLinks} t={t} isBangla={isBangla} /></div>
          <div className="order-4 col-span-1 lg:order-3"><FooterLinkList title={t("footer.reference.explore")} links={exploreLinks} t={t} isBangla={isBangla} /></div>

          <section className="order-5 col-span-2 md:col-span-2 lg:order-4 lg:col-span-1">
            <h2 className={`mb-6 text-[15px] font-bold ${isBangla ? "tracking-normal" : "tracking-[.08em]"}`}>{t("footer.reference.connect")}</h2>
            <div className="flex w-fit items-center gap-4 text-[#07533a]">
              {socialItems.map(({ name, icon }) => (
                <span key={name} aria-label={name} className="flex h-9 w-8 items-center justify-center opacity-95">
                  <svg viewBox="0 0 24 24" className="h-[21px] w-[21px] fill-current" aria-hidden="true">{icon}</svg>
                </span>
              ))}
            </div>
            <a className="mt-4 inline-block text-[17px] transition-colors hover:text-[#d99a18] sm:text-[20px]" href="tel:+8801644945406">+880 1644-945406</a>
          </section>

          <section className="order-2 col-span-2 md:col-span-2 lg:order-5 lg:col-span-1 lg:row-span-2">
            <h2 className={`mb-5 text-[15px] font-bold ${isBangla ? "tracking-normal" : "tracking-[.06em]"}`}>{t("footer.reference.join")}</h2>
            <form onSubmit={handleSubscribe} className="flex h-[54px] w-full max-w-[470px] items-center rounded-full border border-[#07533a] pl-4 pr-1.5 transition-shadow focus-within:ring-2 focus-within:ring-[#07533a]/20 sm:h-[60px]">
              <Mail size={20} className="mr-3 shrink-0" aria-hidden="true" />
              <input type="email" required value={email} onChange={(event) => { setEmail(event.target.value); setMessage(""); }} placeholder={t("footer.reference.emailPlaceholder")} aria-label={t("footer.reference.emailAria")} className={`min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#07533a] ${isBangla ? "text-[11px] sm:text-xs" : "text-sm sm:text-[15px]"}`} />
              <button type="submit" aria-label={t("footer.reference.subscribeAria")} className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#07533a] text-white transition-colors hover:bg-[#d99a18] sm:h-[50px] sm:w-[50px]"><ArrowRight size={23} /></button>
            </form>
            {message && <p role="status" className="mt-2 text-xs">{t("footer.reference.signupUnavailable")}</p>}
            <div className="ml-auto mt-8 w-full max-w-[360px] text-center lg:mt-11">
              <p aria-label="Ghee Lagbe?" className="font-heading text-[clamp(3.5rem,12vw,5.25rem)] leading-[.78] tracking-[-.055em]">
                <span className="block text-[#07533a]">Ghee</span>
                <span className="block text-accent">Lagbe?</span>
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 flex flex-col gap-2 text-[13px] text-[#07533a] sm:mt-14 lg:mt-8 lg:flex-row lg:items-center lg:justify-center lg:gap-5 lg:text-[14px]">
          <span>{t("footer.reference.madeBy")}</span><span className="hidden lg:inline" aria-hidden="true">•</span>
          <span>{t("footer.reference.copyright", { year: new Date().getFullYear(), brand: "GheeLagbe" })}</span><span className="hidden lg:inline" aria-hidden="true">•</span>
          <span>{t("footer.reference.privacy")}</span><span className="hidden lg:inline" aria-hidden="true">•</span>
          <span>{t("footer.reference.terms")}</span>
        </div>
      </div>
      <div aria-hidden="true" className="h-7 w-full bg-[#07533a] sm:h-8" />
    </footer>
  );
}

export default Footer;
