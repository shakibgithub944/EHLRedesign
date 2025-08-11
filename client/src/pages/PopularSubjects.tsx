import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "wouter";
import { fetchSubjectAreas } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function PopularSubjects() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery<any>({
    queryKey: ["/api/subjects", currentPage],
    queryFn: () => fetchSubjectAreas(currentPage),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const getIconForSubject = (subjectName: string) => {
    const name = subjectName.toLowerCase();
    if (name.includes("accounting")) return "fas fa-calculator";
    if (name.includes("actuarial")) return "fas fa-chart-line";
    if (name.includes("aerospace")) return "fas fa-rocket";
    if (name.includes("agriculture")) return "fas fa-seedling";
    if (name.includes("anatomy")) return "fas fa-dna";
    if (name.includes("animal")) return "fas fa-paw";
    if (name.includes("anthropology")) return "fas fa-users";
    if (name.includes("archaeology")) return "fas fa-hammer";
    if (name.includes("architecture")) return "fas fa-building";
    if (name.includes("artificial intelligence")) return "fas fa-robot";
    if (name.includes("astronomy")) return "fas fa-star";
    return "fas fa-book";
  };

  const getColorForSubject = (index: number) => {
    const colors = [
      "from-blue-100 to-blue-200",
      "from-green-100 to-green-200",
      "from-purple-100 to-purple-200",
      "from-orange-100 to-orange-200",
      "from-red-100 to-red-200",
      "from-yellow-100 to-yellow-200",
      "from-indigo-100 to-indigo-200",
      "from-teal-100 to-teal-200",
    ];
    return colors[index % colors.length];
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="text-center">
            <div className="text-red-500 text-4xl sm:text-5xl md:text-6xl mb-4">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-dark-text mb-4">
              Failed to Load Subjects
            </h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-md mx-auto">
              We're experiencing technical difficulties. Please try again later.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="gradient-orange px-6 py-2 sm:py-3"
              data-testid="button-retry"
            >
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="gradient-orange text-white py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="animate-slide-up text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Find Most Popular
                <span className="block text-yellow-200">Subjects to Study</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed opacity-90 max-w-2xl mx-auto lg:mx-0">
                Our expert consultants will guide you in choosing the best
                academic and career path, ensuring you make informed decisions
                for a successful future.
              </p>
              <Button
                className="bg-white text-primary-orange px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:shadow-xl transition-all transform hover:scale-105 w-full sm:w-auto"
                data-testid="button-book-consultation"
              >
                <i className="fas fa-calendar-alt mr-2 sm:mr-3"></i>
                <span className="hidden sm:inline">Book Free Consultation</span>
                <span className="sm:hidden">Book Consultation</span>
              </Button>
            </div>
            <div className="relative animate-bounce-gentle mt-8 lg:mt-0 order-first lg:order-last">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Students studying with modern technology and books"
                className="rounded-xl sm:rounded-2xl shadow-2xl w-full h-auto max-h-64 sm:max-h-80 md:max-h-96 lg:max-h-none object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Subjects Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-neutral-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark-text mb-4 sm:mb-6">
              Explore Popular Subjects
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
              Discover the top subjects chosen by students worldwide.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {Array.from({ length: 12 }).map((_, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-4 sm:p-6">
                    <Skeleton className="w-full h-32 sm:h-40 md:h-48 rounded-lg mb-4" />
                    <Skeleton className="h-5 sm:h-6 mb-3" />
                    <Skeleton className="h-4 mb-4" />
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <Skeleton className="flex-1 h-8" />
                      <Skeleton className="flex-1 h-8" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : data?.rows?.data && data.rows.data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {data.rows.data.map((subject: any, index: number) => (
                <Card
                  key={subject.id}
                  className="bg-white rounded-xl shadow-lg card-hover h-full flex flex-col"
                >
                  <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                    <div
                      className={`w-full h-32 sm:h-40 md:h-48 bg-gradient-to-br ${getColorForSubject(
                        index
                      )} rounded-lg mb-4 flex items-center justify-center flex-shrink-0`}
                    >
                      <i
                        className={`${getIconForSubject(
                          subject.subject_area
                        )} text-2xl sm:text-3xl md:text-4xl text-gray-600`}
                      ></i>
                    </div>
                    <h3
                      className="text-lg sm:text-xl font-semibold text-dark-text mb-3 line-clamp-2"
                      data-testid={`subject-title-${subject.id}`}
                    >
                      {subject.subject_area}
                    </h3>
                    <p className="text-gray-600 mb-4 text-xs sm:text-sm flex-grow">
                      Department:{" "}
                      <span className="font-medium">
                        {subject.subject_area || "Not specified"}
                      </span>
                    </p>
                    {subject.is_popular === 1 && (
                      <Badge className="mb-4 bg-primary-orange/10 text-primary-orange hover:bg-primary-orange/20 w-fit">
                        <i className="fas fa-star mr-1"></i> Popular
                      </Badge>
                    )}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 mt-auto">
                      <Link href={`/subject/${subject.id}`} className="flex-1">
                        <Button
                          className="w-full gradient-orange text-white py-2 px-3 sm:px-4 rounded-lg font-medium text-xs sm:text-sm hover:shadow-lg transition-all"
                          data-testid={`button-view-details-${subject.id}`}
                        >
                          <span className="hidden sm:inline">View Details</span>
                          <span className="sm:hidden">Details</span>
                        </Button>
                      </Link>
                      <Button
                        className="flex-1 gradient-green text-white py-2 px-3 sm:px-4 rounded-lg font-medium text-xs sm:text-sm hover:shadow-lg transition-all"
                        onClick={() =>
                          window.open(
                            `https://ehlweb.theskyroute.com/search-course?subject_area=${
                              subject.id
                            }&name=${subject.subject_area
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`,
                            "_blank"
                          )
                        }
                        data-testid={`button-find-courses-${subject.id}`}
                      >
                        <span className="hidden sm:inline">Find Courses</span>
                        <span className="sm:hidden">Courses</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="text-xl font-semibold text-dark-text mb-2">
                No Subjects Found
              </h3>
              <p className="text-gray-600">
                We couldn't find any subjects at the moment. Please try again
                later.
              </p>
            </div>
          )}

          {/* Pagination */}
          {data?.rows && data.rows.last_page > 1 && (
            <div className="flex justify-center mt-8 sm:mt-12">
              <nav className="flex items-center gap-1 sm:gap-2">
                {/* Previous Button */}
                <Button
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                    }
                  }}
                  disabled={currentPage === 1}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-primary-orange hover:text-white hover:border-primary-orange transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="button-previous-page"
                >
                  <i className="fas fa-chevron-left text-sm"></i>
                </Button>

                {/* Page Numbers with Smart Pagination */}
                {(() => {
                  const totalPages = data.rows.last_page;
                  const current = currentPage;
                  const pages = [];

                  if (totalPages <= 7) {
                    // Show all pages if 7 or fewer
                    for (let i = 1; i <= totalPages; i++) {
                      pages.push(
                        <Button
                          key={i}
                          onClick={() => setCurrentPage(i)}
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border transition-all text-sm font-medium ${
                            i === current
                              ? "bg-primary-orange text-white border-primary-orange"
                              : "bg-white text-gray-700 border-gray-200 hover:bg-primary-orange hover:text-white hover:border-primary-orange"
                          }`}
                          data-testid={`button-page-${i}`}
                        >
                          {i}
                        </Button>
                      );
                    }
                  } else {
                    // Smart pagination for more than 7 pages
                    // Always show first page
                    pages.push(
                      <Button
                        key={1}
                        onClick={() => setCurrentPage(1)}
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border transition-all text-sm font-medium ${
                          1 === current
                            ? "bg-primary-orange text-white border-primary-orange"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-primary-orange hover:text-white hover:border-primary-orange"
                        }`}
                        data-testid="button-page-1"
                      >
                        1
                      </Button>
                    );

                    // Show dots if current page is far from start
                    if (current > 4) {
                      pages.push(
                        <div
                          key="dots-start"
                          className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12"
                        >
                          <span className="text-gray-400 font-medium">...</span>
                        </div>
                      );
                    }

                    // Show pages around current page
                    const start = Math.max(2, current - 1);
                    const end = Math.min(totalPages - 1, current + 1);

                    for (let i = start; i <= end; i++) {
                      if (i !== 1 && i !== totalPages) {
                        pages.push(
                          <Button
                            key={i}
                            onClick={() => setCurrentPage(i)}
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border transition-all text-sm font-medium ${
                              i === current
                                ? "bg-primary-orange text-white border-primary-orange"
                                : "bg-white text-gray-700 border-gray-200 hover:bg-primary-orange hover:text-white hover:border-primary-orange"
                            }`}
                            data-testid={`button-page-${i}`}
                          >
                            {i}
                          </Button>
                        );
                      }
                    }

                    // Show dots if current page is far from end
                    if (current < totalPages - 3) {
                      pages.push(
                        <div
                          key="dots-end"
                          className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12"
                        >
                          <span className="text-gray-400 font-medium">...</span>
                        </div>
                      );
                    }

                    // Always show last page
                    if (totalPages > 1) {
                      pages.push(
                        <Button
                          key={totalPages}
                          onClick={() => setCurrentPage(totalPages)}
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border transition-all text-sm font-medium ${
                            totalPages === current
                              ? "bg-primary-orange text-white border-primary-orange"
                              : "bg-white text-gray-700 border-gray-200 hover:bg-primary-orange hover:text-white hover:border-primary-orange"
                          }`}
                          data-testid={`button-page-${totalPages}`}
                        >
                          {totalPages}
                        </Button>
                      );
                    }
                  }

                  return pages;
                })()}

                {/* Next Button */}
                <Button
                  onClick={() => {
                    if (currentPage < data.rows.last_page) {
                      setCurrentPage(currentPage + 1);
                    }
                  }}
                  disabled={currentPage === data.rows.last_page}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-primary-orange hover:text-white hover:border-primary-orange transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="button-next-page"
                >
                  <i className="fas fa-chevron-right text-sm"></i>
                </Button>
              </nav>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Floating CTA */}
      {/* <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <Button
          className="gradient-orange text-white px-4 sm:px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center text-sm sm:text-base"
          data-testid="button-floating-consultation"
        >
          <i className="fas fa-comments mr-1 sm:mr-2"></i>
          <span className="hidden sm:inline">Book Consultation</span>
          <span className="sm:hidden">Book</span>
        </Button>
      </div> */}
    </div>
  );
}
