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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary">
              Sree Dhanya ARC
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-gray-700 hover:text-primary transition duration-300"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('floor-plan')}
              className="text-gray-700 hover:text-primary transition duration-300"
            >
              Floor Plan
            </button>
            <button
              onClick={() => scrollToSection('why-arc')}
              className="text-gray-700 hover:text-primary transition duration-300"
            >
              Why Choose Arc?
            </button>
            <button
              onClick={() => scrollToSection('location')}
              className="text-gray-700 hover:text-primary transition duration-300"
            >
              Location
            </button>
            <button
              onClick={() => scrollToSection('enquire-section')}
              className="bg-accent text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => scrollToSection('enquire-section')}
              className="bg-accent text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition duration-300"
            >
              Enquire
            </button>
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/80 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
            <button
              onClick={() => scrollToSection('gallery')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 transition duration-300"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('floor-plan')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 transition duration-300"
            >
              Floor Plan
            </button>
            <button
              onClick={() => scrollToSection('why-arc')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 transition duration-300"
            >
              Why Choose Arc?
            </button>
            <button
              onClick={() => scrollToSection('location')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 transition duration-300"
            >
              Location
            </button>
            <button
              onClick={() => scrollToSection('enquire-section')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 transition duration-300"
            >
              Enquire
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 