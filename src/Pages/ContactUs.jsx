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
  Leaf,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import SEO from "../components/SEO";

export default function ContactUs() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [openFaq, setOpenFaq] = useState(0);

  const contactDetails = [
    {
      icon: Phone,
      title: t("contact.info.callTitle"),
      value: "+880 1644-945406",
      description: t("contact.info.callDesc"),
      href: "tel:+8801644945406",
    },
    {
      icon: Mail,
      title: t("contact.info.emailTitle"),
      value: "hello@gheelagbe.com",
      description: t("contact.info.emailDesc"),
      href: "mailto:hello@gheelagbe.com",
    },
    {
      icon: MapPin,
      title: t("contact.info.locationTitle"),
      value: t("contact.info.locationValue"),
      description: t("contact.info.locationDesc"),
      href: null,
    },
  ];

  const faqItems = t("contact.faq.items") || [];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact form submission:", formData);
    alert(t("contact.form.submittedAlert"));

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
      <SEO
        title="যোগাযোগ করুন | GheeLagbe"
        description="GheeLagbe-এর পণ্য, অর্ডার ও ডেলিভারি সম্পর্কে জানতে আমাদের সঙ্গে যোগাযোগ করুন।"
        canonical="https://gheelagbe.com/contact"
      />
      {/* HERO */}
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#254D32]/15 bg-white/70 px-4 py-2 text-sm font-semibold text-[#254D32]">
              <Leaf size={16} />
              {t("contact.hero.badge")}
            </div>

            <h1 className="max-w-xl font-heading text-5xl leading-[1.12] sm:text-6xl lg:text-7xl">
              {t("contact.hero.titleStart")}
              <span className="block text-[#254D32]">
                {t("contact.hero.titleHighlight")}
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-[#6F746B] sm:text-lg">
              {t("contact.hero.description")}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-3 rounded-full bg-[#254D32] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#193B26]"
              >
                {t("contact.hero.sendMessage")}
                <ArrowRight size={18} />
              </a>

              <a
                href="https://wa.me/8801644945406"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-[#254D32]/20 bg-white px-7 py-4 text-sm font-bold text-[#254D32] transition hover:bg-[#E8F0E8]"
              >
                <MessageCircle size={18} />
                {t("contact.hero.whatsappUs")}
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
                <p className="font-bold text-[#242820]">
                  {t("contact.hero.satisfactionTitle")}
                </p>
                <p className="text-xs text-[#6F746B]">
                  {t("contact.hero.satisfactionDesc")}
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
              {t("contact.info.tagline")}
            </p>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl">
              {t("contact.info.heading")}
            </h2>
            <p className="mt-3 text-[#6F746B]">
              {t("contact.info.description")}
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
                {t("contact.form.tagline")}
              </p>

              <h2 className="mt-5 font-heading text-4xl leading-tight sm:text-5xl">
                {t("contact.form.headingStart")}
                <span className="block text-[#D9A441]">
                  {t("contact.form.headingHighlight")}
                </span>
              </h2>

              <p className="mt-6 max-w-sm leading-8 text-white/70">
                {t("contact.form.description")}
              </p>

              <div className="mt-12 space-y-7">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-white/10 p-3 text-[#D9A441]">
                    <Clock size={21} />
                  </div>
                  <div>
                    <h3 className="font-bold">
                      {t("contact.form.supportTitle")}
                    </h3>
                    <p className="mt-1 text-sm text-white/60">
                      {t("contact.form.supportDesc")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-white/10 p-3 text-[#D9A441]">
                    <MessageCircle size={21} />
                  </div>
                  <div>
                    <h3 className="font-bold">
                      {t("contact.form.friendlyTitle")}
                    </h3>
                    <p className="mt-1 text-sm text-white/60">
                      {t("contact.form.friendlyDesc")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-14 border-t border-white/15 pt-7">
                <p className="font-heading text-2xl italic text-[#F5E7C5]">
                  {t("contact.form.quote")}
                </p>
                <p className="mt-2 text-sm text-white/50">
                  {t("contact.form.quoteAuthor")}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="bg-white p-7 sm:p-12">
            <div className="mb-8">
              <h3 className="font-heading text-3xl">
                {t("contact.form.formTitle")}
              </h3>
              <p className="mt-2 text-sm text-[#6F746B]">
                {t("contact.form.formSubtitle")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    {t("contact.form.nameLabel")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("contact.form.namePlaceholder")}
                    required
                    className="w-full rounded-xl border border-[#E8E4D9] bg-[#FFF9EE]/50 px-4 py-3.5 text-sm outline-none transition placeholder:text-[#9B9E96] focus:border-[#254D32] focus:ring-4 focus:ring-[#254D32]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    {t("contact.form.emailLabel")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("contact.form.emailPlaceholder")}
                    className="w-full rounded-xl border border-[#E8E4D9] bg-[#FFF9EE]/50 px-4 py-3.5 text-sm outline-none transition placeholder:text-[#9B9E96] focus:border-[#254D32] focus:ring-4 focus:ring-[#254D32]/10"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    {t("contact.form.phoneLabel")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t("contact.form.phonePlaceholder")}
                    required
                    className="w-full rounded-xl border border-[#E8E4D9] bg-[#FFF9EE]/50 px-4 py-3.5 text-sm outline-none transition placeholder:text-[#9B9E96] focus:border-[#254D32] focus:ring-4 focus:ring-[#254D32]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    {t("contact.form.subjectLabel")}
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-[#E8E4D9] bg-[#FFF9EE]/50 px-4 py-3.5 text-sm outline-none transition focus:border-[#254D32] focus:ring-4 focus:ring-[#254D32]/10"
                  >
                    <option value="">{t("contact.form.selectSubject")}</option>
                    <option value="Product Inquiry">
                      {t("contact.form.subjects.product")}
                    </option>
                    <option value="Order Support">
                      {t("contact.form.subjects.order")}
                    </option>
                    <option value="Delivery Question">
                      {t("contact.form.subjects.delivery")}
                    </option>
                    <option value="Business Partnership">
                      {t("contact.form.subjects.partnership")}
                    </option>
                    <option value="Other">
                      {t("contact.form.subjects.other")}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  {t("contact.form.messageLabel")}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("contact.form.messagePlaceholder")}
                  rows={5}
                  required
                  className="w-full resize-none rounded-xl border border-[#E8E4D9] bg-[#FFF9EE]/50 px-4 py-3.5 text-sm outline-none transition placeholder:text-[#9B9E96] focus:border-[#254D32] focus:ring-4 focus:ring-[#254D32]/10"
                />
              </div>

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#254D32] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#193B26] sm:w-auto"
              >
                {t("contact.form.submitButton")}
                <Send
                  size={17}
                  className="transition group-hover:translate-x-1"
                />
              </button>

              <p className="text-xs leading-5 text-[#8A8D84]">
                {t("contact.form.requiredNote")}
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
              {t("contact.faq.tagline")}
            </p>
            <h2 className="mt-4 max-w-md font-heading text-4xl leading-tight sm:text-5xl">
              {t("contact.faq.heading")}
            </h2>
            <p className="mt-5 max-w-md leading-7 text-[#6F746B]">
              {t("contact.faq.description")}
            </p>

            <a
              href="https://wa.me/8801644945406"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 font-bold text-[#254D32] transition hover:gap-4"
            >
              {t("contact.faq.askDirectly")}
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="space-y-3">
            {Array.isArray(faqItems) &&
              faqItems.map((faq, index) => (
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
