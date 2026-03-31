import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plane, BedDouble, Clock, Tag, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Deal {
  id: string;
  type: 'flight' | 'hotel';
  title: string;
  subtitle: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  savePct: number;
  tag: string;
  link: string;
  endsAt: Date; // countdown target
}

// Each deal expires at a different future time for variety
const now = Date.now();
const DEALS: Deal[] = [
  {
    id: 'd1',
    type: 'flight',
    title: 'Delhi → Goa',
    subtitle: 'Direct · IndiGo · Any date',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&fit=crop&q=80',
    originalPrice: 6800,
    discountedPrice: 3999,
    savePct: 41,
    tag: 'Flash Sale',
    link: '/flights',
    endsAt: new Date(now + 6 * 60 * 60 * 1000), // 6 hours
  },
  {
    id: 'd2',
    type: 'hotel',
    title: 'Luxury Stay in Jaipur',
    subtitle: '5★ · Breakfast included · 2 nights',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&fit=crop&q=80',
    originalPrice: 8500,
    discountedPrice: 4999,
    savePct: 41,
    tag: 'Weekend Deal',
    link: '/hotels',
    endsAt: new Date(now + 11 * 60 * 60 * 1000), // 11 hours
  },
  {
    id: 'd3',
    type: 'flight',
    title: 'Mumbai → Manali',
    subtitle: 'Via Delhi · Vistara · Limited seats',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&fit=crop&q=80',
    originalPrice: 9200,
    discountedPrice: 5499,
    savePct: 40,
    tag: 'Last Minute',
    link: '/flights',
    endsAt: new Date(now + 3 * 60 * 60 * 1000), // 3 hours
  },
  {
    id: 'd4',
    type: 'hotel',
    title: 'Houseboat in Kerala',
    subtitle: '4★ · All meals · 3 nights',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&fit=crop&q=80',
    originalPrice: 12000,
    discountedPrice: 7499,
    savePct: 38,
    tag: 'Limited Offer',
    link: '/hotels',
    endsAt: new Date(now + 18 * 60 * 60 * 1000), // 18 hours
  },
];

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, target.getTime() - Date.now()));

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(Math.max(0, target.getTime() - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  const h = Math.floor(timeLeft / 3_600_000);
  const m = Math.floor((timeLeft % 3_600_000) / 60_000);
  const s = Math.floor((timeLeft % 60_000) / 1_000);
  return { h, m, s, expired: timeLeft === 0 };
}

const Pad = (n: number) => String(n).padStart(2, '0');

const DealCard: React.FC<{ deal: Deal }> = ({ deal }) => {
  const { h, m, s, expired } = useCountdown(deal.endsAt);
  const isUrgent = h < 4;

  return (
    <div className="group relative rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 bg-zinc-900/60 transition-all hover:-translate-y-1 flex flex-col">
      {/* Image */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <img
          src={deal.image}
          alt={deal.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&fit=crop&q=80'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Save badge */}
        <div className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
          <Tag size={10} />
          Save {deal.savePct}%
        </div>

        {/* Type badge */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white/90 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 border border-white/10">
          {deal.type === 'flight' ? <Plane size={10} /> : <BedDouble size={10} />}
          {deal.type === 'flight' ? 'Flight' : 'Hotel'}
        </div>

        {/* Tag */}
        <div className="absolute bottom-3 left-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 flex items-center gap-1">
            <Zap size={10} className="fill-amber-300" /> {deal.tag}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-base font-bold text-white mb-0.5">{deal.title}</h3>
        <p className="text-xs text-zinc-400 mb-3">{deal.subtitle}</p>

        {/* Prices */}
        <div className="flex items-end gap-3 mb-4">
          <div>
            <div className="text-xs text-zinc-500 line-through">₹{deal.originalPrice.toLocaleString('en-IN')}</div>
            <div className="text-xl font-extrabold text-white">₹{deal.discountedPrice.toLocaleString('en-IN')}</div>
          </div>
          <div className="mb-0.5 bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
            You save ₹{(deal.originalPrice - deal.discountedPrice).toLocaleString('en-IN')}
          </div>
        </div>

        {/* Countdown */}
        <div className={`flex items-center gap-2 rounded-xl px-3 py-2 mb-4 ${isUrgent ? 'bg-red-900/30 border border-red-500/30' : 'bg-zinc-800/60 border border-white/5'}`}>
          <Clock size={13} className={isUrgent ? 'text-red-400' : 'text-zinc-400'} />
          <span className={`text-[11px] font-medium ${isUrgent ? 'text-red-300' : 'text-zinc-400'}`}>
            {expired ? 'Deal expired' : 'Ends in'}
          </span>
          {!expired && (
            <div className="ml-auto flex items-center gap-1">
              {[Pad(h), Pad(m), Pad(s)].map((unit, i) => (
                <React.Fragment key={i}>
                  <span className={`font-mono font-black text-sm tabular-nums ${isUrgent ? 'text-red-300' : 'text-white'}`}>{unit}</span>
                  {i < 2 && <span className={`text-xs font-bold ${isUrgent ? 'text-red-400' : 'text-zinc-500'}`}>:</span>}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <Link to={deal.link} className="mt-auto">
          <Button
            disabled={expired}
            className={`w-full font-bold rounded-xl py-2 transition-all ${
              deal.type === 'flight'
                ? 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/30'
                : 'bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-900/30'
            } text-white`}
          >
            {expired ? 'Deal Expired' : 'Grab This Deal'}
          </Button>
        </Link>
      </div>
    </div>
  );
};

const DealsSection: React.FC = () => (
  <section className="bg-black py-16 border-t border-white/10">
    <div className="container mx-auto px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-red-400">Live Deals</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Today's Best Offers</h2>
          <p className="text-zinc-400 mt-1">Limited-time deals on flights & hotels. Book before the timer runs out!</p>
        </div>
        <div className="flex gap-3 self-start sm:self-auto">
          <Link to="/flights">
            <Button variant="outline" className="border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-sm">
              All Flights
            </Button>
          </Link>
          <Link to="/hotels">
            <Button variant="outline" className="border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-sm">
              All Hotels
            </Button>
          </Link>
        </div>
      </div>

      {/* Deal cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {DEALS.map(deal => <DealCard key={deal.id} deal={deal} />)}
      </div>

      {/* Disclaimer */}
      <p className="text-center text-zinc-600 text-xs mt-6">
        * Prices are indicative. Final price may vary. Points can be applied during checkout.
      </p>
    </div>
  </section>
);

export default DealsSection;
