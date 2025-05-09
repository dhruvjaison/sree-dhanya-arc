import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';
import { Link } from 'react-router-dom';
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-w-7xl w-full mx-auto"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 text-4xl"
          aria-label="Close lightbox"
        >
          ×
        </button>
        <div className="relative">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
            <p className="text-white text-xl font-medium mb-2">{image.alt}</p>
            {image.caption && (
              <p className="text-gray-200 text-base">{image.caption}</p>
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div 
          className="flex flex-col"
          onClick={() => onImageClick(image)}
        >
          <div className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group">
            <img 
              src={image.src}
              alt={image.alt}
              className="w-full h-[400px] sm:h-[500px] object-cover transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-lg sm:text-xl font-semibold mb-2">{image.alt}</p>
              <p className="text-sm sm:text-base">{image.caption}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // For regular carousel (2 or more images)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: images.length < 3 ? 2 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, images.length),
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="relative px-4 sm:px-6">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="px-2">
            <div 
              className="flex flex-col"
              onClick={() => onImageClick(image)}
            >
              <div className="relative overflow-hidden rounded-xl shadow-md cursor-pointer">
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 sm:h-72 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-center text-sm mt-2 text-gray-700 font-medium">
                {image.caption}
              </p>
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

  useEffect(() => {
    document.title = 'Sree Dhanya ARC – Premium Residence by Jai&Sons';
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const exteriorImages = [
    { 
      src: '/images/side.png', 
      alt: 'Side View',
      caption: "Contemporary architectural design with premium finishes"
    },
    { 
      src: '/images/night.png', 
      alt: 'Night View',
      caption: "Stunning illuminated facade in the evening"
    },
    { 
      src: '/images/arc-main.png', 
      alt: 'Main Entrance',
      caption: "Grand entrance and driveway"
    },
    { 
      src: '/images/roof.png', 
      alt: 'Rooftop View',
      caption: "Panoramic views from the rooftop"
    },
    { 
      src: '/images/balcony.png', 
      alt: 'Balcony View',
      caption: "Elegant balconies with panoramic city views"
    }
  ];

  const lobbyImages = [
    { 
      src: '/images/reception.png', 
      alt: 'Reception',
      caption: "24/7 staffed reception with concierge services"
    },
    { 
      src: '/images/lobby.png', 
      alt: 'Main Lobby',
      caption: "Grand entrance lobby with luxury finishes"
    }
  ];

  const interiorImages = [
    { 
      src: '/images/living-room.png', 
      alt: 'Living Room',
      caption: "Spacious living areas with premium flooring"
    },
    { 
      src: '/images/kitchen.png', 
      alt: 'Kitchen',
      caption: "Modern kitchen with high-end appliances"
    },
    { 
      src: '/images/master.png', 
      alt: 'Master Bedroom',
      caption: "Luxurious master suite"
    },
    { 
      src: '/images/closet.png', 
      alt: 'Walk-in Closet',
      caption: "Custom-designed walk-in closets"
    },
    { 
      src: '/images/dining.png', 
      alt: 'Dining Area',
      caption: "Elegant dining space for family gatherings"
    },
    { 
      src: '/images/balcony.png', 
      alt: 'Private Balcony',
      caption: "Spacious private balcony for outdoor living"
    },
    { 
      src: '/images/balcony-surface.png', 
      alt: 'Balcony Detail',
      caption: "Premium balcony finishes and details"
    }
  ];

  const amenityImages = [
    { 
      src: '/images/pool.png', 
      alt: 'Infinity Pool',
      caption: "Luxurious infinity pool with city views"
    },
    { 
      src: '/images/bar.png', 
      alt: 'Sky Lounge',
      caption: "Exclusive sky lounge with panoramic views"
    },
    { 
      src: '/images/gym.png', 
      alt: 'Fitness Center',
      caption: "State-of-the-art fitness center"
    },
    { 
      src: '/images/game.png', 
      alt: 'Game Room',
      caption: "Entertainment and game room"
    },
    { 
      src: '/images/playground.png', 
      alt: 'Kids Playground',
      caption: "Safe and engaging children's play area"
    },
    { 
      src: '/images/theater.png', 
      alt: 'Private Theater',
      caption: "Private cinema with premium seating"
    }
  ];

  return (
    <div className="min-h-screen smooth-scroll">
      {/* Sticky Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 sm:h-24">
            <button 
              onClick={scrollToTop}
              className="logo-button flex items-center focus:outline-none group py-2"
              aria-label="Go to top"
            >
              <div className="relative overflow-hidden">
                <img 
                  src="/images/logo.png" 
                  alt="Jai&Sons Logo" 
                  className="h-12 sm:h-14 md:h-16 w-auto object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </div>
            </button>
            <div className="flex items-center space-x-4">
              <a href="#gallery" className="text-gray-900 hover:text-gray-600 transition-colors">Gallery</a>
              <a href="#location" className="text-gray-900 hover:text-gray-600 transition-colors">Location</a>
              <a href="#floor-plan" className="text-gray-900 hover:text-gray-600 transition-colors">Floor Plan</a>
              <a href="#enquire-section" className="bg-accent text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-semibold hover:bg-blue-600 transition duration-300 enquire-scroll-button">
                Enquire Now
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen w-full mt-16">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/images/arc-main.png" 
            alt="ARC Building" 
            className="w-full h-full object-cover"
            style={{ 
              objectFit: 'cover',
              objectPosition: 'center',
              minHeight: '100vh',
              width: '100%'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-6 tracking-tight drop-shadow-lg">
                ARC
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl font-light mb-6 text-white/90 drop-shadow-lg max-w-2xl mx-auto">
                Luxury Living in the Heart of the City
              </p>
              <p className="text-base sm:text-lg text-white/80 mb-10 max-w-xl mx-auto">
                Premium 3 BHK Residences | Rooftop Infinity Pool | Sky Lounge
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => scrollToSection('gallery')}
                  className="bg-white/90 backdrop-blur-sm text-gray-900 px-8 sm:px-10 py-4 rounded-full text-lg sm:text-xl font-medium hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
                >
                  View Arc Homes
                </button>
                <button 
                  onClick={() => scrollToSection('enquire-section')}
                  className="bg-transparent border-2 border-white text-white px-8 sm:px-10 py-4 rounded-full text-lg sm:text-xl font-medium hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 sm:mb-16">
            Gallery
          </h2>

          {/* Exterior Views */}
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8 px-6">
              Exterior Views
            </h3>
            <GalleryCarousel 
              images={exteriorImages} 
              onImageClick={setSelectedImage}
            />
          </div>

          {/* Lobby & Common Areas */}
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8 px-6">
              Lobby & Common Areas
            </h3>
            <GalleryCarousel 
              images={lobbyImages} 
              onImageClick={setSelectedImage}
            />
          </div>

          {/* Apartment Spaces */}
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8 px-6">
              Apartment Spaces
            </h3>
            <GalleryCarousel 
              images={interiorImages} 
              onImageClick={setSelectedImage}
            />
          </div>

          {/* Amenities & Lifestyle */}
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8 px-6">
              Amenities & Lifestyle
            </h3>
            <GalleryCarousel 
              images={amenityImages} 
              onImageClick={setSelectedImage}
            />
          </div>

          {/* Floor Plan */}
          <div id="floor-plan" className="mb-16">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 sm:mb-16">
              Floor Plan
            </h3>
            <div className="max-w-4xl mx-auto">
              <div 
                className="flex flex-col"
                onClick={() => setSelectedImage({
                  src: '/images/plan.png',
                  alt: 'Detailed Floor Plan',
                  caption: "Thoughtfully designed floor plans optimized for modern living"
                })}
              >
                <div className="relative overflow-hidden rounded-xl shadow-md cursor-pointer">
                  <img 
                    src="/images/plan.png"
                    alt="Detailed Floor Plan"
                    className="w-full h-auto hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-center text-sm mt-2 text-gray-700 font-medium">
                  Thoughtfully designed floor plans optimized for modern living
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-primary mb-4">
            Why Choose ARC?
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12 text-lg">
            Experience luxury living at its finest with our thoughtfully designed spaces and premium amenities
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
            {/* Luxury Living Features */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary border-b border-gray-200 pb-2 mb-4">
                Luxury Living
              </h3>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                <h4 className="text-lg font-semibold mb-2">Premium 3 BHK Units</h4>
                <p className="text-gray-600">
                  Spacious 1220 sq ft apartments with high-end finishes and 4 private balconies offering panoramic city views
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                <h4 className="text-lg font-semibold mb-2">Modern Design</h4>
                <p className="text-gray-600">
                  Contemporary architecture with premium materials and thoughtful layouts for optimal comfort
                </p>
              </div>
            </div>

            {/* Lifestyle Amenities */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary border-b border-gray-200 pb-2 mb-4">
                Premium Amenities
              </h3>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                <h4 className="text-lg font-semibold mb-2">Rooftop Infinity Pool</h4>
                <p className="text-gray-600">
                  Stunning infinity pool with panoramic city views, perfect for relaxation and entertainment
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                <h4 className="text-lg font-semibold mb-2">Sky Lounge & Entertainment</h4>
                <p className="text-gray-600">
                  Exclusive sky lounge, private theater, and game room for the ultimate leisure experience
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                <h4 className="text-lg font-semibold mb-2">Fitness & Wellness</h4>
                <p className="text-gray-600">
                  State-of-the-art gym with modern equipment for maintaining an active lifestyle
                </p>
              </div>
            </div>

            {/* Location & Convenience */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary border-b border-gray-200 pb-2 mb-4">
                Location & Security
              </h3>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                <h4 className="text-lg font-semibold mb-2">Prime Location</h4>
                <p className="text-gray-600">
                  Minutes from Lulu Mall and Metro Station, surrounded by top schools and hospitals
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                <h4 className="text-lg font-semibold mb-2">Family-Friendly</h4>
                <p className="text-gray-600">
                  Safe and engaging children's play area with 24/7 security for peace of mind
                </p>
              </div>
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <div className="text-lg font-semibold mb-2 text-primary">Quality Construction</div>
              <p className="text-gray-600">Built to the highest standards with premium materials</p>
            </div>
            <div className="p-6">
              <div className="text-lg font-semibold mb-2 text-primary">Trusted Developer</div>
              <p className="text-gray-600">By Sree Dhanya Homes, a name synonymous with quality and trust</p>
            </div>
            <div className="p-6">
              <div className="text-lg font-semibold mb-2 text-primary">Smart Investment</div>
              <p className="text-gray-600">Premium location ensuring long-term value appreciation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-16 sm:py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-primary mb-8 sm:mb-12">
            Location
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="relative overflow-hidden rounded-xl shadow-md cursor-pointer"
              onClick={() => setSelectedImage({
                src: '/images/location.png',
                alt: 'Strategic Location',
                caption: "Perfectly situated in the heart of the city with excellent connectivity"
              })}
            >
              <img 
                src="/images/location.png"
                alt="Strategic Location"
                className="w-full h-auto hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Strategically located near Sankar Road and Raja Kesavadas N.S.S. School, 
                Sree Dhanya ARC offers the perfect blend of convenience and connectivity.
              </p>
              <ul className="space-y-3 sm:space-y-4 mb-6">
                <li className="flex items-start">
                  <span className="text-accent mr-3">•</span>
                  <span className="text-gray-700">10 min to Lulu Mall</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3">•</span>
                  <span className="text-gray-700">3 min to Metro Station</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3">•</span>
                  <span className="text-gray-700">Surrounded by top schools and hospitals</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://www.google.com/maps?q=8.514194,76.971500" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition duration-300 shadow-md"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  Open in Google Maps
                </a>
                <a 
                  href="http://maps.apple.com/?ll=8.514194,76.971500&q=Sree+Dhanya+ARC" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition duration-300"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  Open in Apple Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="enquire-section" className="w-full bg-black text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Ready to Own Your Dream Home?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">
              Secure your premium residence at Sree Dhanya ARC today. Limited units available.
            </p>
            <button 
              onClick={() => setIsEnquiryModalOpen(true)}
              className="bg-white text-black px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <p className="text-sm sm:text-base">
            © 2025 Jai&Sons Real Estate Group. All rights reserved.
          </p>
        </div>
      </footer>

      {selectedImage && (
        <LightboxModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

      <EnquiryModal 
        isOpen={isEnquiryModalOpen} 
        onClose={() => setIsEnquiryModalOpen(false)} 
      />
    </div>
  );
};

export default App;
