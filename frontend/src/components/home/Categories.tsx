
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/constants/destinations';
import {
  Palmtree, Mountain, LibraryBig, Castle,
  Sparkles, Tent, TreePine, PawPrint, Compass
} from 'lucide-react';

// Define category icon mapping
const categoryIcons: Record<string, React.ReactNode> = {
  "Beach": <Palmtree size={32} strokeWidth={1.5} />,
  "Mountain": <Mountain size={32} strokeWidth={1.5} />,
  "Cultural": <LibraryBig size={32} strokeWidth={1.5} />,
  "Historical": <Castle size={32} strokeWidth={1.5} />,
  "Spiritual": <Sparkles size={32} strokeWidth={1.5} />,
  "Adventure": <Tent size={32} strokeWidth={1.5} />,
  "Nature": <TreePine size={32} strokeWidth={1.5} />,
  "Wildlife": <PawPrint size={32} strokeWidth={1.5} />,
  "All": <Compass size={32} strokeWidth={1.5} />
};

const categoryImages: Record<string, string> = {
  "Beach": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
  "Mountain": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
  "Cultural": "https://images.unsplash.com/photo-1514222325258-71e44dc309ee?auto=format&fit=crop&w=600&q=80",
  "Historical": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80",
  "Spiritual": "https://images.unsplash.com/photo-1582510003544-4b00b5f8a146?auto=format&fit=crop&w=600&q=80",
  "Adventure": "https://images.unsplash.com/photo-1533692328991-08159ff19fca?auto=format&fit=crop&w=600&q=80",
  "Nature": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80",
  "Wildlife": "https://images.unsplash.com/photo-1521651201144-634f700b36ef?auto=format&fit=crop&w=600&q=80"
};

const Categories = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Explore by Category</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Discover a variety of experiences across India, from serene beaches to ancient temples and thrilling adventures.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {categories.filter(cat => cat !== "All").map((category) => (
            <Link
              to={`/featured?category=${category}`}
              key={category}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] flex flex-col justify-end p-6 hover:-translate-y-2 transition-transform duration-500 shadow-xl will-change-transform"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 will-change-transform transform-gpu"
                style={{ backgroundImage: `url(${categoryImages[category]})` }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:via-black/50 transition-colors duration-500" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-start transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 will-change-transform">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 md:backdrop-blur-sm border border-white/20 mb-3 text-white">
                  {categoryIcons[category]}
                </div>
                <h3 className="text-xl font-bold text-white tracking-wide">
                  {category}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
