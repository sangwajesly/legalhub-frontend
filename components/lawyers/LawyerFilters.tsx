'use client';

import React, { useState } from 'react';
import { LawyerFilter } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LawyerFilterProps {
  onFilterChange: (filters: LawyerFilter) => void;
  isLoading: boolean;
}

const LawyerFilters: React.FC<LawyerFilterProps> = ({ onFilterChange, isLoading }) => {
  const [filters, setFilters] = useState<LawyerFilter>({});
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key: keyof LawyerFilter, value: any) => {
    const newFilters = { ...filters, [key]: value || undefined };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const specializations = [
    'Family Law',
    'Criminal Law',
    'Business Law',
    'Labor Law',
    'Real Estate',
    'Immigration',
    'Tax Law',
    'Corporate Law',
  ];

  return (
    <Card className="border-[#E5E2DC] dark:border-stone-800 shadow-sm bg-[#FDFCF9] dark:bg-stone-900/20 backdrop-blur-sm mb-8 rounded-2xl">
      <CardContent className="p-5">
        <Button
          variant="ghost"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 font-semibold text-[#121315] dark:text-[#FAF9F5] w-full justify-between md:justify-start hover:bg-[#FAF9F5] dark:hover:bg-stone-900/40 border border-[#E5E2DC]/50 dark:border-stone-850/50 rounded-xl transition-all"
        >
          <span className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-[#B89868]" />
            <span className="text-lg font-serif">Refine Search & Filters</span>
          </span>
          {showFilters ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </Button>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-7 animate-fade-in">
            {/* Specialization */}
            <div className="space-y-2.5">
              <label className="text-sm font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#B89868] rounded-full"></span>
                Specialization
              </label>
              <select
                value={filters.specialization || ''}
                onChange={(e) => handleFilterChange('specialization', e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-[#FAF9F5] dark:bg-stone-950/40 border border-[#E5E2DC] dark:border-stone-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B89868]/20 focus:border-[#B89868] text-sm font-medium disabled:bg-stone-50 dark:disabled:bg-stone-900 disabled:text-stone-400 transition-all duration-200 text-[#121315] dark:text-[#FAF9F5]"
              >
                <option value="">All Specializations</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="space-y-2.5">
              <label className="text-sm font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#B89868] rounded-full"></span>
                Location
              </label>
              <input
                type="text"
                placeholder="City or State"
                value={filters.location || ''}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-[#FAF9F5] dark:bg-stone-950/40 border border-[#E5E2DC] dark:border-stone-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B89868]/20 focus:border-[#B89868] text-sm font-medium disabled:bg-stone-50 dark:disabled:bg-stone-900 disabled:text-stone-400 transition-all duration-200 text-[#121315] dark:text-[#FAF9F5] placeholder-stone-400 dark:placeholder-stone-500"
              />
            </div>

            {/* Min Rating */}
            <div className="space-y-2.5">
              <label className="text-sm font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#B89868] rounded-full"></span>
                Min Rating
              </label>
              <select
                value={filters.minRating || ''}
                onChange={(e) =>
                  handleFilterChange('minRating', e.target.value ? parseFloat(e.target.value) : undefined)
                }
                disabled={isLoading}
                className="w-full px-4 py-3 bg-[#FAF9F5] dark:bg-stone-950/40 border border-[#E5E2DC] dark:border-stone-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B89868]/20 focus:border-[#B89868] text-sm font-medium disabled:bg-stone-50 dark:disabled:bg-stone-900 disabled:text-stone-400 transition-all duration-200 text-[#121315] dark:text-[#FAF9F5]"
              >
                <option value="">All Ratings</option>
                <option value="3">3.0+ ⭐</option>
                <option value="3.5">3.5+ ⭐</option>
                <option value="4">4.0+ ⭐</option>
                <option value="4.5">4.5+ ⭐</option>
              </select>
            </div>

            {/* Max Price */}
            <div className="space-y-2.5">
              <label className="text-sm font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#B89868] rounded-full"></span>
                Max Hourly Rate ($)
              </label>
              <input
                type="number"
                placeholder="e.g., 200"
                value={filters.maxPrice || ''}
                onChange={(e) =>
                  handleFilterChange('maxPrice', e.target.value ? parseFloat(e.target.value) : undefined)
                }
                disabled={isLoading}
                className="w-full px-4 py-3 bg-[#FAF9F5] dark:bg-stone-950/40 border border-[#E5E2DC] dark:border-stone-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B89868]/20 focus:border-[#B89868] text-sm font-medium disabled:bg-stone-50 dark:disabled:bg-stone-900 disabled:text-stone-400 transition-all duration-200 text-[#121315] dark:text-[#FAF9F5] placeholder-stone-400 dark:placeholder-stone-500"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LawyerFilters;
