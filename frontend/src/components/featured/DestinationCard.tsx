
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Destination } from '@/constants/destinations';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const { user, toggleWishlist } = useAuth();
  const isWishlisted = user?.wishlist?.includes(destination.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      // You could also add a toast here.
      alert("Please login to save destinations to your wishlist.");
      return;
    }
    toggleWishlist(destination.id);
  };

  return (
    <Card className="bg-zinc-900/40 backdrop-blur-md border border-white/10 shadow-xl hover:-translate-y-1 transition-all duration-300">
      <CardContent className="p-0 relative">
        <div className="h-48 overflow-hidden rounded-t-md relative">
          <img
            src={destination.image || '/placeholder.svg'}
            alt={destination.name}
            className="object-cover w-full h-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&fit=crop&q=80';
            }}
          />
          <button 
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full transition-colors border border-white/10 z-10"
          >
            <Heart 
              size={18} 
              className={`transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'}`} 
            />
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2">{destination.name}</h3>
          <p className="text-sm text-zinc-400">{destination.description.substring(0, 100)}...</p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 bg-black/50 border-t border-white/10">
        <span className="text-sm text-zinc-400">
          Perfect for: {destination.suitableFor}
        </span>
        <Link to={`/destination/${destination.id}`}>
          <Button size="sm" className="bg-white text-black hover:bg-white/90">
            Explore <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DestinationCard;
