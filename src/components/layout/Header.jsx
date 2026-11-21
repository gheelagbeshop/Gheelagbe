import { useLanguage } from "../../context/LanguageContext";
import NavBar from "./NavBar";

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Announcement Bar */}
      <div className="bg-primary text-white">
        <div className="container-custom flex min-h-9 items-center justify-between gap-3 text-xs">
          <p className="hidden sm:block">
            {t("header.announcement.tagline")}
          </p>

          <p className="mx-auto sm:mx-0">
            {t("header.announcement.freeDelivery")}
          </p>

          <a
            href="tel:+8801644945406"
            className="hidden transition-colors hover:text-accent sm:block"
          >
            {t("header.announcement.needHelp")}
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <NavBar />
    </header>
  );
};

export default Header;
