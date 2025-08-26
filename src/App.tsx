import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';
import EnquiryModal from './components/EnquiryModal';

interface ImageDetails {
  src: string;
  alt: string;
  caption?: string;
}

const LightboxModal: React.FC<{
  image: ImageDetails | null;
  onClose: () => void;
}> = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-fade-up"
      onClick={onClose}
    >
      <div 
        className="relative max-w-7xl w-full mx-auto animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-luxury-gold text-4xl transition-colors duration-300"
          aria-label="Close lightbox"
        >
          ×
        </button>
        <div className="relative">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-auto max-h-[85vh] object-contain"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
            <p className="text-white text-xl font-display font-medium mb-2">{image.alt}</p>
            {image.caption && (
              <p className="text-gray-200 text-base font-body">{image.caption}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const GalleryCarousel: React.FC<{
  images: Array<{
    src: string;
    alt: string;
    caption: string;
  }>;
  onImageClick: (image: any) => void;
}> = ({ images, onImageClick }) => {
  // If there's only one image, show a larger single image display
  if (images.length === 1) {
    const image = images[0];
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div 
          className="gallery-image h-[500px] sm:h-[600px] animate-fade-up"
          onClick={() => onImageClick(image)}
        >
          <img 
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <p className="text-xl sm:text-2xl font-display font-medium mb-2">{image.alt}</p>
            <p className="text-sm sm:text-base font-body opacity-90">{image.caption}</p>
          </div>
        </div>
      </div>
    );
  }

  // For regular carousel (2 or more images)
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: images.length < 3 ? 2 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  return (
    <div className="relative px-4 sm:px-6">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="px-3">
            <div
              className={`gallery-image h-80 sm:h-96 animate-fade-up stagger-${(index % 5) + 1}`}
              onClick={() => onImageClick(image)}
            >
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-lg sm:text-xl font-display font-medium mb-2">{image.alt}</p>
                <p className="text-sm sm:text-base font-body opacity-90">{image.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageDetails | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    document.title = 'Sree Dhanya ARC – Premium Luxury Residences';
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const exteriorImages = [
    {
      src: '/images/arc-main.png',
      alt: 'Sree Dhanya ARC Building',
      caption: "Architectural masterpiece defining luxury living"
    },
    {
      src: '/images/night.png',
      alt: 'Sree Dhanya ARC at Night',
      caption: "Illuminated elegance against the city skyline"
    },
    {
      src: '/images/side.png',
      alt: 'Sree Dhanya ARC Side View',
      caption: "Contemporary design meets timeless sophistication"
    }
  ];

  const lobbyImages = [
    {
      src: '/images/reception.png',
      alt: 'Grand Reception',
      caption: "Welcome to unparalleled luxury and service"
    },
    {
      src: '/images/lobby.png',
      alt: 'Main Lobby',
      caption: "Where first impressions become lasting memories"
    }
  ];

  const interiorImages = [
    {
      src: '/images/living-room.png',
      alt: 'Living Spaces',
      caption: "Expansive living areas designed for modern life"
    },
    {
      src: '/images/kitchen.png',
      alt: 'Gourmet Kitchen',
      caption: "Culinary excellence meets sophisticated design"
    },
    {
      src: '/images/master.png',
      alt: 'Master Suite',
      caption: "Private sanctuary of comfort and elegance"
    },
    {
      src: '/images/closet.png',
      alt: 'Walk-in Closet',
      caption: "Bespoke storage solutions for luxury living"
    },
    {
      src: '/images/dining.png',
      alt: 'Dining Area',
      caption: "Intimate spaces for memorable gatherings"
    },
    {
      src: '/images/balcony.png',
      alt: 'Private Terrace',
      caption: "Your personal outdoor oasis in the sky"
    }
  ];

  const amenityImages = [
    {
      src: '/images/pool.png',
      alt: 'Infinity Pool',
      caption: "Endless horizons meet luxury relaxation"
    },
    {
      src: '/images/bar.png',
      alt: 'Sky Lounge',
      caption: "Elevated experiences above the city"
    },
    {
      src: '/images/gym.png',
      alt: 'Fitness Sanctuary',
      caption: "State-of-the-art wellness facilities"
    },
    {
      src: '/images/game.png',
      alt: 'Entertainment Lounge',
      caption: "Premium leisure and entertainment spaces"
    },
    {
      src: '/images/theater.png',
      alt: 'Private Cinema',
      caption: "Hollywood-caliber entertainment at home"
    }
  ];

  return (
    <div className="min-h-screen smooth-scroll bg-white">
      {/* Premium Navigation */}
      <nav className={`premium-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button
              onClick={scrollToTop}
              className="flex items-center focus:outline-none group"
              aria-label="Go to top"
            >
              <img
                src="/images/logo.png"
                alt="Jai&Sons"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </button>
            <div className="hidden md:flex items-center space-x-12">
              <a href="#gallery" className="nav-link">Gallery</a>
              <a href="#amenities" className="nav-link">Amenities</a>
              <a href="#location" className="nav-link">Location</a>
              <a href="#floor-plan" className="nav-link">Floor Plans</a>
              <button 
                onClick={() => setIsEnquiryModalOpen(true)}
                className="btn-primary"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <img
          src="/images/arc-main.png"
          alt="Sree Dhanya ARC"
          className="hero-video"
        />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Sree Dhanya ARC</h1>
          <p className="hero-subtitle">Where Luxury Meets Lifestyle</p>
          <div className="luxury-divider"></div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => scrollToSection('gallery')}
              className="btn-primary"
            >
              Explore Residences
            </button>
            <button 
              onClick={() => setIsEnquiryModalOpen(true)}
              className="btn-secondary"
            >
              Schedule Viewing
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="section-padding-large bg-warm-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="section-title animate-fade-up">Architectural Excellence</h2>
            <p className="section-subtitle animate-fade-up stagger-1">
              Discover spaces that redefine luxury living through thoughtful design and premium finishes
            </p>
          </div>

          {/* Exterior Views */}
          <div className="mb-24">
            <h3 className="text-section-title font-display text-center mb-12 animate-fade-up stagger-2">
              Iconic Architecture
            </h3>
            <GalleryCarousel images={exteriorImages} onImageClick={setSelectedImage} />
          </div>

          {/* Lobby & Common Areas */}
          <div className="mb-24">
            <h3 className="text-section-title font-display text-center mb-12 animate-fade-up stagger-3">
              Grand Entrance
            </h3>
            <GalleryCarousel images={lobbyImages} onImageClick={setSelectedImage} />
          </div>

          {/* Interior Spaces */}
          <div className="mb-24">
            <h3 className="text-section-title font-display text-center mb-12 animate-fade-up stagger-4">
              Luxury Interiors
            </h3>
            <GalleryCarousel images={interiorImages} onImageClick={setSelectedImage} />
          </div>

          {/* Amenities */}
          <div id="amenities">
            <h3 className="text-section-title font-display text-center mb-12 animate-fade-up stagger-5">
              Premium Amenities
            </h3>
            <GalleryCarousel images={amenityImages} onImageClick={setSelectedImage} />
          </div>
        </div>
      </section>

      {/* Floor Plan Section */}
      <section id="floor-plan" className="section-padding bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-white animate-fade-up">Floor Plans</h2>
            <div className="luxury-divider"></div>
            <p className="section-subtitle text-gray-300 animate-fade-up stagger-1">
              Thoughtfully designed 3BHK residences that maximize space, light, and luxury
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="luxury-card bg-soft-charcoal border-luxury-gold/20 animate-scale-in">
              <div className="text-center">
                <img
                  src="/images/plan.png"
                  alt="3BHK Floor Plan"
                  className="w-full h-auto mb-8 transition-transform duration-500 hover:scale-105"
                />
                <h4 className="text-2xl font-display font-medium mb-4 text-luxury-gold">Premium 3BHK Residence</h4>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Spacious 3-bedroom apartments featuring premium finishes, modern amenities, 
                  and panoramic city views. Each residence is designed to offer the perfect 
                  balance of privacy, comfort, and luxury.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose ARC Section */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="section-title animate-fade-up">Why Choose Sree Dhanya ARC</h2>
            <div className="luxury-divider"></div>
            <p className="section-subtitle animate-fade-up stagger-1">
              Experience the pinnacle of luxury living with unmatched amenities and prime location
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="luxury-card animate-fade-up stagger-1">
              <div className="text-center">
                <div className="text-5xl mb-6 text-luxury-gold">🏗️</div>
                <h4 className="text-xl font-display font-medium mb-4">Premium Construction</h4>
                <p className="text-text-secondary leading-relaxed">
                  Built with the finest materials and attention to detail, ensuring lasting quality and elegance.
                </p>
              </div>
            </div>

            <div className="luxury-card animate-fade-up stagger-2">
              <div className="text-center">
                <div className="text-5xl mb-6 text-luxury-gold">🌟</div>
                <h4 className="text-xl font-display font-medium mb-4">Luxury Amenities</h4>
                <p className="text-text-secondary leading-relaxed">
                  Infinity pool, sky lounge, private theater, and state-of-the-art fitness center.
                </p>
              </div>
            </div>

            <div className="luxury-card animate-fade-up stagger-3">
              <div className="text-center">
                <div className="text-5xl mb-6 text-luxury-gold">📍</div>
                <h4 className="text-xl font-display font-medium mb-4">Prime Location</h4>
                <p className="text-text-secondary leading-relaxed">
                  Strategically located with easy access to business districts, shopping, and entertainment.
                </p>
              </div>
            </div>

            <div className="luxury-card animate-fade-up stagger-4">
              <div className="text-center">
                <div className="text-5xl mb-6 text-luxury-gold">🔒</div>
                <h4 className="text-xl font-display font-medium mb-4">Security & Privacy</h4>
                <p className="text-text-secondary leading-relaxed">
                  24/7 security with advanced surveillance systems ensuring complete peace of mind.
                </p>
              </div>
            </div>

            <div className="luxury-card animate-fade-up stagger-5">
              <div className="text-center">
                <div className="text-5xl mb-6 text-luxury-gold">🌿</div>
                <h4 className="text-xl font-display font-medium mb-4">Green Living</h4>
                <p className="text-text-secondary leading-relaxed">
                  Sustainable design with energy-efficient systems and landscaped gardens.
                </p>
              </div>
            </div>

            <div className="luxury-card animate-fade-up stagger-1">
              <div className="text-center">
                <div className="text-5xl mb-6 text-luxury-gold">🏆</div>
                <h4 className="text-xl font-display font-medium mb-4">Award-Winning Design</h4>
                <p className="text-text-secondary leading-relaxed">
                  Architecturally acclaimed design that sets new standards for luxury living.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="section-padding bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-white animate-fade-up">Prime Location</h2>
            <div className="luxury-divider"></div>
            <p className="section-subtitle text-gray-300 animate-fade-up stagger-1">
              Perfectly positioned for the modern urban lifestyle
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-left">
              <img
                src="/images/location.png"
                alt="Location Map"
                className="w-full h-auto rounded-lg shadow-luxury"
              />
            </div>
            <div className="animate-fade-right">
              <h3 className="text-2xl font-display font-medium mb-6 text-luxury-gold">
                Connected to Everything That Matters
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="flex items-center">
                  <span className="text-luxury-gold mr-3">•</span>
                  5 minutes to business district
                </p>
                <p className="flex items-center">
                  <span className="text-luxury-gold mr-3">•</span>
                  Walking distance to premium shopping
                </p>
                <p className="flex items-center">
                  <span className="text-luxury-gold mr-3">•</span>
                  Close to top educational institutions
                </p>
                <p className="flex items-center">
                  <span className="text-luxury-gold mr-3">•</span>
                  Easy access to major highways
                </p>
                <p className="flex items-center">
                  <span className="text-luxury-gold mr-3">•</span>
                  Near healthcare facilities
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-luxury-gold text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-display font-light mb-6 animate-fade-up">
            Experience Luxury Living
          </h2>
          <p className="text-xl mb-12 opacity-90 animate-fade-up stagger-1">
            Schedule a private viewing and discover your new home at Sree Dhanya ARC
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => setIsEnquiryModalOpen(true)}
              className="bg-white text-luxury-gold hover:bg-gray-100 px-8 py-4 font-medium text-lg transition-all duration-300 hover:-translate-y-1 animate-fade-up stagger-2"
            >
              Schedule Viewing
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="border-2 border-white text-white hover:bg-white hover:text-luxury-gold px-8 py-4 font-medium text-lg transition-all duration-300 hover:-translate-y-1 animate-fade-up stagger-3"
            >
              Explore Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <img
                src="/images/logo.png"
                alt="Jai&Sons"
                className="h-12 w-auto mb-6"
              />
              <p className="text-gray-400 leading-relaxed">
                Crafting exceptional living spaces that define luxury and comfort.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-display font-medium mb-6 text-luxury-gold">Contact</h4>
              <div className="space-y-3 text-gray-400">
                <p>📧 info@jaisonsbuilders.com</p>
                <p>📞 +91 XXX XXX XXXX</p>
                <p>📍 Bangalore, India</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-display font-medium mb-6 text-luxury-gold">Follow Us</h4>
              <div className="space-y-3 text-gray-400">
                <p>Connect with us on social media for updates and exclusive content.</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Jai&Sons Builders. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LightboxModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      <EnquiryModal 
        isOpen={isEnquiryModalOpen} 
        onClose={() => setIsEnquiryModalOpen(false)} 
      />
    </div>
  );
};

export default App;
