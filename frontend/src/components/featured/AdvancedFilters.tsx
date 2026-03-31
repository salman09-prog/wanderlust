import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, ArrowUpDown } from 'lucide-react';

export interface FilterState {
  priceRange: number[];
  sortBy: string;
}

interface AdvancedFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  maxPrice: number;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ onFilterChange, maxPrice }) => {
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [sortBy, setSortBy] = useState('recommended');

  useEffect(() => {
    // Only update max if our current max is higher, to prevent resets
    setPriceRange(prev => [prev[0], Math.max(prev[1], maxPrice)]);
  }, [maxPrice]);

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    onFilterChange({ priceRange: value, sortBy });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onFilterChange({ priceRange, sortBy: value });
  };

  return (
    <div className="bg-zinc-900/50 p-4 md:p-6 rounded-2xl border border-white/5 shadow-lg mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col md:flex-row gap-6 md:items-end">
        
        {/* Price Range Filter */}
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-white flex items-center">
              <Filter size={16} className="mr-2 text-blue-400" />
              Price Range
            </h3>
            <span className="text-xs font-mono text-zinc-400 bg-black/50 px-2 py-1 rounded border border-white/10">
              ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
            </span>
          </div>
          
          <div className="px-2">
            <Slider
              defaultValue={[0, maxPrice]}
              max={maxPrice}
              step={500}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="py-2"
            />
          </div>
          <div className="flex justify-between px-2 text-[10px] text-zinc-500 uppercase tracking-wider">
            <span>₹0</span>
            <span>₹{maxPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Vertical Divider for Desktop */}
        <div className="hidden md:block w-px h-16 bg-white/10 mx-2"></div>

        {/* Sort By Dropdown */}
        <div className="w-full md:w-64 space-y-3">
          <h3 className="text-sm font-semibold text-white flex items-center">
            <ArrowUpDown size={16} className="mr-2 text-green-400" />
            Sort By
          </h3>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full bg-black/50 border-white/10 text-white focus:ring-blue-500 h-11 rounded-xl">
              <SelectValue placeholder="Sort destinations..." />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-white/10 text-white rounded-xl shadow-2xl">
              <SelectItem value="recommended" className="focus:bg-zinc-800 focus:text-white cursor-pointer py-2.5">Recommended</SelectItem>
              <SelectItem value="price-low" className="focus:bg-zinc-800 focus:text-white cursor-pointer py-2.5">Price: Low to High</SelectItem>
              <SelectItem value="price-high" className="focus:bg-zinc-800 focus:text-white cursor-pointer py-2.5">Price: High to Low</SelectItem>
              <SelectItem value="rating" className="focus:bg-zinc-800 focus:text-white cursor-pointer py-2.5">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>
    </div>
  );
};

export default AdvancedFilters;
