import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { fetchSubjectAreaDetails } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";

export default function SubjectDetails() {
  const [match, params] = useRoute("/subject/:id");
  const subjectId = params?.id ? parseInt(params.id) : null;

  const {
    data: subject,
    isLoading,
    error,
  } = useQuery<any>({
    queryKey: ["/api/subject-details", subjectId],
    queryFn: () => fetchSubjectAreaDetails(subjectId!),
    enabled: !!subjectId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  if (!match || !subjectId) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="text-center">
            <div className="text-red-500 text-4xl sm:text-5xl md:text-6xl mb-4">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-dark-text mb-4">
              Invalid Subject ID
            </h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-md mx-auto">
              The subject you're looking for doesn't exist.
            </p>
            <Link href="/">
              <Button
                className="gradient-orange px-6 py-2 sm:py-3"
                size="lg"
                data-testid="button-back-home"
              >
                Back to Subjects
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
              Failed to Load Subject Details
            </h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-md mx-auto">
              We're experiencing technical difficulties. Please try again later.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => window.location.reload()}
                className="gradient-orange"
                size="lg"
                data-testid="button-retry"
              >
                Try Again
              </Button>
              <Link href="/">
                <Button
                  variant="outline"
                  size="lg"
                  data-testid="button-back-subjects"
                >
                  Back to Subjects
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 sm:h-10 lg:h-12 mb-4" />
            <Skeleton className="h-4 sm:h-6 mb-6 sm:mb-8 w-1/2 sm:w-1/3" />
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              <div className="order-2 lg:order-1">
                <Skeleton className="w-full h-48 sm:h-56 lg:h-64 rounded-lg mb-4 sm:mb-6" />
                <Skeleton className="h-6 sm:h-8 mb-3 sm:mb-4" />
                <Skeleton className="h-3 sm:h-4 mb-2" />
                <Skeleton className="h-3 sm:h-4 mb-2" />
                <Skeleton className="h-3 sm:h-4 mb-4 sm:mb-6" />
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Skeleton className="h-10 sm:h-12 w-full sm:flex-1" />
                  <Skeleton className="h-10 sm:h-12 w-full sm:flex-1" />
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-4 sm:space-y-6">
                <Card className="w-full">
                  <CardHeader className="pb-3 sm:pb-4">
                    <Skeleton className="h-5 sm:h-6" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Skeleton className="h-3 sm:h-4 mb-2" />
                    <Skeleton className="h-3 sm:h-4 mb-2" />
                    <Skeleton className="h-3 sm:h-4" />
                  </CardContent>
                </Card>
                <Card className="w-full">
                  <CardHeader className="pb-3 sm:pb-4">
                    <Skeleton className="h-5 sm:h-6" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Skeleton className="h-3 sm:h-4 mb-2" />
                    <Skeleton className="h-3 sm:h-4 mb-2" />
                    <Skeleton className="h-3 sm:h-4" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            <div className="text-gray-400 text-4xl sm:text-5xl lg:text-6xl mb-4">
              <i className="fas fa-search"></i>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-dark-text mb-4">
              Subject Not Found
            </h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-md mx-auto">
              The subject you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/">
              <Button
                className="gradient-orange px-6 py-2 sm:py-3"
                size="lg"
                data-testid="button-back-subjects"
              >
                Back to Subjects
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-neutral-gray py-3 sm:py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs sm:text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-primary-orange transition-colors"
              data-testid="breadcrumb-home"
            >
              Popular Subjects
            </Link>
            <span className="mx-2">/</span>
            <span className="text-dark-text font-medium">
              {subject.subject_area}
            </span>
          </nav>
        </div>
      </div>

      {/* Subject Details */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary-orange to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <i
                  className={`${getIconForSubject(
                    subject.subject_area
                  )} text-3xl sm:text-4xl text-white`}
                ></i>
              </div>
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark-text mb-4"
                data-testid="subject-title"
              >
                {subject.subject_area}
              </h1>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs sm:text-sm">
                  <i className="fas fa-building mr-1 sm:mr-2"></i>
                  <span className="truncate max-w-[200px] sm:max-w-none">
                    {subject.subject_area_department?.name ||
                      "Department not specified"}
                  </span>
                </Badge>
                {subject.is_popular === 1 && (
                  <Badge className="bg-primary-orange/10 text-primary-orange hover:bg-primary-orange/20 text-xs sm:text-sm">
                    <i className="fas fa-star mr-1"></i> Popular Choice
                  </Badge>
                )}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {/* Main Content */}
              <div className="order-2 lg:order-1">
                {subject.photo ? (
                  <img
                    src={subject.photo}
                    alt={subject.subject_area}
                    className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg shadow-lg mb-4 sm:mb-6"
                  />
                ) : (
                  <div className="w-full h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                    <i
                      className={`${getIconForSubject(
                        subject.subject_area
                      )} text-4xl sm:text-5xl lg:text-6xl text-gray-400`}
                    ></i>
                  </div>
                )}

                {subject.overview && (
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-dark-text mb-3 sm:mb-4">
                      Overview
                    </h2>
                    <p
                      className="text-gray-700 leading-relaxed text-sm sm:text-base"
                      data-testid="subject-overview"
                    >
                      {subject.overview}
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button
                    className="gradient-orange w-full sm:flex-1 py-3 text-sm sm:text-base"
                    data-testid="button-find-courses"
                  >
                    <i className="fas fa-search mr-2"></i>
                    <span className="hidden sm:inline">Find Courses</span>
                    <span className="sm:hidden">Find Courses</span>
                  </Button>
                  <Button
                    className="gradient-green w-full sm:flex-1 py-3 text-sm sm:text-base"
                    data-testid="button-book-consultation"
                  >
                    <i className="fas fa-calendar-alt mr-2"></i>
                    <span className="hidden sm:inline">Book Consultation</span>
                    <span className="sm:hidden">Book Consultation</span>
                  </Button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="order-1 lg:order-2 space-y-4 sm:space-y-6">
                {subject.why_this && (
                  <Card className="w-full">
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="flex items-center text-dark-text text-base sm:text-lg">
                        <i className="fas fa-lightbulb text-yellow-500 mr-2 text-sm sm:text-base"></i>
                        Why Choose This Subject?
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 sm:space-y-3">
                        {subject.why_this
                          .split(";")
                          .map((reason: string, index: number) => (
                            <div key={index} className="flex items-start">
                              <i className="fas fa-check-circle text-secondary-green mr-2 mt-1 flex-shrink-0 text-xs sm:text-sm"></i>
                              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                                {reason.trim()}
                              </p>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {subject.requirement && (
                  <Card className="w-full">
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="flex items-center text-dark-text text-base sm:text-lg">
                        <i className="fas fa-list-check text-accent-blue mr-2 text-sm sm:text-base"></i>
                        Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 sm:space-y-3">
                        {subject.requirement
                          .split(";")
                          .map((req: string, index: number) => (
                            <div key={index} className="flex items-start">
                              <i className="fas fa-arrow-right text-accent-blue mr-2 mt-1 flex-shrink-0 text-xs sm:text-sm"></i>
                              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                                {req.trim()}
                              </p>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {subject.tuition_fee && (
                  <Card className="w-full">
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="flex items-center text-dark-text text-base sm:text-lg">
                        <i className="fas fa-pound-sign text-secondary-green mr-2 text-sm sm:text-base"></i>
                        Tuition Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p
                        className="text-gray-700 text-xs sm:text-sm leading-relaxed"
                        data-testid="subject-tuition"
                      >
                        {subject.tuition_fee}
                      </p>
                    </CardContent>
                  </Card>
                )}

                <Card className="w-full">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="flex items-center text-dark-text text-base sm:text-lg">
                      <i className="fas fa-info-circle text-primary-orange mr-2 text-sm sm:text-base"></i>
                      Quick Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-2 sm:space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                      <span className="text-gray-600 text-xs sm:text-sm">
                        Subject ID:
                      </span>
                      <span className="font-medium text-xs sm:text-sm">
                        {subject.id}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                      <span className="text-gray-600 text-xs sm:text-sm">
                        Department:
                      </span>
                      <span className="font-medium text-xs sm:text-sm break-words">
                        {subject.subject_area_department?.name ||
                          "Not specified"}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 items-start sm:items-center">
                      <span className="text-gray-600 text-xs sm:text-sm">
                        Status:
                      </span>
                      <Badge
                        className={`text-xs ${
                          subject.status === 1
                            ? "bg-secondary-green/10 text-secondary-green"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {subject.status === 1 ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    {subject.is_popular === 1 && (
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 items-start sm:items-center">
                        <span className="text-gray-600 text-xs sm:text-sm">
                          Popularity:
                        </span>
                        <Badge className="bg-primary-orange/10 text-primary-orange text-xs">
                          Popular Choice
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
