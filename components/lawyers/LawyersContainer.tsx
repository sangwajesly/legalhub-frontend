'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useLawyerStore } from '@/lib/store/lawyer-store';
import LawyerCard from './LawyerCard';
import LawyerFilters from './LawyerFilters';
import LawyerProfile from './LawyerProfile';
import { Lawyer } from '@/types';
import { Search, X } from 'lucide-react';

const LawyersPage: React.FC = () => {
  const {
    lawyers,
    isLoading,
    error,
    fetchLawyers,
    clearError,
    setSearchQuery,
    searchQuery,
  } = useLawyerStore();

  const [selectedLawyerId, setSelectedLawyerId] = useState<string | null>(null);
  const [localSearch, setLocalSearch] = useState('');

  useEffect(() => {
    fetchLawyers();
  }, [fetchLawyers]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setLocalSearch(val);
      setSearchQuery(val);
    },
    [setSearchQuery]
  );

  const clearSearch = () => {
    setLocalSearch('');
    setSearchQuery('');
  };

  const handleFilterChange = async (filters: any) => {
    await fetchLawyers(filters);
  };

  const handleSelectLawyer = (lawyer: Lawyer) => {
    setSelectedLawyerId(lawyer.id);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#121315]">

      {/* Page Header */}
      <div className="border-b border-[#E5E2DC] dark:border-stone-800 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold text-[#B89868] uppercase tracking-widest mb-1">
              Legal Directory — Cameroon
            </p>
            <h1 className="text-2xl font-semibold text-stone-900 dark:text-white tracking-tight">
              Find a Verified Lawyer
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
              Qualified legal professionals across Yaoundé, Douala, Bamenda and beyond.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64 flex-shrink-0">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Name, specialization..."
              value={localSearch}
              onChange={handleSearchChange}
              className="w-full pl-8 pr-8 py-2 text-xs border border-[#E5E2DC] dark:border-stone-700 rounded-lg bg-white dark:bg-stone-900/40 text-stone-800 dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:border-[#B89868] focus:ring-1 focus:ring-[#B89868]/20 transition-all"
            />
            {localSearch && (
              <button
                onClick={clearSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 py-6">

        {/* Filters */}
        <LawyerFilters onFilterChange={handleFilterChange} isLoading={isLoading} />

        {/* Error */}
        {error && (
          <div className="mb-4 flex items-center justify-between px-4 py-2.5 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-700 dark:text-red-400">
            <span>{error}</span>
            <button onClick={clearError} className="ml-3 hover:underline font-semibold">
              Dismiss
            </button>
          </div>
        )}

        {/* Results header */}
        {!isLoading && (
          <div className="flex items-center justify-between mb-1 pb-2 border-b border-[#E5E2DC] dark:border-stone-800">
            {/* Column labels — desktop */}
            <div className="flex items-center gap-4 w-full">
              <span className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest flex-1">
                {lawyers.length} {lawyers.length === 1 ? 'lawyer' : 'lawyers'} found
              </span>
              <span className="hidden md:block text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest w-36 flex-shrink-0">Location</span>
              <span className="hidden sm:block text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest w-14 flex-shrink-0">Rating</span>
              <span className="hidden lg:block text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest w-28 flex-shrink-0 text-right">Rate</span>
              <span className="hidden sm:block text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest w-2 flex-shrink-0" />
              <span className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest w-12 flex-shrink-0 text-right pr-1" />
            </div>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="py-16 text-center">
            <div className="inline-block w-5 h-5 border-2 border-[#B89868] border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-xs text-stone-500 dark:text-stone-400">Loading lawyers...</p>
          </div>
        )}

        {/* Lawyer rows */}
        {!isLoading && lawyers.length > 0 && (
          <div className="bg-white dark:bg-stone-900/10 border border-[#E5E2DC] dark:border-stone-800 rounded-xl overflow-hidden">
            {lawyers.map((lawyer) => (
              <LawyerCard
                key={lawyer.id}
                lawyer={lawyer}
                onSelectLawyer={handleSelectLawyer}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && lawyers.length === 0 && (
          <div className="py-16 text-center border border-[#E5E2DC] dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900/10">
            <p className="text-sm font-semibold text-stone-600 dark:text-stone-300 mb-1">
              No lawyers match your filters
            </p>
            <p className="text-xs text-stone-400 dark:text-stone-500 mb-4">
              Try adjusting your search or clearing filters.
            </p>
            <button
              onClick={() => {
                clearSearch();
                fetchLawyers({});
              }}
              className="text-xs font-semibold text-[#B89868] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Profile modal */}
      {selectedLawyerId && (
        <LawyerProfile
          lawyerId={selectedLawyerId}
          onClose={() => setSelectedLawyerId(null)}
        />
      )}
    </div>
  );
};

export default LawyersPage;
