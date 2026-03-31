import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import API from '@/services/api';
import {
  Plane, Calendar, Search, ExternalLink, Award,
  ArrowRight, ArrowUpDown, SortAsc, SortDesc,
} from 'lucide-react';

interface Flight {
  id: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
}

type SortKey = 'price' | 'duration' | 'departure';
type SortDir = 'asc' | 'desc';

const POPULAR_ROUTES = [
  { from: 'Delhi', to: 'Goa' },
  { from: 'Mumbai', to: 'Bangalore' },
  { from: 'Delhi', to: 'Kerala' },
  { from: 'Mumbai', to: 'Rajasthan' },
  { from: 'Bangalore', to: 'Himalayas' },
  { from: 'Chennai', to: 'Kashmir' },
];

const AIRLINE_LOGOS: Record<string, string> = {
  'Air India':  '🇮🇳',
  'IndiGo':     '🔵',
  'SpiceJet':   '🌶️',
  'Vistara':    '⭐',
  'Akasa Air':  '🧡',
};

const FlightsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [origin, setOrigin]           = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate]               = useState('');
  const [passengers, setPassengers]   = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [flights, setFlights]         = useState<Flight[]>([]);
  const [applyPoints, setApplyPoints] = useState(false);
  const [sortKey, setSortKey]         = useState<SortKey>('price');
  const [sortDir, setSortDir]         = useState<SortDir>('asc');

  const handleSearch = async () => {
    if (!origin || !destination || !date) return;
    setIsSearching(true);
    setHasSearched(false);
    setFlights([]);
    try {
      const res = await fetch(
        `http://localhost:5000/api/flights/search?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&date=${date}`
      );
      if (res.ok) setFlights(await res.json());
      else toast({ title: 'Search failed', description: 'Could not reach the flight API.', variant: 'destructive' });
    } catch {
      toast({ title: 'Search failed', description: 'Backend may be offline.', variant: 'destructive' });
    } finally {
      setIsSearching(false);
      setHasSearched(true);
    }
  };

  const setRoute = (from: string, to: string) => { setOrigin(from); setDestination(to); };

  const sorted = [...flights].sort((a, b) => {
    let diff = 0;
    if (sortKey === 'price')    diff = a.price - b.price;
    if (sortKey === 'duration') diff = a.duration.localeCompare(b.duration);
    if (sortKey === 'departure') diff = new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime();
    return sortDir === 'asc' ? diff : -diff;
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const SortBtn = ({ label, k }: { label: string; k: SortKey }) => (
    <button
      onClick={() => toggleSort(k)}
      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
        sortKey === k
          ? 'bg-blue-600 text-white'
          : 'bg-zinc-800 text-zinc-400 hover:text-white'
      }`}
    >
      {label}
      {sortKey === k
        ? sortDir === 'asc' ? <SortAsc size={12} /> : <SortDesc size={12} />
        : <ArrowUpDown size={12} />}
    </button>
  );

  return (
    <Layout>
      {/* ── HERO ── */}
      <div className="relative overflow-hidden bg-black">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a615061c443?w=1600&fit=crop&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />

        <div className="relative container mx-auto px-4 pt-20 pb-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <Plane size={14} />
            <span>Search Flights</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            Where do you<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              want to fly?
            </span>
          </h1>
          <p className="text-zinc-400 text-lg mb-12 max-w-xl mx-auto">
            Search hundreds of flights, earn Wanderlust Points on every booking.
          </p>

          {/* ── SEARCH FORM ── */}
          <div className="bg-zinc-900/70 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-8 max-w-4xl mx-auto shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {/* From */}
              <div className="md:col-span-1 flex flex-col space-y-1 text-left">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">From</label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  <input
                    type="text"
                    placeholder="Origin city"
                    value={origin}
                    onChange={e => setOrigin(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 bg-black/50 border border-white/20 text-white rounded-xl text-sm outline-none focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Swap arrow */}
              <div className="hidden md:flex items-end pb-1 justify-center">
                <button
                  onClick={() => { const t = origin; setOrigin(destination); setDestination(t); }}
                  className="p-2 rounded-full bg-zinc-800 hover:bg-blue-600 text-zinc-400 hover:text-white transition-all"
                >
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* To */}
              <div className="md:col-span-1 flex flex-col space-y-1 text-left">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">To</label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 rotate-90" size={16} />
                  <input
                    type="text"
                    placeholder="Destination city"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 bg-black/50 border border-white/20 text-white rounded-xl text-sm outline-none focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="flex flex-col space-y-1 text-left">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Date</label>
                <div className="relative">
                  <input
                    id="flights-date"
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 bg-black/50 border border-white/20 text-white rounded-xl text-sm outline-none focus:border-blue-500 transition appearance-none"
                  />
                  <Calendar
                    onClick={() => (document.getElementById('flights-date') as HTMLInputElement)?.showPicker()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white cursor-pointer"
                    size={16}
                  />
                </div>
              </div>
            </div>

            {/* Passengers + Search button row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Passengers</span>
                <button onClick={() => setPassengers(Math.max(1, passengers - 1))} className="w-6 h-6 rounded-full bg-zinc-700 hover:bg-blue-600 text-white text-sm flex items-center justify-center transition">-</button>
                <span className="text-white font-bold w-4 text-center">{passengers}</span>
                <button onClick={() => setPassengers(passengers + 1)} className="w-6 h-6 rounded-full bg-zinc-700 hover:bg-blue-600 text-white text-sm flex items-center justify-center transition">+</button>
              </div>
              <Button
                onClick={handleSearch}
                disabled={!origin || !destination || !date || isSearching}
                className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-500 text-white py-3 px-10 rounded-xl font-bold text-base transition-all shadow-lg shadow-blue-600/30"
              >
                {isSearching ? (
                  <span className="flex items-center gap-2"><span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> Searching…</span>
                ) : (
                  <><Search size={18} className="mr-2" />Search Flights</>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── POPULAR ROUTES ── */}
      {!hasSearched && (
        <div className="bg-black py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-lg font-bold text-zinc-400 uppercase tracking-widest mb-5">Popular Routes</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {POPULAR_ROUTES.map(r => (
                <button
                  key={`${r.from}-${r.to}`}
                  onClick={() => setRoute(r.from, r.to)}
                  className="bg-zinc-900/60 border border-white/5 hover:border-blue-500/40 rounded-xl p-4 text-left group transition-all hover:-translate-y-0.5"
                >
                  <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{r.from}</div>
                  <div className="flex items-center my-1 text-zinc-600"><div className="flex-1 h-px bg-zinc-800" /><Plane size={10} className="mx-1 text-zinc-600" /><div className="flex-1 h-px bg-zinc-800" /></div>
                  <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{r.to}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── RESULTS ── */}
      {hasSearched && (
        <div className="bg-black py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Header bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {origin} <span className="text-blue-400">→</span> {destination}
                </h2>
                <p className="text-zinc-500 text-sm mt-0.5">
                  {new Date(date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })} · {passengers} Passenger{passengers > 1 ? 's' : ''}
                </p>
              </div>
              <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-bold px-3 py-1 rounded-full self-start sm:self-auto">
                {sorted.length} Flights Found
              </span>
            </div>

            {/* Wanderlust Points toggle */}
            {sorted.length > 0 && user && (user.wanderlustPoints ?? 0) > 0 && (
              <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-2xl p-4 flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500/20 p-2.5 rounded-xl text-blue-400"><Award size={22} /></div>
                  <div>
                    <h3 className="text-white font-semibold">Redeem Wanderlust Points</h3>
                    <p className="text-xs text-blue-300">You have <strong>{user.wanderlustPoints?.toLocaleString()}</strong> pts · 1 pt = ₹1 off (max 50%)</p>
                  </div>
                </div>
                <Switch checked={applyPoints} onCheckedChange={setApplyPoints} />
              </div>
            )}

            {/* Sort controls */}
            {sorted.length > 0 && (
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xs text-zinc-500 font-medium mr-1">Sort by:</span>
                <SortBtn label="Price" k="price" />
                <SortBtn label="Duration" k="duration" />
                <SortBtn label="Departure" k="departure" />
              </div>
            )}

            {/* Flight cards */}
            {sorted.length === 0 ? (
              <div className="text-center py-20 bg-zinc-900/30 rounded-2xl border border-white/5">
                <Plane size={40} className="text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400 text-lg">No flights found for this route.</p>
                <p className="text-zinc-600 text-sm mt-2">Try a different origin, destination, or date.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sorted.map((flight, idx) => {
                  const total = flight.price * passengers;
                  let discount = 0;
                  if (applyPoints && user?.wanderlustPoints) {
                    discount = Math.min(user.wanderlustPoints, Math.floor(total * 0.5));
                  }
                  const finalTotal = total - discount;
                  const isBestDeal = idx === 0 && sortKey === 'price' && sortDir === 'asc';

                  return (
                    <div
                      key={flight.id}
                      className="bg-zinc-900/70 border border-white/5 hover:border-blue-500/30 rounded-2xl p-5 transition-all group"
                    >
                      <div className="flex flex-col gap-4">
                        {/* Left: airline + route */}
                        <div className="flex items-center gap-5 flex-1">
                          <div className="text-3xl w-12 text-center flex-shrink-0">
                            {AIRLINE_LOGOS[flight.airline] ?? '✈️'}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-white font-bold text-sm">{flight.airline}</span>
                              {isBestDeal && (
                                <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Best Deal</span>
                              )}
                            </div>
                            <span className="text-zinc-600 text-xs font-mono">{flight.id}</span>
                          </div>
                          <div className="flex items-center gap-3 ml-4">
                            <div className="text-right">
                              <div className="text-lg font-bold text-white leading-none">
                                {new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{flight.origin.substring(0, 8)}</div>
                            </div>
                            <div className="flex flex-col items-center px-2">
                              <span className="text-[10px] text-zinc-500">{flight.duration}</span>
                              <div className="flex items-center w-20 my-1">
                                <div className="flex-1 h-px bg-zinc-700" />
                                <Plane size={10} className="text-zinc-500 group-hover:text-blue-400 transition-colors" />
                                <div className="flex-1 h-px bg-zinc-700" />
                              </div>
                              <span className="text-[10px] text-green-400 font-medium">Direct</span>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-white leading-none">
                                {new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{flight.destination.substring(0, 8)}</div>
                            </div>
                          </div>
                        </div>

                        {/* Right: price + button */}
                        <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3">
                          <div className="text-right">
                            {applyPoints && discount > 0 ? (
                              <>
                                <div className="text-xs text-zinc-500 line-through">₹{total.toLocaleString('en-IN')}</div>
                                <div className="text-xl font-extrabold text-green-400">₹{finalTotal.toLocaleString('en-IN')}</div>
                                <div className="text-[10px] text-zinc-500">for {passengers} pax · {discount} pts used</div>
                              </>
                            ) : (
                              <>
                                <div className="text-xl font-extrabold text-white">₹{total.toLocaleString('en-IN')}</div>
                                <div className="text-[10px] text-zinc-500">for {passengers} passenger{passengers > 1 ? 's' : ''}</div>
                              </>
                            )}
                          </div>
                          <Button
                            className="bg-white text-black hover:bg-blue-600 hover:text-white font-bold px-6 rounded-xl transition-all shadow-md"
                            onClick={async () => {
                              if (!user) { navigate('/login'); return; }
                              try {
                                const res = await API.post('/create-checkout-session', {
                                  tourId: `FLIGHT-${flight.id}`,
                                  guests: passengers,
                                  userId: user._id,
                                  startDate: flight.departureTime,
                                  endDate: flight.arrivalTime,
                                  amount: total,
                                  applyPoints,
                                });
                                window.location.href = res.data.url;
                              } catch {
                                toast({ title: 'Checkout failed', variant: 'destructive' });
                              }
                            }}
                          >
                            Select <ExternalLink size={14} className="ml-1.5 opacity-70" />
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

export default FlightsPage;
