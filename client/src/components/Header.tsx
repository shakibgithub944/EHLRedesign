import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="bg-slate-900 text-white py-2 sm:py-3 relative z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
              <span className="hidden sm:inline">
                <i className="fas fa-phone mr-1 sm:mr-2"></i>+44(0)203287554
              </span>
              <span className="hidden md:inline">
                <i className="fas fa-envelope mr-1 sm:mr-2"></i>
                info@education-hub.co.uk
              </span>
              <span className="sm:hidden">
                <i className="fas fa-phone mr-1"></i>+44(0)203287554
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex space-x-1 sm:space-x-2">
                <a
                  href="#"
                  className="text-white hover:text-primary-orange transition-colors p-1"
                  data-testid="link-facebook"
                >
                  <i className="fab fa-facebook text-sm"></i>
                </a>
                <a
                  href="#"
                  className="text-white hover:text-primary-orange transition-colors p-1"
                  data-testid="link-linkedin"
                >
                  <i className="fab fa-linkedin text-sm"></i>
                </a>
                <a
                  href="#"
                  className="text-white hover:text-primary-orange transition-colors p-1 hidden sm:inline-block"
                  data-testid="link-twitter"
                >
                  <i className="fab fa-twitter text-sm"></i>
                </a>
                <a
                  href="#"
                  className="text-white hover:text-primary-orange transition-colors p-1 hidden sm:inline-block"
                  data-testid="link-youtube"
                >
                  <i className="fab fa-youtube text-sm"></i>
                </a>
              </div>
              <button
                className="bg-secondary-green text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-green-600 transition-colors"
                data-testid="button-apply-online"
              >
                <span className="hidden sm:inline">Apply Online</span>
                <span className="sm:hidden">Apply</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <Link
              href="/"
              className="flex items-center"
              data-testid="link-home"
            >
              <img
                src="/logo.png"
                alt="Education Hub Logo"
                className="h-10 sm:h-12"
              />
            </Link>

            <nav className="hidden lg:flex space-x-6 xl:space-x-8">
              {/* <Link
                href="/"
                className={`${
                  location === "/" ? "text-primary-orange" : "text-dark-text"
                } hover:text-primary-orange transition-colors font-medium text-sm xl:text-base`}
                data-testid="link-subjects"
              >
                Subjects Area
              </Link>
              <a
                href="https://future-career-sigma.vercel.app/"
                target="_blank"
                className={`${
                  location === "/future-careers"
                    ? "text-primary-orange"
                    : "text-dark-text"
                } hover:text-primary-orange transition-colors font-medium text-sm xl:text-base`}
                data-testid="link-future-career"
              >
                Future Career
              </a> */}
            </nav>

            <div className="flex items-center space-x-2 sm:space-x-4 gap-2">
              <button
                className="sm:block hidden gradient-orange text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all text-xs sm:text-sm"
                data-testid="button-find-course"
              >
                <a href="#subjects">
                  <span className="hidden sm:inline">FIND SUBJECT</span>
                  <span className="sm:hidden">FIND</span>
                </a>
              </button>

              {/* Mobile menu button */}
              {/* <button
                className="lg:hidden p-2 rounded-md text-dark-text hover:text-primary-orange hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                <i
                  className={`fas ${
                    isMobileMenuOpen ? "fa-times" : "fa-bars"
                  } text-lg`}
                ></i>
              </button> */}
            </div>
          </div>

          {/* Mobile Menu */}
          {/* {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4 bg-white">
              <nav className="flex flex-col space-y-4 px-4">
                <a
                  href="https://future-career-sigma.vercel.app/"
                  target="_blank"
                  className={`${
                    location === "/future-careers"
                      ? "text-primary-orange"
                      : "text-dark-text"
                  } hover:text-primary-orange transition-colors font-medium py-2 border-b border-gray-100`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Future Career
                </a>
                <Link
                  href="/"
                  className={`${
                    location === "/" ? "text-primary-orange" : "text-dark-text"
                  } hover:text-primary-orange transition-colors font-medium py-2 border-b border-gray-100`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Subjects Area
                </Link>
              </nav>
            </div>
          )} */}
        </div>
      </header>
    </>
  );
}
