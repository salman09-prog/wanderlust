import React from 'react';
import Layout from '@/components/layout/Layout';
import { Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactPage = () => {
  const openContactForm = () => {
    window.open('https://forms.gle/mefzKQXMZcHHuvpU8', '_blank');
  };

  return (
    <Layout>
      <div className="bg-black py-12 md:py-16 min-h-screen border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-zinc-400 mb-6">
              Have questions or need assistance? Get in touch with me 💕, and I'll be happy to help you plan your perfect Indian adventure.
            </p>

            <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-xl shadow-sm mb-8 max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold text-white mb-3">Submit Your Inquiry</h2>
              <p className="text-zinc-400 mb-4">
                Please use our Google Form to submit your inquiry. I'll get back to you as soon as possible.
              </p>
              <Button
                onClick={openContactForm}
                className="bg-white hover:bg-white/90 text-black font-medium flex items-center gap-2"
              >
                Open Contact Form <ExternalLink size={16} />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="#general-inquiries" className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 transition-colors">
              General Inquiries
            </a>
            <a href="#destination-advice" className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 transition-colors">
              Destination Advice
            </a>
            <a href="#collaboration" className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 transition-colors">
              Collaboration Opportunities
            </a>
            <a href="#feedback" className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 transition-colors">
              Feedback & Suggestions
            </a>
            <a href="#careers" className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 transition-colors">
              Careers
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-center" id="general-inquiries">
                  <div className="bg-white/10 p-3 rounded-full mr-4 border border-white/5">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Phone</h3>
                    <p className="text-zinc-400">
                      <a href="https://discordapp.com/users/1243952128272371764" className="hover:text-white transition-colors">
                        9326501732
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-center" id="destination-advice">
                  <div className="bg-white/10 p-3 rounded-full mr-4 border border-white/5">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Email</h3>
                    <p className="text-zinc-400">
                      <a href="mailto:bharatjangid23@gmail.com" className="hover:text-white transition-colors">
                        bharatjangid1732@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-center" id="collaboration">
                  <div className="bg-white/10 p-3 rounded-full mr-4 border border-white/5">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">My Availability</h3>
                    <p className="text-zinc-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8" id="feedback">
                <h3 className="font-semibold text-white mb-3">Connect With Me</h3>
                <div className="flex space-x-4">
                  {/* Twitter (X) */}
                  <a href="https://x.com/UJWALSINGH23" target="_blank" rel="noopener noreferrer" className="bg-white/10 text-white hover:bg-white hover:text-black p-2 rounded-full transition-colors border border-white/5">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.34-1.6.56-2.47.66a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.03 4.28 4.28 0 00-7.3 3.9A12.14 12.14 0 013 4.79a4.28 4.28 0 001.33 5.72 4.28 4.28 0 01-1.94-.54v.05a4.29 4.29 0 003.43 4.2 4.3 4.3 0 01-1.93.07 4.29 4.29 0 004.01 2.98A8.6 8.6 0 012 19.54a12.14 12.14 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.39-.01-.58A8.72 8.72 0 0024 4.56a8.48 8.48 0 01-2.54.7z" />
                    </svg>
                  </a>
                  {/* GitHub */}
                  <a href="https://github.com/bharatjangid1732-svg/Wanderlust_adventures" target="_blank" rel="noopener noreferrer" className="bg-white/10 text-white hover:bg-white hover:text-black p-2 rounded-full transition-colors border border-white/5">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12a10 10 0 006.84 9.5c.5.09.66-.22.66-.48v-1.69c-2.78.61-3.37-1.34-3.37-1.34a2.66 2.66 0 00-1.11-1.46c-.91-.62.07-.6.07-.6a2.1 2.1 0 011.54 1.04 2.15 2.15 0 002.94.84 2.15 2.15 0 01.64-1.34c-2.22-.25-4.55-1.11-4.55-4.94a3.86 3.86 0 011.03-2.68 3.59 3.59 0 01.1-2.65s.84-.27 2.75 1.02a9.43 9.43 0 015 0c1.9-1.29 2.75-1.02 2.75-1.02.56 1.46.21 2.54.1 2.65a3.86 3.86 0 011.03 2.68c0 3.84-2.33 4.69-4.55 4.94a2.41 2.41 0 01.68 1.87v2.77c0 .27.17.58.67.48A10 10 0 0022 12c0-5.52-4.48-10-10-10z" />
                    </svg>
                  </a>
                  {/* Discord */}
                  <a href="https://discordapp.com/users/1243952128272371764" target="_blank" rel="noopener noreferrer" className="bg-white/10 text-white hover:bg-white hover:text-black p-2 rounded-full transition-colors border border-white/5">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037 13.868 13.868 0 00-.601 1.23 19.736 19.736 0 00-5.927 0 13.894 13.894 0 00-.602-1.23.077.077 0 00-.079-.037 19.736 19.736 0 00-4.885 1.515.07.07 0 00-.032.027C2.554 9.03 1.974 13.604 2.28 18.132a.082.082 0 00.031.056 19.9 19.9 0 005.993 3.028.077.077 0 00.084-.027c.462-.63.873-1.295 1.226-1.994a.076.076 0 00-.041-.105 13.131 13.131 0 01-1.872-.888.078.078 0 01-.008-.13c.126-.094.252-.192.373-.291a.075.075 0 01.077-.01c3.927 1.8 8.18 1.8 12.061 0a.075.075 0 01.078.009c.121.099.247.198.374.292a.078.078 0 01-.006.129 12.467 12.467 0 01-1.873.888.076.076 0 00-.04.106c.36.698.771 1.364 1.225 1.993a.076.076 0 00.084.028 19.876 19.876 0 005.994-3.028.077.077 0 00.03-.055c.347-5.063-.573-9.607-2.967-13.736a.061.061 0 00-.032-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.334.955-2.419 2.157-2.419 1.21 0 2.176 1.094 2.157 2.42 0 1.334-.955 2.418-2.157 2.418zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.334.955-2.419 2.157-2.419 1.21 0 2.176 1.094 2.157 2.42 0 1.334-.947 2.418-2.157 2.418z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div id="careers" className="bg-zinc-900/50 border border-white/10 p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold text-white mb-6">Submit Your Inquiry via Google Form</h2>
              <p className="text-zinc-400 mb-6">
                We use a Google Form to collect and organize inquiries. This helps me respond more efficiently to your questions and requests.
              </p>
              <div className="space-y-4">
                <p className="text-zinc-300">
                  <strong className="text-white">What to expect:</strong> After submitting the form, I will review your inquiry and get back to you within 24–48 business hours.
                </p>
                <p className="text-zinc-300">
                  <strong className="text-white">Required information:</strong> Please include your name, subject, message, and the nature of your inquiry in the form.
                </p>
                <p className="text-zinc-300">
                  <strong className="text-white">Google Form link:</strong> You will be redirected to our official Google Form where you can submit your inquiry securely.
                </p>
              </div>
              <div className="mt-8">
                <Button
                  onClick={openContactForm}
                  className="w-full bg-white hover:bg-white/90 text-black font-medium flex items-center justify-center gap-2 py-6"
                >
                  Open Contact Form <ExternalLink size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
