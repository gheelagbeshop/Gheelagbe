import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Leaf,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const slideImages = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=1000&q=90",
    alt: "Rich creamy butter product photography",
    number: "01",
    link: "/products",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1000&q=90",
    alt: "A collection of colourful natural spices",
    number: "02",
    link: "/products",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1000&q=90",
    alt: "Golden cooking oil in a glass bottle",
    number: "03",
    link: "/products",
  },
];

const Hero = () => {
  const { t, language } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentMedia = slideImages[activeSlide];

  // Retrieve localized slide content
  const eyebrow = t(`hero.slides.${activeSlide}.eyebrow`);
  const title = t(`hero.slides.${activeSlide}.title`);
  const highlight = t(`hero.slides.${activeSlide}.highlight`);
  const description = t(`hero.slides.${activeSlide}.description`);
  const buttonText = t(`hero.slides.${activeSlide}.button`);
  const tag = t(`hero.slides.${activeSlide}.tag`);
  const category = t(`hero.slides.${activeSlide}.category`);

  const titleLines = Array.isArray(title) ? title : [title];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slideImages.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideImages.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      className="relative overflow-hidden bg-[#FFF9EE]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#E8F0E8] opacity-60 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-[#F5E7C5] opacity-50 blur-3xl" />

      <div className="container-custom relative">
        {/* Hero Content */}
        <div className="grid items-center gap-10 py-12 sm:py-16 lg:min-h-[590px] lg:grid-cols-2 lg:gap-14 lg:py-16">
          {/* LEFT CONTENT */}
          <div
            key={`slide-content-${activeSlide}-${language}`}
            className="relative z-10 order-2 animate-[heroFade_.6s_ease-out] lg:order-1"
          >
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F0E8] text-[#254D32]">
                <Leaf size={19} />
              </span>

              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#254D32] sm:text-xs">
                {eyebrow}
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-[650px] font-heading text-[clamp(2.5rem,5vw,5rem)] leading-[1.12] tracking-[-0.03em] text-[#242820]">
              {titleLines.map((line) => (
                <span
                  key={line}
                  className={`block ${
                    line === highlight ? "text-[#254D32]" : ""
                  }`}
                >
                  {line}
                </span>
              ))}
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-[490px] text-sm leading-7 text-[#6F746B] sm:text-base sm:leading-8">
              {description}
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
              <Link
                to={currentMedia.link}
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#254D32] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#254D32]/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#193B26] hover:shadow-xl"
              >
                <ShoppingBag size={18} />

                {buttonText}

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/about"
                className="group inline-flex items-center gap-2 text-sm font-bold text-[#254D32] transition-colors hover:text-[#B48632]"
              >
                {t("hero.discoverStory")}

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Product Highlights */}
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-[#E8E4D9] pt-6">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="shrink-0 text-[#254D32]" />
                <span className="text-xs font-semibold text-[#6F746B]">
                  {t("hero.qualityProducts")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Leaf size={18} className="shrink-0 text-[#254D32]" />
                <span className="text-xs font-semibold text-[#6F746B]">
                  {t("hero.everydayEssentials")}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div
            key={`image-${currentMedia.id}`}
            className="relative order-1 mx-auto w-full max-w-[550px] animate-[heroFade_.6s_ease-out] lg:order-2"
          >
            {/* Decorative Background */}
            <div className="absolute inset-5 rounded-[36px] bg-[#E8F0E8] sm:inset-8 sm:rounded-[48px]" />

            {/* Main Image */}
            <div className="relative aspect-[1.08/1] overflow-hidden rounded-[30px] border-[7px] border-white shadow-2xl shadow-[#254D32]/10 sm:rounded-[42px] sm:border-[10px]">
              <img
                src={currentMedia.image}
                alt={currentMedia.alt}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Image Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#193B26]/55 via-transparent to-transparent" />

              {/* Image Bottom Label */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 sm:bottom-7 sm:left-7 sm:right-7">
                <div>
                  <span className="mb-2 inline-block rounded-full border border-white/30 bg-white/20 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md sm:text-xs">
                    {tag}
                  </span>

                  <p className="text-[10px] font-bold tracking-[0.16em] text-white sm:text-xs">
                    {category}
                  </p>
                </div>

                <span className="font-heading text-3xl text-white sm:text-4xl">
                  G.
                </span>
              </div>
            </div>

            {/* Floating Quality Badge */}
            <div className="absolute -right-2 top-5 flex items-center gap-3 rounded-2xl border border-white bg-white/95 p-3 shadow-xl sm:-right-5 sm:top-10 sm:p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F5E7C5] text-[#A47728]">
                <Sparkles size={19} />
              </div>

              <div>
                <p className="text-xs font-bold text-[#242820]">
                  {t("hero.loveEveryBite")}
                </p>

                <p className="mt-1 text-[10px] text-[#6F746B]">
                  {t("hero.familyGoodness")}
                </p>
              </div>
            </div>

            {/* Floating Brand Badge */}
            {/* <div className="absolute -bottom-5 left-4 rounded-2xl border border-[#E8E4D9] bg-white px-4 py-3 shadow-xl sm:-bottom-6 sm:left-8">
              <p className="font-heading text-2xl leading-none text-[#254D32]">
                GheeLagbe.
              </p>

              <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#8B9186]">
                {t("hero.brandTagline")}
              </p>
            </div> */}
          </div>
        </div>

        {/* CAROUSEL FOOTER */}
        <div className="relative z-10 flex items-center justify-between border-t border-[#E8E4D9] py-5 sm:py-6">
          {/* Slide Number */}
          <div className="flex items-center gap-3">
            <span className="font-heading text-2xl text-[#254D32]">
              {currentMedia.number}
            </span>

            <span className="h-px w-9 bg-[#D9A441]" />

            <span className="text-xs font-semibold text-[#9A9E94]">
              0{slideImages.length}
            </span>
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-2">
            {slideImages.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={t("hero.goToSlideAria", { number: index + 1 })}
                aria-current={activeSlide === index ? "true" : undefined}
                onClick={() => setActiveSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlide === index
                    ? "w-9 bg-[#254D32]"
                    : "w-2 bg-[#C9CFC5] hover:bg-[#D9A441]"
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              aria-label={t("hero.prevSlideAria")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E4D9] text-[#254D32] transition-all hover:border-[#254D32] hover:bg-[#254D32] hover:text-white"
            >
              <ChevronLeft size={19} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label={t("hero.nextSlideAria")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E4D9] text-[#254D32] transition-all hover:border-[#254D32] hover:bg-[#254D32] hover:text-white"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes heroFade {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
