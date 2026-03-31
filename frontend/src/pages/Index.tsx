import React from 'react';
import Layout from '@/components/layout/Layout';
import InteractiveHero from '@/components/home/InteractiveHero';
import FeaturedDestinations from '@/components/home/FeaturedDestinations';
import AboutIndia from '@/components/home/AboutIndia';
import TravelBlogs from '@/components/home/TravelBlogs';
import ContactSection from '@/components/home/ContactSection';
import MainSearch from '@/components/home/MainSearch';
import Categories from '@/components/home/Categories';
import Testimonials from '@/components/home/Testimonials';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Plane, BedDouble, MapPin } from 'lucide-react';
import Preloader from '@/components/ui/Preloader';
import FadeIn from '@/components/animations/FadeIn';
import DealsSection from '@/components/home/DealsSection';

const Index = () => {
  return (
    <Layout hideNavbar={true}>
      <Preloader />

      {/* 1. Hero Section */}
      <InteractiveHero />

      {/* 2. Main Booking Search + quick links */}
      <FadeIn delay={0.2} direction="up" className="relative z-20 -mt-16">
        <div className="bg-black py-4 border-t border-white/10 pb-8">
          <MainSearch />
          {/* Quick-link pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-6 px-4">
            <Link to="/flights"
              className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-blue-300 text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:-translate-y-0.5">
              <Plane size={14} /> Search Flights
            </Link>
            <Link to="/hotels"
              className="flex items-center gap-2 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 text-purple-300 text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:-translate-y-0.5">
              <BedDouble size={14} /> Search Hotels
            </Link>
            <Link to="/featured"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:-translate-y-0.5">
              <MapPin size={14} /> Explore Destinations
            </Link>
          </div>
        </div>
      </FadeIn>

      {/* 3. Categories (Destinations/Trips) */}
      <FadeIn delay={0.1}>
        <Categories />
      </FadeIn>

      {/* 4. About & Featured */}
      <FadeIn direction="left" delay={0.1}>
        <AboutIndia />
      </FadeIn>

      <FadeIn delay={0.1}>
        <FeaturedDestinations />
      </FadeIn>

      {/* Deals Section */}
      <FadeIn direction="up">
        <DealsSection />
      </FadeIn>

      {/* Booking CTA — 3 cards */}
      <FadeIn direction="up">
        <div className="bg-black py-16 border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Ready to explore India?</h2>
              <p className="text-zinc-400 max-w-xl mx-auto">Book flights, find hotels, or discover iconic destinations — all in one place.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {/* Flights card */}
              <div className="relative group rounded-2xl overflow-hidden border border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-black p-7 flex flex-col justify-between hover:-translate-y-1 transition-all">
                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1436491865332-7a615061c443?w=600&fit=crop&q=60')] bg-cover bg-center" />
                <div className="relative z-10">
                  <div className="bg-blue-500/20 border border-blue-400/30 p-3 rounded-xl text-blue-400 inline-flex mb-5">
                    <Plane size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Search Flights</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">Find the best fares across all major airlines. Earn Wanderlust Points on every flight booked.</p>
                </div>
                <Link to="/flights" className="relative z-10 mt-6">
                  <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl py-5 transition-all shadow-lg shadow-blue-900/40">
                    Search Flights <ChevronRight size={18} className="ml-1" />
                  </Button>
                </Link>
              </div>

              {/* Hotels card */}
              <div className="relative group rounded-2xl overflow-hidden border border-purple-500/20 bg-gradient-to-br from-purple-900/40 to-black p-7 flex flex-col justify-between hover:-translate-y-1 transition-all">
                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&fit=crop&q=60')] bg-cover bg-center" />
                <div className="relative z-10">
                  <div className="bg-purple-500/20 border border-purple-400/30 p-3 rounded-xl text-purple-400 inline-flex mb-5">
                    <BedDouble size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Find Hotels</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">From budget stays to luxury resorts — search, filter, and book the perfect room for your trip.</p>
                </div>
                <Link to="/hotels" className="relative z-10 mt-6">
                  <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl py-5 transition-all shadow-lg shadow-purple-900/40">
                    Search Hotels <ChevronRight size={18} className="ml-1" />
                  </Button>
                </Link>
              </div>

              {/* Destinations card */}
              <div className="relative group rounded-2xl overflow-hidden border border-amber-500/20 bg-gradient-to-br from-amber-900/30 to-black p-7 flex flex-col justify-between hover:-translate-y-1 transition-all">
                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&fit=crop&q=60')] bg-cover bg-center" />
                <div className="relative z-10">
                  <div className="bg-amber-500/20 border border-amber-400/30 p-3 rounded-xl text-amber-400 inline-flex mb-5">
                    <MapPin size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Explore Destinations</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">Browse 48 iconic Indian destinations with guides, highlights, and curated experiences.</p>
                </div>
                <Link to="/featured" className="relative z-10 mt-6">
                  <Button className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl py-5 transition-all shadow-lg shadow-amber-900/40">
                    View Destinations <ChevronRight size={18} className="ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* 5. Proof & Community */}
      <FadeIn direction="left">
        <Testimonials />
      </FadeIn>

      <FadeIn direction="right">
        <TravelBlogs />
      </FadeIn>

      {/* 6. Contact */}
      <FadeIn direction="up">
        <ContactSection />
      </FadeIn>

    </Layout>
  );
};

export default Index;
