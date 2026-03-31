import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { StarIcon, MapPin, Calendar, Users, ArrowLeft, Heart } from 'lucide-react';
import { Destination, destinations } from '@/constants/destinations';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import ReviewSection from '@/components/reviews/ReviewSection';
import Map from '@/components/Map';
import BookingTabs from '@/components/booking/BookingTabs';

const DestinationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const { user, toggleWishlist } = useAuth();
  const isWishlisted = destination ? user?.wishlist?.includes(destination.id) : false;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to save destinations to your wishlist.",
        variant: "destructive",
      });
      return;
    }
    if (destination) {
      toggleWishlist(destination.id);
    }
  };

  useEffect(() => {
    // Simulate API fetch delay
    setLoading(true);
    setTimeout(() => {
      const foundDestination = destinations.find(d => d.id === id);
      setDestination(foundDestination || null);
      setLoading(false);
    }, 300);
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 min-h-[60vh] flex justify-center items-center">
          <div className="animate-pulse space-y-6 w-full max-w-4xl">
            <div className="h-80 bg-zinc-800/50 rounded-lg w-full"></div>
            <div className="h-8 bg-zinc-800/50 rounded w-3/4"></div>
            <div className="h-4 bg-zinc-800/50 rounded w-1/2"></div>
            <div className="space-y-3">
              <div className="h-4 bg-zinc-800/50 rounded w-full"></div>
              <div className="h-4 bg-zinc-800/50 rounded w-full"></div>
              <div className="h-4 bg-zinc-800/50 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!destination) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 min-h-[60vh] flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-white mb-4">Destination Not Found</h1>
          <p className="text-zinc-400 mb-8">The destination you're looking for doesn't exist or has been removed.</p>
          <Link to="/featured">
            <Button className="bg-white text-black hover:bg-white/90">
              <ArrowLeft size={16} className="mr-2" />
              Back to Featured Destinations
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/featured" className="flex items-center text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Featured Destinations
          </Link>
        </div>

        {/* Hero section */}
        <div className="relative h-80 md:h-96 rounded-lg overflow-hidden mb-8 mt-4">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <button 
            onClick={handleWishlistClick}
            className="absolute top-6 right-6 p-3 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full transition-colors border border-white/10 z-10"
          >
            <Heart 
              size={24} 
              className={`transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'}`} 
            />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6pt-20">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 text-sm font-medium mb-2">
              {destination.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{destination.name}</h1>
            <div className="flex items-center text-white/90 mt-2 text-lg">
              <MapPin size={20} className="mr-2" />
              <span>{destination.location}</span>
            </div>
          </div>
        </div>

        {destination.location && (
          <div className="mb-12 relative z-20 -mt-16 px-4 md:px-0">
            <BookingTabs destinationCity={destination.location} />
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 mt-4">
          {/* Main content */}
          <div className="md:col-span-3 lg:col-span-2">
            <div className="flex items-center mb-6 bg-zinc-900/50 p-4 rounded-xl border border-white/5">
              <div className="flex mr-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    size={20}
                    className={`${i < Math.floor(destination.rating) ? 'text-yellow-400' : 'text-zinc-600'}`}
                    fill={i < Math.floor(destination.rating) ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <span className="text-zinc-300 font-medium">{destination.rating} rating</span>
            </div>

            <h2 className="text-2xl font-semibold text-white mb-4">About this destination</h2>
            <p className="text-zinc-400 mb-8 leading-relaxed text-lg">
              {destination.description}
            </p>

            <div className="space-y-8">
              <div className="bg-zinc-900/30 p-6 rounded-xl border border-white/5">
                <h3 className="text-xl font-semibold text-white mb-3">What to Expect</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Immerse yourself in the rich cultural heritage, breathtaking landscapes, and authentic experiences that {destination.name} has to offer. Whether you're a history enthusiast, nature lover, or culinary explorer, this destination provides a perfect blend of tradition and modernity.
                </p>
              </div>

              <div className="bg-zinc-900/30 p-6 rounded-xl border border-white/5">
                <h3 className="text-xl font-semibold text-white mb-4">Highlights</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-zinc-400">
                  <li className="flex items-center"><span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span> Explore iconic landmarks and hidden gems</li>
                  <li className="flex items-center"><span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span> Experience local culture and traditions</li>
                  <li className="flex items-center"><span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span> Enjoy authentic regional cuisine</li>
                  <li className="flex items-center"><span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span> Meet friendly locals and create lasting memories</li>
                  <li className="flex items-center"><span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span> Capture stunning photographs</li>
                </ul>
              </div>

              <div className="bg-zinc-900/30 p-6 rounded-xl border border-white/5">
                <h3 className="text-xl font-semibold text-white mb-3">Perfect For</h3>
                <div className="flex items-center text-zinc-300 space-x-2 text-lg">
                  <Users size={20} className="text-white" />
                </div>

                {destination.latitude && destination.longitude && (
                  <div className="bg-zinc-900/30 p-6 rounded-xl border border-white/5 overflow-hidden">
                    <h3 className="text-xl font-semibold text-white mb-4">Location</h3>
                    <div className="rounded-lg overflow-hidden border border-white/10 relative z-10 w-full">
                      <Map lat={destination.latitude} lng={destination.longitude} name={destination.name} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <ReviewSection tourId={destination.id} />
          </div>

          {/* Sidebar information */}
          <div className="space-y-6 hidden lg:block">
            {/* Optional sidebar info could go here */}
            <div className="bg-zinc-900/30 p-6 rounded-xl border border-white/5 sticky top-24">
              <h3 className="text-xl font-semibold text-white mb-4">Why Book With Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-blue-500/20 p-2 rounded-lg mr-3 text-blue-400">
                    <StarIcon size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Earn Wanderlust Points</h4>
                    <p className="text-sm text-zinc-400">Get 5% back on every flight and hotel booking.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-500/20 p-2 rounded-lg mr-3 text-green-400">
                    <Users size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">24/7 Support</h4>
                    <p className="text-sm text-zinc-400">Our team is always ready to help you.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DestinationDetail;
