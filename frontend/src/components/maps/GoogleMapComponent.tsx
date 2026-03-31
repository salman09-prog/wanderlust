
import React from 'react';
import { MapPin } from 'lucide-react';

interface GoogleMapComponentProps {
  location: string;
  name: string;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ location, name }) => {
  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center rounded-lg overflow-hidden border border-white/10">
      <div className="absolute inset-0 bg-white/5">
        <div className="h-full w-full bg-gradient-to-br from-zinc-900 to-black flex flex-col items-center justify-center p-4">
          <MapPin size={32} className="text-white mb-2" />
          <h4 className="text-lg font-medium text-white text-center">{name}</h4>
          <p className="text-zinc-400 text-center">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default GoogleMapComponent;
