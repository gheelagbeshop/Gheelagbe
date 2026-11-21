import img1 from "../assets/hero-spices.webp";
import img2 from "../assets/img4.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useLanguage } from "../context/LanguageContext";

const teamMembers = [
  {
    name: "Mark Henry",
    role: "Owner",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600",
  },
  {
    name: "Lucky Helen",
    role: "Chef",
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=600",
  },
  {
    name: "Moon Henry",
    role: "Founder",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600",
  },
  {
    name: "Tom Monrow",
    role: "Specialist",
    image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=600",
  },
];

const testimonialsData = [
  {
    name: "Alamin Hasan",
    role_en: "Food Specialist",
    role_bn: "খাদ্য বিশেষজ্ঞ",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    rating: 5,
    review_en:
      "GheeLagbe offers the most authentic pure cow ghee I have tasted in years. The aroma and grainy texture remind me of home-churned village ghee.",
    review_bn:
      "ঘি লাগবে-র খাঁটি গাওয়া ঘি সত্যি অতুলনীয়। এর অসাধারণ সুবাস ও দানাদার টেক্সচার গ্রামের বাড়ির আসল ঘিয়ের কথা মনে করিয়ে দেয়।",
  },
  {
    name: "John Smith",
    role_en: "Regular Customer",
    role_bn: "নিয়মিত গ্রাহক",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
    rating: 5,
    review_en:
      "Amazing service and excellent quality. I really enjoyed the experience and would definitely recommend this business to everyone.",
    review_bn:
      "অসাধারণ সেবা এবং প্রিমিয়াম মান। সরিষার তেল ও মধুর স্বাদ শতভাগ খাঁটি। সবাইকে নিশ্চিন্তে কেনার পরামর্শ দেব।",
  },
  {
    name: "Sarah Wilson",
    role_en: "Happy Customer",
    role_bn: "সন্তুষ্ট গ্রাহক",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
    rating: 5,
    review_en:
      "Great experience, friendly service and wonderful quality. Everything was perfect and I look forward to ordering again.",
    review_bn:
      "দারুণ অভিজ্ঞতা, অত্যন্ত আন্তরিক কাস্টমার সার্ভিস এবং খাঁটি পণ্য। ডেলিভারিও খুব দ্রুত পেয়েছি।",
  },
  {
    name: "David Miller",
    role_en: "Food Lover",
    role_bn: "খাদ্য রসিক",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    rating: 5,
    review_en:
      "A wonderful experience with great attention to detail. The service was excellent and the overall quality was impressive.",
    review_bn:
      "প্রতিটি পণ্যের প্যাকেজিং এবং সতেজতা প্রশংসনীয়। রান্নায় তাদের মসলার স্বাদ অনন্য মাত্রা যোগ করে।",
  },
];

const AboutUsPage = () => {
  const { t, language } = useLanguage();

  const mapUrl =
    "https://www.google.com/maps?q=Dhaka,Bangladesh&output=embed";

  const features = [
    {
      icon: "♙",
      title: t("about.whyChoose.feature1Title"),
      description: t("about.whyChoose.feature1Desc"),
    },
    {
      icon: "🚚",
      title: t("about.whyChoose.feature2Title"),
      description: t("about.whyChoose.feature2Desc"),
    },
    {
      icon: "↻",
      title: t("about.whyChoose.feature3Title"),
      description: t("about.whyChoose.feature3Desc"),
    },
  ];

  return (
    <div className="text-gray-800">
      {/* Hero Section */}
      <section
        className="relative mb-25 flex h-[320px] items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${img1})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative text-center text-white">
          <h1 className="text-4xl font-bold">{t("about.hero.title")}</h1>
          <p className="mt-2">
            {t("about.hero.breadcrumb")}
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="container-custom py-16">
        <div className="flex flex-col items-center gap-18 lg:flex-row">
          {/* Image Gallery */}
          <div className="relative grid h-[740px] grid-cols-2 gap-12">
            <div className="relative h-[536px] w-[336px]">
              <img
                className="absolute -top-15 left-0 rounded-sm object-cover"
                src={img2}
                alt="Healthy food"
              />
            </div>

            <div className="grid gap-3">
              <img
                className="h-full w-full rounded-sm object-cover"
                src="https://images.unsplash.com/photo-1547592180-85f173990554?w=600"
                alt="Fresh meal"
              />

              <img
                className="h-[389px] w-[309px] rounded-sm object-cover"
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600"
                alt="Healthy salad"
              />
            </div>
          </div>

          {/* About Content */}
          <div className="max-w-xl">
            <p className="mb-2 text-xs italic text-green-700">
              {t("about.section.tagline")}
            </p>

            <h2 className="mb-4 text-[42px] font-bold leading-tight sm:text-[48px]">
              {t("about.section.heading")}
            </h2>

            <p className="mb-6 text-sm leading-7 text-gray-500">
              {t("about.section.description")}
            </p>

            <div className="flex items-center gap-4">
              <a
                href="/products"
                className="rounded-[15px] bg-green-700 px-6 py-3 text-xs text-white transition hover:bg-green-800"
              >
                {t("about.section.knowMore")}
              </a>

              <a
                href="#visit-shop"
                className="flex items-center gap-2 text-sm text-green-800"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-700 text-white">
                  ▶
                </span>
                {t("about.section.watchVideo")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container-custom mx-auto max-w-6xl px-6 pb-40">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold">
            {t("about.whyChoose.title")}
          </h2>
          <p className="mx-auto max-w-xl text-sm text-gray-500">
            {t("about.whyChoose.subtitle")}
          </p>
        </div>

        {/* Food Banner */}
        <img
          src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1400"
          alt="Delicious healthy food"
          className="mb-10 h-64 w-full object-cover"
        />

        {/* Features */}
        <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="px-4">
              <div className="mb-4 text-4xl text-gray-500">{feature.icon}</div>

              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>

              <p className="text-xs leading-6 text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative pb-10">
        <section className="container-custom mx-auto max-w-6xl px-6 pb-10">
          {/* ================= TEAM SECTION ================= */}

          {/* Green Background */}
          <div className="absolute -top-15 left-0 h-[360px] w-full bg-[#396C03]" />

          {/* Team Heading */}
          <div className="relative px-4 pt-12 text-center text-white">
            <h2 className="text-[42px] font-bold sm:text-[48px]">
              {t("about.team.title")}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-xs text-white/80">
              {t("about.team.subtitle")}
            </p>
          </div>

          {/* Team Slider */}
          <div className="relative mx-auto mt-8 max-w-6xl px-5">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={18}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              breakpoints={{
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="teamSwiper !pb-12"
            >
              {teamMembers.map((member, index) => (
                <SwiperSlide key={index}>
                  <div className="group overflow-hidden bg-white shadow-lg">
                    {/* Member Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Social Links */}
                      <div className="absolute right-2 top-3 flex translate-x-3 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        <a
                          href="#"
                          className="flex h-8 w-8 items-center justify-center rounded-sm bg-white text-gray-700 hover:bg-green-700 hover:text-white"
                        >
                          f
                        </a>

                        <a
                          href="#"
                          className="flex h-8 w-8 items-center justify-center rounded-sm bg-white text-gray-700 hover:bg-green-700 hover:text-white"
                        >
                          ◎
                        </a>

                        <a
                          href="#"
                          className="flex h-8 w-8 items-center justify-center rounded-sm bg-white text-gray-700 hover:bg-green-700 hover:text-white"
                        >
                          in
                        </a>
                      </div>
                    </div>

                    {/* Member Details */}
                    <div className="py-4 text-center">
                      <h3 className="text-sm font-semibold text-gray-800">
                        {member.name}
                      </h3>

                      <p className="mt-1 text-xs text-gray-400">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* ================= TESTIMONIAL SECTION ================= */}

        <section className="mx-auto max-w-6xl px-5 py-10">
          {/* Heading */}
          <div className="mb-12">
            <p className="font-serif text-sm italic text-green-700">
              {t("about.testimonials.tagline")}
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-800">
              {t("about.testimonials.heading")}
            </h2>
          </div>

          {/* Testimonial Slider */}
          <div className="mx-auto max-w-3xl">
            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              className="testimonialSwiper !pb-12"
            >
              {testimonialsData.map((item, index) => {
                const role = language === "bn" ? item.role_bn : item.role_en;
                const review =
                  language === "bn" ? item.review_bn : item.review_en;

                return (
                  <SwiperSlide key={index}>
                    <div className="relative mb-3 mt-8 bg-white px-6 pb-10 pt-16 text-center shadow-xl shadow-gray-100/80 sm:px-12">
                      {/* Customer Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="absolute -top-7 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full border-4 border-white object-cover shadow-md"
                      />

                      {/* Quote Symbol */}
                      <div className="mb-4 font-serif text-4xl text-green-700">
                        ❞
                      </div>

                      {/* Review */}
                      <p className="mx-auto max-w-xl text-sm leading-7 text-gray-500">
                        {review}
                      </p>

                      {/* Star Rating */}
                      <div className="mt-5 flex justify-center gap-1 text-xl">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={
                              star <= item.rating
                                ? "text-green-700"
                                : "text-gray-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>

                      {/* Customer Name */}
                      <h3 className="mt-3 font-bold text-gray-800">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-xs text-gray-400">{role}</p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </section>

        {/* Visit Our Shop */}
        <section id="visit-shop" className="w-full bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl">
            {/* Section Heading */}
            <div className="mb-10 text-center">
              <p className="mb-2 font-serif text-sm italic text-green-700">
                {t("about.visitShop.tagline")}
              </p>

              <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
                {t("about.visitShop.title")}
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500">
                {t("about.visitShop.description")}
              </p>
            </div>

            {/* Google Maps iframe */}
            <div className="h-[350px] w-full overflow-hidden rounded-xl border border-gray-200 shadow-lg md:h-[450px]">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t("about.visitShop.title")}
              />
            </div>

            {/* Bottom Location Info */}
            <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div>
                <h3 className="font-semibold text-gray-800">
                  {t("about.visitShop.locationTitle")}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {t("about.visitShop.locationSubtitle")}
                </p>
              </div>

              <a
                href="https://www.google.com/maps?q=Dhaka,Bangladesh"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-green-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-800"
              >
                {t("about.visitShop.getDirections")}
              </a>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default AboutUsPage;
