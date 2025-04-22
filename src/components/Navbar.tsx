import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC<{ scrollToTop: () => void }> = ({ scrollToTop }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button onClick={scrollToTop} className="text-2xl font-bold text-gray-900">
              Sree Dhanya ARC
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link
              to="/enquire"
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition-colors"
            >
              Enquire
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`fixed inset-0 bg-white z-40 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">Menu</h2>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <a
                  href="#gallery"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                    setIsOpen(false);
                  }}
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Gallery
                </a>
                <a
                  href="#floor-plan"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('floor-plan')?.scrollIntoView({ behavior: 'smooth' });
                    setIsOpen(false);
                  }}
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Floor Plan
                </a>
                <a
                  href="#why-arc"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('why-arc')?.scrollIntoView({ behavior: 'smooth' });
                    setIsOpen(false);
                  }}
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Why Choose Arc?
                </a>
                <a
                  href="#location"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' });
                    setIsOpen(false);
                  }}
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Location
                </a>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#gallery"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Gallery
            </a>
            <a
              href="#floor-plan"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('floor-plan')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Floor Plan
            </a>
            <a
              href="#why-arc"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('why-arc')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Why Choose Arc?
            </a>
            <a
              href="#location"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Location
            </a>
            <Link
              to="/enquire"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 