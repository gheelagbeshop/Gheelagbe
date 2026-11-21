import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[#E8E4D9] bg-cream text-[#263F35]">
      {/* Main Footer */}
      <div className="container-custom mx-auto px-6 py-14 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand Information */}
          <div>
            {/* Logo */}
            <Link to="/" className="inline-block shrink-0">
              <span className="font-heading text-3xl text-primary">
                Ghee<span className="text-accent">Lagbe</span>
                <span className="text-primary">.</span>
              </span>
              <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.22em] text-text-secondary">
                {t("footer.logoTagline")}
              </span>
            </Link>

            <p className="mt-3 max-w-xs leading-7 text-gray-600">
              {t("footer.description")}
            </p>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F0F7E9] text-[#214C32] transition hover:bg-[#214C32] hover:text-white"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.6v8h3.4z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F0F7E9] text-[#214C32] transition hover:bg-[#214C32] hover:text-white"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 7s-.2-1.6-.9-2.3c-.8-.9-1.7-.9-2.1-1C17 3.5 12 3.5 12 3.5s-5 0-8 .2c-.4.1-1.3.1-2.1 1C1.2 5.4 1 7 1 7S.8 8.8.8 10.5v1.8C.8 14 1 16 1 16s.2 1.6.9 2.3c.8.9 1.9.9 2.4 1 1.7.2 7.7.2 7.7.2s5 0 8-.2c.4-.1 1.3-.1 2.1-1 .7-.7.9-2.3.9-2.3s.2-1.8.2-3.5v-1.8C23.2 8.8 23 7 23 7zM9.5 15V8.5l6 3.3-6 3.2z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F0F7E9] text-[#214C32] transition hover:bg-[#214C32] hover:text-white"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <rect x={3} y={3} width={18} height={18} rx={5} />
                  <circle cx={12} cy={12} r={4} />
                  <circle cx={18} cy={6} r={1} fill="currentColor" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Pinterest"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F0F7E9] text-[#214C32] transition hover:bg-[#214C32] hover:text-white"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 0 0-3.6 19.3c0-.8 0-1.8.2-2.6l1.3-5.5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.7 1.3 1.5 0 .9-.6 2.3-.9 3.6-.3 1.1.5 2 1.6 2 1.9 0 3.3-2 3.3-4.9 0-2.6-1.8-4.4-4.4-4.4-3 0-4.8 2.2-4.8 4.5 0 .9.3 1.9.8 2.4.1.2.2.3.1.5l-.3 1.1c-.1.3-.2.4-.5.2-1.4-.6-2.2-2.5-2.2-4 0-3.3 2.4-6.3 6.9-6.3 3.6 0 6.4 2.6 6.4 6 0 3.6-2.3 6.6-5.4 6.6-1.1 0-2.2-.6-2.6-1.3l-.7 2.6c-.2.9-.8 1.9-1.2 2.5A10 10 0 1 0 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-12">
            <h3 className="text-xl font-bold text-[#214C32]">
              {t("footer.quickLinks")}
            </h3>
            <div className="mb-6 mt-3 h-[3px] w-12 bg-[#f2c25d]" />
            <ul className="flex flex-col gap-2.5 text-gray-700">
              <li>
                <Link to="/" className="transition hover:text-[#E99B2D]">
                  {t("footer.links.home")}
                </Link>
              </li>
              <li>
                <Link to="/products" className="transition hover:text-[#E99B2D]">
                  {t("footer.links.products")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition hover:text-[#E99B2D]">
                  {t("footer.links.aboutUs")}
                </Link>
              </li>
              <li>
                <a href="#" className="transition hover:text-[#E99B2D]">
                  {t("footer.links.blog")}
                </a>
              </li>
              <li>
                <Link to="/contact" className="transition hover:text-[#E99B2D]">
                  {t("footer.links.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="lg:pl-12">
            <h3 className="text-xl font-bold text-[#214C32]">
              {t("footer.customerCare")}
            </h3>
            <div className="mb-6 mt-3 h-[3px] w-12 bg-[#f2c25d]" />
            <ul className="flex flex-col gap-2.5 text-gray-700">
              <li>
                <a href="#" className="transition hover:text-[#E99B2D]">
                  {t("footer.links.trackOrder")}
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-[#E99B2D]">
                  {t("footer.links.shippingInfo")}
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-[#E99B2D]">
                  {t("footer.links.returnsRefunds")}
                </a>
              </li>
              <li>
                <Link to="/contact" className="transition hover:text-[#E99B2D]">
                  {t("footer.links.faqs")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition hover:text-[#E99B2D]">
                  {t("footer.links.support")}
                </Link>
              </li>
            </ul>
          </div>

          {/* More Information */}
          <div className="lg:pl-12">
            <h3 className="text-xl font-bold text-[#214C32]">
              {t("footer.moreInfo")}
            </h3>
            <div className="mb-6 mt-3 h-[3px] w-12 bg-[#f2c25d]" />
            <ul className="flex flex-col gap-2.5 text-gray-700">
              <li>
                <Link to="/products" className="transition hover:text-[#E99B2D]">
                  {t("footer.links.ourProducts")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition hover:text-[#E99B2D]">
                  {t("footer.links.ourStory")}
                </Link>
              </li>
              <li>
                <a href="#" className="transition hover:text-[#E99B2D]">
                  {t("footer.links.privacyPolicy")}
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-[#E99B2D]">
                  {t("footer.links.termsConditions")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="container-custom border-t border-[#DCE5D5]">
        <div className="mx-auto px-6 py-10 md:px-10 lg:px-14">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            {/* Copyright */}
            <p className="text-center text-sm text-[#263F35] md:text-base">
              {t("footer.copyright")}
            </p>

            {/* Payment Methods */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="mr-2 font-semibold text-[#214C32]">
                {t("footer.weAccept")}
              </span>
              <span className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-blue-700">
                VISA
              </span>
              <span className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-orange-500">
                Mastercard
              </span>
              <span className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-pink-600">
                bKash
              </span>
              <span className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-orange-600">
                Nagad
              </span>
              <span className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-blue-600">
                stripe
              </span>
            </div>

            {/* Policy Links */}
            <div className="flex items-center gap-4 text-sm text-[#214C32]">
              <a href="#" className="transition hover:text-[#E99B2D]">
                {t("footer.links.terms")}
              </a>
              <span className="text-gray-400">|</span>
              <a href="#" className="transition hover:text-[#E99B2D]">
                {t("footer.links.privacy")}
              </a>
              <span className="text-gray-400">|</span>
              <a href="#" className="transition hover:text-[#E99B2D]">
                {t("footer.links.sitemap")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
