
import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { ArrowUp, ArrowUpRight } from "lucide-react";

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

  const developers = [
    {
      name: "Md Riyadul Islam Ratul",
      portfolio: "https://riyadulislamratul.vercel.app",
    },
    {
      name: "Sayad Golam Morshed",
      portfolio: "", // Add teammate's portfolio URL later
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#193B26] text-[#FFF9EE]">

      {/* Decorative Circles */}
      <div className="pointer-events-none absolute -right-40 -top-36 h-[450px] w-[450px] rounded-full border border-white/[0.07]" />
      <div className="pointer-events-none absolute -left-40 bottom-40 h-[350px] w-[350px] rounded-full border border-white/[0.07]" />

      <div className="container-custom relative mx-auto px-6 md:px-10 lg:px-14">

        {/* Top Hero Section */}
        <div className="grid gap-10 border-b border-white/15 py-16 md:grid-cols-2 md:items-center md:gap-16 md:py-24">

          <div>
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D9A441]">
              Taste of tradition
            </p>

            <h2 className="font-heading text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Bringing purity
              <br />
              to your
              <br />
              <span className="text-[#D9A441]">everyday life.</span>
            </h2>
          </div>

          <div className="max-w-md md:ml-auto">
            <p className="text-sm leading-8 text-white/60 sm:text-base">
              Discover authentic flavours and quality food products
              inspired by tradition. GheeLagbe brings carefully selected
              everyday essentials closer to your home.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-flex items-center gap-3 border-b border-[#D9A441] pb-2 text-sm font-semibold text-white transition hover:text-[#D9A441]"
            >
              Explore Our Products
              <ArrowUpRight size={17} />
            </Link>
          </div>

        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">

          {/* Brand Information */}
          <div>
            <Link to="/" className="inline-block">
              <span className="font-heading text-3xl font-bold tracking-tight">
                Ghee<span className="text-[#D9A441]">Lagbe</span>
                <span className="text-[#D9A441]">.</span>
              </span>
              <span className="mt-2 block text-[9px] font-semibold uppercase tracking-[0.25em] text-white/45">
                {t("footer.logoTagline")}
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-white/55">
              {t("footer.description")}
            </p>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">

              <a
                href="https://www.facebook.com/share/1J6mL7evdg/?mibextid=wwXIfr"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-[#D9A441] hover:bg-[#D9A441] hover:text-[#193B26]"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.6v8h3.4z" />
                </svg>
              </a>

              {/* <a
                href="#"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-[#D9A441] hover:bg-[#D9A441] hover:text-[#193B26]"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 7s-.2-1.6-.9-2.3c-.8-.9-1.7-.9-2.1-1C17 3.5 12 3.5 12 3.5s-5 0-8 .2c-.4.1-1.3.1-2.1 1C1.2 5.4 1 7 1 7S.8 8.8.8 10.5v1.8C.8 14 1 16 1 16s.2 1.6.9 2.3c.8.9 1.9.9 2.4 1 1.7.2 7.7.2 7.7.2s5 0 8-.2c.4-.1 1.3-.1 2.1-1 .7-.7.9-2.3.9-2.3s.2-1.8.2-3.5v-1.8C23.2 8.8 23 7 23 7zM9.5 15V8.5l6 3.3-6 3.2z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-[#D9A441] hover:bg-[#D9A441] hover:text-[#193B26]"
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
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-[#D9A441] hover:bg-[#D9A441] hover:text-[#193B26]"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 0 0-3.6 19.3c0-.8 0-1.8.2-2.6l1.3-5.5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.7 1.3 1.5 0 .9-.6 2.3-.9 3.6-.3 1.1.5 2 1.6 2 1.9 0 3.3-2 3.3-4.9 0-2.6-1.8-4.4-4.4-4.4-3 0-4.8 2.2-4.8 4.5 0 .9.3 1.9.8 2.4.1.2.2.3.1.5l-.3 1.1c-.1.3-.2.4-.5.2-1.4-.6-2.2-2.5-2.2-4 0-3.3 2.4-6.3 6.9-6.3 3.6 0 6.4 2.6 6.4 6 0 3.6-2.3 6.6-5.4 6.6-1.1 0-2.2-.6-2.6-1.3l-.7 2.6c-.2.9-.8 1.9-1.2 2.5A10 10 0 1 0 12 2z" />
                </svg>
              </a> */}

            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-6">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A441]">
              {t("footer.quickLinks")}
            </h3>

            <ul className="flex flex-col gap-4 text-sm text-white/60">
              <li>
                <Link to="/" className="transition hover:translate-x-1 hover:text-white">
                  {t("footer.links.home")}
                </Link>
              </li>
              <li>
                <Link to="/products" className="transition hover:translate-x-1 hover:text-white">
                  {t("footer.links.products")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition hover:translate-x-1 hover:text-white">
                  {t("footer.links.aboutUs")}
                </Link>
              </li>
              <li>
                <Link to="/products" className="transition hover:translate-x-1 hover:text-white">
                  {t("footer.links.blog")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition hover:translate-x-1 hover:text-white">
                  {t("footer.links.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="lg:pl-6">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A441]">
              {t("footer.customerCare")}
            </h3>

            <ul className="flex flex-col gap-4 text-sm text-white/60">
              <li>
                <Link to="/contact" className="transition hover:translate-x-1 hover:text-white">
                  {t("footer.links.trackOrder")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition hover:translate-x-1 hover:text-white">
                  {t("footer.links.shippingInfo")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition hover:translate-x-1 hover:text-white">
                  {t("footer.links.returnsRefunds")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition hover:translate-x-1 hover:text-white">
                  {t("footer.links.faqs")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition hover:translate-x-1 hover:text-white">
                  {t("footer.links.support")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:pl-6">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A441]">
              Get in Touch
            </h3>

            <div className="space-y-5 text-sm text-white/60">

              <p>Bangladesh</p>

              <a
                href="mailto:hello@gheelagbe.com"
                className="block transition hover:text-[#D9A441]"
              >
                hello@gheelagbe.com
              </a>

              <a
                href="tel:+8801644945406"
                className="block transition hover:text-[#D9A441]"
              >
                +880 1644-945406
              </a>

            </div>
          </div>

        </div>

      </div>

      {/* Bottom Footer */}
      <div className="relative border-t border-white/15">

        <div className="container-custom mx-auto flex flex-col items-center justify-between gap-6 px-6 py-7 md:flex-row md:px-10 lg:px-14">

          {/* Copyright */}
          <p className="text-center text-xs leading-6 text-white/45 md:text-left">
            © 2026 GheeLagbe. All rights reserved.
          </p>

          {/* Developer Credits */}
          <p className="text-center text-xs leading-6 text-white/45">
            Developed by{" "}
            {developers.map((developer, index) => (
              <span key={developer.name}>
                {index > 0 && <span className="mx-1 text-white/40">&</span>}

                {developer.portfolio ? (
                  <a
                    href={developer.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#D9A441] transition hover:text-white"
                  >
                    {developer.name}
                    <ArrowUpRight size={11} className="ml-0.5 inline-block" />
                  </a>
                ) : (
                  <span className="font-semibold text-[#D9A441]">
                    {developer.name}
                  </span>
                )}
              </span>
            ))}
          </p>

          {/* Back to Top */}
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="group flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-white/50 transition hover:text-[#D9A441]"
          >
            Back to top

            <span className="flex h-9 w-9 items-center justify-center border border-white/20 transition group-hover:border-[#D9A441] group-hover:bg-[#D9A441] group-hover:text-[#193B26]">
              <ArrowUp size={15} />
            </span>
          </button>

        </div>
      </div>

    </footer>
  );
}

export default Footer;
