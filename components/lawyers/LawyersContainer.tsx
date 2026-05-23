'use client';

import React, { useEffect, useState } from 'react';
import { useLawyerStore } from '@/lib/store/lawyer-store';
import LawyerCard from './LawyerCard';
import LawyerFilters from './LawyerFilters';
import LawyerProfile from './LawyerProfile';
import { Lawyer } from '@/types';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LawyersPage: React.FC = () => {
  const {
    lawyers,
    isLoading,
    error,
    fetchLawyers,
    clearError,
  } = useLawyerStore();

  const [selectedLawyerId, setSelectedLawyerId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchLawyers();
  }, [fetchLawyers]);

  const handleFilterChange = async (filters: any) => {
    await fetchLawyers(filters);
  };

  const handleSelectLawyer = (lawyer: Lawyer) => {
    setSelectedLawyerId(lawyer.id);
  };

  return (
    <div className="min-h-screen animate-fade-in bg-[#FAF9F5] dark:bg-[#121315]">
      {/* Header */}
      <div className="relative overflow-hidden bg-[#1C1B19] dark:bg-[#1C1B19]/10 border-b border-[#B89868]/30 py-20 px-6 mb-10 text-[#FAF9F5] text-center">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#B89868]/30 bg-[#FAF9F5]/5 dark:bg-stone-900/40 text-[#B89868] text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-[#B89868] rounded-full animate-pulse"></span>
            <span>Verified Local Lawyers</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-light font-display text-white mb-5 tracking-tight leading-[1.08]">
            Find a Trusted <span className="font-serif italic text-[#B89868]">Lawyer</span>
          </h1>
          <p className="text-stone-400 text-sm md:text-base mb-10 max-w-2xl mx-auto leading-relaxed font-sans font-medium">
            Connect with friendly, qualified local lawyers specialized in your specific legal needs. Book consultations instantly and get upfront, honest pricing.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto group">
            <input
              type="text"
              placeholder="Search by name, specialization, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 bg-[#FAF9F5] dark:bg-stone-900/80 text-stone-900 dark:text-[#FAF9F5] rounded-xl border border-stone-800 dark:border-stone-700 focus:outline-none focus:border-[#B89868]/60 focus:ring-4 focus:ring-[#B89868]/10 text-sm placeholder-stone-400 dark:placeholder-stone-500 transition-all duration-300 shadow-sm"
            />
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-stone-500 h-5 w-5 transition-colors group-focus-within:text-[#B89868]" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {/* Filters */}
        <LawyerFilters onFilterChange={handleFilterChange} isLoading={isLoading} />

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-5 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl text-red-800 dark:text-red-300 flex justify-between items-center shadow-md">
            <span className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center">
                <X className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <span className="font-medium">{error}</span>
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearError}
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg"
            >
              Dismiss
            </Button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="mt-16 text-center py-12">
            <div className="animate-spin inline-flex items-center justify-center w-16 h-16 border-4 border-[#B89868] border-t-transparent rounded-full mb-6"></div>
            <p className="text-slate-600 dark:text-slate-300 font-semibold text-lg">Finding the best lawyers for you...</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">This will only take a moment</p>
          </div>
        )}

        {/* Lawyers List */}
        {!isLoading && lawyers.length > 0 && (
          <div className="grid grid-cols-1 gap-6">
            {lawyers.map((lawyer) => (
              <LawyerCard
                key={lawyer.id}
                lawyer={lawyer}
                onSelectLawyer={handleSelectLawyer}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && lawyers.length === 0 && (
          <div className="mt-12 text-center py-20 bg-[#FDFCF9] dark:bg-stone-900/10 border border-[#E5E2DC] dark:border-stone-850 rounded-2xl">
            <div className="w-16 h-16 bg-stone-50 dark:bg-stone-850 border border-[#B89868]/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Search className="h-6 w-6 text-[#B89868]" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-3">No lawyers found</h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 max-w-sm mx-auto mb-8 leading-relaxed font-sans font-medium">
              We couldn&apos;t find any lawyers matching your criteria. Try adjusting your filters or search terms.
            </p>
            <Button
              variant="outline"
              className="px-6 py-3 border border-[#B89868]/45 text-stone-800 dark:text-stone-250 hover:bg-[#FAF9F5] dark:hover:bg-stone-850 rounded-xl font-bold uppercase tracking-widest text-xs bg-transparent"
              onClick={() => {
                setSearchQuery('');
                fetchLawyers({});
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>

      {/* Lawyer Profile Modal */}
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
