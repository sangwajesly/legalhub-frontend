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
    <Card className="border-slate-200 dark:border-slate-700 shadow-md bg-white dark:bg-slate-800/50 backdrop-blur-sm mb-8">
      <CardContent className="p-5">
        <Button
          variant="ghost"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white w-full justify-between md:justify-start hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-xl transition-all"
        >
          <span className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-600 dark:text-teal-400" />
            <span className="text-lg">Filters & Sort</span>
          </span>
          {showFilters ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </Button>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-7 animate-fade-in">
            {/* Specialization */}
            <div className="space-y-2.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-teal-500 rounded-full"></span>
                Specialization
              </label>
              <select
                value={filters.specialization || ''}
                onChange={(e) => handleFilterChange('specialization', e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-teal-500/40 focus:border-blue-500 dark:focus:border-teal-400 text-sm font-medium disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:text-slate-400 transition-all duration-200 text-slate-900 dark:text-white"
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
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-teal-500 rounded-full"></span>
                Location
              </label>
              <input
                type="text"
                placeholder="City or State"
                value={filters.location || ''}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-teal-500/40 focus:border-blue-500 dark:focus:border-teal-400 text-sm font-medium disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:text-slate-400 transition-all duration-200 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>

            {/* Min Rating */}
            <div className="space-y-2.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-teal-500 rounded-full"></span>
                Min Rating
              </label>
              <select
                value={filters.minRating || ''}
                onChange={(e) =>
                  handleFilterChange('minRating', e.target.value ? parseFloat(e.target.value) : undefined)
                }
                disabled={isLoading}
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-teal-500/40 focus:border-blue-500 dark:focus:border-teal-400 text-sm font-medium disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:text-slate-400 transition-all duration-200 text-slate-900 dark:text-white"
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
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-teal-500 rounded-full"></span>
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
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-teal-500/40 focus:border-blue-500 dark:focus:border-teal-400 text-sm font-medium disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:text-slate-400 transition-all duration-200 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LawyerFilters;
