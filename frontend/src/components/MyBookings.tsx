import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "./layout/Layout";
import API from "@/services/api";
import { Calendar, Users, MapPin, Loader2, IndianRupee } from "lucide-react";
import { Button } from "./ui/button";

type Booking = {
  _id: string;
  sessionId: string;
  tourId: {
    _id: string;
    name: string;
    image: string;
    location: string;
  };
  guests: number;
  startDate: string;
  endDate: string;
  amount: number;
  status: string;
  createdAt: string;
};

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
API.get(`/bookings/${user._id}`)
      .then((res) => {
        setBookings(res.data);
        console.log(res.data)
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });


  }, [user]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-black border-t border-white/10">
          <Loader2 className="animate-spin text-white" size={48} />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-black border-t border-white/10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Please login to view your bookings</h2>
          <Link to="/login">
            <Button className="bg-white text-black px-8 py-4 rounded-full text-lg hover:bg-white/90 transition-colors font-semibold">Login Now</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-black py-16 border-t border-white/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-12">
            <h1 className="text-4xl font-extrabold text-white mb-3">My Journeys</h1>
            <p className="text-lg text-zinc-400">Track and manage your upcoming and past adventures.</p>
          </div>

          {bookings.length === 0 ? (
            <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-16 text-center shadow-lg border border-white/10 flex flex-col items-center justify-center w-full min-h-[50vh]">
              <div className="w-24 h-24 bg-white/10 text-white rounded-full flex items-center justify-center mb-6">
                <MapPin size={40} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">No trips booked yet</h2>
              <p className="text-zinc-400 mb-8 max-w-md mx-auto leading-relaxed">You haven't booked any adventures with us yet. Discover incredible destinations and start your journey today!</p>
              <Link to="/featured">
                <Button className="bg-white text-black px-8 py-6 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  Explore Destinations
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {bookings.map((b) => (
                <div key={b._id} className="bg-zinc-900/40 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl transition-all duration-300 border border-white/10 flex flex-col sm:flex-row group hover:-translate-y-1">
                  <div className="relative w-full sm:w-2/5 h-56 sm:h-auto overflow-hidden">
                    {b.tourId && (
                      <img
                        src={b.tourId.image}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        alt={b.tourId.name}
                      />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm backdrop-blur-md ${b.status === 'paid' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                        {b.status?.toUpperCase() || 'PENDING'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between w-full sm:w-3/5">
                    <div>
                      {b.tourId && (
                        <Link to={`/destination/${b.tourId._id}`}>
                          <h2 className="text-xl font-bold text-white mb-2 group-hover:text-zinc-300 transition-colors line-clamp-1">{b.tourId.name}</h2>
                        </Link>
                      )}

                      <div className="space-y-3 mb-6 mt-4">
                        <div className="flex items-center text-sm text-zinc-300 bg-black/40 border border-white/5 p-3 rounded-lg">
                          <Calendar size={16} className="mr-3 text-zinc-400" />
                          <span className="font-medium">
                            {b.startDate ? new Date(b.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Flexible'}
                            {' - '}
                            {b.endDate ? new Date(b.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Flexible'}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-zinc-300 bg-black/40 border border-white/5 p-3 rounded-lg">
                          <Users size={16} className="mr-3 text-zinc-400" />
                          <span className="font-medium">{b.guests} {b.guests === 1 ? 'Guest' : 'Guests'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-xs text-zinc-500 font-semibold mb-1 uppercase tracking-wider">Total</span>
                        <div className="flex items-center font-black text-xl text-white">
                          <IndianRupee size={20} className="mr-1" />{b.amount}
                        </div>
                      </div>
                      <div className="text-xs text-zinc-500 font-medium bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
                        Booked {new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}