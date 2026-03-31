import React, { useState } from 'react';
import { Plane, Calendar, Search, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import API from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Award } from 'lucide-react';

interface FlightSearchWidgetProps {
    destinationCity: string;
}

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

const FlightSearchWidget: React.FC<FlightSearchWidgetProps> = ({ destinationCity }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [departure, setDeparture] = useState('');
    const [date, setDate] = useState('');
    const [passengers, setPassengers] = useState(1);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [flights, setFlights] = useState<Flight[]>([]);
    const [applyPoints, setApplyPoints] = useState(false);

    const handleSearch = async () => {
        if (!departure || !date) return;
        setIsSearching(true);
        setHasSearched(false);
        setFlights([]);

        try {
            const response = await fetch(`http://localhost:5000/api/flights/search?origin=${encodeURIComponent(departure)}&destination=${encodeURIComponent(destinationCity)}&date=${date}`);
            if (response.ok) {
                const data = await response.json();
                setFlights(data);
            } else {
                alert('Failed to fetch flights. Please ensure the backend is running.');
            }
        } catch (error) {
            console.error(error);
            alert('Error searching flights.');
        } finally {
            setIsSearching(false);
            setHasSearched(true);
        }
    };

    return (
        <div className="bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl p-6 mb-6">
            <div className="flex items-center mb-6">
                <Plane className="text-white mr-3" size={24} />
                <h3 className="text-xl font-bold text-white">Search Flights</h3>
            </div>

            <div className="space-y-4 mb-6">
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-semibold text-zinc-300">From</label>
                    <div className="relative">
                        <Plane className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                        <input
                            type="text"
                            placeholder="Origin City or Airport"
                            className="w-full pl-10 pr-3 py-3 border border-white/20 bg-black/50 text-white rounded-xl outline-none focus:border-white focus:ring-1 focus:ring-white transition"
                            value={departure}
                            onChange={e => setDeparture(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-semibold text-zinc-300">To</label>
                    <div className="relative">
                        <Plane className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 transform rotate-90" size={18} />
                        <input
                            type="text"
                            disabled
                            value={destinationCity}
                            className="w-full pl-10 pr-3 py-3 border border-white/10 bg-white/5 text-zinc-400 rounded-xl outline-none cursor-not-allowed"
                        />
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-semibold text-zinc-300">Departure Date</label>
                    <div className="relative">
                        <input
                            id="flight-date"
                            type="date"
                            className="w-full pl-4 pr-10 py-3 border border-white/20 bg-black/50 text-white rounded-xl outline-none focus:border-white focus:ring-1 focus:ring-white transition appearance-none"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                        <Calendar
                            onClick={() => (document.getElementById('flight-date') as HTMLInputElement)?.showPicker()}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white cursor-pointer transition-colors"
                            size={18}
                        />
                    </div>
                </div>
            </div>

            <Button
                onClick={handleSearch}
                disabled={!departure || !date || isSearching}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-all duration-300 flex items-center justify-center font-semibold mb-6"
            >
                {isSearching ? 'Searching Flights...' : (
                    <>
                        <Search size={18} className="mr-2" />
                        Search Flights
                    </>
                )}
            </Button>

            {hasSearched && (
                <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        Available Flights
                        <span className="ml-2 bg-blue-600/20 text-blue-400 text-xs px-2 py-0.5 rounded-full">
                            {flights.length}
                        </span>
                    </h4>

                    {flights.length > 0 && user && user.wanderlustPoints > 0 && (
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

                    {flights.length === 0 ? (
                        <p className="text-zinc-400 text-center py-4">No flights found for this route.</p>
                    ) : (
                        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {flights.map(flight => {
                                const flightTotalPrice = flight.price * passengers;
                                let discount = 0;
                                if (applyPoints && user?.wanderlustPoints) {
                                    const maxDiscount = Math.floor(flightTotalPrice * 0.5);
                                    discount = Math.min(user.wanderlustPoints, maxDiscount);
                                }
                                const finalTotal = flightTotalPrice - discount;

                                return (
                                    <div key={flight.id} className="bg-zinc-800/60 p-4 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors group">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="font-bold text-white flex items-center text-sm">
                                                {flight.airline}
                                            </span>
                                            <span className="text-zinc-500 text-xs font-mono">{flight.id}</span>
                                        </div>

                                        <div className="flex justify-between items-center text-zinc-300 mb-4">
                                            <div className="flex flex-col">
                                                <span className="text-lg font-bold text-white">
                                                    {new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                                <span className="text-[10px] text-zinc-400 uppercase tracking-wider max-w-[80px] truncate" title={flight.origin}>{flight.origin}</span>
                                            </div>

                                            <div className="flex flex-col items-center px-2 flex-1">
                                                <span className="text-[10px] text-zinc-500 font-medium">{flight.duration}</span>
                                                <div className="w-full h-px bg-zinc-700 my-1.5 relative flex items-center justify-center min-w-[40px]">
                                                    <Plane size={12} className="text-zinc-500 group-hover:text-blue-400 transition-colors" />
                                                </div>
                                                <span className="text-[10px] text-green-400">Direct</span>
                                            </div>

                                            <div className="flex flex-col text-right">
                                                <span className="text-lg font-bold text-white">
                                                    {new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                                <span className="text-[10px] text-zinc-400 uppercase tracking-wider max-w-[80px] truncate" title={flight.destination}>{flight.destination}</span>
                                            </div>
                                        </div>

                                        <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                                            <div className="flex flex-col">
                                                {applyPoints && discount > 0 ? (
                                                    <>
                                                        <span className="text-xs text-zinc-500 line-through">₹{flightTotalPrice.toLocaleString('en-IN')} total</span>
                                                        <span className="text-xl font-bold text-green-400">₹{finalTotal.toLocaleString('en-IN')} <span className="text-xs font-normal">total</span></span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="text-xs text-zinc-500">Total Price</span>
                                                        <span className="text-xl font-bold text-white">₹{flightTotalPrice.toLocaleString('en-IN')}</span>
                                                    </>
                                                )}
                                            </div>
                                            <Button
                                                className="bg-white text-black hover:bg-blue-600 hover:text-white h-9 px-5 text-sm rounded-lg transition-colors font-semibold"
                                                onClick={async () => {
                                                    if (!user) {
                                                        navigate('/login');
                                                        return;
                                                    }
                                                    try {
                                                        const res = await API.post("/create-checkout-session", {
                                                            tourId: "FLIGHT-" + flight.id,
                                                            guests: passengers,
                                                            userId: user._id,
                                                            startDate: flight.departureTime,
                                                            endDate: flight.arrivalTime,
                                                            amount: flightTotalPrice,
                                                            applyPoints: applyPoints
                                                        });
                                                        window.location.href = res.data.url;
                                                    } catch (err) {
                                                        console.error("Flight checkout error:", err);
                                                        toast({ title: "Checkout failed", description: "Could not initiate flight checkout.", variant: "destructive" });
                                                    }
                                                }}
                                            >
                                                Select <ExternalLink size={14} className="ml-1.5 opacity-70" />
                                            </Button>
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

export default FlightSearchWidget;
