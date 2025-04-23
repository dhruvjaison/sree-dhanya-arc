import React, { useState } from 'react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxtNAfuD23S8hT5cCZv9GNCU3zBaX3lgXh2U3Hq5KA2N5bKlyGTNaRVweErLB7nQdZh/exec';

const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });
      if (res.ok) {
        setStatus('success');
        setName(''); setEmail(''); setPhone(''); setMessage('');
        setTimeout(() => {
          onClose();
          // Show success toast here if needed
        }, 1500);
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              required
              placeholder="Your full name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="tel"
              required
              placeholder="e.g. +1 234 567 890"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <textarea
              placeholder="Your message (optional)"
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full p-3 border rounded-lg h-32"
            />

            {status === 'error' && (
              <p className="text-red-600 text-sm">Oops! Something went wrong. Please try again.</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-black text-white font-semibold px-6 py-3 rounded hover:bg-gray-800 transition duration-300"
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal; 