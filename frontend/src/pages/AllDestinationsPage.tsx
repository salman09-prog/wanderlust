import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import DestinationCard from '@/components/featured/DestinationCard';
import CategoryFilter from '@/components/featured/CategoryFilter';
import SearchBox from '@/components/shared/SearchBox';
import { Destination, destinations as allDestinations } from '@/constants/destinations';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import AdvancedFilters, { FilterState } from '@/components/featured/AdvancedFilters';
import MultiLocationMap from '@/components/featured/MultiLocationMap';
import { Map, List } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ITEMS_PER_PAGE = 12;

const AllDestinationsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialPage = Number(searchParams.get('page') || '1');

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  
  // Calculate max price for the slider from the static array
  const maxPrice = Math.max(...allDestinations.map(d => parseInt(d.price.replace(/[^\d]/g, '')) || 0));
  
  const [filters, setFilters] = useState<FilterState>({ priceRange: [0, maxPrice], sortBy: 'recommended' });
  const [isMapView, setIsMapView] = useState(false);
  
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setDestinations(allDestinations);
  }, []);

  useEffect(() => {
    let filtered = destinations;

    // Apply Category Filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(dest => dest.category === selectedCategory);
    }

    // Apply Price Range Filter
    filtered = filtered.filter(dest => {
      const p = parseInt(dest.price.replace(/[^\d]/g, '')) || 0;
      return p >= filters.priceRange[0] && p <= filters.priceRange[1];
    });

    // Apply Sorting
    if (filters.sortBy === 'price-low') {
      filtered.sort((a, b) => (parseInt(a.price.replace(/[^\d]/g, '')) || 0) - (parseInt(b.price.replace(/[^\d]/g, '')) || 0));
    } else if (filters.sortBy === 'price-high') {
      filtered.sort((a, b) => (parseInt(b.price.replace(/[^\d]/g, '')) || 0) - (parseInt(a.price.replace(/[^\d]/g, '')) || 0));
    } else if (filters.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredDestinations(filtered);
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));

    // Reset to page 1 when filters or category changes
    if (selectedCategory !== initialCategory) {
      setCurrentPage(1);
    }

    // Update URL search params
    if (selectedCategory === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', selectedCategory);
    }

    if (currentPage === 1) {
      searchParams.delete('page');
    } else {
      searchParams.set('page', currentPage.toString());
    }

    setSearchParams(searchParams);
  }, [selectedCategory, currentPage, initialCategory, searchParams, setSearchParams, filters]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Calculate current destinations to display
  const currentDestinations = filteredDestinations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <Layout>
      <div className="bg-black py-12 md:py-16 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              All Travel Destinations
            </h1>
            <p className="text-zinc-400">
              Discover India's enchanting destinations, from historic monuments to pristine beaches, spiritual retreats, and adventurous landscapes.
            </p>
          </div>

          <div className="mb-6 flex flex-col md:flex-row gap-6 justify-between items-center">
            <SearchBox className="max-w-xl w-full" />
            
            <Tabs 
              value={isMapView ? 'map' : 'list'} 
              onValueChange={(v) => setIsMapView(v === 'map')}
              className="w-full md:w-auto"
            >
              <TabsList className="bg-zinc-900 border border-white/10 p-1">
                <TabsTrigger value="list" className="data-[state=active]:bg-zinc-800 text-zinc-400">
                  <List size={18} className="mr-2" /> List View
                </TabsTrigger>
                <TabsTrigger value="map" className="data-[state=active]:bg-zinc-800 text-zinc-400">
                  <Map size={18} className="mr-2" /> Map View
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <AdvancedFilters 
            onFilterChange={handleFilterChange} 
            maxPrice={maxPrice} 
          />

          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />

          {currentDestinations.length > 0 ? (
            <>
              {isMapView ? (
                <div className="mb-10 w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                  <MultiLocationMap destinations={filteredDestinations} />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                  {currentDestinations.map(destination => (
                    <DestinationCard key={destination.id} destination={destination} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) handlePageChange(currentPage - 1);
                        }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>

                    {currentPage > 2 && totalPages > 5 && (
                      <>
                        <PaginationItem>
                          <PaginationLink href="#" onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(1);
                          }}>
                            1
                          </PaginationLink>
                        </PaginationItem>
                        {currentPage > 3 && <PaginationEllipsis />}
                      </>
                    )}

                    {getPageNumbers().map(number => (
                      <PaginationItem key={number}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === number}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(number);
                          }}
                        >
                          {number}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    {currentPage < totalPages - 1 && totalPages > 5 && (
                      <>
                        {currentPage < totalPages - 2 && <PaginationEllipsis />}
                        <PaginationItem>
                          <PaginationLink href="#" onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(totalPages);
                          }}>
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      </>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) handlePageChange(currentPage + 1);
                        }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
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

export default AllDestinationsPage;
