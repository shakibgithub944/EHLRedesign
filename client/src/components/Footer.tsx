export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <img
                src="/logo.png"
                alt="Education Hub Logo"
                className="h-10 sm:h-12"
              />
            </div>
            <p className="text-gray-300 mb-4 text-sm sm:text-base">
              Your trusted partner in achieving educational excellence and
              career success.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="text-gray-400 hover:text-primary-orange transition-colors"
                data-testid="footer-link-facebook"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-orange transition-colors"
                data-testid="footer-link-linkedin"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-orange transition-colors"
                data-testid="footer-link-twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-orange transition-colors"
                data-testid="footer-link-youtube"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
              <li>
                <a
                  href="#"
                  className="hover:text-primary-orange transition-colors"
                  data-testid="footer-link-popular-subjects"
                >
                  Popular Subjects
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-orange transition-colors"
                  data-testid="footer-link-future-careers"
                >
                  Future Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-orange transition-colors"
                  data-testid="footer-link-course-finder"
                >
                  Course Finder
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-orange transition-colors"
                  data-testid="footer-link-study-abroad"
                >
                  Study Abroad
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
              <li>
                <a
                  href="#"
                  className="hover:text-primary-orange transition-colors"
                  data-testid="footer-link-consultation"
                >
                  Free Consultation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-orange transition-colors"
                  data-testid="footer-link-application"
                >
                  University Application
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-orange transition-colors"
                  data-testid="footer-link-visa"
                >
                  Visa Assistance
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-orange transition-colors"
                  data-testid="footer-link-scholarship"
                >
                  Scholarship Guidance
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4">
              Contact Info
            </h4>
            <div className="space-y-3 text-gray-300 text-sm sm:text-base">
              <p className="break-all sm:break-normal">
                <i className="fas fa-envelope mr-2 text-primary-orange"></i>
                info@education-hub.co.uk
              </p>
              <p>
                <i className="fas fa-phone mr-2 text-primary-orange"></i>
                +44(0)203287554
              </p>
              <button
                className="gradient-green text-white px-4 sm:px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all mt-4 text-sm sm:text-base w-full sm:w-auto"
                data-testid="button-footer-consultation"
              >
                <span className="hidden sm:inline">Get Free Consultation</span>
                <span className="sm:hidden">Free Consultation</span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-gray-400 text-sm sm:text-base text-center sm:text-left">
            Copyright © 2023 Education Hub Ltd
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-primary-orange transition-colors text-sm sm:text-base"
              data-testid="footer-link-partner"
            >
              Be a Partner
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-primary-orange transition-colors text-sm sm:text-base"
              data-testid="footer-link-privacy"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-primary-orange transition-colors text-sm sm:text-base"
              data-testid="footer-link-terms"
            >
              Terms & Conditions
            </a>
          </div>
        </div>

        <div className="text-center mt-4 sm:mt-6">
          <p className="text-gray-500 text-xs sm:text-sm">
            Developed with ❤️ By{" "}
            <a
              href="#"
              className="text-primary-orange hover:underline"
              data-testid="footer-link-developer"
            >
              Taskco Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
