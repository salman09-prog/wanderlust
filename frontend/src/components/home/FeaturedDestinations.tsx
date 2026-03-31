import React from 'react';
import { Link } from 'react-router-dom';
import DestinationCard from '@/components/featured/DestinationCard';
import { Destination } from '@/constants/destinations';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FeaturedDestinationsProps {
  destinations?: Destination[];
  limit?: number;
}

const FeaturedDestinations: React.FC<FeaturedDestinationsProps> = ({
  destinations,
  limit = 3
}) => {
  // Limit destinations (default 3 for homepage, customizable via props)
  const featuredDestinations = destinations?.slice(0, limit) || [
    {
      id: '1',
      name: 'Agra',
      location: 'Uttar Pradesh',
      image: 'https://cdn.pixabay.com/photo/2020/06/05/21/09/cultural-tourism-5264542_1280.jpg',
      description: 'Explore the iconic symbol of eternal love, a UNESCO World Heritage site and one of the Seven Wonders of the World.',
      suitableFor: 'Romantic',
      category: 'Romantic', // Corrected typo
      rating: 4.4,
      bestTimeToVisit: 'October to March',
    },
    {
      id: '2',
      name: 'Varanasi Ghats',
      location: 'Varanasi',
      image: 'https://t4.ftcdn.net/jpg/04/08/25/05/360_F_408250543_MVaEVGeWxb4FiFy7mEGKj8nfYkwoAZON.jpg',
      description: 'Experience spiritual awakening at the ancient ghats along the sacred Ganges River with traditional evening ceremonies.',
      suitableFor: 'Family',
      category: 'Spiritual',
      rating: 4.9,
      bestTimeToVisit: 'September to March',
    },
    {
      id: '3',
      name: 'Jaipur City Tour',
      location: 'Jaipur',
      image: 'https://assets.vogue.in/photos/5ce41ea8b803113d138f5cd2/16:9/w_1920,h_1080,c_limit/Jaipur-Travel-Shopping-Restaurants.jpg',
      description: 'Discover the Pink City\'s majestic palaces, vibrant bazaars, and rich cultural heritage in the heart of Rajasthan.',
      suitableFor: 'All',
      category: 'Cultural',
      rating: 4.6,
      bestTimeToVisit: 'October to February',
    }
  ];

  return (
    <section className="py-16 bg-black border-t border-white/10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
          Featured Destinations in India
        </h2>
        <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">
          Explore our curated selection of the most enchanting destinations across India, each offering a unique blend of history, culture, and natural beauty.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredDestinations.map(destination => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Link to="/featured">
            <Button className="bg-white text-black hover:bg-white/90">
              View All Destinations
              <ArrowRight size={18} className="ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
