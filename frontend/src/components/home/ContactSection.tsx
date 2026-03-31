import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactSection = () => {
  return (
    <section id="contact" className="bg-zinc-950 py-16 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Contact Me
          </h2>
          <p className="text-zinc-400 mb-8">
            Have questions, suggestions, or feedback? I’d love to hear from you and help you explore more of Incredible India!
          </p>

          <div className="grid grid-cols-1 gap-6 mb-8">
            {/* Email */}
            <div className="bg-zinc-900 border border-white/10 rounded-lg p-4 w-64 mx-auto text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-black mb-2">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="text-white font-medium mb-1">Email Me</h3>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ujwalsingh164@gmail.com"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                click here
              </a>
            </div>
          </div>

          <Link to="/contact">
            <Button
              className="bg-white hover:bg-white/90 text-black font-medium px-6 py-2 h-auto text-lg"
            >
              Contact
            </Button>
          </Link>

          <p className="text-zinc-500 text-sm mt-6">
            I’ll get back to you within 48 hours 💕
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

