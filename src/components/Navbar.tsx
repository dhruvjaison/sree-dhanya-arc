import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  scrollToTop: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToTop }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={scrollToTop}
            className="logo-button flex items-center focus:outline-none group py-2"
            aria-label="Go to top"
          >
            <div className="relative overflow-hidden">
              <img 
                src="/images/logo.png" 
                alt="Jai&Sons Logo" 
                className="h-10 w-auto object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('gallery')}
              className="text-gray-900 hover:text-gray-600 transition-colors text-sm sm:text-base"
            >
              Gallery
            </button>
            <button 
              onClick={() => scrollToSection('floor-plan')}
              className="text-gray-900 hover:text-gray-600 transition-colors text-sm sm:text-base"
            >
              Floor Plan
            </button>
            <button 
              onClick={() => scrollToSection('why-arc')}
              className="text-gray-900 hover:text-gray-600 transition-colors text-sm sm:text-base"
            >
              Why Arc?
            </button>
            <button 
              onClick={() => scrollToSection('location')}
              className="text-gray-900 hover:text-gray-600 transition-colors text-sm sm:text-base"
            >
              Location
            </button>
            <Link 
              to="/enquire" 
              className="bg-accent text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-semibold hover:bg-blue-600 transition duration-300"
            >
              Enquire Now
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Enquire Now Button - Always visible on mobile */}
            <Link 
              to="/enquire" 
              className="bg-accent text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-blue-600 transition duration-300 whitespace-nowrap"
            >
              Enquire
            </Link>

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="p-1.5 rounded-lg hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5 text-gray-900"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-x-0 top-16 bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="px-4 py-2 space-y-0">
            <button 
              onClick={() => scrollToSection('gallery')}
              className="block w-full text-left text-gray-900 hover:text-gray-600 transition-colors py-3 text-sm border-b border-gray-100"
            >
              Gallery
            </button>
            <button 
              onClick={() => scrollToSection('floor-plan')}
              className="block w-full text-left text-gray-900 hover:text-gray-600 transition-colors py-3 text-sm border-b border-gray-100"
            >
              Floor Plan
            </button>
            <button 
              onClick={() => scrollToSection('why-arc')}
              className="block w-full text-left text-gray-900 hover:text-gray-600 transition-colors py-3 text-sm border-b border-gray-100"
            >
              Why Arc?
            </button>
            <button 
              onClick={() => scrollToSection('location')}
              className="block w-full text-left text-gray-900 hover:text-gray-600 transition-colors py-3 text-sm"
            >
              Location
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 