import React, { useState } from 'react';
import { Calendar, Search, ExternalLink, BedDouble, Award, Star, ArrowUpDown, SortAsc, SortDesc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from "@/components/ui/switch";
import API from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface HotelSearchWidgetProps {
    destinationCity: string;
}

interface Hotel {
    id: string;
    name: string;
    rating: number;
    amenities: { name: string; icon: string }[];
    pricePerNight: number;
    image: string;
}

const HotelSearchWidget: React.FC<HotelSearchWidgetProps> = ({ destinationCity }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [rooms, setRooms] = useState(1);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [applyPoints, setApplyPoints] = useState(false);
    const [sortKey, setSortKey] = useState<'price' | 'rating'>('price');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
    const [minRating, setMinRating] = useState(0);

    const handleSearch = async () => {
        if (!checkIn || !checkOut) return;
        setIsSearching(true);
        setHasSearched(false);
        setHotels([]);

        try {
            const response = await fetch(`https://wanderlust-lprk.onrender.com/api/hotels/search?destination=${encodeURIComponent(destinationCity)}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
            if (response.ok) {
                const data = await response.json();
                setHotels(data);
            } else {
                alert('Failed to fetch hotels. Please ensure the backend is running.');
            }
        } catch (error) {
            console.error(error);
            alert('Error searching hotels.');
        } finally {
            setIsSearching(false);
            setHasSearched(true);
        }
    };

    const calculateNights = () => {
        if (!checkIn || !checkOut) return 1;
        const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
        return Math.max(1, Math.ceil(diff / (1000 * 3600 * 24)));
    };

    const nights = calculateNights();

    const toggleSort = (key: 'price' | 'rating') => {
        if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortKey(key); setSortDir('asc'); }
    };

    const filteredHotels = [...hotels]
        .filter(h => h.rating >= minRating)
        .sort((a, b) => {
            const diff = sortKey === 'price'
                ? a.pricePerNight - b.pricePerNight
                : a.rating - b.rating;
            return sortDir === 'asc' ? diff : -diff;
        });

    return (
        <div className="bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl p-6 mb-6">
            <div className="flex items-center mb-6">
                <BedDouble className="text-white mr-3" size={24} />
                <h3 className="text-xl font-bold text-white">Find Stay in {destinationCity}</h3>
            </div>

            <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-semibold text-zinc-300">Check-in</label>
                        <div className="relative">
                            <input
                                id="hotel-checkin"
                                type="date"
                                className="w-full pl-4 pr-10 py-3 border border-white/20 bg-black/50 text-white rounded-xl outline-none focus:border-white focus:ring-1 focus:ring-white transition appearance-none text-sm"
                                value={checkIn}
                                onChange={e => setCheckIn(e.target.value)}
                            />
                            <Calendar
                                onClick={() => (document.getElementById('hotel-checkin') as HTMLInputElement)?.showPicker()}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white cursor-pointer transition-colors"
                                size={18}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-semibold text-zinc-300">Check-out</label>
                        <div className="relative">
                            <input
                                id="hotel-checkout"
                                type="date"
                                className="w-full pl-4 pr-10 py-3 border border-white/20 bg-black/50 text-white rounded-xl outline-none focus:border-white focus:ring-1 focus:ring-white transition appearance-none text-sm"
                                value={checkOut}
                                onChange={e => setCheckOut(e.target.value)}
                            />
                            <Calendar
                                onClick={() => (document.getElementById('hotel-checkout') as HTMLInputElement)?.showPicker()}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white cursor-pointer transition-colors"
                                size={18}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-semibold text-zinc-300">Guests</label>
                        <div className="relative border border-white/20 bg-black/50 rounded-xl flex items-center justify-between px-3 py-1">
                            <Button variant="ghost" className="h-8 w-8 p-0 text-white" onClick={() => setGuests(Math.max(1, guests - 1))}>-</Button>
                            <span className="text-white font-medium">{guests}</span>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-white" onClick={() => setGuests(guests + 1)}>+</Button>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-semibold text-zinc-300">Rooms</label>
                        <div className="relative border border-white/20 bg-black/50 rounded-xl flex items-center justify-between px-3 py-1">
                            <Button variant="ghost" className="h-8 w-8 p-0 text-white" onClick={() => setRooms(Math.max(1, rooms - 1))}>-</Button>
                            <span className="text-white font-medium">{rooms}</span>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-white" onClick={() => setRooms(rooms + 1)}>+</Button>
                        </div>
                    </div>
                </div>
            </div>

            <Button
                onClick={handleSearch}
                disabled={!checkIn || !checkOut || isSearching}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-all duration-300 flex items-center justify-center font-semibold mb-6"
            >
                {isSearching ? 'Searching Hotels...' : (
                    <>
                        <Search size={18} className="mr-2" />
                        Search Hotels
                    </>
                )}
            </Button>

            {hasSearched && (
                <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        Available Properties
                        <span className="ml-2 bg-blue-600/20 text-blue-400 text-xs px-2 py-0.5 rounded-full">
                            {filteredHotels.length}
                        </span>
                    </h4>

                    {/* Sort + Filter controls */}
                    {hotels.length > 0 && (
                        <div className="space-y-3 mb-4">
                            {/* Sort row */}
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs text-zinc-500 font-medium">Sort:</span>
                                {(['price', 'rating'] as const).map(k => (
                                    <button
                                        key={k}
                                        onClick={() => toggleSort(k)}
                                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${sortKey === k ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                                            }`}
                                    >
                                        {k === 'price' ? 'Price' : 'Rating'}
                                        {sortKey === k
                                            ? sortDir === 'asc' ? <SortAsc size={12} /> : <SortDesc size={12} />
                                            : <ArrowUpDown size={12} />}
                                    </button>
                                ))}
                            </div>
                            {/* Star rating filter */}
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs text-zinc-500 font-medium">Stars:</span>
                                {[0, 3, 4, 5].map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setMinRating(s)}
                                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${minRating === s ? 'bg-yellow-500/30 text-yellow-400 border border-yellow-500/40' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                                            }`}
                                    >
                                        {s === 0 ? 'All' : `${s}★+`}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {hotels.length > 0 && user && user.wanderlustPoints > 0 && (
                        <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="bg-blue-500/20 p-2 rounded-full text-blue-400">
                                    <Award size={20} />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-white font-medium text-sm">Use Wanderlust Points</h3>
                                    <p className="text-xs text-blue-300">Balance: {user.wanderlustPoints.toLocaleString()} pts</p>
                                </div>
                            </div>
                            <Switch
                                checked={applyPoints}
                                onCheckedChange={setApplyPoints}
                            />
                        </div>
                    )}

                    {hotels.length === 0 ? (
                        <p className="text-zinc-400 text-center py-4">No hotels found for these dates.</p>
                    ) : filteredHotels.length === 0 ? (
                        <p className="text-zinc-400 text-center py-4">No hotels match your filters. Try a lower star rating.</p>
                    ) : (
                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {filteredHotels.map((hotel, idx) => {
                                const hotelTotalPrice = hotel.pricePerNight * nights * rooms;
                                let discount = 0;
                                if (applyPoints && user?.wanderlustPoints) {
                                    const maxDiscount = Math.floor(hotelTotalPrice * 0.5);
                                    discount = Math.min(user.wanderlustPoints, maxDiscount);
                                }
                                const finalTotal = hotelTotalPrice - discount;
                                const isBestValue = idx === 0 && sortKey === 'rating' && sortDir === 'desc';

                                return (
                                    <div key={hotel.id} className="bg-zinc-800/60 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors group overflow-hidden flex flex-col sm:flex-row">
                                        <div className="w-full sm:w-1/3 h-40 sm:h-auto flex-shrink-0 bg-zinc-800">
                                            <img
                                                src={hotel.image}
                                                alt={hotel.name}
                                                className="w-full h-full object-cover"
                                                crossOrigin="anonymous"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&fit=crop&q=80`;
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 p-4 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-1">
                                                    <div>
                                                        {isBestValue && (
                                                            <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-400 mb-1 block">⭐ Top Rated</span>
                                                        )}
                                                        <h5 className="font-bold text-lg text-white leading-tight">{hotel.name}</h5>
                                                    </div>
                                                    <div className="flex items-center bg-zinc-900/80 px-1.5 py-0.5 rounded border border-white/5">
                                                        <Star size={12} className="text-yellow-400 fill-yellow-400 mr-1" />
                                                        <span className="text-xs font-bold text-white">{hotel.rating}.0</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {hotel.amenities.map(am => (
                                                        <span key={am.name} className="text-[10px] text-zinc-400 bg-black/40 px-2 py-0.5 rounded-md border border-white/5">
                                                            {am.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-end">
                                                <div className="flex flex-col">
                                                    {applyPoints && discount > 0 ? (
                                                        <>
                                                            <span className="text-xs text-zinc-500 line-through">₹{hotelTotalPrice.toLocaleString('en-IN')} total</span>
                                                            <span className="text-xl font-bold text-green-400">₹{finalTotal.toLocaleString('en-IN')} <span className="text-[10px] font-normal text-zinc-400">for {nights} nights</span></span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="text-[10px] text-zinc-500">₹{hotel.pricePerNight.toLocaleString('en-IN')} / night</span>
                                                            <span className="text-xl font-bold text-white">₹{hotelTotalPrice.toLocaleString('en-IN')} <span className="text-[10px] font-normal text-zinc-400">total</span></span>
                                                        </>
                                                    )}
                                                </div>
                                                <Button
                                                    className="bg-white text-black hover:bg-blue-600 hover:text-white h-9 px-5 text-sm rounded-lg transition-colors font-semibold shadow-lg"
                                                    onClick={async () => {
                                                        if (!user) {
                                                            navigate('/login');
                                                            return;
                                                        }
                                                        try {
                                                            const res = await API.post("/create-checkout-session", {
                                                                tourId: hotel.id,
                                                                itemName: hotel.name,
                                                                itemImage: hotel.image,
                                                                guests: guests,
                                                                userId: user._id,
                                                                startDate: checkIn,
                                                                endDate: checkOut,
                                                                amount: hotelTotalPrice,
                                                                applyPoints: applyPoints
                                                            });
                                                            window.location.href = res.data.url;
                                                        } catch (err) {
                                                            console.error("Hotel checkout error:", err);
                                                            toast({ title: "Checkout failed", description: "Could not initiate hotel checkout.", variant: "destructive" });
                                                        }
                                                    }}
                                                >
                                                    Select <ExternalLink size={14} className="ml-1.5 opacity-70" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HotelSearchWidget;
