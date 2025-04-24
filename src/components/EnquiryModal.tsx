import React, { useState } from 'react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Replace this with your actual Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxxHIkoNyseLo-Cz9T4FOFYGXOlNO5WvEvoDiQ8Fdt5owjS8X67pMqBlUqea5ZVjCAi/exec';

const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      // Create URL with parameters
      const url = new URL(GOOGLE_SCRIPT_URL);
      url.searchParams.append('name', name);
      url.searchParams.append('email', email);
      url.searchParams.append('phone', phone);
      url.searchParams.append('message', message);

      // Send GET request to Google Apps Script
      const response = await fetch(url.toString(), {
        method: 'GET',
        mode: 'no-cors', // This is important for Google Apps Script
      });

      // Since we're using no-cors, we won't get response details
      // We'll assume success if we get here
      setStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      
      // Show success message and close modal after delay
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 2000);

    } catch (err) {
      console.error('Form submission error:', err);
      setStatus('error');
      setErrorMessage(
        'Unable to submit form. Please try again or contact us directly at manianj@hotmail.com'
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-primary mb-2">Inquire about ARC</h2>
          <p className="text-gray-600 mb-6">Please leave a message if you are interested!</p>

          <form id="enquiry-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                required
                placeholder="Your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={status === 'submitting'}
              />
            </div>
            
            <div>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={status === 'submitting'}
              />
            </div>
            
            <div>
              <input
                type="tel"
                required
                placeholder="e.g. +1 234 567 890"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={status === 'submitting'}
              />
            </div>
            
            <div>
              <textarea
                placeholder="Your message (optional)"
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={status === 'submitting'}
              />
            </div>

            {status === 'error' && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {errorMessage || 'Something went wrong. Please try again.'}
              </div>
            )}

            {status === 'success' && (
              <div className="text-green-600 text-sm bg-green-50 p-3 rounded-lg">
                Thank you for your inquiry! We'll get back to you soon.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className={`w-full bg-black text-white font-semibold px-6 py-3 rounded hover:bg-gray-800 transition duration-300 ${
                status === 'submitting' ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {status === 'submitting' ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : 'Submit Inquiry'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal; 