import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MainSearch = () => {
    const [location, setLocation] = useState('');
    const [guests, setGuests] = useState(1);
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/search?location=${encodeURIComponent(location)}&guests=${guests}`);
    };

    return (
        <div className="bg-black/60 backdrop-blur-xl p-2 rounded-full shadow-2xl max-w-4xl mx-auto mt-12 flex flex-col md:flex-row items-center gap-2 border border-white/20">
            <div className="flex-1 flex items-center px-6 py-2 border-b md:border-b-0 md:border-r border-white/10">
                <MapPin className="text-white mr-4" size={24} />
                <div className="flex flex-col flex-1 text-left">
                    <label className="text-xs font-bold text-white uppercase tracking-wider">Where</label>
                    <input
                        type="text"
                        placeholder="Search destinations"
                        className="outline-none text-white text-lg bg-transparent w-full placeholder:text-zinc-500 font-medium"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex-1 flex items-center px-6 py-2 border-b md:border-b-0 border-white/10">
                <Users className="text-white mr-4" size={24} />
                <div className="flex flex-col flex-1 text-left">
                    <label className="text-xs font-bold text-white uppercase tracking-wider">Who</label>
                    <input
                        type="number"
                        min="1"
                        placeholder="Add guests"
                        className="outline-none text-white text-lg bg-transparent w-full placeholder:text-zinc-500 font-medium"
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                    />
                </div>
            </div>
            <div className="px-2 pb-2 md:pb-0">
                <Button onClick={handleSearch} className="h-16 w-16 md:w-auto md:px-8 rounded-full bg-white hover:bg-white/90 text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-transform hover:scale-105">
                    <Search size={24} className="md:mr-2" />
                    <span className="hidden md:block text-lg font-bold">Search</span>
                </Button>
            </div>
        </div>
    );
};

export default MainSearch;
