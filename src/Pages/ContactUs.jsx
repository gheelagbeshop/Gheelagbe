
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  CheckCircle2,
  Leaf,
  ChevronDown,
} from "lucide-react";

const contactDetails = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+880 1644-945406",
    description: "Talk directly with our team",
    href: "tel:+8801644945406",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "hello@gheelagbe.com",
    description: "Send us your questions anytime",
    href: "mailto:hello@gheelagbe.com",
  },
  {
    icon: MapPin,
    title: "Our Location",
    value: "Dhaka, Bangladesh",
    description: "Proudly serving customers across Bangladesh",
    href: null,
  },
];

const faqs = [
  {
    question: "How can I place an order?",
    answer:
      "You can browse our products, add your favorites to the cart, and complete checkout with your contact and delivery information. No account is required.",
  },
  {
    question: "How can I track my order?",
    answer:
      "After placing your order, one of our representatives will contact you to confirm your order and discuss delivery details.",
  },
  {
    question: "Do you offer delivery across Bangladesh?",
    answer:
      "We aim to serve customers across Bangladesh. Please contact our team to confirm delivery availability in your area.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We support available payment options including Cash on Delivery and mobile financial services, depending on your order and delivery location.",
  },
];

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [openFaq, setOpenFaq] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Connect this form to your backend/API before production.
    console.log("Contact form submission:", formData);
    alert("Thank you! Your message has been submitted.");

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="bg-[#FFF9EE] text-[#242820]">
      {/* HERO */}
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
        {/* <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#E8F0E8] blur-3xl" /> */}
        {/* <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#F5E7C5] blur-3xl" /> */}

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#254D32]/15 bg-white/70 px-4 py-2 text-sm font-semibold text-[#254D32]">
              <Leaf size={16} />
              We'd love to hear from you
            </div>

            <h1 className="max-w-xl font-['DM_Serif_Display'] text-5xl leading-[1.12] sm:text-6xl lg:text-7xl">
              Let's Start a
              <span className="block text-[#254D32]">Conversation.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-[#6F746B] sm:text-lg">
              Have a question about our products, an order, or simply want to
              say hello? We're always happy to help you.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-3 rounded-full bg-[#254D32] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#193B26]"
              >
                Send a Message
                <ArrowRight size={18} />
              </a>

              <a
                href="https://wa.me/8801644945406"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-[#254D32]/20 bg-white px-7 py-4 text-sm font-bold text-[#254D32] transition hover:bg-[#E8F0E8]"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[48%_48%_24px_24px] bg-[#E8F0E8]">
              <img
                src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1000&q=90"
                alt="Fresh natural food ingredients"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#193B26]/30 to-transparent" />
            </div>

            <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl sm:-left-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F0E8] text-[#254D32]">
                <MessageCircle size={23} />
              </div>
              <div>
                <p className="font-bold text-[#242820]">We're here for you</p>
                <p className="text-xs text-[#6F746B]">
                  Your satisfaction matters
                </p>
              </div>
            </div>

            <div className="absolute -right-2 top-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#D9A441] text-white shadow-lg sm:-right-5">
              <Leaf size={29} />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT INFORMATION */}
      <section className="px-5 py-16 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#B48A35]">
              Get in touch
            </p>
            <h2 className="mt-3 font-['DM_Serif_Display'] text-3xl sm:text-4xl">
              We're Just a Message Away
            </h2>
            <p className="mt-3 text-[#6F746B]">
              Choose the easiest way to reach our team.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {contactDetails.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-3xl border border-[#E8E4D9] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F0E8] text-[#254D32] transition group-hover:bg-[#254D32] group-hover:text-white">
                    <Icon size={25} />
                  </div>

                  <h3 className="text-lg font-bold">{item.title}</h3>

                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-2 inline-flex items-center gap-2 font-semibold text-[#254D32] hover:underline"
                    >
                      {item.value}
                      <ArrowUpRight size={16} />
                    </a>
                  ) : (
                    <p className="mt-2 font-semibold text-[#254D32]">
                      {item.value}
                    </p>
                  )}

                  <p className="mt-3 text-sm leading-6 text-[#6F746B]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section
        id="contact-form"
        className="px-5 py-16 sm:px-8 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[32px] bg-[#193B26] lg:grid-cols-[0.8fr_1.2fr]">
          {/* LEFT SIDE */}
          <div className="relative overflow-hidden p-8 text-white sm:p-12">
            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border-[45px] border-white/5" />

            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D9A441]">
                Contact us
              </p>

              <h2 className="mt-5 font-['DM_Serif_Display'] text-4xl leading-tight sm:text-5xl">
                Have Something
                <span className="block text-[#D9A441]">On Your Mind?</span>
              </h2>

              <p className="mt-6 max-w-sm leading-8 text-white/70">
                Whether it's about our products, your order, or a partnership,
                send us a message. Our team will be happy to assist.
              </p>

              <div className="mt-12 space-y-7">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-white/10 p-3 text-[#D9A441]">
                    <Clock size={21} />
                  </div>
                  <div>
                    <h3 className="font-bold">Customer Support</h3>
                    <p className="mt-1 text-sm text-white/60">
                      Contact us for current support hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-white/10 p-3 text-[#D9A441]">
                    <MessageCircle size={21} />
                  </div>
                  <div>
                    <h3 className="font-bold">Friendly Assistance</h3>
                    <p className="mt-1 text-sm text-white/60">
                      We're happy to answer your questions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-14 border-t border-white/15 pt-7">
                <p className="font-['DM_Serif_Display'] text-2xl italic text-[#F5E7C5]">
                  Pure goodness, genuine care.
                </p>
                <p className="mt-2 text-sm text-white/50">
                  — Team GheeLagbe
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="bg-white p-7 sm:p-12">
            <div className="mb-8">
              <h3 className="font-['DM_Serif_Display'] text-3xl">
                Send Us a Message
              </h3>
              <p className="mt-2 text-sm text-[#6F746B]">
                Fill out the form below and we'll get back to you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full rounded-xl border border-[#E8E4D9] bg-[#FFF9EE]/50 px-4 py-3.5 text-sm outline-none transition placeholder:text-[#9B9E96] focus:border-[#254D32] focus:ring-4 focus:ring-[#254D32]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-[#E8E4D9] bg-[#FFF9EE]/50 px-4 py-3.5 text-sm outline-none transition placeholder:text-[#9B9E96] focus:border-[#254D32] focus:ring-4 focus:ring-[#254D32]/10"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXX-XXXXXX"
                    required
                    className="w-full rounded-xl border border-[#E8E4D9] bg-[#FFF9EE]/50 px-4 py-3.5 text-sm outline-none transition placeholder:text-[#9B9E96] focus:border-[#254D32] focus:ring-4 focus:ring-[#254D32]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-[#E8E4D9] bg-[#FFF9EE]/50 px-4 py-3.5 text-sm outline-none transition focus:border-[#254D32] focus:ring-4 focus:ring-[#254D32]/10"
                  >
                    <option value="">Select a subject</option>
                    <option value="Product Inquiry">Product Inquiry</option>
                    <option value="Order Support">Order Support</option>
                    <option value="Delivery Question">Delivery Question</option>
                    <option value="Business Partnership">
                      Business Partnership
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  rows={5}
                  required
                  className="w-full resize-none rounded-xl border border-[#E8E4D9] bg-[#FFF9EE]/50 px-4 py-3.5 text-sm outline-none transition placeholder:text-[#9B9E96] focus:border-[#254D32] focus:ring-4 focus:ring-[#254D32]/10"
                />
              </div>

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#254D32] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#193B26] sm:w-auto"
              >
                Send Message
                <Send
                  size={17}
                  className="transition group-hover:translate-x-1"
                />
              </button>

              <p className="text-xs leading-5 text-[#8A8D84]">
                * Required fields. Your information will only be used to
                respond to your inquiry.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-20 sm:px-8 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#B48A35]">
              Need some help?
            </p>
            <h2 className="mt-4 max-w-md font-['DM_Serif_Display'] text-4xl leading-tight sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-5 max-w-md leading-7 text-[#6F746B]">
              Find quick answers to some common questions. Still need help?
              Feel free to contact our team.
            </p>

            <a
              href="https://wa.me/8801644945406"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 font-bold text-[#254D32] transition hover:gap-4"
            >
              Ask us directly
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-[#E8E4D9] bg-white"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenFaq(openFaq === index ? -1 : index)
                  }
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-bold">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-[#254D32] transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openFaq === index && (
                  <div className="px-5 pb-5">
                    <div className="h-px bg-[#E8E4D9]" />
                    <p className="pt-4 text-sm leading-7 text-[#6F746B]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
