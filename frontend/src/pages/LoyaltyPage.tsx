import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Zap, Shield, Crown, Star, Award, ChevronRight,
  Plane, BedDouble, MessageSquare, Users, Gift,
  Check, Lock, ArrowRight
} from 'lucide-react';

/* ── Tier config ── */
interface Tier {
  name: 'Explorer' | 'Adventurer' | 'Voyager';
  minPts: number;
  maxPts: number | null;
  icon: React.ReactNode;
  color: string;
  bg: string;
  border: string;
  ring: string;
  multiplier: string;
  perks: string[];
  lockedPerks?: string[];
}

const TIERS: Tier[] = [
  {
    name: 'Explorer',
    minPts: 0,
    maxPts: 1999,
    icon: <Zap size={28} />,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    ring: 'ring-emerald-500/40',
    multiplier: '1×',
    perks: [
      '500 welcome bonus points',
      'Earn 1 pt per ₹100 booked',
      'Access to Flash Deals',
      'Apply points at checkout',
      'Email support',
    ],
    lockedPerks: ['Priority support', 'Hotel upgrade requests', 'VIP concierge'],
  },
  {
    name: 'Adventurer',
    minPts: 2000,
    maxPts: 4999,
    icon: <Shield size={28} />,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    ring: 'ring-blue-500/40',
    multiplier: '1.5×',
    perks: [
      'Everything in Explorer',
      'Earn 1.5 pts per ₹100 booked',
      'Early access to new deals',
      'Priority email & chat support',
      'Hotel upgrade requests',
      'Free cancellation benefits',
    ],
    lockedPerks: ['VIP concierge', 'Lounge access', 'Free travel insurance'],
  },
  {
    name: 'Voyager',
    minPts: 5000,
    maxPts: null,
    icon: <Crown size={28} />,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    ring: 'ring-amber-500/40',
    multiplier: '2×',
    perks: [
      'Everything in Adventurer',
      'Earn 2 pts per ₹100 booked',
      'VIP concierge support 24/7',
      'Airport lounge access',
      'Exclusive Voyager-only deals',
      'Free travel insurance',
      'Complimentary room upgrades',
    ],
  },
];

const EARN_WAYS = [
  { icon: <Plane size={22} />, label: 'Book a Flight', pts: '+150 pts', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  { icon: <BedDouble size={22} />, label: 'Book a Hotel', pts: '+100 pts', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  { icon: <MessageSquare size={22} />, label: 'Leave a Review', pts: '+25 pts', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
  { icon: <Users size={22} />, label: 'Refer a Friend', pts: '+200 pts', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  { icon: <Gift size={22} />, label: 'Complete a Trip', pts: '+50 pts', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
  { icon: <Star size={22} />, label: 'Daily Login Streak', pts: '+10 pts', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
];

const LoyaltyPage: React.FC = () => {
  const { user } = useAuth();
  const points    = user?.wanderlustPoints ?? 0;
  const tierName  = (user?.loyaltyTier ?? 'Explorer') as 'Explorer' | 'Adventurer' | 'Voyager';
  const tierIndex = TIERS.findIndex(t => t.name === tierName);
  const currentTier = TIERS[tierIndex];
  const nextTier    = TIERS[tierIndex + 1] ?? null;

  // Progress to next tier
  const progressPct = nextTier
    ? Math.min(100, Math.round(((points - currentTier.minPts) / (nextTier.minPts - currentTier.minPts)) * 100))
    : 100;
  const ptsToNext = nextTier ? Math.max(0, nextTier.minPts - points) : 0;

  return (
    <Layout>
      <div className="bg-black min-h-screen">

        {/* ── HERO BANNER ── */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-15"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1436491865332-7a615061c443?w=1600&fit=crop&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />

          <div className="relative container mx-auto px-4 pt-20 pb-14 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Award size={14} /> Wanderlust Loyalty
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
              Your Loyalty,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Our Rewards
              </span>
            </h1>
            <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto mb-10">
              Earn points on every booking and unlock exclusive perks across all three tiers.
            </p>

            {/* ── User points card ── */}
            {user ? (
              <div className={`max-w-sm mx-auto ${currentTier.bg} border ${currentTier.border} rounded-2xl p-6 text-left backdrop-blur-sm`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex items-center gap-2 ${currentTier.color}`}>
                    {currentTier.icon}
                    <span className="text-lg font-extrabold">{tierName}</span>
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${currentTier.border} ${currentTier.color}`}>
                    {currentTier.multiplier} multiplier
                  </span>
                </div>
                <div className="mb-4">
                  <div className="text-3xl font-black text-white">{points.toLocaleString('en-IN')}</div>
                  <div className="text-zinc-400 text-sm">Wanderlust Points</div>
                </div>

                {nextTier ? (
                  <>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-zinc-400">{tierName}</span>
                      <span className={nextTier.color}>{nextTier.name}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          tierIndex === 0 ? 'bg-emerald-400' : 'bg-blue-400'
                        }`}
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                    <p className="text-zinc-500 text-xs">
                      <span className="text-white font-bold">{ptsToNext.toLocaleString('en-IN')} pts</span> more to reach {nextTier.name}
                    </p>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
                    <Crown size={16} /> You've reached the highest tier!
                  </div>
                )}
              </div>
            ) : (
              <div className="max-w-sm mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-zinc-400 mb-4">Login to see your points and tier status.</p>
                <Link to="/login">
                  <Button className="bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl w-full">
                    Login to View Points
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ── TIER CARDS ── */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-3">Membership Tiers</h2>
          <p className="text-zinc-400 text-center mb-10">The more you explore, the more you unlock.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TIERS.map((tier, i) => {
              const isCurrentTier = tier.name === tierName && !!user;
              const isUnlocked    = user && points >= tier.minPts;

              return (
                <div key={tier.name} className={`relative rounded-2xl border p-6 flex flex-col transition-all ${tier.border} ${tier.bg} ${
                  isCurrentTier ? `ring-2 ${tier.ring}` : ''
                }`}>
                  {isCurrentTier && (
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${tier.color} bg-black border ${tier.border}`}>
                      Your Tier
                    </div>
                  )}

                  {/* Tier header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${tier.bg} border ${tier.border} ${tier.color}`}>
                      {tier.icon}
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-bold ${tier.color} uppercase tracking-widest`}>{tier.multiplier} pts</div>
                      <div className="text-zinc-600 text-[11px]">per ₹100</div>
                    </div>
                  </div>

                  <h3 className={`text-xl font-extrabold mb-1 ${tier.color}`}>{tier.name}</h3>
                  <p className="text-zinc-500 text-xs mb-4">
                    {tier.maxPts ? `${tier.minPts.toLocaleString()} – ${tier.maxPts.toLocaleString()} pts` : `${tier.minPts.toLocaleString()}+ pts`}
                  </p>

                  {/* Perks list */}
                  <ul className="space-y-2.5 mb-4 flex-1">
                    {tier.perks.map(perk => (
                      <li key={perk} className="flex items-start gap-2.5 text-sm text-zinc-300">
                        <Check size={14} className={`${tier.color} flex-shrink-0 mt-0.5`} />
                        {perk}
                      </li>
                    ))}
                    {tier.lockedPerks?.map(perk => (
                      <li key={perk} className="flex items-start gap-2.5 text-sm text-zinc-600">
                        <Lock size={14} className="text-zinc-700 flex-shrink-0 mt-0.5" />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {!user ? (
                    <Link to="/register">
                      <Button className={`w-full font-bold rounded-xl text-sm ${
                        i === 0 ? 'bg-emerald-600 hover:bg-emerald-500' :
                        i === 1 ? 'bg-blue-600 hover:bg-blue-500' : 'bg-amber-600 hover:bg-amber-500'
                      } text-white`}>
                        Start as {tier.name} <ArrowRight size={14} className="ml-1" />
                      </Button>
                    </Link>
                  ) : isCurrentTier ? (
                    <div className={`text-center text-xs font-bold ${tier.color} py-2 border ${tier.border} rounded-xl`}>
                      ✓ Current Tier
                    </div>
                  ) : isUnlocked ? (
                    <div className="text-center text-xs font-bold text-zinc-400 py-2 border border-white/10 rounded-xl">
                      ✓ Unlocked
                    </div>
                  ) : (
                    <div className="text-center text-xs text-zinc-600 py-2 border border-white/10 rounded-xl">
                      🔒 {(tier.minPts - points).toLocaleString()} pts away
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── HOW TO EARN ── */}
        <div className="border-t border-white/5 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-3">How to Earn Points</h2>
            <p className="text-zinc-400 text-center mb-10">Every action counts towards your next tier.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {EARN_WAYS.map(({ icon, label, pts, color, bg }) => (
                <div key={label} className={`rounded-2xl border ${bg} p-4 flex flex-col items-center text-center gap-3`}>
                  <div className={`${color}`}>{icon}</div>
                  <div>
                    <div className="text-white text-xs font-bold leading-tight mb-1">{label}</div>
                    <div className={`text-xs font-black ${color}`}>{pts}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── REDEEM SECTION ── */}
        <div className="border-t border-white/5 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-gradient-to-br from-amber-900/20 to-black border border-amber-500/20 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-bold px-3 py-1 rounded-full mb-4">
                  <Gift size={12} /> Redeem Any Time
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Use Points at Checkout</h2>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                  Apply your Wanderlust Points when booking flights or hotels. <strong className="text-white">1 point = ₹1 off</strong>, up to 50% of your total booking value.
                </p>
              </div>
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <Link to="/flights" className="w-full md:w-auto">
                  <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl px-8">
                    <Plane size={16} className="mr-2" /> Book a Flight
                  </Button>
                </Link>
                <Link to="/hotels" className="w-full md:w-auto">
                  <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl px-8">
                    <BedDouble size={16} className="mr-2" /> Book a Hotel
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQ strip ── */}
        <div className="border-t border-white/5 py-12">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-zinc-500 text-sm">
              Points are awarded within 24 hours of booking confirmation. Tier upgrades happen automatically when your point balance crosses the threshold.
              Points never expire as long as you make at least one booking per year.
            </p>
            <Link to="/dashboard">
              <Button variant="outline" className="mt-6 border-white/10 text-white/70 hover:text-white hover:bg-white/5">
                View My Dashboard <ChevronRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default LoyaltyPage;
