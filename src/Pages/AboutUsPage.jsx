import img1 from "../assets/hero-spices.webp";
import img2 from "../assets/img4.jpg";
import img3 from "../assets/mortar-illustration.webp";
// const values = [
//   {
//     title: "100% Natural",
//     description: "Pure and chemical-free products.",
//     icon: "🌿",
//   },
//   {
//     title: "Trusted Quality",
//     description: "Carefully checked for your health.",
//     icon: "🛡️",
//   },
//   {
//     title: "Fast Delivery",
//     description: "Get your order quickly and safely.",
//     icon: "🚚",
//   },
//   {
//     title: "Dedicated Support",
//     description: "Always here to help you.",
//     icon: "🎧",
//   },
// ];
// const AboutUsPage = () => {
//   return (
//     <main className="mx-auto max-w-[1440px] overflow-hidden bg-[#FFF9EF] text-[#202820]">

//       {/* Hero Section */}
//       <section id="about" className="px-5 py-12 sm:px-8 lg:px-[6.1%]">
//         <div className="grid items-center gap-7 lg:grid-cols-[1.18fr_.92fr]">

//           <div className="max-w-[590px]">
//             <span className="mb-5 inline-flex rounded-full bg-[#F0F3DF] px-4 py-2 text-xs font-semibold text-[#214F35]">
//               🌿 About Us
//             </span>

//             <h1 className="font-serif text-4xl font-semibold leading-tight text-[#214F35] sm:text-5xl lg:text-6xl">
//               Pure Goodness,

//               Straight from Nature
//             </h1>

//             <p className="mt-5 max-w-[540px] text-base leading-7 text-[#59616A]">
//               At GheeLagbe, we believe in the power of nature.
//               We bring you the purest spices and natural products,
//               crafted with care for a healthier and happier life.
//             </p>

//             <a
//               href="#our-story"
//               className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#214F35] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#183F2B]"
//             >
//               Our Story →
//             </a>
//           </div>

//           <div className="relative">
//             <img
//               src={img1}
//               alt="Natural spices"
//               className="ml-auto w-full max-w-[740px] object-contain"
//             />
//           </div>

//         </div>
//       </section>

//       {/* Our Story */}
//       <section id="our-story" className="px-5 py-12 sm:px-8 lg:px-[6.1%]">
//         <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-[8%]">

//           <div className="relative">
//             <div className="absolute -left-3 -top-3 h-[96%] w-[96%] rounded-[34px] bg-[#EEF0D9]" />

//             <img
//               src={img2}
//               alt="Natural spices and ingredients"
//               className="relative aspect-[1.31/1] w-full rounded-[27px] border-[7px] border-white object-cover shadow-xl"
//             />

//             <div className="absolute -bottom-4 right-0 flex h-[104px] w-[104px] flex-col items-center justify-center rounded-[25px] bg-[#FFF7E4] shadow-lg sm:-right-4">
//               <span className="text-2xl">🌿</span>
//               <strong className="text-lg text-[#214F35]">100%</strong>
//               <span className="text-sm font-semibold text-[#214F35]">
//                 Natural
//               </span>
//             </div>
//           </div>

//           <div className="pt-5">
//             <p className="mb-3 text-sm font-semibold text-[#65905A]">
//               Our Story
//             </p>

//             <h2 className="font-serif text-4xl font-semibold leading-tight text-[#214F35] lg:text-5xl">
//               A Journey of Purity
//               <br />
//               and Trust
//             </h2>

//             <p className="mt-5 text-base leading-7 text-[#59616A]">
//               GheeLagbe started with a simple belief — good food
//               begins with pure ingredients. We source the finest
//               spices and natural products, ensuring quality,
//               freshness, and authenticity in every purchase.
//             </p>

//             <a
//               href="#our-values"
//               className="mt-6 inline-flex rounded-full border border-[#214F35] px-6 py-3 text-sm font-semibold text-[#214F35] transition hover:bg-[#214F35] hover:text-white"
//             >
//               Learn More →
//             </a>
//           </div>

//         </div>
//       </section>

//       {/* Our Values */}
//       <section id="our-values" className="px-5 py-16 sm:px-8 lg:px-[5.2%]">

//         <div className="text-center">
//           <p className="mb-2 text-sm font-semibold text-[#214F35]">
//             Our Values
//           </p>

//           <h2 className="font-serif text-4xl font-semibold text-[#214F35]">
//             What Makes Us Different
//           </h2>
//         </div>

//         <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
//           {values.map((item, index) => (
//             <article
//               key={index}
//               className="flex min-h-[190px] flex-col items-center justify-center rounded-[25px] bg-[#F1F2DE] px-3 py-6 text-center transition duration-300 hover:-translate-y-2 hover:shadow-lg"
//             >
//               <span className="text-5xl">{item.icon}</span>

//               <h3 className="mt-4 text-base font-bold text-[#173F2C] sm:text-lg">
//                 {item.title}
//               </h3>

//               <p className="mt-2 max-w-[190px] text-sm leading-relaxed text-[#555B54]">
//                 {item.description}
//               </p>
//             </article>
//           ))}
//         </div>
//       </section>

//       {/* Our Mission */}
//       <section id="mission" className="px-5 py-12 sm:px-8 lg:px-[6.1%]">
//         <div className="grid items-center gap-8 lg:grid-cols-[.78fr_1.22fr] lg:gap-[7%]">

//           <div>
//             <p className="mb-3 text-sm font-semibold text-[#214F35]">
//               Our Mission
//             </p>

//             <h2 className="font-serif text-4xl font-semibold leading-tight text-[#214F35] lg:text-5xl">
//               Healthy Living,
//               <br />
//               Our Priority
//             </h2>

//             <p className="mt-5 text-base leading-7 text-[#59616A]">
//               Our mission is to make natural and healthy products
//               accessible to everyone, helping you live a better,
//               healthier life with the goodness of nature.
//             </p>

//             <a
//               href="/shop"
//               className="mt-6 inline-flex rounded-full bg-[#214F35] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#183F2B]"
//             >
//               Shop Now →
//             </a>
//           </div>

//           <div className="relative min-h-[300px] overflow-hidden rounded-[32px] bg-[#F0F2DC] px-6 py-8 sm:px-9">

//             <div className="relative z-10 max-w-[70%]">
//               <h3 className="font-serif text-2xl font-semibold text-[#244D35]">
//                 Why Choose GheeLagbe?
//               </h3>

//               <ul className="mt-5 space-y-4 text-sm text-[#263A2D] sm:text-base">
//                 {[
//                   "Premium quality natural products",
//                   "Transparent sourcing process",
//                   "Affordable prices",
//                   "A healthier lifestyle for you & your family",
//                 ].map((item, index) => (
//                   <li key={index} className="flex items-start gap-3">
//                     <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5C8B55] text-xs text-white">
//                       ✓
//                     </span>
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <img
//               src={img3}
//               alt="Botanical mortar and pestle illustration"
//               className="absolute -top-3  -right-10 h-[92%] w-[38%] object-contain object-bottom"
//             />

//           </div>
//         </div>
//       </section>

//     </main>
//   );
// };
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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

const testimonials = [
  {
    name: "Alamin Hasan",
    role: "Food Specialist",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    rating: 4,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat fringilla bibendum. urna, elit augue urna, vitae feugiat pretium donec id elementum. Ultrices mattis sed vitae mus risus.",
  },
  {
    name: "John Smith",
    role: "Regular Customer",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
    rating: 5,
    review:
      "Amazing service and excellent quality. I really enjoyed the experience and would definitely recommend this business to everyone.",
  },
  {
    name: "Sarah Wilson",
    role: "Happy Customer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
    rating: 5,
    review:
      "Great experience, friendly service and wonderful quality. Everything was perfect and I look forward to visiting again.",
  },
  {
    name: "David Miller",
    role: "Food Lover",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    rating: 4,
    review:
      "A wonderful experience with great attention to detail. The service was excellent and the overall quality was impressive.",
  },
];

const AboutUsPage = () => {
  const mapUrl =
    "https://www.google.com/maps?q=Dhaka,Bangladesh&output=embed";

  const features = [
    {
      icon: "	♙",
      title: "Secure Payment",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam voluptatibus.",
    },
    {
      icon: "	🚚",
      title: "Fast Delivery",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam voluptatibus.",
    },
    {
      icon: "↻",
      title: "Easy Returns",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam voluptatibus.",
    },
  ];

  return (
    <div className=" text-gray-800">
      {/* Hero Section */}
      <section
        className="mb-25 relative h-[320px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${img1})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative text-center text-white">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-2 ">
            Home ›<span className="text-green-800"> About</span>
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="container-custom py-16">
        <div className="flex  md:grid-cols-2 gap-18 items-center">
          {/* Image Gallery */}
          <div className="grid relative grid-cols-2 gap-12 h-[740px] ">
            <div className="h-[536px] w-[336px] relaitive">
              <img
                className=" object-cover absolute  -top-15 left-0 rounded-sm"
                src={img2}
                alt="Healthy food"
              />
            </div>

            <div className="grid  gap-3">
              <img
                className="w-full h-full  object-cover rounded-sm"
                src="https://images.unsplash.com/photo-1547592180-85f173990554?w=600"
                alt="Fresh meal"
              />

              <img
                className="w-[309px] h-[389px] object-cover rounded-sm"
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600"
                alt="Healthy salad"
              />
            </div>
          </div>

          {/* About Content */}
          <div>
            <p className="text-xs italic text-green-700 mb-2">About Us</p>

            <h2 className="text-[48px] font-bold leading-tight mb-4">
              Food is an important <br />
              part Of a balanced diet
            </h2>

            <p className="text-sm text-gray-500 leading-7 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              diam pellentesque bibendum non dolor. Duis enim ultrices,
              vulputate posuere eget, velit.
            </p>

            <div className="flex items-center gap-4">
              <button className="bg-green-700 hover:bg-green-800 text-white text-xs px-6 py-3 rounded-[15px] transition">
                Know more
              </button>

              <button className="flex items-center gap-2 text-sm">
                <span className="bg-green-700 text-white rounded-full w-9 h-9 flex items-center justify-center">
                  ▶
                </span>
                Watch video
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container-custom max-w-6xl mx-auto px-6 pb-40">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Why Choose us</h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            diam pellentesque bibendum non dolor.
          </p>
        </div>

        {/* Food Banner */}
        <img
          src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1400"
          alt="Delicious healthy food"
          className="w-full h-64 object-cover mb-10"
        />

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          {features.map((feature, index) => (
            <div key={index} className="px-4">
              <div className="text-4xl text-gray-500 mb-4">{feature.icon}</div>

              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>

              <p className="text-xs text-gray-500 leading-6">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative pb-10">
        <section className=" container-custom max-w-6xl mx-auto px-6 pb-10">
          {/* ================= TEAM SECTION ================= */}

          {/* Green Background */}
          <div className="absolute -top-15 left-0 w-full h-[360px] bg-[#396C03]" />

          {/* Team Heading */}
          <div className="relative text-center pt-12 text-white px-4">
            <h2 className="text-[48px] font-bold">Team Member</h2>

            <p className="text-xs mt-2 text-white/80 max-w-md mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius
              sed pharetra dictum neque massa congue.
            </p>
          </div>

          {/* Team Slider */}
          <div className="relative max-w-6xl mx-auto px-5 mt-8">
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
                  <div className="group bg-white shadow-lg overflow-hidden">
                    {/* Member Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Social Links */}
                      <div className="absolute right-2 top-3 flex flex-col gap-2 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <a
                          href="#"
                          className="w-8 h-8 bg-white text-gray-700 flex items-center justify-center rounded-sm hover:bg-green-700 hover:text-white"
                        >
                          f
                        </a>

                        <a
                          href="#"
                          className="w-8 h-8 bg-white text-gray-700 flex items-center justify-center rounded-sm hover:bg-green-700 hover:text-white"
                        >
                          ◎
                        </a>

                        <a
                          href="#"
                          className="w-8 h-8 bg-white text-gray-700 flex items-center justify-center rounded-sm hover:bg-green-700 hover:text-white"
                        >
                          in
                        </a>
                      </div>
                    </div>

                    {/* Member Details */}
                    <div className="text-center py-4">
                      <h3 className="font-semibold text-gray-800 text-sm">
                        {member.name}
                      </h3>

                      <p className="text-xs text-gray-400 mt-1">
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

        <section className="max-w-6xl mx-auto px-5 py-10">
          {/* Heading */}
          <div className="mb-12">
            <p className="text-green-700 italic text-sm font-serif">
              Testimonials
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              What our client are saying
            </h2>
          </div>

          {/* Testimonial Slider */}
          <div className="max-w-3xl mx-auto">
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
              {testimonials.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="relative bg-white shadow-xl shadow-gray-100/80 text-center px-6 sm:px-12 pt-16 pb-10 mt-8 mb-3">
                    {/* Customer Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="absolute left-1/2 -top-7 -translate-x-1/2 w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                    />

                    {/* Quote Symbol */}
                    <div className="text-4xl text-green-700 mb-4 font-serif">
                      ❞
                    </div>

                    {/* Review */}
                    <p className="text-sm text-gray-500 leading-7 max-w-xl mx-auto">
                      {item.review}
                    </p>

                    {/* Star Rating */}
                    <div className="flex justify-center gap-1 mt-5 text-xl">
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
                    <h3 className="font-bold text-gray-800 mt-3">
                      {item.name}
                    </h3>

                    <p className="text-xs text-gray-400 mt-1">{item.role}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>


         <section className="w-full bg-white py-16 px-5">

      <div className="max-w-6xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-10">
          <p className="text-green-700 font-serif italic text-sm mb-2">
            Find Us
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Visit Our Shop
          </h2>

          <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">
            Find our store location on Google Maps and visit us.
            We look forward to welcoming you!
          </p>
        </div>

        {/* Google Maps iframe */}
        <div className="w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-lg border border-gray-200">

          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Our Shop Location"
          />

        </div>

        {/* Bottom Location Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">

          <div>
            <h3 className="font-semibold text-gray-800">
              Our Store Location
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Find us easily using Google Maps.
            </p>
          </div>

          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full text-sm font-medium transition"
          >
            Get Directions →
          </a>

        </div>

      </div>

    </section>
      </section>
    </div>
  );
};

export default AboutUsPage;
