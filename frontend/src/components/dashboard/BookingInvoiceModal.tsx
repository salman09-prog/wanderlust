import React from 'react';
import { X, Calendar, User, CreditCard, Plane, MapPin, CheckCircle2 } from 'lucide-react';

interface Booking {
  _id: string;
  tourId?: { name: string; location?: string };
  flightId?: string;
  hotelId?: string;
  hotelName?: string;
  startDate: string;
  endDate: string;
  guests: number;
  amount: number;
  status: string;
  createdAt: string;
}

interface Props {
  booking: Booking | null;
  onClose: () => void;
}

export default function BookingInvoiceModal({ booking, onClose }: Props) {
  if (!booking) return null;

  const isFlight = !!booking.flightId;
  const isHotel = !!booking.hotelId;
  const title = isFlight ? `Flight Booking (${booking.flightId})` : 
                isHotel ? `${booking.hotelName}` : 
                booking.tourId?.name || "Tour Booking";
  const pointsEarned = Math.floor(booking.amount * 0.05);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-white/10 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 relative">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-zinc-800/30 flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2 text-green-400 mb-1">
              <CheckCircle2 size={16} />
              <span className="text-xs font-bold uppercase tracking-wide">Confirmed & Paid</span>
            </div>
            <h2 className="text-xl font-bold text-white">{title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Details Content */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/30 p-3 rounded-xl border border-white/5">
              <div className="text-zinc-500 text-xs mb-1 flex items-center"><Calendar size={12} className="mr-1" /> {isHotel ? "Check-in" : "Journey Date"}</div>
              <div className="text-white font-medium text-sm">{new Date(booking.startDate).toLocaleDateString()}</div>
            </div>
            <div className="bg-black/30 p-3 rounded-xl border border-white/5">
              <div className="text-zinc-500 text-xs mb-1 flex items-center"><User size={12} className="mr-1" /> Guests</div>
              <div className="text-white font-medium text-sm">{booking.guests} {isHotel ? "Guests" : "Passengers"}</div>
            </div>
          </div>

          <div className="border border-white/10 rounded-xl overflow-hidden">
            <div className="bg-zinc-800/50 p-3">
              <h3 className="text-sm font-semibold text-zinc-300">Transaction Summary</h3>
            </div>
            <div className="p-3 space-y-2 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Booking ID</span>
                <span className="font-mono text-xs">{booking._id.slice(-8).toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Total Amount Paid</span>
                <span className="text-white">₹{booking.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-400 pt-2 border-t border-white/5">
                <span>Wanderlust Points Earned</span>
                <span className="text-yellow-500 font-bold">+{pointsEarned} pts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/40 text-center">
          <p className="text-xs text-zinc-500">Need help with this booking? <a href="#" className="text-blue-400 hover:underline">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
}
