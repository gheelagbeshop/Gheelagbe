import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-[#254D32] text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-2 text-xs sm:flex-row sm:px-6 lg:px-8">
          <p>
            Pure & Natural Ghee, Delivered to Your Doorstep
          </p>

          <div className="flex items-center gap-4">
            <span>Need Help?</span>
            <a
              href="tel:+8801XXXXXXXXX"
              className="font-semibold transition-colors hover:text-[#F4C66A]"
            >
              +880 1XXX-XXXXXX
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <Navbar />
    </header>
  );
};

export default Header;