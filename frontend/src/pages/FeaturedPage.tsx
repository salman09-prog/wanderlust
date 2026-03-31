import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import DestinationCard from '@/components/featured/DestinationCard';
import CategoryFilter from '@/components/featured/CategoryFilter';
import SearchBox from '@/components/shared/SearchBox';
import { Destination, destinations as allDestinations } from '@/constants/destinations';

const MAX_DESTINATIONS = 30; // Set maximum number of destinations to 30

const FeaturedPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    setDestinations(allDestinations);
  }, []);

  // Limit destinations to 30
  const limitedDestinations = destinations.slice(0, MAX_DESTINATIONS);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredDestinations(limitedDestinations);
    } else {
      setFilteredDestinations(
        limitedDestinations.filter(dest => dest.category === selectedCategory)
      );
    }

    // Update URL search params when category changes
    if (selectedCategory === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', selectedCategory);
    }
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, searchParams, setSearchParams]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Layout>
      <div className="bg-black py-12 md:py-16 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Travel Destinations
            </h1>
            <p className="text-zinc-400">
              Discover India's most enchanting destinations, from historic monuments to pristine beaches and spiritual retreats.
            </p>
          </div>

          <div className="mb-6">
            <SearchBox className="max-w-2xl mx-auto" />
          </div>

          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />

          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map(destination => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-zinc-400">No destinations found in this category. Please try another category.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FeaturedPage;
