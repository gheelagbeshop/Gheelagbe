import { Link } from "react-router-dom";
import {
  ArrowRight,
  Home,
  ShoppingBag,
  Leaf,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const NotFoundPage = () => {
  const { t } = useLanguage();

  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#FFF9EE] px-4 py-16 sm:px-6">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-[#E8F0E8] opacity-70 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#F5E7C5] opacity-60 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        {/* Illustration */}
        <div className="relative mx-auto mb-8 flex h-52 w-52 items-center justify-center sm:mb-10 sm:h-64 sm:w-64">
          {/* Decorative Circles */}
          <div className="absolute inset-0 rounded-full border border-[#D9A441]/30" />

          <div className="absolute inset-5 rounded-full bg-[#E8F0E8]" />

          <div className="absolute right-2 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#D9A441] shadow-lg sm:right-0 sm:h-14 sm:w-14">
            <Sparkles size={24} />
          </div>

          <div className="absolute bottom-7 left-0 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#254D32] shadow-lg sm:bottom-8 sm:h-12 sm:w-12">
            <Leaf size={21} />
          </div>

          {/* 404 Typography */}
          <div className="relative flex items-center gap-1">
            <span className="font-heading text-[90px] leading-none text-[#254D32] sm:text-[110px]">
              4
            </span>

            <div className="relative flex h-[85px] w-[85px] items-center justify-center rounded-full border-[7px] border-white bg-[#D9A441] shadow-xl sm:h-[105px] sm:w-[105px]">
              <div className="absolute inset-2 rounded-full border border-white/40" />

              <ShoppingBag
                size={38}
                strokeWidth={1.5}
                className="text-[#254D32] sm:h-11 sm:w-11"
              />
            </div>

            <span className="font-heading text-[90px] leading-none text-[#254D32] sm:text-[110px]">
              4
            </span>
          </div>
        </div>

        {/* Error Label */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E8E4D9] bg-white/80 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-[#D9A441]" />

          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#254D32] sm:text-xs">
            {t("notFound.badge")}
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-heading text-4xl leading-tight text-[#242820] sm:text-5xl lg:text-6xl">
          {t("notFound.titleStart")}
          <span className="block text-[#254D32]">
            {t("notFound.titleHighlight")}
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#6F746B] sm:text-base sm:leading-8">
          {t("notFound.description")}
        </p>

        {/* Action Buttons */}
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* Back Home */}
          <Link
            to="/"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#254D32] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#254D32]/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#193B26] hover:shadow-xl sm:w-auto"
          >
            <Home size={18} />

            {t("notFound.backHome")}

            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          {/* Shop */}
          <Link
            to="/products"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full border border-[#D9DFD5] bg-white/70 px-7 py-3.5 text-sm font-bold text-[#254D32] transition-all duration-300 hover:-translate-y-1 hover:border-[#254D32] hover:bg-[#E8F0E8] sm:w-auto"
          >
            <ShoppingBag size={18} />

            {t("notFound.exploreProducts")}

            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Bottom Message */}
        <div className="mt-12 flex items-center justify-center gap-2 border-t border-[#E8E4D9] pt-6">
          <Leaf size={15} className="text-[#254D32]" />

          <p className="text-xs font-medium text-[#8B9186]">
            {t("notFound.footerNote")}
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
