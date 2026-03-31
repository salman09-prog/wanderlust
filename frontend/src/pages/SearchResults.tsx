import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { destinations } from '@/constants/destinations';
import { StarIcon, MapPin } from 'lucide-react';

export interface TourResult {
    _id: string; // The UI uses _id but destinations file uses id, mapping this below
    name: string;
    location: string;
    image: string;
    price: string | number;
    rating: number;
}

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const location = searchParams.get('location') || '';
    const [results, setResults] = useState<TourResult[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            const query = location.toLowerCase();
            const filtered = destinations.filter(d =>
                d.location.toLowerCase().includes(query) ||
                d.name.toLowerCase().includes(query) ||
                d.category.toLowerCase().includes(query)
            );

            // Map the `id` field from constants to `_id` expected by the SearchResults UI
            const formatted = filtered.map(d => ({
                ...d,
                _id: d.id,
                price: typeof d.price === 'string' ? d.price.replace('₹', '').replace(',', '') : d.price
            }));

            setResults(formatted as unknown as TourResult[]);
            setLoading(false);
        }, 300);
    }, [location]);

    return (
        <Layout>
            <div className="container mx-auto px-4 py-12 min-h-screen">
                <h1 className="text-3xl font-bold mb-8 text-white">
                    {location ? `Search Results for "${location}"` : "All Destinations"}
                </h1>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                        {[1, 2, 3].map(i => <div key={i} className="h-72 bg-zinc-800/50 rounded-2xl" />)}
                    </div>
                ) : results.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {results.map(tour => (
                            <Link to={`/destination/${tour._id}`} key={tour._id} className="group">
                                <div className="bg-zinc-900/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 transition-all duration-300 border border-white/10 flex flex-col h-full">
                                    <div className="relative h-64 overflow-hidden">
                                        <img src={tour.image} alt={tour.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 flex items-center rounded-full text-sm font-bold shadow-sm border border-white/20 text-white">
                                            <StarIcon size={14} className="text-yellow-400 mr-1" fill="currentColor" /> {tour.rating}
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-zinc-300 transition-colors mb-2">{tour.name}</h3>
                                        <div className="flex items-center text-zinc-400 text-sm mb-6">
                                            <MapPin size={16} className="mr-2 text-white" /> {tour.location}
                                        </div>
                                        <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center">
                                            <div className="text-zinc-500 text-sm font-medium">Starting from</div>
                                            <div className="text-2xl font-bold text-white">₹{tour.price}</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">No destinations found</h2>
                        <p className="text-zinc-400 text-lg mb-8">We couldn't find any tours matching your search criteria. Try a different location!</p>
                        <Link to="/featured" className="bg-white hover:bg-white/90 text-black font-bold py-3 px-8 rounded-full transition-colors">
                            Explore Featured Destinations
                        </Link>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default SearchResults;
