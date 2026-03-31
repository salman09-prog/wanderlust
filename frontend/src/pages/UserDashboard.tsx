import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Destination, destinations as allDestinations } from '@/constants/destinations';
import DestinationCard from '@/components/featured/DestinationCard';
import API from '@/services/api';
import { Calendar, CreditCard, User, Award, Crown, Zap, ExternalLink, Plane, Building2, Clock, Rocket, Settings } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import BookingInvoiceModal from '@/components/dashboard/BookingInvoiceModal';

interface Booking {
  _id: string;
  tourId?: { name: string };
  flightId?: string;
  hotelId?: string;
  hotelName?: string;
  startDate: string;
  endDate: string;
  guests: number;
  amount: number;
  status: string;
  createdAt: string;
}

const UserDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [wishlistDestinations, setWishlistDestinations] = useState<Destination[]>([]);
  const [activeTab, setActiveTab] = useState('wishlist');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [daysUntilTrip, setDaysUntilTrip] = useState<number | null>(null);
  const [nextTrip, setNextTrip] = useState<Booking | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user?.wishlist) {
      const filtered = allDestinations.filter(d => user.wishlist?.includes(d.id));
      setWishlistDestinations(filtered);
    } else {
      setWishlistDestinations([]);
    }
  }, [user?.wishlist]);

  // Fetch bookings always on mount so we can compute countdown
  useEffect(() => {
    if (user) {
      const fetchBookings = async () => {
        try {
          const res = await API.get(`http://localhost:5000/bookings/${user._id}`);
          const data: Booking[] = res.data;
          setBookings(data);

          // Find the nearest future booking
          const now = new Date();
          const upcoming = data
            .filter(b => b.status === 'paid' && new Date(b.startDate) > now)
            .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

          if (upcoming.length > 0) {
            const trip = upcoming[0];
            setNextTrip(trip);
            const diffMs = new Date(trip.startDate).getTime() - now.getTime();
            setDaysUntilTrip(Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
          }
        } catch (error) {
          console.error('Failed to fetch bookings:', error);
        }
      };
      fetchBookings();
    }
  }, [user]);

  const loyaltyPoints = user?.wanderlustPoints || 0;
  const loyaltyStatus = user?.loyaltyTier || 'Explorer';
  
  let nextTierThreshold = 2000;
  if (loyaltyStatus === 'Adventurer') nextTierThreshold = 5000;
  if (loyaltyStatus === 'Voyager') nextTierThreshold = 5000; // max tier
  
  const progressPercentage = loyaltyStatus === 'Voyager' ? 100 : Math.min(100, Math.round((loyaltyPoints / nextTierThreshold) * 100));

  if (loading || (!user && window.location.pathname.includes('/dashboard'))) {
    return (
      <Layout>
        <div className="bg-black py-12 md:py-16 min-h-screen">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Dashboard Header Skeleton */}
            <div className="mb-10 flex items-center space-x-4 bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Skeleton className="h-16 w-16 rounded-full bg-zinc-800" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-64 bg-zinc-800" />
                <Skeleton className="h-4 w-48 bg-zinc-800" />
              </div>
            </div>
            
            {/* Tabs Skeleton */}
            <Skeleton className="h-12 w-64 rounded-xl bg-zinc-800 mb-8" />
            
            {/* Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl overflow-hidden bg-zinc-900/40 border border-white/5">
                  <Skeleton className="h-48 w-full bg-zinc-800" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4 bg-zinc-800" />
                    <Skeleton className="h-4 w-full bg-zinc-800" />
                    <Skeleton className="h-4 w-2/3 bg-zinc-800" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-black py-12 md:py-16 min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Upcoming Trip Countdown */}
          {nextTrip && daysUntilTrip !== null && (
            <div className="mb-6 relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 p-6 shadow-xl shadow-blue-900/10">
              <div className="absolute right-4 top-0 opacity-5 text-[120px] leading-none select-none pointer-events-none">✈</div>
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500/20 border border-blue-400/30 p-3 rounded-xl text-blue-400 flex-shrink-0">
                    <Rocket size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Upcoming Trip</p>
                    <h3 className="text-xl font-bold text-white">
                      {nextTrip.hotelId ? nextTrip.hotelName || 'Hotel Stay' :
                       nextTrip.flightId ? `Flight ${nextTrip.flightId}` :
                       nextTrip.tourId?.name || 'Your Trip'}
                    </h3>
                    <p className="text-zinc-400 text-sm mt-0.5 flex items-center gap-1.5">
                      <Calendar size={13} />
                      {new Date(nextTrip.startDate).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-center flex-shrink-0">
                  <div className="text-5xl font-black text-white tabular-nums tracking-tight leading-none">{daysUntilTrip}</div>
                  <div className="text-xs font-bold text-blue-300 uppercase tracking-widest flex items-center justify-center gap-1 mt-1">
                    <Clock size={11} /> {daysUntilTrip === 1 ? 'Day' : 'Days'} to go
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold text-white uppercase shadow-lg shadow-blue-500/20">
                {user.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Welcome, {user.name}</h1>
                <p className="text-zinc-400">{user.email}</p>
              </div>
            </div>
            <Link to="/settings">
              <button className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white bg-zinc-800/60 hover:bg-zinc-700/60 border border-white/5 px-4 py-2.5 rounded-xl transition-all">
                <Settings size={15} /> Account Settings
              </button>
            </Link>

            {/* Loyalty Program UI */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-5 flex flex-col space-y-4 w-full md:w-80">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${loyaltyPoints >= 5000 ? 'bg-purple-500/20 text-purple-400' : loyaltyPoints >= 2000 ? 'bg-yellow-500/20 text-yellow-500' : 'bg-zinc-400/20 text-zinc-300'}`}>
                  {loyaltyPoints >= 5000 ? <Crown size={24} /> : loyaltyPoints >= 2000 ? <Award size={24} /> : <Zap size={24} />}
                </div>
                <div>
                  <p className="text-sm text-zinc-400 font-medium">Wanderlust Rewards</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-white">{loyaltyPoints.toLocaleString()} pts</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      loyaltyPoints >= 5000 ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                      loyaltyPoints >= 2000 ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : 
                      'bg-zinc-500/20 text-zinc-300 border border-zinc-500/30'
                    }`}>
                      {loyaltyStatus}
                    </span>
                  </div>
                </div>
              </div>
              
              {loyaltyStatus !== 'Voyager' && (
                <div className="w-full">
                  <div className="flex justify-between text-xs text-zinc-500 mb-1.5 font-medium">
                    <span>{progressPercentage}%</span>
                    <span>{nextTierThreshold.toLocaleString()} pts for Next Tier</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2 bg-zinc-800" />
                </div>
              )}
              <Link to="/loyalty" className="flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors pt-1">
                <Award size={13} /> View Loyalty Perks & Tiers
              </Link>
            </div>
          </div>

          <Tabs defaultValue="wishlist" onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-zinc-900/80 mb-8 border border-white/10 p-1 rounded-xl">
              <TabsTrigger 
                value="wishlist" 
                className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-400"
              >
                My Wishlist ({user?.wishlist?.length || 0})
              </TabsTrigger>
              <TabsTrigger 
                value="bookings"
                className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-400"
              >
                My Bookings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="wishlist" className="animate-in fade-in duration-500">
              {wishlistDestinations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistDestinations.map(dest => (
                    <DestinationCard key={dest.id} destination={dest} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-zinc-900/30 rounded-2xl border border-white/5">
                  <p className="text-zinc-400 text-lg mb-4">Your wishlist is empty.</p>
                  <button 
                    onClick={() => navigate('/destinations')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Explore Destinations
                  </button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="bookings" className="animate-in fade-in duration-500">
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map(booking => (
                    <div 
                      key={booking._id} 
                      onClick={() => setSelectedBooking(booking)}
                      className="bg-zinc-900/60 p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-zinc-800/80 hover:border-blue-500/30 transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        {/* Booking type icon */}
                        <div className={`p-3 rounded-xl mt-1 flex-shrink-0 ${
                          booking.hotelId ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {booking.hotelId ? <Building2 size={20} /> : <Plane size={20} />}
                        </div>
                        <div>
                          {booking.hotelId ? (
                            <>
                              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-1 block">Hotel Stay</span>
                              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors flex items-center">
                                {booking.hotelName || booking.hotelId} <ExternalLink size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </h3>
                            </>
                          ) : booking.flightId ? (
                            <>
                              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-1 block">Flight</span>
                              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors flex items-center">
                                {booking.flightId} <ExternalLink size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </h3>
                            </>
                          ) : (
                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors flex items-center">
                              {booking.tourId?.name} <ExternalLink size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </h3>
                          )}
                          <div className="flex flex-wrap items-center gap-4 text-zinc-400 text-sm mt-2">
                            <span className="flex items-center">
                              <Calendar size={14} className="mr-1" />
                              {booking.hotelId ? (
                                <>{new Date(booking.startDate).toLocaleDateString()} → {new Date(booking.endDate).toLocaleDateString()}</>
                              ) : (
                                new Date(booking.startDate).toLocaleDateString()
                              )}
                            </span>
                            <span className="flex items-center"><User size={14} className="mr-1" /> {booking.guests} {booking.hotelId ? 'Guests' : 'Passengers'}</span>
                            <span className="flex items-center"><CreditCard size={14} className="mr-1" /> ₹{booking.amount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === 'paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {booking.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-zinc-900/30 rounded-2xl border border-white/5">
                  <p className="text-zinc-400 text-lg">You don't have any bookings yet.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {selectedBooking && (
        <BookingInvoiceModal 
          booking={selectedBooking} 
          onClose={() => setSelectedBooking(null)} 
        />
      )}
    </Layout>
  );
};

export default UserDashboard;
