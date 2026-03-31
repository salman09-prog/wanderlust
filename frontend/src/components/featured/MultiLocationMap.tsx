import React from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Destination } from '@/constants/destinations';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface MultiLocationMapProps {
  destinations: Destination[];
}

export default function MultiLocationMap({ destinations }: MultiLocationMapProps) {
  // Center map on India
  const centerPosition: [number, number] = [20.5937, 78.9629];

  // Filter out destinations without coordinates
  const validDestinations = destinations.filter(d => d.latitude && d.longitude);

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl z-10 relative h-[600px] w-full">
      <MapContainer
        center={centerPosition}
        zoom={5}
        style={{ height: "100%", w: "100%" }}
        className="z-0"
      >
        <TileLayer 
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {validDestinations.map((dest) => (
          <Marker 
            key={dest.id} 
            position={[dest.latitude!, dest.longitude!]}
          >
            <Popup className="custom-popup">
              <div className="w-48">
                <img src={dest.image} alt={dest.name} className="w-full h-24 object-cover rounded-t-md mb-2" />
                <h4 className="font-bold text-sm mb-1 text-black">{dest.name}</h4>
                <p className="text-xs text-zinc-600 mb-2">{dest.price} • {dest.rating}⭐</p>
                <Link to={`/destination/${dest.id}`} className="block">
                  <Button size="sm" className="w-full h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white">
                    View <ArrowRight size={12} className="ml-1" />
                  </Button>
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
