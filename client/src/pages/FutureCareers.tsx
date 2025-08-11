import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

declare global {
  interface Window {
    $: any;
    jQuery: any;
  }
}

export default function FutureCareers() {
  const [careers, setCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch careers data
  const fetchCareers = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://www.ehlcrm.theskyroute.com/api/test/top-future-career?page=${page}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch careers data");
      }

      const data = await response.json();

      setCareers(data.rows?.data || []);
      setCurrentPage(data.rows?.current_page || 1);
      setTotalPages(data.rows?.last_page || 1);
      setError(null);
    } catch (err) {
      setError("Failed to load career data. Please try again later.");
      console.error("Error fetching careers:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchCareers(page);
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Initialize jQuery functionality
    const initializeCareerPage = () => {
      const $ = window.$;
      if (!$) return;

      // Card hover effects
      $(document).on("mouseenter", ".card-bootstrap-hover", function () {
        // @ts-ignore
        $(this).addClass("shadow-lg").css("transform", "translateY(-5px)");
      });

      $(document).on("mouseleave", ".card-bootstrap-hover", function () {
        // @ts-ignore
        $(this).removeClass("shadow-lg").css("transform", "translateY(0)");
      });

      // Form submission
      $(document).on("submit", "#contact-form", function (e: Event) {
        e.preventDefault();

        const formData = {
          name: $("#name").val(),
          mobile: $("#mobile").val(),
          email: $("#email").val(),
          destination: $("#destination").val(),
          studyLevel: $("#studyLevel").val(),
          institution: $("#institution").val(),
          englishTest: $("#englishTest").val(),
          score: $("#score").val(),
          note: $("#note").val(),
        };

        // Basic validation
        if (
          !formData.name ||
          !formData.mobile ||
          !formData.email ||
          !formData.destination ||
          !formData.studyLevel ||
          !formData.institution
        ) {
          alert("Please fill in all required fields.");
          return;
        }

        // Simulate form submission
        $("#submit-btn")
          .html('<i class="fas fa-spinner fa-spin mr-2"></i>Submitting...')
          .prop("disabled", true);

        setTimeout(() => {
          alert("Thank you for your inquiry! We will contact you soon.");
          $("#contact-form")[0].reset();
          $("#submit-btn").html("Check Eligibility").prop("disabled", false);
        }, 2000);
      });
    };

    // Wait for jQuery to be available
    const checkJQuery = () => {
      if (window.$ && window.jQuery) {
        initializeCareerPage();
      } else {
        setTimeout(checkJQuery, 100);
      }
    };

    checkJQuery();
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchCareers(1);
  }, []);

  const getCareerImage = (career: any) => {
    if (career.image && career.image.startsWith("http")) {
      return career.image;
    }

    // Fallback images based on career name
    const name = career.name?.toLowerCase() || "";
    if (name.includes("accountant"))
      return "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop";
    if (name.includes("architect"))
      return "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop";
    if (name.includes("engineer"))
      return "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=400&h=300&fit=crop";
    if (name.includes("data scientist"))
      return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop";
    if (name.includes("doctor"))
      return "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop";
    if (name.includes("financial"))
      return "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop";
    if (name.includes("lawyer"))
      return "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=300&fit=crop";
    if (name.includes("marketing"))
      return "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop";

    return "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop";
  };

  const getPopularityBadge = (career: any) => {
    if (career.is_popular === 1) {
      return '<span class="badge bg-warning text-dark"><i class="fas fa-star me-1"></i>Popular</span>';
    }
    return '<span class="badge bg-success"><i class="fas fa-trending-up me-1"></i>Growing</span>';
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="gradient-blue text-white py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="animate-slide-up">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                  Plan Your Future Career
                  <span className="block text-blue-200">with Our Experts</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed opacity-90 max-w-2xl mx-auto lg:mx-0">
                  Our expert consultants will help you to choose the right
                  career path for your future. We have a team of experienced
                  consultants who will guide you to choose the right career
                  path.
                </p>
                <button className="bg-white text-accent-blue px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:shadow-xl transition-all transform hover:scale-105 w-full sm:w-auto">
                  <i className="fas fa-calendar-alt mr-2 sm:mr-3"></i>
                  <span className="hidden sm:inline">
                    Book Free Consultation
                  </span>
                  <span className="sm:hidden">Book Consultation</span>
                </button>
              </div>
            </div>
            <div className="mt-8 lg:mt-0 order-first lg:order-last">
              <div className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                  alt="Professional team planning career growth with charts and graphs"
                  className="w-full h-auto max-h-64 sm:max-h-80 md:max-h-96 lg:max-h-none object-cover rounded-xl sm:rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Careers Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-neutral-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark-text mb-4 sm:mb-6">
              Explore Popular Career Paths
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
              Discover in-demand careers and unlock exciting opportunities for
              your future.
            </p>
          </div>

          {error && (
            <div className="alert alert-danger text-center" role="alert">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
              <button
                className="btn btn-primary ms-3"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          )}

          {loading ? (
            <div className="row g-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                  <div className="card h-100">
                    <div className="placeholder-glow">
                      <div
                        className="placeholder"
                        style={{ height: "200px", backgroundColor: "#e9ecef" }}
                      ></div>
                    </div>
                    <div className="card-body">
                      <div className="placeholder-glow">
                        <h5 className="placeholder col-8"></h5>
                        <p className="placeholder col-12"></p>
                        <p className="placeholder col-6"></p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-3"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : careers.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {careers.map((career) => (
                  <div
                    key={career.id}
                    className="bg-white rounded-xl shadow-lg card-hover h-full flex flex-col"
                  >
                    <div className="relative">
                      <img
                        src={getCareerImage(career)}
                        alt={career.name}
                        className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-t-xl"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop";
                        }}
                      />
                    </div>
                    <div className="p-4 sm:p-6 flex flex-col h-full">
                      <h5 className="text-lg sm:text-xl font-semibold text-dark-text mb-3 line-clamp-2">
                        {career.name}
                      </h5>
                      <p className="text-gray-600 text-xs sm:text-sm flex-grow line-clamp-3 mb-4">
                        {career.overview ||
                          "Explore exciting opportunities in this dynamic field with excellent growth potential and diverse career paths."}
                      </p>
                      <div className="flex justify-between items-center mt-auto">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: getPopularityBadge(career),
                          }}
                        ></div>
                        <button
                          className="bg-accent-blue text-white px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm hover:shadow-lg transition-all"
                          onClick={() =>
                            (window.location.href = `/career/${career.id}`)
                          }
                        >
                          <span className="hidden sm:inline">Learn More</span>
                          <span className="sm:hidden">Learn</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 sm:mt-12">
                  <nav className="flex items-center gap-1 sm:gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 flex items-center justify-center"
                    >
                      <i className="fas fa-chevron-left text-xs sm:text-sm"></i>
                    </button>

                    {/* Page Numbers with Smart Pagination */}
                    {(() => {
                      const pages = [];

                      if (totalPages <= 7) {
                        // Show all pages if 7 or fewer
                        for (let i = 1; i <= totalPages; i++) {
                          pages.push(
                            <button
                              key={i}
                              onClick={() => handlePageChange(i)}
                              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border transition-all duration-200 text-sm font-medium flex items-center justify-center ${
                                i === currentPage
                                  ? "bg-[#1470cd] text-white border-[#1470cd] shadow-md"
                                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                              }`}
                            >
                              {i}
                            </button>
                          );
                        }
                      } else {
                        // Smart pagination for more than 7 pages
                        // Always show first page
                        pages.push(
                          <button
                            key={1}
                            onClick={() => handlePageChange(1)}
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border transition-all duration-200 text-sm font-medium flex items-center justify-center ${
                              1 === currentPage
                                ? "bg-[#1470cd] text-white border-[#1470cd] shadow-md"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                            }`}
                          >
                            1
                          </button>
                        );

                        // Show dots if there's a gap after page 1
                        if (currentPage > 4) {
                          pages.push(
                            <div
                              key="dots-start"
                              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
                            >
                              <span className="text-gray-400 font-bold text-lg">
                                ···
                              </span>
                            </div>
                          );
                        }

                        // Calculate the range of pages to show around current page
                        let start = Math.max(2, currentPage - 2);
                        let end = Math.min(totalPages - 1, currentPage + 2);

                        // Adjust range to always show 5 pages when possible
                        if (end - start < 4) {
                          if (start === 2) {
                            end = Math.min(totalPages - 1, start + 4);
                          } else if (end === totalPages - 1) {
                            start = Math.max(2, end - 4);
                          }
                        }

                        // Show pages in the calculated range
                        for (let i = start; i <= end; i++) {
                          if (i !== 1 && i !== totalPages) {
                            pages.push(
                              <button
                                key={i}
                                onClick={() => handlePageChange(i)}
                                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border transition-all duration-200 text-sm font-medium flex items-center justify-center ${
                                  i === currentPage
                                    ? "bg-[#1470cd] text-white border-[#1470cd] shadow-md"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                                }`}
                              >
                                {i}
                              </button>
                            );
                          }
                        }

                        // Show dots if there's a gap before last page
                        if (currentPage < totalPages - 3) {
                          pages.push(
                            <div
                              key="dots-end"
                              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
                            >
                              <span className="text-gray-400 font-bold text-lg">
                                ···
                              </span>
                            </div>
                          );
                        }

                        // Always show last page (if more than 1 page total)
                        if (totalPages > 1) {
                          pages.push(
                            <button
                              key={totalPages}
                              onClick={() => handlePageChange(totalPages)}
                              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border transition-all duration-200 text-sm font-medium flex items-center justify-center ${
                                totalPages === currentPage
                                  ? "bg-[#1470cd] text-white border-[#1470cd] shadow-md"
                                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                              }`}
                            >
                              {totalPages}
                            </button>
                          );
                        }
                      }

                      return pages;
                    })()}

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 flex items-center justify-center"
                    >
                      <i className="fas fa-chevron-right text-xs sm:text-sm"></i>
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="text-gray-400 mb-4 text-4xl sm:text-5xl md:text-6xl">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-dark-text mb-2">
                No Careers Found
              </h3>
              <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
                We couldn't find any career paths at the moment. Please try
                again later.
              </p>
            </div>
          )}

          {/* {!loading && careers.length > 0 && (
            <div className="text-center mt-6 sm:mt-8">
              <p className="text-gray-600 text-sm sm:text-base">
                We are preparing most suitable data for you. Please wait a
                moment...
              </p>
            </div>
          )} */}
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark-text mb-4 sm:mb-6">
              Our Success Stories
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              A glimpse of our student's success stories
            </p>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 card-bootstrap-hover border-0 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
                  alt="Happy international student holding graduation cap"
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-semibold mb-3">
                    John's Journey to Success
                  </h5>
                  <p className="card-text text-muted small">
                    From guidance to graduation, see how Education Hub helped
                    John achieve his dreams in Engineering.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="card h-100 card-bootstrap-hover border-0 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop"
                  alt="Diverse group of graduates celebrating their achievement"
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-semibold mb-3">
                    Global Network
                  </h5>
                  <p className="card-text text-muted small">
                    Our students from around the world building successful
                    careers across various industries.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="card h-100 card-bootstrap-hover border-0 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
                  alt="Professional presenting successful project results to team"
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-semibold mb-3">
                    Career Excellence
                  </h5>
                  <p className="card-text text-muted small">
                    Alumni achieving leadership positions and making impactful
                    contributions to their fields.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="btn btn-primary-orange btn-lg px-4 py-3 fw-semibold">
              <i className="fab fa-youtube me-2"></i>
              Explore More Stories
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold text-dark mb-4">
                We'll Ensure You Always Get the Best Guidance.
              </h2>
              <p className="fs-5 text-muted mb-4">
                We are here to help you with all your queries. Please fill the
                form below and we will get back to you.
              </p>

              <div className="position-relative">
                <img
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop"
                  alt="Professional consultation video call between advisor and student"
                  className="img-fluid rounded-3 shadow-lg"
                />
                <button
                  className="position-absolute top-50 start-50 translate-middle btn btn-light btn-lg rounded-circle"
                  style={{ width: "80px", height: "80px" }}
                >
                  <i
                    className="fas fa-play text-primary"
                    style={{ fontSize: "1.5rem", marginLeft: "4px" }}
                  ></i>
                </button>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="bg-light p-4 rounded-3">
                <h3 className="h4 fw-bold text-dark mb-3">Check Eligibility</h3>
                <p className="text-muted mb-4">
                  Check eligibility of your higher study
                </p>

                <form id="contact-form">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-medium text-dark">
                        What's your name? *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium text-dark">
                        Mobile number *
                      </label>
                      <div className="input-group">
                        <select
                          className="form-select"
                          style={{ maxWidth: "120px" }}
                        >
                          <option>+44</option>
                          <option>+1</option>
                          <option>+91</option>
                        </select>
                        <input
                          type="tel"
                          className="form-control"
                          id="mobile"
                          placeholder="Enter mobile number"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium text-dark">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium text-dark">
                        Preferred study destination *
                      </label>
                      <select className="form-select" id="destination" required>
                        <option value="">Select destination</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="USA">USA</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Netherlands">Netherlands</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium text-dark">
                        Desired study level *
                      </label>
                      <select className="form-select" id="studyLevel" required>
                        <option value="">Select study level</option>
                        <option value="Postgraduate">Postgraduate</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Foundation">Foundation</option>
                        <option value="PhD">PhD</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium text-dark">
                        Last educational institution *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="institution"
                        placeholder="Enter institution name"
                        required
                      />
                    </div>

                    <div className="col-6">
                      <label className="form-label fw-medium text-dark">
                        English proficiency test
                      </label>
                      <select className="form-select" id="englishTest">
                        <option value="">Choose Test</option>
                        <option value="IELTS">IELTS</option>
                        <option value="TOEFL">TOEFL</option>
                        <option value="PTE">PTE</option>
                      </select>
                    </div>

                    <div className="col-6">
                      <label className="form-label fw-medium text-dark">
                        Score
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="score"
                        placeholder="Enter score"
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium text-dark">
                        Note
                      </label>
                      <textarea
                        className="form-control"
                        id="note"
                        rows={3}
                        placeholder="Additional information"
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <p className="small text-muted">
                        By submitting this form, you agree to our
                        <a href="#" className="text-decoration-none">
                          {" "}
                          Privacy Policy
                        </a>
                        and
                        <a href="#" className="text-decoration-none">
                          {" "}
                          Terms & Conditions
                        </a>
                      </p>
                    </div>

                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary-orange w-100 py-3 fw-semibold"
                        id="submit-btn"
                      >
                        Check Eligibility
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-4 bg-light">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="h4 fw-bold text-dark mb-3">
              Our Awards & Achievements
            </h2>
          </div>
          <div
            className="d-flex justify-content-center align-items-center flex-wrap py-2"
            style={{ gap: "2rem" }}
          >
            {[
              "https://www.ehlweb.theskyroute.com/assets/front/img/partners/6726087f49c54.png",
              "https://www.ehlweb.theskyroute.com/assets/front/img/partners/6726088b50e5f.png",
              "https://www.ehlweb.theskyroute.com/assets/front/img/partners/67260898890bc.png",
              "https://www.ehlweb.theskyroute.com/assets/front/img/partners/672608a6c1172.png",
            ].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded p-3 d-flex align-items-center justify-content-center"
                // style={{ width: "120px", height: "100px" }}
              >
                <img
                  src={_}
                  alt="Award Logo"
                  className="img-fluid w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating CTA */}
      {/* <div
        className="position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 1050 }}
      >
        <button className="btn btn-primary-orange rounded-pill px-4 py-3 fw-semibold shadow-lg">
          <i className="fas fa-comments me-2"></i>
          <span className="d-none d-sm-inline">Book Consultation</span>
        </button>
      </div> */}
    </div>
  );
}
