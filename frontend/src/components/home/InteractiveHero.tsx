import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Star, Tag, Plane, BedDouble, Settings, LogIn, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { destinations as allDestinations } from '@/constants/destinations';

const AUTOPLAY_DELAY = 5000; // 5s per slide

const heroDestinations = allDestinations.slice(0, 10).map(d => ({
    id: d.id,
    title: d.name,
    location: d.location,
    description: d.description,
    bgImage: d.image,
    cardImage: d.image,
    rating: d.rating,
    price: d.price,
    category: d.category,
}));

const CATEGORY_COLORS: Record<string, string> = {
    Historical:  'bg-amber-500/20 text-amber-300 border-amber-500/30',
    Beach:       'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    Adventure:   'bg-orange-500/20 text-orange-300 border-orange-500/30',
    Mountain:    'bg-blue-500/20 text-blue-300 border-blue-500/30',
    Cultural:    'bg-purple-500/20 text-purple-300 border-purple-500/30',
    Spiritual:   'bg-rose-500/20 text-rose-300 border-rose-500/30',
    Nature:      'bg-green-500/20 text-green-300 border-green-500/30',
    Wildlife:    'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
};

const InteractiveHero = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress]       = useState(0);
    const [paused, setPaused]           = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const location    = useLocation();
    const { user }    = useAuth();

    const activeDestination = heroDestinations[activeIndex];
    const catColor = CATEGORY_COLORS[activeDestination.category] ?? 'bg-white/10 text-white/70 border-white/20';

    const navLinks = [
        { label: 'Home',     to: '/' },
        { label: 'About',    to: '/about' },
        { label: 'Featured', to: '/featured' },
        { label: 'Blog',     to: '/blog' },
        { label: 'FAQ',      to: '/faq' },
        { label: 'Gallery',  to: '/gallery' },
        { label: 'Contact',  to: '/contact' },
    ];

    const goTo = (idx: number) => {
        setActiveIndex(idx);
        setProgress(0);
    };
    const handleNext = () => goTo((activeIndex + 1) % heroDestinations.length);
    const handlePrev = () => goTo(activeIndex === 0 ? heroDestinations.length - 1 : activeIndex - 1);

    // Auto-play
    useEffect(() => {
        if (paused) { clearInterval(intervalRef.current!); clearInterval(progressRef.current!); return; }

        setProgress(0);
        progressRef.current = setInterval(() => {
            setProgress(p => Math.min(p + 100 / (AUTOPLAY_DELAY / 100), 100));
        }, 100);

        intervalRef.current = setInterval(handleNext, AUTOPLAY_DELAY);

        return () => {
            clearInterval(intervalRef.current!);
            clearInterval(progressRef.current!);
        };
    }, [activeIndex, paused]);

    // Scroll active card into view
    useEffect(() => {
        const el = document.getElementById(`hero-card-${activeIndex}`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }, [activeIndex]);

    return (
        <div
            className="relative h-screen w-full overflow-hidden bg-black font-sans"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* ── Hero Transparent Navbar ── */}
            <header className="absolute top-0 left-0 right-0 z-50 px-6 md:px-12 h-16 flex items-center justify-between text-white">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                    <img src="/logo.png" alt="Wanderlust Adventures" className="h-7 w-auto object-contain" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    <span className="hidden sm:block text-lg font-extrabold tracking-wide">Wanderlust Adventures</span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden lg:flex items-center gap-5 text-sm font-medium">
                    {navLinks.map(({ label, to }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`transition-colors ${
                                location.pathname === to
                                    ? 'text-white border-b-2 border-white pb-0.5'
                                    : 'text-white/70 hover:text-white'
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                    <Link to="/flights" className="flex items-center gap-1.5 text-blue-300 hover:text-blue-200 font-bold transition-colors">
                        <Plane size={13} /> Flights
                    </Link>
                    <Link to="/hotels" className="flex items-center gap-1.5 text-purple-300 hover:text-purple-200 font-bold transition-colors">
                        <BedDouble size={13} /> Hotels
                    </Link>
                </nav>

                {/* Right side user actions */}
                <div className="hidden md:flex items-center gap-3">
                    {user ? (
                        <>
                            <Link to="/my-bookings" className="text-sm text-white/70 hover:text-white transition-colors">My Bookings</Link>
                            <Link to="/dashboard" className="text-sm text-white/80 hover:text-white transition-colors font-medium">
                                Hello, {user.name?.split(' ')[0]}!
                            </Link>
                            <Link to="/settings" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all" title="Account Settings">
                                <Settings size={15} />
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors">
                                <LogIn size={14} /> Login
                            </Link>
                            <Link to="/register" className="text-sm bg-white text-black font-bold px-4 py-1.5 rounded-full hover:bg-white/90 transition-all">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMobileMenuOpen(v => !v)}
                    className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
                >
                    {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </header>

            {/* Mobile menu drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-[67px] left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex flex-col gap-3 text-white"
                    >
                        {navLinks.map(({ label, to }) => (
                            <Link key={to} to={to} onClick={() => setMobileMenuOpen(false)}
                                className="text-sm font-medium text-white/80 hover:text-white transition-colors py-1">{label}</Link>
                        ))}
                        <Link to="/flights" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-blue-300 py-1 flex items-center gap-1.5"><Plane size={13} /> Flights</Link>
                        <Link to="/hotels" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-purple-300 py-1 flex items-center gap-1.5"><BedDouble size={13} /> Hotels</Link>
                        <div className="border-t border-white/10 pt-3 flex gap-3">
                            {user ? (
                                <>
                                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-sm text-white/80">Dashboard</Link>
                                    <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="text-sm text-white/80">Settings</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-sm text-white/80">Login</Link>
                                    <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-white bg-white/10 px-3 py-1 rounded-full">Sign Up</Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Background cinematic image ── */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeDestination.id}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${activeDestination.bgImage})` }}
                />
            </AnimatePresence>
            {/* Multi-layer overlay for cinematic feel */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

            {/* ── Main content ── */}
            <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-8 md:px-16 flex flex-col justify-center">
                <div className="flex flex-col lg:flex-row items-center justify-between w-full mt-10 gap-8">

                    {/* ── LEFT: Destination Info ── */}
                    <div className="w-full lg:w-[48%] text-white relative z-10 pointer-events-none">

                        {/* Category badge */}
                        <motion.div
                            key={`cat-${activeDestination.id}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.45, delay: 0.05 }}
                            className="mb-3"
                        >
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${catColor}`}>
                                <Tag size={10} />
                                {activeDestination.category}
                            </span>
                        </motion.div>

                        {/* Location */}
                        <div className="overflow-hidden mb-2">
                            <motion.p
                                key={`loc-${activeDestination.id}`}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.15 }}
                                className="text-sm md:text-md uppercase tracking-[0.3em] font-semibold text-white/60 flex items-center gap-2"
                            >
                                <MapPin size={13} className="text-white/40" />
                                {activeDestination.location}
                            </motion.p>
                        </div>

                        {/* Title */}
                        <div className="overflow-hidden mb-5 py-1">
                            <motion.h1
                                key={`title-${activeDestination.id}`}
                                initial={{ y: 80, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.75, ease: 'easeOut', delay: 0.1 }}
                                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none"
                            >
                                {activeDestination.title}
                            </motion.h1>
                        </div>

                        {/* Rating + Price row */}
                        <motion.div
                            key={`meta-${activeDestination.id}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="flex items-center gap-5 mb-5"
                        >
                            {/* Stars */}
                            <div className="flex items-center gap-1.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        className={i < Math.floor(activeDestination.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-white/20 fill-white/20'}
                                    />
                                ))}
                                <span className="text-white/70 text-sm ml-1 font-semibold">{activeDestination.rating}</span>
                            </div>
                            {/* Price */}
                            <div className="flex items-center gap-1.5 bg-white/10 border border-white/15 px-3 py-1 rounded-full">
                                <span className="text-xs text-white/60 font-medium">From</span>
                                <span className="text-white font-bold text-sm">{activeDestination.price}</span>
                                <span className="text-xs text-white/50">/person</span>
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            key={`desc-${activeDestination.id}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="max-w-md text-white/70 text-base leading-relaxed mb-10 line-clamp-2"
                        >
                            {activeDestination.description}
                        </motion.p>

                        {/* CTA buttons */}
                        <motion.div
                            key={`btn-${activeDestination.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="pointer-events-auto flex flex-wrap items-center gap-2"
                        >
                            <Link to={`/destination/${activeDestination.id}`}>
                                <button className="bg-white text-black px-5 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-white/90 transition-all group shadow-lg shadow-black/40 text-sm">
                                    Explore
                                    <span className="bg-black text-white p-1 rounded-full group-hover:translate-x-1 transition-transform">
                                        <ChevronRight size={14} />
                                    </span>
                                </button>
                            </Link>
                            <Link to="/flights">
                                <button className="flex items-center gap-1.5 px-4 py-3 rounded-full font-semibold text-xs sm:text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all backdrop-blur-sm">
                                    <Plane size={13} /> Flights
                                </button>
                            </Link>
                            <Link to="/hotels">
                                <button className="flex items-center gap-1.5 px-4 py-3 rounded-full font-semibold text-xs sm:text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all backdrop-blur-sm">
                                    <BedDouble size={13} /> Hotels
                                </button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* ── RIGHT: Interactive Carousel ── */}
                    <div
                        ref={carouselRef}
                        className="w-full lg:w-[52%] mt-12 lg:mt-0 pb-8 lg:pb-0 overflow-x-auto snap-x snap-mandatory scroll-smooth relative z-30 ml-auto pointer-events-auto"
                        style={{ scrollbarWidth: 'none' }}
                    >
                        <div className="flex gap-4 items-center w-max px-6 lg:px-4 py-6">
                            {heroDestinations.map((dest, index) => {
                                const isActive = index === activeIndex;
                                return (
                                    <motion.div
                                        id={`hero-card-${index}`}
                                        key={dest.id}
                                        onClick={() => goTo(index)}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 + index * 0.04 }}
                                        className={`relative cursor-pointer transition-all duration-500 ease-out flex-shrink-0 snap-center rounded-3xl overflow-hidden ${
                                            isActive
                                                ? 'w-[160px] sm:w-[210px] h-[260px] sm:h-[320px] scale-100 opacity-100 z-20 ring-2 ring-white/40 shadow-[0_0_40px_rgba(255,255,255,0.15)]'
                                                : 'w-[110px] sm:w-[145px] h-[200px] sm:h-[240px] scale-95 opacity-55 hover:opacity-80 z-10 hover:-translate-y-2'
                                        }`}
                                    >
                                        <img
                                            src={dest.cardImage}
                                            alt={dest.title}
                                            className="absolute inset-0 w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src =
                                                    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&fit=crop&q=80';
                                            }}
                                        />
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

                                        {/* Category chip on active */}
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="absolute top-3 left-3"
                                            >
                                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border ${
                                                    CATEGORY_COLORS[dest.category] ?? 'bg-white/10 text-white/70 border-white/20'
                                                }`}>
                                                    {dest.category}
                                                </span>
                                            </motion.div>
                                        )}

                                        {/* Card info */}
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-white font-bold mb-1 tracking-wide uppercase leading-tight text-sm">
                                                {dest.title}
                                            </h3>
                                            {/* Stars */}
                                            <div className="flex gap-0.5 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className={`w-2.5 h-2.5 ${i < Math.floor(dest.rating) ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            {/* Price on active card */}
                                            {isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    className="mt-1"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-white/60 text-[11px]">From</span>
                                                        <span className="text-white font-black text-sm">{dest.price}</span>
                                                    </div>
                                                    <div className="h-[1.5px] w-full bg-white/20 mt-2" />
                                                    <Link to={`/destination/${dest.id}`} className="pointer-events-auto">
                                                        <div className="text-[10px] text-white/70 font-bold uppercase tracking-widest mt-2 hover:text-white transition-colors">
                                                            View Details →
                                                        </div>
                                                    </Link>
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Bottom Controls ── */}
            <div className="absolute bottom-0 left-0 right-0 z-40 px-8 md:px-16 py-7 flex justify-between items-center text-white pointer-events-none">

                {/* Dot indicators */}
                <div className="pointer-events-auto flex items-center gap-2">
                    {heroDestinations.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`rounded-full transition-all duration-300 ${
                                i === activeIndex
                                    ? 'w-6 h-2 bg-white'
                                    : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                            }`}
                        />
                    ))}
                </div>

                {/* Arrows + counter */}
                <div className="flex items-center gap-4 pointer-events-auto">
                    <div className="hidden sm:flex items-center gap-3 text-sm font-semibold tracking-widest mr-2">
                        <span className="text-white">{String(activeIndex + 1).padStart(2, '0')}</span>
                        <div className="w-12 h-[2px] bg-white/20 relative overflow-hidden rounded-full">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-white rounded-full"
                                animate={{ width: `${((activeIndex + 1) / heroDestinations.length) * 100}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        <span className="text-white/40">{String(heroDestinations.length).padStart(2, '0')}</span>
                    </div>

                    <button
                        onClick={handlePrev}
                        className="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center hover:bg-white/15 hover:border-white/60 transition-all backdrop-blur-sm bg-black/20"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={handleNext}
                        className="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center hover:bg-white/15 hover:border-white/60 transition-all backdrop-blur-sm bg-black/20"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InteractiveHero;
