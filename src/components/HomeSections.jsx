import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Leaf,
  PackageCheck,
  PhoneCall,
  ShoppingBag,
  Truck,
} from "lucide-react";

import {
  products,
  categories,
  getProductName,
  getProductCategory,
  getProductWeight,
  getCategoryName,
} from "../data/products";
import { addToCart } from "../utils/cart";
import { useLanguage } from "../context/LanguageContext";

const images = {
  ghee: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1000&q=85",
  oil: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1000&q=85",
  honey: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=1000&q=85",
  spices: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=85",
  editorial: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=2000&q=90",
};

const money = (value) => `৳${Number(value || 0).toLocaleString("en-BD")}`;

export function HomeCategories() {
  const { language } = useLanguage();
  const bn = language === "bn";

  const categoryImages = [
    { id: "ghee", image: images.ghee, en: "Ghee", bn: "ঘি", subEn: "Rich and familiar", subBn: "সমৃদ্ধ ও পরিচিত স্বাদ" },
    { id: "oil", image: images.oil, en: "Mustard Oil", bn: "সরিষার তেল", subEn: "For everyday cooking", subBn: "প্রতিদিনের রান্নায়" },
    { id: "honey", image: images.honey, en: "Honey", bn: "মধু", subEn: "A natural touch", subBn: "প্রকৃতির মিষ্টতা" },
    { id: "spices", image: images.spices, en: "Spices", bn: "মসলা", subEn: "The aroma of home", subBn: "ঘরের রান্নার সুবাস" },
  ];

  const availableCategories = categories.filter((item) => item.id !== "all");

  return (
    <section className="relative overflow-hidden bg-[#fbf8f0] px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-[#e5eadf]/70 blur-[110px]" />
      <div className="relative mx-auto max-w-[1240px]">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[.28em] text-[#a17b3c]">
              {bn ? "আমাদের সংগ্রহ" : "EXPLORE THE COLLECTION"}
            </p>
            <h2 className="font-heading text-3xl tracking-[-.035em] sm:text-5xl">
              {bn ? "আপনার রান্নাঘরের প্রয়োজনীয় সবকিছু" : "A collection for your kitchen"}
            </h2>
          </div>
          <Link to="/products" className="group inline-flex w-fit items-center gap-3 border-b border-[#254d32] pb-2 text-sm font-bold text-[#254d32]">
            {bn ? "সব পণ্য দেখুন" : "View all products"}
            <ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {categoryImages.map((item, index) => {
            const category = availableCategories.find((cat) => cat.id === item.id);
            const title = category ? getCategoryName(category, language) : (bn ? item.bn : item.en);

            return (
              <Link
                to="/products"
                key={item.id}
                className={`group relative block overflow-hidden bg-[#e4e6dc] ${index % 2 === 1 ? "lg:mt-10" : ""}`}
              >
                <div className="aspect-[.78] overflow-hidden sm:aspect-[.82]">
                  <img src={item.image} alt={title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#152519]/80 via-[#152519]/5 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4 text-white sm:p-6">
                  <div>
                    <p className="mb-2 text-[9px] uppercase tracking-[.18em] text-white/70 sm:text-[10px]">{bn ? item.subBn : item.subEn}</p>
                    <h3 className="font-heading text-xl sm:text-2xl">{title}</h3>
                  </div>
                  <span className="mb-1 flex h-8 w-8 items-center justify-center border border-white/60 transition-colors group-hover:bg-white group-hover:text-[#254d32] sm:h-10 sm:w-10">
                    <ArrowUpRight size={17} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HomeProductCard({ product, language, bn, onAdd }) {
  const name = getProductName(product, language);
  const category = getProductCategory(product, language);
  const weight = getProductWeight(product, language);

  return (
    <article className="group min-w-0">
      <Link to={`/product/${product.slug}`} className="relative block overflow-hidden bg-[#f0eee5]">
        <div className="aspect-[.92] overflow-hidden sm:aspect-[1.02]">
          <img src={product.image} alt={name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.055]" />
        </div>
        {product.isNew && (
          <span className="absolute left-3 top-3 bg-[#254d32] px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white">
            {bn ? "নতুন" : "NEW"}
          </span>
        )}
        {product.oldPrice && (
          <span className="absolute bottom-3 left-3 bg-[#f0dcae] px-3 py-1.5 text-[10px] font-bold text-[#49391c]">
            {bn ? "অফার" : "SPECIAL PRICE"}
          </span>
        )}
      </Link>

      <div className="pt-4">
        <p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#a17b3c]">{category}</p>
        <Link to={`/product/${product.slug}`}>
          <h3 className="mt-2 line-clamp-2 min-h-12 text-sm font-bold leading-6 text-[#242820] transition-colors hover:text-[#54714b] sm:text-base">
            {name}
          </h3>
        </Link>
        <p className="mt-1 text-xs text-[#85897e]">{weight}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#e5e1d7] pt-3">
          <div className="flex items-center gap-2">
            <span className="text-base font-extrabold text-[#254d32]">{money(product.price)}</span>
            {product.oldPrice && <span className="text-xs text-[#999b92] line-through">{money(product.oldPrice)}</span>}
          </div>
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => onAdd(product)}
            aria-label={bn ? "কার্টে যোগ করুন" : "Add to cart"}
            className="flex h-9 w-9 items-center justify-center bg-[#254d32] text-white transition hover:bg-[#193b26] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}

export function HomeFeaturedProducts() {
  const { language } = useLanguage();
  const bn = language === "bn";
  const [notice, setNotice] = useState("");

  const featured = [...products]
    .filter((product) => product.inStock)
    .sort((a, b) => (Number(b.popularity) || 0) - (Number(a.popularity) || 0))
    .slice(0, 4);

  const handleAdd = (product) => {
    addToCart(product);
    setNotice(bn ? `${getProductName(product, language)} কার্টে যোগ হয়েছে` : `${getProductName(product, language)} added to cart`);
    window.setTimeout(() => setNotice(""), 2200);
  };

  return (
    <section className="bg-[#fffdf7] px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[.28em] text-[#a17b3c]">{bn ? "জনপ্রিয় পছন্দ" : "A FEW FAVOURITES"}</p>
            <h2 className="font-heading text-3xl tracking-[-.035em] sm:text-5xl">{bn ? "আপনার পছন্দের পণ্য" : "Selected for you"}</h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[#72786d]">{bn ? "ঘি লাগবে-র সংগ্রহ থেকে কিছু জনপ্রিয় পণ্য ঘুরে দেখুন।" : "Take a look at a few favourites from the GheeLagbe collection."}</p>
          </div>
          <Link to="/products" className="group inline-flex w-fit items-center gap-3 border-b border-[#254d32] pb-2 text-sm font-bold text-[#254d32]">
            {bn ? "সম্পূর্ণ সংগ্রহ" : "Shop the collection"}
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {featured.length ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-6 lg:grid-cols-4">
            {featured.map((product) => (
              <HomeProductCard key={product.id} product={product} language={language} bn={bn} onAdd={handleAdd} />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-sm text-[#72786d]">{bn ? "পণ্য শিগগিরই যোগ করা হবে।" : "Products will be available soon."}</p>
        )}
      </div>

      {notice && (
        <div role="status" className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 bg-[#193b26] px-5 py-3 text-sm font-semibold text-white shadow-xl">
          <span className="mr-2 text-[#d9a441]">✓</span>{notice}
          <Link to="/cart" className="ml-4 text-[#f5e7c5] underline underline-offset-4">{bn ? "কার্ট দেখুন" : "View cart"}</Link>
        </div>
      )}
    </section>
  );
}

export function HomeBrandPromise() {
  const { language } = useLanguage();
  const bn = language === "bn";

  const items = [
    { no: "01", title: bn ? "যত্নে বাছাই করা" : "Thoughtfully selected", text: bn ? "আপনার রান্নাঘরের পরিচিত প্রয়োজনীয় পণ্য এক জায়গায়।" : "Everyday kitchen essentials brought together in one place." },
    { no: "02", title: bn ? "স্বচ্ছ পণ্যের তথ্য" : "Clear product information", text: bn ? "পণ্যের বিবরণ ও মূল্য দেখে নিজের পছন্দ তৈরি করুন।" : "Browse with clear product descriptions and pricing." },
    { no: "03", title: bn ? "সহজ অর্ডার" : "A simple checkout", text: bn ? "অ্যাকাউন্ট ছাড়াই সহজে অর্ডার সম্পন্ন করুন।" : "Place an order easily without creating an account." },
  ];

  return (
    <section className="relative overflow-hidden bg-[#1d3828] px-5 py-20 text-[#f8f5eb] sm:px-8 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute -right-40 -top-52 h-[650px] w-[650px] rounded-full border border-white/[.07]" />
      <div className="relative mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
        <div>
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[.28em] text-[#d9b66e]">{bn ? "ঘি লাগবে কেন?" : "THE GHEELAGBE WAY"}</p>
          <h2 className="font-heading text-3xl leading-tight tracking-[-.03em] sm:text-5xl">{bn ? "ভালো কেনাকাটা হওয়া উচিত সহজ ও স্বচ্ছ।" : "A better everyday shopping experience, made simple."}</h2>
          <p className="mt-6 max-w-md text-sm leading-8 text-white/60">{bn ? "পণ্য খোঁজা থেকে অর্ডার নিশ্চিত করা পর্যন্ত প্রতিটি ধাপ সহজ রাখার চেষ্টা করি।" : "From discovering products to confirming your order, we keep the experience clear and straightforward."}</p>
          <Link to="/about" className="mt-8 inline-flex items-center gap-3 border-b border-[#d9b66e] pb-2 text-sm font-bold text-white transition-colors hover:text-[#e5c987]">
            {bn ? "আমাদের সম্পর্কে জানুন" : "Get to know us"} <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="border-t border-white/20">
          {items.map((item) => (
            <div key={item.no} className="grid grid-cols-[48px_1fr] gap-5 border-b border-white/20 py-7 sm:grid-cols-[64px_1fr] sm:gap-8 sm:py-9">
              <span className="font-heading text-2xl text-[#d9b66e]">{item.no}</span>
              <div>
                <h3 className="text-base font-semibold sm:text-lg">{item.title}</h3>
                <p className="mt-2 max-w-lg text-sm leading-7 text-white/55">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeEditorialBanner() {
  const { language } = useLanguage();
  const bn = language === "bn";

  return (
    <section className="relative min-h-[480px] overflow-hidden sm:min-h-[560px]">
      <img src={images.editorial} alt={bn ? "রান্নার তাজা উপকরণ" : "Fresh ingredients prepared for cooking"} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[#142519]/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#142519]/80 via-[#142519]/35 to-transparent" />
      <div className="relative mx-auto flex min-h-[480px] max-w-[1240px] items-center px-5 py-20 sm:min-h-[560px] sm:px-10 lg:px-16">
        <div className="max-w-2xl text-white">
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[.28em] text-[#e2c17d]">{bn ? "প্রতিদিনের রান্নার জন্য" : "A LITTLE GOODNESS, EVERY DAY"}</p>
          <h2 className="font-heading text-4xl leading-[1.12] tracking-[-.035em] sm:text-6xl">{bn ? "ঘরের রান্নায় ফিরুক চেনা স্বাদ।" : "Bring familiar flavours back to the table."}</h2>
          <p className="mt-6 max-w-lg text-sm leading-8 text-white/75 sm:text-base">{bn ? "আপনার পছন্দের ঘি, তেল, মধু ও মসলা খুঁজে নিন ঘি লাগবে-তে।" : "Discover ghee, oils, honey and spices for the meals that feel like home."}</p>
          <Link to="/products" className="group mt-9 inline-flex items-center gap-4 border-b border-[#e2c17d] pb-3 text-sm font-bold text-white hover:text-[#e2c17d]">
            {bn ? "এখনই ঘুরে দেখুন" : "Explore the collection"}
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HomeHowItWorks() {
  const { language } = useLanguage();
  const bn = language === "bn";

  const steps = [
    { icon: ShoppingBag, title: bn ? "পণ্য বেছে নিন" : "Choose your products", text: bn ? "আপনার পছন্দের পণ্য কার্টে যোগ করুন।" : "Browse and add your favourites to the cart." },
    { icon: PackageCheck, title: bn ? "অর্ডার সম্পন্ন করুন" : "Place your order", text: bn ? "যোগাযোগ ও ডেলিভারির তথ্য দিন।" : "Enter your contact and delivery details." },
    { icon: PhoneCall, title: bn ? "ফোনে নিশ্চিতকরণ" : "Confirm by phone", text: bn ? "আমাদের প্রতিনিধি ফোন করে নিশ্চিত করবেন।" : "Our representative calls to confirm the order." },
    { icon: Truck, title: bn ? "ডেলিভারি গ্রহণ করুন" : "Receive your order", text: bn ? "পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন।" : "Receive your items and pay on delivery." },
  ];

  return (
    <section className="bg-[#e9eee5] px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-14 max-w-2xl">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[.28em] text-[#a17b3c]">{bn ? "কীভাবে অর্ডার করবেন" : "HOW IT WORKS"}</p>
          <h2 className="font-heading text-3xl leading-tight tracking-[-.03em] sm:text-5xl">{bn ? "অর্ডার করা এখন আরও সহজ।" : "A few simple steps to your doorstep."}</h2>
        </div>

        <div className="grid border-t border-[#cbd4c5] sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="border-b border-[#cbd4c5] py-8 sm:px-6 sm:first:pl-0 lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0">
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-heading text-4xl text-[#aebba8]">0{index + 1}</span>
                  <Icon size={22} strokeWidth={1.4} className="text-[#35563a]" />
                </div>
                <h3 className="text-base font-bold text-[#263329]">{step.title}</h3>
                <p className="mt-3 max-w-[230px] text-sm leading-7 text-[#70796d]">{step.text}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 border border-[#cbd4c5] bg-white/50 px-5 py-4 text-xs font-semibold text-[#35523a]">
          <Truck size={17} />
          {bn ? "সারা বাংলাদেশে নির্দিষ্ট ডেলিভারি চার্জ ৳১২০" : "Flat delivery charge of ৳120 across Bangladesh"}
          <span className="mx-1 h-4 w-px bg-[#cbd4c5]" />
          <Check size={15} />
          {bn ? "ক্যাশ অন ডেলিভারি" : "Cash on Delivery"}
        </div>
      </div>
    </section>
  );
}

export default function HomeSections() {
  return (
    <>
      <HomeCategories />
      <HomeFeaturedProducts />
      <HomeBrandPromise />
      <HomeEditorialBanner />
      <HomeHowItWorks />
    </>
  );
}
