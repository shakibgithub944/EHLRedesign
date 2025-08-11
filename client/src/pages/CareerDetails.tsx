import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

declare global {
  interface Window {
    $: any;
    jQuery: any;
  }
}

export default function CareerDetails() {
  const [career, setCareer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get career ID from URL
    const pathParts = window.location.pathname.split('/');
    const careerId = pathParts[pathParts.length - 1];

    if (!careerId || isNaN(Number(careerId))) {
      setError('Invalid career ID');
      setLoading(false);
      return;
    }

    const initializeCareerDetails = () => {
      const $ = window.$;
      if (!$) return;

      // Fetch career details
      const fetchCareerDetails = async () => {
        try {
          const response = await fetch(`https://www.ehlcrm.theskyroute.com/api/future-career-details?id=${careerId}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch career details');
          }
          
          const data = await response.json();
          setCareer(data);
          setError(null);
        } catch (err) {
          setError('Failed to load career details. Please try again later.');
          console.error('Error fetching career details:', err);
        } finally {
          setLoading(false);
        }
      };

      // Form submission
      $(document).on('submit', '#contact-form', function(e: Event) {
        e.preventDefault();
        
        const formData = {
          name: $('#name').val(),
          mobile: $('#mobile').val(),
          email: $('#email').val(),
          destination: $('#destination').val(),
          studyLevel: $('#studyLevel').val(),
          institution: $('#institution').val(),
          englishTest: $('#englishTest').val(),
          score: $('#score').val(),
          note: $('#note').val(),
        };

        // Basic validation
        if (!formData.name || !formData.mobile || !formData.email || !formData.destination || !formData.studyLevel || !formData.institution) {
          alert('Please fill in all required fields.');
          return;
        }

        // Simulate form submission
        $('#submit-btn').html('<i class="fas fa-spinner fa-spin me-2"></i>Submitting...').prop('disabled', true);
        
        setTimeout(() => {
          alert('Thank you for your inquiry! We will contact you soon.');
          $('#contact-form')[0].reset();
          $('#submit-btn').html('Submit Inquiry').prop('disabled', false);
        }, 2000);
      });

      fetchCareerDetails();
    };

    // Wait for jQuery to be available
    const checkJQuery = () => {
      if (window.$ && window.jQuery) {
        initializeCareerDetails();
      } else {
        setTimeout(checkJQuery, 100);
      }
    };

    checkJQuery();
  }, []);

  const getCareerImage = (career: any) => {
    if (career?.image && career.image.startsWith('http')) {
      return career.image;
    }
    
    // Fallback images based on career name
    const name = career?.name?.toLowerCase() || '';
    if (name.includes('accountant')) return 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop';
    if (name.includes('architect')) return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop';
    if (name.includes('engineer')) return 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&h=400&fit=crop';
    if (name.includes('data scientist')) return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop';
    if (name.includes('doctor')) return 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop';
    if (name.includes('financial')) return 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop';
    if (name.includes('lawyer')) return 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=400&fit=crop';
    if (name.includes('marketing')) return 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop';
    
    return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop';
  };

  if (loading) {
    return (
      <div className="min-h-100 bg-white">
        <Header />
        <div className="container py-5">
          <div className="row">
            <div className="col-12">
              <div className="placeholder-glow">
                <div className="placeholder col-8 mb-3" style={{ height: '3rem' }}></div>
                <div className="placeholder col-4 mb-4" style={{ height: '1.5rem' }}></div>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="placeholder-glow">
                <div className="placeholder w-100 mb-4" style={{ height: '300px' }}></div>
                <div className="placeholder col-12 mb-2" style={{ height: '1rem' }}></div>
                <div className="placeholder col-12 mb-2" style={{ height: '1rem' }}></div>
                <div className="placeholder col-8 mb-4" style={{ height: '1rem' }}></div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <div className="placeholder-glow">
                    <div className="placeholder col-8 mb-3" style={{ height: '1.5rem' }}></div>
                    <div className="placeholder col-12 mb-2" style={{ height: '1rem' }}></div>
                    <div className="placeholder col-12 mb-2" style={{ height: '1rem' }}></div>
                    <div className="placeholder col-6" style={{ height: '1rem' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-100 bg-white">
        <Header />
        <div className="container py-5">
          <div className="text-center">
            <div className="text-danger mb-4" style={{ fontSize: '4rem' }}>
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h2 className="fw-bold text-dark mb-3">Failed to Load Career Details</h2>
            <p className="text-muted mb-4">{error}</p>
            <div className="d-flex gap-3 justify-content-center">
              <button className="btn btn-primary-orange" onClick={() => window.location.reload()}>
                Try Again
              </button>
              <a href="/future-careers" className="btn btn-outline-secondary">
                Back to Careers
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!career) {
    return (
      <div className="min-h-100 bg-white">
        <Header />
        <div className="container py-5">
          <div className="text-center">
            <div className="text-muted mb-4" style={{ fontSize: '4rem' }}>
              <i className="fas fa-search"></i>
            </div>
            <h2 className="fw-bold text-dark mb-3">Career Not Found</h2>
            <p className="text-muted mb-4">The career you're looking for doesn't exist or has been removed.</p>
            <a href="/future-careers" className="btn btn-primary-orange">
              Back to Careers
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-100 bg-white">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-light py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="/future-careers" className="text-decoration-none">Future Careers</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">{career.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Career Details */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4" 
                 style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)' }}>
              <i className="fas fa-briefcase text-white" style={{ fontSize: '2.5rem' }}></i>
            </div>
            <h1 className="display-4 fw-bold text-dark mb-3">{career.name}</h1>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <span className="badge bg-light text-dark fs-6 px-3 py-2">
                <i className="fas fa-building me-2"></i>
                Career ID: {career.id}
              </span>
              {career.is_popular === 1 && (
                <span className="badge fs-6 px-3 py-2" style={{ backgroundColor: 'rgba(255, 107, 53, 0.1)', color: '#FF6B35' }}>
                  <i className="fas fa-star me-1"></i> Popular Choice
                </span>
              )}
              <span className={`badge fs-6 px-3 py-2 ${career.status === 1 ? 'bg-success' : 'bg-danger'}`}>
                {career.status === 1 ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          <div className="row g-5">
            {/* Main Content */}
            <div className="col-lg-8">
              <div className="position-relative mb-5">
                <img 
                  src={getCareerImage(career)} 
                  alt={career.name}
                  className="img-fluid rounded-3 shadow-lg w-100"
                  style={{ height: '400px', objectFit: 'cover' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop';
                  }}
                />
              </div>

              {career.overview && (
                <div className="mb-5">
                  <h2 className="h3 fw-bold text-dark mb-4">
                    <i className="fas fa-info-circle text-primary me-2"></i>
                    Career Overview
                  </h2>
                  <p className="text-muted lh-lg fs-5">{career.overview}</p>
                </div>
              )}

              <div className="d-flex gap-3 flex-wrap">
                <button className="btn btn-primary-orange btn-lg px-4 py-3">
                  <i className="fas fa-search me-2"></i>
                  Find Related Courses
                </button>
                <button className="btn btn-secondary-green btn-lg px-4 py-3">
                  <i className="fas fa-calendar-alt me-2"></i>
                  Book Career Consultation
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="sticky-top" style={{ top: '2rem' }}>
                {career.why_this && (
                  <div className="card mb-4 border-0 shadow-sm">
                    <div className="card-header bg-white border-bottom-0 py-3">
                      <h5 className="card-title mb-0 fw-bold text-dark">
                        <i className="fas fa-lightbulb text-warning me-2"></i>
                        Why Choose This Career?
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="d-flex flex-column gap-3">
                        {career.why_this.split(';').map((reason: string, index: number) => (
                          <div key={index} className="d-flex align-items-start">
                            <i className="fas fa-check-circle text-success me-2 mt-1 flex-shrink-0"></i>
                            <p className="mb-0 text-muted small lh-base">{reason.trim()}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {career.requirement && (
                  <div className="card mb-4 border-0 shadow-sm">
                    <div className="card-header bg-white border-bottom-0 py-3">
                      <h5 className="card-title mb-0 fw-bold text-dark">
                        <i className="fas fa-list-check text-info me-2"></i>
                        Requirements
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="d-flex flex-column gap-3">
                        {career.requirement.split(';').map((req: string, index: number) => (
                          <div key={index} className="d-flex align-items-start">
                            <i className="fas fa-arrow-right text-info me-2 mt-1 flex-shrink-0"></i>
                            <p className="mb-0 text-muted small lh-base">{req.trim()}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {career.salary && (
                  <div className="card mb-4 border-0 shadow-sm">
                    <div className="card-header bg-white border-bottom-0 py-3">
                      <h5 className="card-title mb-0 fw-bold text-dark">
                        <i className="fas fa-pound-sign text-success me-2"></i>
                        Salary Information
                      </h5>
                    </div>
                    <div className="card-body">
                      <p className="text-muted mb-0">{career.salary}</p>
                    </div>
                  </div>
                )}

                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-white border-bottom-0 py-3">
                    <h5 className="card-title mb-0 fw-bold text-dark">
                      <i className="fas fa-info-circle text-primary me-2"></i>
                      Quick Info
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">Career ID:</span>
                        <span className="fw-medium">{career.id}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">Serial Number:</span>
                        <span className="fw-medium">{career.serial_no || 'Not specified'}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">Status:</span>
                        <span className={`badge ${career.status === 1 ? 'bg-success' : 'bg-danger'}`}>
                          {career.status === 1 ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      {career.is_popular === 1 && (
                        <div className="d-flex justify-content-between">
                          <span className="text-muted">Popularity:</span>
                          <span className="badge" style={{ backgroundColor: 'rgba(255, 107, 53, 0.1)', color: '#FF6B35' }}>
                            Popular Choice
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h2 className="display-6 fw-bold text-dark mb-4">Ready to Start Your Career Journey?</h2>
              <p className="fs-5 text-muted mb-4">
                Get personalized guidance from our career experts. We'll help you understand the requirements, opportunities, and next steps for your chosen career path.
              </p>
              
              <div className="position-relative">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop" 
                  alt="Career consultation video call" 
                  className="img-fluid rounded-3 shadow-lg"
                />
                <button className="position-absolute top-50 start-50 translate-middle btn btn-light btn-lg rounded-circle" style={{ width: '80px', height: '80px' }}>
                  <i className="fas fa-play text-primary" style={{ fontSize: '1.5rem', marginLeft: '4px' }}></i>
                </button>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="bg-white p-4 rounded-3 shadow-sm">
                <h3 className="h4 fw-bold text-dark mb-3">Get Career Guidance</h3>
                <p className="text-muted mb-4">Schedule a consultation with our career experts</p>
                
                <form id="contact-form">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-medium text-dark">What's your name? *</label>
                      <input type="text" className="form-control" id="name" placeholder="Enter your full name" required />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium text-dark">Mobile number *</label>
                      <div className="input-group">
                        <select className="form-select" style={{ maxWidth: '120px' }}>
                          <option>+44</option>
                          <option>+1</option>
                          <option>+91</option>
                        </select>
                        <input type="tel" className="form-control" id="mobile" placeholder="Enter mobile number" required />
                      </div>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium text-dark">Email *</label>
                      <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium text-dark">Preferred study destination *</label>
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
                      <label className="form-label fw-medium text-dark">Desired study level *</label>
                      <select className="form-select" id="studyLevel" required>
                        <option value="">Select study level</option>
                        <option value="Postgraduate">Postgraduate</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Foundation">Foundation</option>
                        <option value="PhD">PhD</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium text-dark">Last educational institution *</label>
                      <input type="text" className="form-control" id="institution" placeholder="Enter institution name" required />
                    </div>

                    <div className="col-6">
                      <label className="form-label fw-medium text-dark">English proficiency test</label>
                      <select className="form-select" id="englishTest">
                        <option value="">Choose Test</option>
                        <option value="IELTS">IELTS</option>
                        <option value="TOEFL">TOEFL</option>
                        <option value="PTE">PTE</option>
                      </select>
                    </div>

                    <div className="col-6">
                      <label className="form-label fw-medium text-dark">Score</label>
                      <input type="text" className="form-control" id="score" placeholder="Enter score" />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium text-dark">Note</label>
                      <textarea className="form-control" id="note" rows={3} placeholder="Tell us about your career interests"></textarea>
                    </div>

                    <div className="col-12">
                      <p className="small text-muted">
                        By submitting this form, you agree to our 
                        <a href="#" className="text-decoration-none"> Privacy Policy</a> 
                        and 
                        <a href="#" className="text-decoration-none"> Terms & Conditions</a>
                      </p>
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn btn-primary-orange w-100 py-3 fw-semibold" id="submit-btn">
                        Submit Inquiry
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
