import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plane, Building2 } from 'lucide-react';
import FlightSearchWidget from './FlightSearchWidget';
import HotelSearchWidget from './HotelSearchWidget';

interface Props {
  destinationCity: string;
}

export default function BookingTabs({ destinationCity }: Props) {
  return (
    <div className="w-full max-w-4xl mx-auto shadow-2xl relative z-10 transition-all duration-500 animate-in slide-in-from-bottom-8 fade-in">
      <Tabs defaultValue="flights" className="w-full">
        <TabsList className="bg-black/60 backdrop-blur-md p-1 border border-white/10 border-b-0 rounded-b-none rounded-t-2xl w-full flex overflow-x-auto custom-scrollbar no-scrollbar h-16 shadow-lg relative z-20">
          <TabsTrigger 
            value="flights" 
            className="flex-1 data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:shadow-lg text-zinc-400 rounded-xl flex items-center justify-center font-bold text-sm h-full uppercase tracking-wider transition-all"
          >
            <Plane size={18} className="mr-2" />
            Book Flights
          </TabsTrigger>
          <TabsTrigger 
            value="hotels" 
            className="flex-1 data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:shadow-lg text-zinc-400 rounded-xl flex items-center justify-center font-bold text-sm h-full uppercase tracking-wider transition-all"
          >
            <Building2 size={18} className="mr-2" />
            Book Hotels
          </TabsTrigger>
        </TabsList>

        <div className="relative z-10 -mt-2">
            <TabsContent value="flights" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <div className="pt-2">
                <FlightSearchWidget destinationCity={destinationCity} />
            </div>
            </TabsContent>

            <TabsContent value="hotels" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <div className="pt-2">
                <HotelSearchWidget destinationCity={destinationCity} />
            </div>
            </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
