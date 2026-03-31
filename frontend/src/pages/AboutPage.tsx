import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
  return (
    <Layout>
      <div className="bg-black py-12 md:py-16 min-h-screen border-t border-white/10">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="bg-zinc-900/50 border border-white/10 rounded-xl overflow-hidden mb-16">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">About Wanderlust Adventures</h1>
                <p className="text-white/80 text-lg mb-6">
                  Driven by passion, I’m dedicated to helping travelers uncover the incredible beauty and rich cultural heritage of India.
                </p>
                <p className="text-white/80 mb-8">
                  My mission is clear: to connect travelers with authentic experiences that highlight the best of India’s diverse landscapes, vibrant cultures, and timeless traditions.
                </p>
                <Link to="/contact">
                  <Button className="bg-white text-black hover:bg-white/90">
                    Get in Touch
                  </Button>
                </Link>
              </div>
              <div className="h-60 md:h-auto bg-zinc-800/50 flex items-center justify-center p-4">
                <img
                  src="/lovable-uploads/6197a3de-efa5-4123-a99f-fc3bbc2e0d2f.png"
                  alt="Wanderlust Logo"
                  className="max-h-full w-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Our Story */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">Our Story</h2>
            <div className="prose prose-lg max-w-none text-zinc-400">
              <p>
                Wanderlust Adventures was born from a deep love for India's diverse landscapes and rich cultural tapestry. What began as a passion project has evolved into a dedicated travel advisory service with a mission to showcase the authentic side of India to travelers from around the world.
              </p>
              <p>
                Unlike traditional travel agencies, I don't book your tickets or accommodations. Instead, I focus on what I do best: providing expert recommendations, detailed destination insights, and personalized travel advice to help you plan the perfect Indian adventure.
              </p>
              <p>
                I provide genuine advice and recommendations tailored to your preferences and travel style, highlighting the best of India's diverse landscapes and cultures.
              </p>
            </div>
          </div>

          {/* Meet the Founder */}
          <div className="bg-zinc-900/50 border border-white/10 rounded-xl shadow-sm p-8 mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">Meet Our Founder</h2>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3">
                  <div className="rounded-full overflow-hidden w-48 h-48 mx-auto border-4 border-white/20">
                    <img
                      src="/lovable-uploads/bharat image.jpg"
                      alt="BHARAT JANGID"
                      className="w-full h-full object-contain bg-zinc-800 p-2"
                    />
                  </div>
                </div>

                <div className="md:w-2/3 text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-2 text-white">BHARAT JANGID</h3>
                  <p className="text-zinc-400 mb-4">Founder & Nature Enthusiast</p>
                  <p className="text-zinc-400 mb-6">
                    As the founder of Wanderlust Adventures, I am passionate about providing authentic experiences that celebrate India's rich diversity and heritage, ensuring every journey is meaningful and personal.
                  </p>
                  <div className="flex justify-center md:justify-start space-x-4">
                    <a
                      href="https://www.linkedin.com/in/ujwalsingh23"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-white hover:text-zinc-300 transition-colors"
                    >
                      <Linkedin size={20} className="mr-1" />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=bharatjangid1732@gmail.com"
                      className="flex items-center text-white hover:text-zinc-300 transition-colors"
                    >
                      <Mail size={20} className="mr-1" />
                      <span>Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Approach */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">Our Approach</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Cultural Immersion</h3>
                <p className="text-zinc-400">
                  I emphasize authentic cultural experiences that connect travelers with local communities and traditions.
                </p>
              </div>

              <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" />
                    <path d="M12 16v-3" />
                    <path d="M12 8h0" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Unique Destinations</h3>
                <p className="text-zinc-400">
                  I understand that each traveler is unique, so I tailor my recommendations to suit individual preferences.
                </p>
              </div>
            </div>
          </div>

          {/* Connect With Us */}
          <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Connect With Us</h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Have questions or want personalized travel suggestions? I'd love to hear from you! Connect with me on social media or reach out directly.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.linkedin.com/in/bharat-jangid-"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white text-black rounded-md shadow-sm hover:bg-white/90 transition-colors"
              >
                <Linkedin size={20} className="mr-2" />
                LinkedIn
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=bharatjangid1732@gmail.com"
                className="inline-flex items-center px-6 py-3 bg-white text-black rounded-md shadow-sm hover:bg-white/90 transition-colors"
              >
                <Mail size={20} className="mr-2" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout >
  );
};

export default AboutPage;
