import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import API from '@/services/api';
import {
  BedDouble, Calendar, Search, ExternalLink, Award,
  Star, Users, ArrowUpDown, SortAsc, SortDesc, Wifi,
  Coffee, Car, Dumbbell, Wind,
} from 'lucide-react';

interface Hotel {
  id: string;
  name: string;
  rating: number;
  amenities: { name: string; icon: string }[];
  pricePerNight: number;
  image: string;
}

type SortKey = 'price' | 'rating';
type SortDir = 'asc' | 'desc';

const POPULAR_CITIES = [
  { city: 'Goa',         image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&fit=crop&q=80' },
  { city: 'Jaipur',      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&fit=crop&q=80' },
  { city: 'Kerala',      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&fit=crop&q=80' },
  { city: 'Manali',      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400&fit=crop&q=80' },
  { city: 'Udaipur',     image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&fit=crop&q=80' },
  { city: 'Varanasi',    image: 'https://images.unsplash.com/photo-1561358461-adfbebf8e3c7?w=400&fit=crop&q=80' },
];

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  'Free WiFi':     <Wifi size={12} />,
  'Breakfast':     <Coffee size={12} />,
  'Parking':       <Car size={12} />,
  'Gym':           <Dumbbell size={12} />,
  'AC':            <Wind size={12} />,
};

const HotelsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn]         = useState('');
  const [checkOut, setCheckOut]       = useState('');
  const [guests, setGuests]           = useState(2);
  const [rooms, setRooms]             = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [hotels, setHotels]           = useState<Hotel[]>([]);
  const [applyPoints, setApplyPoints] = useState(false);
  const [sortKey, setSortKey]         = useState<SortKey>('price');
  const [sortDir, setSortDir]         = useState<SortDir>('asc');
  const [minRating, setMinRating]     = useState(0);

  const nights = (() => {
    if (!checkIn || !checkOut) return 1;
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  })();

  const handleSearch = async () => {
    if (!destination || !checkIn || !checkOut) return;
    setIsSearching(true);
    setHasSearched(false);
    setHotels([]);
    try {
      const res = await fetch(
        `https://wanderlust-lprk.onrender.com/api/hotels/search?destination=${encodeURIComponent(destination)}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
      );
      if (res.ok) setHotels(await res.json());
      else toast({ title: 'Search failed', description: 'Could not reach the hotel API.', variant: 'destructive' });
    } catch {
      toast({ title: 'Search failed', description: 'Backend may be offline.', variant: 'destructive' });
    } finally {
      setIsSearching(false);
      setHasSearched(true);
    }
  };

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = [...hotels]
    .filter(h => h.rating >= minRating)
    .sort((a, b) => {
      const diff = sortKey === 'price' ? a.pricePerNight - b.pricePerNight : a.rating - b.rating;
      return sortDir === 'asc' ? diff : -diff;
    });

  const SortBtn = ({ label, k }: { label: string; k: SortKey }) => (
    <button
      onClick={() => toggleSort(k)}
      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
        sortKey === k ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
      }`}
    >
      {label}
      {sortKey === k ? sortDir === 'asc' ? <SortAsc size={12} /> : <SortDesc size={12} /> : <ArrowUpDown size={12} />}
    </button>
  );

  return (
    <Layout>
      {/* ── HERO ── */}
      <div className="relative overflow-hidden bg-black">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&fit=crop&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />

        <div className="relative container mx-auto px-4 pt-20 pb-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <BedDouble size={14} />
            <span>Search Hotels</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            Find your perfect<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              place to stay
            </span>
          </h1>
          <p className="text-zinc-400 text-lg mb-12 max-w-xl mx-auto">
            Browse thousands of hotels, earn Wanderlust Points on every booking.
          </p>

          {/* ── SEARCH FORM ── */}
          <div className="bg-zinc-900/70 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-8 max-w-4xl mx-auto shadow-2xl">
            {/* Row 1: Destination + Dates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Destination */}
              <div className="flex flex-col space-y-1 text-left">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Destination</label>
                <div className="relative">
                  <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  <input
                    type="text"
                    placeholder="City or area"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 bg-black/50 border border-white/20 text-white rounded-xl text-sm outline-none focus:border-purple-500 transition"
                  />
                </div>
              </div>

              {/* Check-in */}
              <div className="flex flex-col space-y-1 text-left">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Check-in</label>
                <div className="relative">
                  <input
                    id="hotels-checkin"
                    type="date"
                    value={checkIn}
                    onChange={e => setCheckIn(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 bg-black/50 border border-white/20 text-white rounded-xl text-sm outline-none focus:border-purple-500 transition appearance-none"
                  />
                  <Calendar
                    onClick={() => (document.getElementById('hotels-checkin') as HTMLInputElement)?.showPicker()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white cursor-pointer"
                    size={16}
                  />
                </div>
              </div>

              {/* Check-out */}
              <div className="flex flex-col space-y-1 text-left">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Check-out</label>
                <div className="relative">
                  <input
                    id="hotels-checkout"
                    type="date"
                    value={checkOut}
                    onChange={e => setCheckOut(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 bg-black/50 border border-white/20 text-white rounded-xl text-sm outline-none focus:border-purple-500 transition appearance-none"
                  />
                  <Calendar
                    onClick={() => (document.getElementById('hotels-checkout') as HTMLInputElement)?.showPicker()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white cursor-pointer"
                    size={16}
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Guests + Rooms + Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Guests */}
              <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5">
                <Users size={14} className="text-zinc-400" />
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Guests</span>
                <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-6 h-6 rounded-full bg-zinc-700 hover:bg-purple-600 text-white text-sm flex items-center justify-center transition">-</button>
                <span className="text-white font-bold w-4 text-center">{guests}</span>
                <button onClick={() => setGuests(guests + 1)} className="w-6 h-6 rounded-full bg-zinc-700 hover:bg-purple-600 text-white text-sm flex items-center justify-center transition">+</button>
              </div>

              {/* Rooms */}
              <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5">
                <BedDouble size={14} className="text-zinc-400" />
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Rooms</span>
                <button onClick={() => setRooms(Math.max(1, rooms - 1))} className="w-6 h-6 rounded-full bg-zinc-700 hover:bg-purple-600 text-white text-sm flex items-center justify-center transition">-</button>
                <span className="text-white font-bold w-4 text-center">{rooms}</span>
                <button onClick={() => setRooms(rooms + 1)} className="w-6 h-6 rounded-full bg-zinc-700 hover:bg-purple-600 text-white text-sm flex items-center justify-center transition">+</button>
              </div>

              <Button
                onClick={handleSearch}
                disabled={!destination || !checkIn || !checkOut || isSearching}
                className="flex-1 sm:flex-none bg-purple-600 hover:bg-purple-500 text-white py-3 px-10 rounded-xl font-bold text-base transition-all shadow-lg shadow-purple-600/30"
              >
                {isSearching ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Searching…
                  </span>
                ) : (
                  <><Search size={18} className="mr-2" />Search Hotels</>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── POPULAR CITIES ── */}
      {!hasSearched && (
        <div className="bg-black py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-lg font-bold text-zinc-400 uppercase tracking-widest mb-5">Popular Destinations</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {POPULAR_CITIES.map(({ city, image }) => (
                <button
                  key={city}
                  onClick={() => setDestination(city)}
                  className="relative group rounded-2xl overflow-hidden h-28 cursor-pointer hover:-translate-y-1 transition-all"
                >
                  <img src={image} alt={city} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&fit=crop&q=80'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white font-bold text-sm">{city}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── RESULTS ── */}
      {hasSearched && (
        <div className="bg-black py-12">
          <div className="container mx-auto px-4 max-w-5xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Hotels in <span className="text-purple-400">{destination}</span>
                </h2>
                <p className="text-zinc-500 text-sm mt-0.5">
                  {new Date(checkIn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  {' → '}
                  {new Date(checkOut).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  {' · '}{nights} night{nights > 1 ? 's' : ''} · {guests} guest{guests > 1 ? 's' : ''} · {rooms} room{rooms > 1 ? 's' : ''}
                </p>
              </div>
              <span className="bg-purple-600/20 text-purple-400 border border-purple-500/30 text-xs font-bold px-3 py-1 rounded-full self-start sm:self-auto">
                {filtered.length} Properties
              </span>
            </div>

            {/* Points toggle */}
            {hotels.length > 0 && user && (user.wanderlustPoints ?? 0) > 0 && (
              <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/30 rounded-2xl p-4 flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-500/20 p-2.5 rounded-xl text-purple-400"><Award size={22} /></div>
                  <div>
                    <h3 className="text-white font-semibold">Redeem Wanderlust Points</h3>
                    <p className="text-xs text-purple-300">You have <strong>{user.wanderlustPoints?.toLocaleString()}</strong> pts · 1 pt = ₹1 off (max 50%)</p>
                  </div>
                </div>
                <Switch checked={applyPoints} onCheckedChange={setApplyPoints} />
              </div>
            )}

            {/* Sort + Filter bar */}
            {hotels.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-zinc-500 font-medium">Sort:</span>
                  <SortBtn label="Price" k="price" />
                  <SortBtn label="Rating" k="rating" />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-zinc-500 font-medium">Stars:</span>
                  {[0, 3, 4, 5].map(s => (
                    <button
                      key={s}
                      onClick={() => setMinRating(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        minRating === s
                          ? 'bg-yellow-500/30 text-yellow-400 border border-yellow-500/40'
                          : 'bg-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {s === 0 ? 'All' : `${s}★+`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Hotel cards */}
            {hotels.length === 0 ? (
              <div className="text-center py-20 bg-zinc-900/30 rounded-2xl border border-white/5">
                <BedDouble size={40} className="text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400 text-lg">No hotels found for this destination.</p>
                <p className="text-zinc-600 text-sm mt-2">Try a different city or dates.</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 bg-zinc-900/30 rounded-2xl border border-white/5">
                <Star size={40} className="text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400 text-lg">No hotels match your star filter.</p>
                <button onClick={() => setMinRating(0)} className="text-purple-400 text-sm mt-2 underline">Clear filter</button>
              </div>
            ) : (
              <div className="space-y-5">
                {filtered.map((hotel, idx) => {
                  const total   = hotel.pricePerNight * nights * rooms;
                  let discount  = 0;
                  if (applyPoints && user?.wanderlustPoints) {
                    discount = Math.min(user.wanderlustPoints, Math.floor(total * 0.5));
                  }
                  const finalTotal  = total - discount;
                  const isBestValue = idx === 0 && sortKey === 'price' && sortDir === 'asc';
                  const isTopRated  = idx === 0 && sortKey === 'rating' && sortDir === 'desc';

                  return (
                    <div key={hotel.id} className="bg-zinc-900/70 border border-white/5 hover:border-purple-500/30 rounded-2xl overflow-hidden flex flex-col sm:flex-row group transition-all">
                      {/* Image */}
                      <div className="w-full sm:w-56 h-48 sm:h-auto flex-shrink-0 bg-zinc-800 relative overflow-hidden">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&fit=crop&q=80'; }}
                        />
                        {isBestValue && (
                          <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                            Best Price
                          </div>
                        )}
                        {isTopRated && (
                          <div className="absolute top-2 left-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                            ⭐ Top Rated
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 p-5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-bold text-white leading-tight">{hotel.name}</h3>
                            <div className="flex items-center bg-zinc-800 px-2 py-1 rounded-lg border border-white/5 ml-4 flex-shrink-0">
                              <Star size={12} className="text-yellow-400 fill-yellow-400 mr-1" />
                              <span className="text-xs font-bold text-white">{hotel.rating}.0</span>
                            </div>
                          </div>

                          {/* Amenities */}
                          <div className="flex flex-wrap gap-2 mt-2">
                            {hotel.amenities.map(am => (
                              <span key={am.name} className="flex items-center gap-1 text-[11px] text-zinc-400 bg-zinc-800/60 px-2.5 py-1 rounded-lg border border-white/5">
                                {AMENITY_ICONS[am.name] ?? null}
                                {am.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Price + CTA */}
                        <div className="mt-4 pt-4 border-t border-white/5 flex items-end justify-between">
                          <div>
                            <div className="text-[11px] text-zinc-500">₹{hotel.pricePerNight.toLocaleString('en-IN')}/night · {rooms} room{rooms > 1 ? 's' : ''} · {nights} night{nights > 1 ? 's' : ''}</div>
                            {applyPoints && discount > 0 ? (
                              <>
                                <div className="text-sm text-zinc-500 line-through">₹{total.toLocaleString('en-IN')}</div>
                                <div className="text-2xl font-extrabold text-green-400">₹{finalTotal.toLocaleString('en-IN')}</div>
                                <div className="text-[10px] text-zinc-500">{discount.toLocaleString()} pts applied</div>
                              </>
                            ) : (
                              <div className="text-2xl font-extrabold text-white">₹{total.toLocaleString('en-IN')}</div>
                            )}
                          </div>
                          <Button
                            className="bg-white text-black hover:bg-purple-600 hover:text-white font-bold px-6 rounded-xl transition-all shadow-md"
                            onClick={async () => {
                              if (!user) { navigate('/login'); return; }
                              try {
                                const res = await API.post('/create-checkout-session', {
                                  tourId: hotel.id,
                                  itemName: hotel.name,
                                  itemImage: hotel.image,
                                  guests,
                                  userId: user._id,
                                  startDate: checkIn,
                                  endDate: checkOut,
                                  amount: total,
                                  applyPoints,
                                });
                                window.location.href = res.data.url;
                              } catch {
                                toast({ title: 'Checkout failed', variant: 'destructive' });
                              }
                            }}
                          >
                            Book Now <ExternalLink size={14} className="ml-1.5 opacity-70" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default HotelsPage;
