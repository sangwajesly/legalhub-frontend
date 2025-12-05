'use client';

import React, { useState } from 'react';
import { LawyerFilter } from '@/types';

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
    <div className="bg-white rounded-lg shadow-md p-4">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 font-semibold text-gray-900 mb-4"
      >
        🔍 Filters {showFilters ? '▼' : '▶'}
      </button>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Specialization */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Specialization
            </label>
            <select
              value={filters.specialization || ''}
              onChange={(e) => handleFilterChange('specialization', e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
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
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              placeholder="City or State"
              value={filters.location || ''}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>

          {/* Min Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Min Rating
            </label>
            <select
              value={filters.minRating || ''}
              onChange={(e) =>
                handleFilterChange('minRating', e.target.value ? parseFloat(e.target.value) : undefined)
              }
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            >
              <option value="">All Ratings</option>
              <option value="3">3.0+ ⭐</option>
              <option value="3.5">3.5+ ⭐</option>
              <option value="4">4.0+ ⭐</option>
              <option value="4.5">4.5+ ⭐</option>
            </select>
          </div>

          {/* Max Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Max Hourly Rate
            </label>
            <input
              type="number"
              placeholder="e.g., 200"
              value={filters.maxPrice || ''}
              onChange={(e) =>
                handleFilterChange('maxPrice', e.target.value ? parseFloat(e.target.value) : undefined)
              }
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LawyerFilters;
