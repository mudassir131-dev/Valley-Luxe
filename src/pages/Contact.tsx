import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { showToast } from '../components/UI/Toast';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      showToast('Thank you. A representative will contact you shortly.', 'success');
      setFormData({ name: '', email: '', message: '' });
    } else {
      showToast('Please fill out all required fields.', 'error');
    }
  };

  return (
    <div className="w-full bg-[#FAFAF8] dark:bg-[#0D0500] text-[#1A0A00] dark:text-ivory-cream min-h-screen pt-12 pb-16 flex items-center justify-center transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start text-left">
          
          {/* LEFT COLUMN: Details */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-saffron-gold font-bold">
                Get in Touch
              </span>
              <h1 className="font-display font-light text-4xl sm:text-6xl tracking-wider text-[#1A0A00] dark:text-ivory-cream uppercase leading-none">
                Let's Talk
              </h1>
            </div>

            <p className="font-ui text-sm text-[#6B5E52] dark:text-ivory-cream/70 leading-relaxed max-w-md font-medium">
              Whether you are looking to customize a specific silk carpet size, inquire about a 
              unique pashmina design, or request wholesale saffron shipments, our concierge is 
              at your service.
            </p>

            {/* Address, Phone, Email */}
            <div className="flex flex-col gap-6 mt-4">
              <div className="flex items-start gap-4">
                <div className="p-2 border border-[#F0EDE8] dark:border-saffron-gold/20 rounded-xl bg-white dark:bg-saffron-gold/5 text-[#C8860A] shrink-0 shadow-xs">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="font-display text-sm tracking-wider text-[#1A0A00] dark:text-ivory-cream font-bold uppercase">The Srinagar Guild</h3>
                  <p className="font-ui text-xs text-[#6B5E52] dark:text-ivory-cream/60 mt-1 leading-relaxed font-medium">
                    Boulevard Road, Dal Lake, Near Hazratbal,<br />Srinagar, Jammu & Kashmir, 190001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 border border-[#F0EDE8] dark:border-saffron-gold/20 rounded-xl bg-white dark:bg-saffron-gold/5 text-[#C8860A] shrink-0 shadow-xs">
                  <Mail size={18} />
                </div>
                <div>
                  <h3 className="font-display text-sm tracking-wider text-[#1A0A00] dark:text-ivory-cream font-bold uppercase">Electronic Inquiries</h3>
                  <a href="mailto:concierge@valleyluxe.com" className="font-mono text-xs text-[#C8860A] font-semibold hover:underline mt-1 block">
                    concierge@valleyluxe.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 border border-[#F0EDE8] dark:border-saffron-gold/20 rounded-xl bg-white dark:bg-saffron-gold/5 text-[#C8860A] shrink-0 shadow-xs">
                  <Phone size={18} />
                </div>
                <div>
                  <h3 className="font-display text-sm tracking-wider text-[#1A0A00] dark:text-ivory-cream font-bold uppercase">Direct Telephone</h3>
                  <a href="tel:+91194245999" className="font-mono text-xs text-[#C8860A] font-semibold hover:underline mt-1 block">
                    +91 (194) 245-0999
                  </a>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Call-to-action */}
            <div className="mt-6 border-t border-[#F0EDE8] dark:border-saffron-gold/10 pt-8">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-ui font-semibold text-[10px] tracking-[0.2em] uppercase transition-all duration-300 rounded-xl shadow-lg cursor-pointer"
              >
                <MessageSquare size={14} /> Chat directly on WhatsApp
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="w-full border border-[#F0EDE8] dark:border-saffron-gold/10 p-8 sm:p-10 rounded-2xl bg-white dark:bg-kashmir-night/40 shadow-sm">
            <h3 className="font-display text-2xl tracking-wider text-[#1A0A00] dark:text-ivory-cream mb-8 uppercase font-light">
              Send an Inquiry
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="font-ui text-[10px] tracking-widest uppercase text-[#6B5E52] dark:text-ivory-cream/40 font-bold">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="bg-[#FAFAF8] dark:bg-transparent border border-[#F0EDE8] dark:border-saffron-gold/25 focus:border-[#C8860A] outline-none px-4 py-3 font-mono text-xs text-[#1A0A00] dark:text-ivory-cream placeholder-[#6B5E52]/40 dark:placeholder-ivory-cream/20 rounded-xl w-full transition-colors"
                  required
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="font-ui text-[10px] tracking-widest uppercase text-[#6B5E52] dark:text-ivory-cream/40 font-bold">Your Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="bg-[#FAFAF8] dark:bg-transparent border border-[#F0EDE8] dark:border-saffron-gold/25 focus:border-[#C8860A] outline-none px-4 py-3 font-mono text-xs text-[#1A0A00] dark:text-ivory-cream placeholder-[#6B5E52]/40 dark:placeholder-ivory-cream/20 rounded-xl w-full transition-colors"
                  required
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="font-ui text-[10px] tracking-widest uppercase text-[#6B5E52] dark:text-ivory-cream/40 font-bold">Message / Inquiries</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="How may we assist you?"
                  rows={5}
                  className="bg-[#FAFAF8] dark:bg-transparent border border-[#F0EDE8] dark:border-saffron-gold/25 focus:border-[#C8860A] outline-none px-4 py-3 font-mono text-xs text-[#1A0A00] dark:text-ivory-cream placeholder-[#6B5E52]/40 dark:placeholder-ivory-cream/20 rounded-xl w-full transition-colors resize-none"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 bg-[#1A0A00] dark:bg-saffron-gold hover:bg-[#C8860A] dark:hover:bg-deep-gold text-white dark:text-[#1A0A00] font-ui font-semibold text-[10px] tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-xl shadow-lg cursor-pointer mt-2"
              >
                <Send size={12} /> Submit Inquiry
              </button>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
