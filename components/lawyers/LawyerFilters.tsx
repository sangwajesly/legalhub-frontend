'use client';

import React, { useState } from 'react';
import { LawyerFilter } from '@/types';
import { X } from 'lucide-react';

interface LawyerFilterProps {
  onFilterChange: (filters: LawyerFilter) => void;
  isLoading: boolean;
}

const SPECIALIZATIONS = [
  'Constitutional Law',
  'Criminal Law',
  'Family & Customary Law',
  'Labour Law',
  'Business Law',
  'Mining Law',
  'Tax Law',
  'Electoral Law',
];

const LawyerFilters: React.FC<LawyerFilterProps> = ({ onFilterChange, isLoading }) => {
  const [filters, setFilters] = useState<LawyerFilter>({});

  const update = (key: keyof LawyerFilter, value: any) => {
    const next = { ...filters, [key]: value || undefined };
    setFilters(next);
    onFilterChange(next);
  };

  const toggleSpec = (spec: string) => {
    const next =
      filters.specialization === spec
        ? { ...filters, specialization: undefined }
        : { ...filters, specialization: spec };
    setFilters(next);
    onFilterChange(next);
  };

  const clearAll = () => {
    setFilters({});
    onFilterChange({});
  };

  const hasFilters =
    filters.specialization ||
    filters.location ||
    filters.minRating ||
    filters.availability !== undefined;

  return (
    <div className="mb-6 space-y-3">
      {/* Specialization chips */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mr-1 flex-shrink-0">
          Practice
        </span>
        <button
          onClick={() => toggleSpec('')}
          disabled={isLoading}
          className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all duration-150 disabled:opacity-40 ${
            !filters.specialization
              ? 'bg-[#1C1B19] dark:bg-[#FAF9F5] text-[#FAF9F5] dark:text-[#1C1B19] border-[#1C1B19] dark:border-[#FAF9F5]'
              : 'border-[#E5E2DC] dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-[#B89868] hover:text-[#B89868] dark:hover:border-[#B89868] dark:hover:text-[#B89868]'
          }`}
        >
          All
        </button>
        {SPECIALIZATIONS.map((spec) => (
          <button
            key={spec}
            onClick={() => toggleSpec(spec)}
            disabled={isLoading}
            className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all duration-150 disabled:opacity-40 ${
              filters.specialization === spec
                ? 'bg-[#B89868] text-white border-[#B89868]'
                : 'border-[#E5E2DC] dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-[#B89868] hover:text-[#B89868] dark:hover:border-[#B89868] dark:hover:text-[#B89868]'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Secondary filters row */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mr-1 flex-shrink-0">
          Filter
        </span>

        {/* Location */}
        <input
          type="text"
          placeholder="City (e.g. Yaoundé)"
          value={filters.location || ''}
          onChange={(e) => update('location', e.target.value)}
          disabled={isLoading}
          className="px-3 py-1 text-xs border border-[#E5E2DC] dark:border-stone-700 rounded-full bg-transparent text-stone-700 dark:text-stone-300 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:border-[#B89868] focus:ring-1 focus:ring-[#B89868]/20 disabled:opacity-40 transition-all w-36"
        />

        {/* Min Rating */}
        <select
          value={filters.minRating || ''}
          onChange={(e) => update('minRating', e.target.value ? parseFloat(e.target.value) : undefined)}
          disabled={isLoading}
          className="px-3 py-1 text-xs border border-[#E5E2DC] dark:border-stone-700 rounded-full bg-transparent text-stone-700 dark:text-stone-300 focus:outline-none focus:border-[#B89868] focus:ring-1 focus:ring-[#B89868]/20 disabled:opacity-40 transition-all cursor-pointer appearance-none pr-6"
          style={{ backgroundImage: 'none' }}
        >
          <option value="">Any rating</option>
          <option value="4">4.0+</option>
          <option value="4.5">4.5+</option>
          <option value="4.8">4.8+</option>
        </select>

        {/* Availability */}
        <button
          onClick={() =>
            update(
              'availability',
              filters.availability === true ? undefined : true
            )
          }
          disabled={isLoading}
          className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all duration-150 disabled:opacity-40 ${
            filters.availability === true
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'border-[#E5E2DC] dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-emerald-600 hover:text-emerald-600'
          }`}
        >
          Available now
        </button>

        {/* Clear */}
        {hasFilters && (
          <button
            onClick={clearAll}
            disabled={isLoading}
            className="flex items-center gap-1 text-xs text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          >
            <X size={11} />
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default LawyerFilters;
