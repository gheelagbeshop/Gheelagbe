


const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Announcement Bar */}
      <div className="bg-primary text-white">
        <div className="container-custom flex min-h-9 items-center justify-between gap-3 text-xs">
          <p className="hidden sm:block">
            Bringing Nature's Goodness to Your Home
          </p>

          <p className="mx-auto sm:mx-0">
            Free delivery on orders over ৳2,000
          </p>

          <a
            href="tel:+8801644945406"
            className="hidden transition-colors hover:text-accent sm:block"
          >
            Need Help? +8801644-945406
          </a>
        </div>
      </div>

      {/* Main Navigation */}
    </header>
  );
};

export default Header;
