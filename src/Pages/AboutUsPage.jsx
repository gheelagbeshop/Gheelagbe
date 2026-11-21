import { Link } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Leaf,
  PackageCheck,
  PhoneCall,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import SEO from "../components/SEO";

const photos = {
  hero: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1800&q=90",
  story: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=85",
  ghee: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=85",
  honey: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=900&q=85",
  spices: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=85",
  kitchen: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1800&q=90",
};

const AboutUsPage = () => {
  const { language } = useLanguage();
  const bn = language === "bn";

  const copy = {
    eyebrow: bn ? "ঘি লাগবে · আমাদের গল্প" : "GHEELAGBE · OUR STORY",
    heroTitle: bn
      ? "প্রকৃতির স্বাদ, প্রতিদিনের রান্নায়।"
      : "A little closer to the goodness of nature.",
    heroDescription: bn
      ? "আপনার রান্নাঘরের পরিচিত প্রয়োজনীয় পণ্য—ঘি, সরিষার তেল, মধু ও মসলা—সহজে খুঁজে পেতে ঘি লাগবে।"
      : "A thoughtful place to discover everyday kitchen essentials, from ghee and mustard oil to honey and spices.",
    explore: bn ? "পণ্য দেখুন" : "Explore products",
    storyLabel: bn ? "আমাদের পরিচয়" : "A NOTE ABOUT US",
    storyTitle: bn
      ? "ভালো খাবারের জন্য বেছে নেওয়া সহজ হওয়া উচিত।"
      : "Good food choices should feel simple.",
    storyP1: bn
      ? "ঘি লাগবে তৈরি হয়েছে দৈনন্দিন রান্নার প্রয়োজনীয় খাবার ও উপকরণ এক জায়গায় সহজে পৌঁছে দেওয়ার ভাবনা থেকে।"
      : "GheeLagbe is built around a simple idea: make it easier to find the food essentials that bring everyday meals together.",
    storyP2: bn
      ? "আমাদের সংগ্রহে রয়েছে ঘি, সরিষার তেল, মধু এবং বিভিন্ন মসলা। পণ্যের বিবরণ ও মূল্য পরিষ্কারভাবে তুলে ধরে কেনাকাটার অভিজ্ঞতাকে সহজ রাখাই আমাদের লক্ষ্য।"
      : "Our collection brings together ghee, mustard oil, honey and spices. We aim to make browsing straightforward with clear product information and pricing.",
    storyNote: bn ? "প্রতিদিনের রান্নার জন্য, এক জায়গায়।" : "Everyday kitchen essentials, in one place.",
    collectionLabel: bn ? "আমাদের সংগ্রহ" : "THE COLLECTION",
    collectionTitle: bn ? "রান্নাঘরের পরিচিত স্বাদ" : "Made for the everyday kitchen",
    collectionDescription: bn
      ? "আপনার পছন্দের পণ্য খুঁজে নিন আমাদের নির্বাচিত সংগ্রহ থেকে।"
      : "Discover familiar ingredients and everyday favourites in our growing collection.",
    products: [
      {
        title: bn ? "ঘি" : "Ghee",
        subtitle: bn ? "সমৃদ্ধ স্বাদ" : "Rich, familiar flavour",
        image: photos.ghee,
      },
      {
        title: bn ? "মধু" : "Honey",
        subtitle: bn ? "প্রাকৃতিক মিষ্টতা" : "A touch of sweetness",
        image: photos.honey,
      },
      {
        title: bn ? "মসলা" : "Spices",
        subtitle: bn ? "রান্নায় সুবাস" : "Aromatic essentials",
        image: photos.spices,
      },
    ],
    valuesLabel: bn ? "আমাদের অঙ্গীকার" : "WHAT YOU CAN EXPECT",
    valuesTitle: bn ? "স্বচ্ছতা, যত্ন এবং সহজ অভিজ্ঞতা।" : "Thoughtful details. A simpler experience.",
    values: [
      {
        number: "01",
        title: bn ? "স্পষ্ট পণ্যের তথ্য" : "Clear product details",
        text: bn
          ? "পণ্য সম্পর্কে জানুন এবং তথ্য দেখে নিজের পছন্দ তৈরি করুন।"
          : "Explore product information and make choices with clarity.",
      },
      {
        number: "02",
        title: bn ? "সহজ অর্ডার" : "Easy ordering",
        text: bn
          ? "অ্যাকাউন্ট ছাড়াই সহজ checkout-এর মাধ্যমে অর্ডার করতে পারবেন।"
          : "Place an order through a straightforward guest checkout.",
      },
      {
        number: "03",
        title: bn ? "ফোনে নিশ্চিতকরণ" : "Personal confirmation",
        text: bn
          ? "অর্ডার পাওয়ার পর আমাদের প্রতিনিধি ফোন করে তথ্য নিশ্চিত করবেন।"
          : "After receiving your order, our team calls to confirm the details.",
      },
      {
        number: "04",
        title: bn ? "ক্যাশ অন ডেলিভারি" : "Cash on Delivery",
        text: bn
          ? "পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন।"
          : "Pay when your order is delivered to you.",
      },
    ],
    processLabel: bn ? "যেভাবে কাজ করে" : "A SIMPLE PROCESS",
    processTitle: bn ? "অর্ডার থেকে ডেলিভারি—সহজ কয়েকটি ধাপ।" : "From browsing to delivery, made simple.",
    steps: [
      {
        icon: ShoppingBag,
        title: bn ? "পণ্য বেছে নিন" : "Choose your products",
        text: bn ? "আমাদের সংগ্রহ থেকে পছন্দের পণ্য যোগ করুন।" : "Find what you need and add it to your cart.",
      },
      {
        icon: PackageCheck,
        title: bn ? "অর্ডার সম্পন্ন করুন" : "Place your order",
        text: bn ? "আপনার যোগাযোগ ও ডেলিভারির তথ্য দিন।" : "Enter your contact and delivery information.",
      },
      {
        icon: PhoneCall,
        title: bn ? "ফোনে নিশ্চিতকরণ" : "Confirm by phone",
        text: bn ? "আমাদের প্রতিনিধি আপনার সঙ্গে যোগাযোগ করবেন।" : "Our representative will call to confirm your order.",
      },
      {
        icon: Truck,
        title: bn ? "ডেলিভারি গ্রহণ করুন" : "Receive your delivery",
        text: bn ? "পণ্য বুঝে নিয়ে ক্যাশ অন ডেলিভারিতে মূল্য দিন।" : "Receive your items and pay on delivery.",
      },
    ],
    delivery: bn ? "সারা বাংলাদেশে নির্দিষ্ট ডেলিভারি চার্জ ৳১২০" : "Flat delivery charge of ৳120 across Bangladesh",
    ctaLabel: bn ? "আপনার রান্নাঘরের জন্য" : "FOR YOUR KITCHEN",
    ctaTitle: bn ? "আজই খুঁজে নিন আপনার প্রয়োজনীয় পণ্য।" : "Find something good for your kitchen.",
    ctaText: bn
      ? "ঘি লাগবে-র সংগ্রহ ঘুরে দেখুন এবং আপনার পছন্দের পণ্য অর্ডার করুন।"
      : "Explore the GheeLagbe collection and order the essentials you love.",
    ctaButton: bn ? "কেনাকাটা শুরু করুন" : "Start shopping",
  };

  return (
    <main className="overflow-hidden bg-[#fbf8f0] text-[#20291f]">
      <SEO
        title="আমাদের সম্পর্কে | GheeLagbe"
        description="GheeLagbe সম্পর্কে জানুন। আমরা খাঁটি ও প্রাকৃতিক খাদ্যসামগ্রী পৌঁছে দিতে কাজ করি।"
        canonical="https://gheelagbe.com/about"
      />
      {/* HERO */}
      <section className="relative isolate min-h-[660px] overflow-hidden bg-[#e9eee5] lg:min-h-[720px]">
        <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(ellipse_at_12%_20%,rgba(255,255,255,.95),transparent_38%),radial-gradient(ellipse_at_85%_85%,rgba(114,139,102,.18),transparent_38%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%270 0 180 180%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%27.22%27/%3E%3C/svg%3E')]" />

        <div className="relative mx-auto grid min-h-[660px] max-w-[1440px] items-center gap-12 px-5 py-16 sm:px-10 lg:min-h-[720px] lg:grid-cols-[.88fr_1.12fr] lg:gap-8 lg:px-16 lg:py-20">
          <div className="relative z-10 max-w-[590px]">
            <p className="mb-7 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.28em] text-[#59704f] sm:text-xs">
              <span className="h-px w-9 bg-[#b18b48]" />
              {copy.eyebrow}
            </p>
            <h1 className="max-w-[620px] font-heading text-[clamp(2.8rem,5.4vw,5.6rem)] leading-[1.12] tracking-[-.045em] text-[#20291f]">
              {copy.heroTitle}
            </h1>
            <p className="mt-7 max-w-[470px] text-sm leading-8 text-[#626c5e] sm:text-base sm:leading-9">
              {copy.heroDescription}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Link
                to="/products"
                className="group inline-flex items-center gap-5 border-b border-[#254d32] pb-3 text-sm font-bold text-[#254d32] transition-colors hover:text-[#9a7435]"
              >
                {copy.explore}
                <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
              <a href="#our-story" className="text-xs font-semibold text-[#6d7569] transition-colors hover:text-[#254d32]">
                {bn ? "আমাদের গল্প" : "Our story"} <span className="ml-1">↓</span>
              </a>
            </div>
            <div className="mt-16 hidden items-center gap-4 text-[10px] font-semibold uppercase tracking-[.2em] text-[#788273] lg:flex">
              <span>01</span><span className="h-px w-14 bg-[#aeb8a7]" /><span>{bn ? "খাঁটি স্বাদের খোঁজে" : "A taste of the familiar"}</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[760px] lg:ml-auto">
            <div className="absolute -right-10 -top-12 h-[78%] w-[72%] border border-[#254d32]/15" />
            <div className="relative h-[390px] overflow-hidden sm:h-[520px] lg:h-[590px]">
              <img
                src={photos.hero}
                alt={bn ? "তাজা খাবার ও রান্নার উপকরণ" : "Fresh food and kitchen ingredients"}
                className="h-full w-full object-cover object-center"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#142519]/45 via-transparent to-[#142519]/5" />
              <div className="absolute bottom-7 left-7 max-w-xs text-white sm:bottom-10 sm:left-10">
                <span className="text-[10px] font-semibold uppercase tracking-[.25em] text-white/75">GHEELAGBE</span>
                <p className="mt-3 font-heading text-2xl leading-tight sm:text-3xl">
                  {bn ? "প্রতিদিনের খাবারে, পরিচিত স্বাদ।" : "Familiar flavours for everyday moments."}
                </p>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-3 h-24 w-24 border-b border-l border-[#b18b48] sm:-left-7 sm:h-32 sm:w-32" />
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="our-story" className="relative px-5 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="pointer-events-none absolute right-0 top-0 h-[520px] w-[520px] rounded-full bg-[#dce6d8]/35 blur-[110px]" />
        <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-[1fr_.9fr] lg:gap-24">
          <div className="relative">
            <div className="absolute -left-5 -top-5 h-full w-full border border-[#c8d1c1]" />
            <img
              src={photos.story}
              alt={bn ? "টেবিলে সাজানো তাজা খাবার" : "Freshly prepared food on a table"}
              className="relative h-[360px] w-full object-cover sm:h-[520px]"
              loading="lazy"
            />
            <div className="absolute -bottom-7 right-0 bg-[#254d32] px-6 py-5 text-[#f9f6ec] sm:right-[-24px] sm:px-8">
              <Leaf size={19} className="mb-3 text-[#d9a441]" />
              <p className="max-w-[190px] text-xs leading-6">{copy.storyNote}</p>
            </div>
          </div>

          <div className="pt-3 lg:pt-0">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[.28em] text-[#a17b3c]">{copy.storyLabel}</p>
            <h2 className="max-w-[560px] font-heading text-3xl leading-[1.2] tracking-[-.03em] sm:text-4xl lg:text-[3.35rem]">
              {copy.storyTitle}
            </h2>
            <div className="mt-8 max-w-[540px] space-y-5 text-sm leading-8 text-[#687064] sm:text-base sm:leading-9">
              <p>{copy.storyP1}</p>
              <p>{copy.storyP2}</p>
            </div>
            <div className="mt-9 flex items-center gap-4 border-t border-[#d9ded3] pt-6">
              <span className="h-px w-10 bg-[#b18b48]" />
              <span className="text-[10px] font-bold uppercase tracking-[.2em] text-[#65745d]">GHEELAGBE</span>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT EDITORIAL */}
      <section className="relative bg-[#f0f0e8] px-5 py-24 sm:px-10 lg:px-16 lg:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,.9),transparent_55%)]" />
        <div className="relative mx-auto max-w-[1240px]">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[.28em] text-[#a17b3c]">{copy.collectionLabel}</p>
              <h2 className="font-heading text-3xl tracking-[-.03em] sm:text-5xl">{copy.collectionTitle}</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-[#70776b]">{copy.collectionDescription}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {copy.products.map((product, index) => (
              <Link
                to="/products"
                key={product.title}
                className={`group relative block overflow-hidden bg-[#dfe5da] ${index === 1 ? "md:mt-12" : ""}`}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#142519]/75 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 text-white sm:p-8">
                  <div>
                    <p className="mb-2 text-[10px] uppercase tracking-[.2em] text-white/70">{product.subtitle}</p>
                    <h3 className="font-heading text-3xl">{product.title}</h3>
                  </div>
                  <span className="mb-1 flex h-10 w-10 items-center justify-center border border-white/60 transition-colors group-hover:bg-white group-hover:text-[#254d32]">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="relative overflow-hidden bg-[#1d3828] px-5 py-24 text-[#f8f5eb] sm:px-10 lg:px-16 lg:py-28">
        <div className="pointer-events-none absolute -right-40 -top-48 h-[600px] w-[600px] rounded-full border border-white/[.07]" />
        <div className="pointer-events-none absolute -right-16 -top-24 h-[420px] w-[420px] rounded-full border border-white/[.06]" />
        <div className="relative mx-auto max-w-[1240px]">
          <div className="max-w-2xl">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[.28em] text-[#d9b66e]">{copy.valuesLabel}</p>
            <h2 className="font-heading text-3xl leading-tight tracking-[-.03em] sm:text-5xl">{copy.valuesTitle}</h2>
          </div>

          <div className="mt-16 grid border-t border-white/20 sm:grid-cols-2 lg:grid-cols-4">
            {copy.values.map((item) => (
              <article key={item.number} className="border-b border-white/20 py-8 sm:px-6 sm:first:pl-0 lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0">
                <p className="mb-10 text-xs tracking-[.2em] text-[#d9b66e]">{item.number}</p>
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/60">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative px-5 py-24 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-14 max-w-2xl">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[.28em] text-[#a17b3c]">{copy.processLabel}</p>
            <h2 className="font-heading text-3xl leading-tight tracking-[-.03em] sm:text-5xl">{copy.processTitle}</h2>
          </div>

          <div className="grid border-t border-[#d8ded3] sm:grid-cols-2 lg:grid-cols-4">
            {copy.steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="group border-b border-[#d8ded3] py-8 sm:px-6 sm:first:pl-0 lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="font-heading text-4xl text-[#c4cbbd]">0{index + 1}</span>
                    <Icon size={21} strokeWidth={1.4} className="text-[#58704f] transition-transform group-hover:-translate-y-1" />
                  </div>
                  <h3 className="text-base font-bold">{step.title}</h3>
                  <p className="mt-3 max-w-[240px] text-sm leading-7 text-[#737b70]">{step.text}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 border border-[#d8ded3] bg-[#f1f2eb] px-5 py-4 text-xs font-semibold text-[#35523a]">
            <Truck size={17} />
            {copy.delivery}
          </div>
        </div>
      </section>

      {/* FINAL IMAGE CTA */}
      <section className="relative min-h-[500px] overflow-hidden sm:min-h-[580px]">
        <img
          src={photos.kitchen}
          alt={bn ? "প্রাকৃতিক আলোয় সাজানো রান্নাঘর" : "A warmly lit home kitchen"}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#142519]/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#142519]/75 via-[#142519]/35 to-transparent" />
        <div className="relative mx-auto flex min-h-[500px] max-w-[1240px] items-center px-5 py-20 sm:min-h-[580px] sm:px-10 lg:px-16">
          <div className="max-w-2xl text-white">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[.28em] text-[#e2c17d]">{copy.ctaLabel}</p>
            <h2 className="font-heading text-4xl leading-[1.12] tracking-[-.035em] sm:text-6xl">{copy.ctaTitle}</h2>
            <p className="mt-6 max-w-lg text-sm leading-8 text-white/75 sm:text-base">{copy.ctaText}</p>
            <Link
              to="/products"
              className="group mt-9 inline-flex items-center gap-5 border-b border-[#e2c17d] pb-3 text-sm font-bold text-white transition-colors hover:text-[#e2c17d]"
            >
              {copy.ctaButton}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;
