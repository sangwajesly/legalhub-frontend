'use client';

import React, { useEffect, useState } from 'react';
import { useLawyerStore } from '@/lib/store/lawyer-store';
import LawyerCard from './LawyerCard';
import LawyerFilters from './LawyerFilters';
import LawyerProfile from './LawyerProfile';
import { Lawyer } from '@/types';

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-border bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
          <h1 className="text-3xl sm:text-4xl font-semibold text-primary mb-2 sm:mb-3">Find a Lawyer</h1>
          <p className="text-sm sm:text-base text-secondary">Connect with verified legal professionals</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Search Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Search lawyers by name, specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-11 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary placeholder:text-muted transition-colors text-sm sm:text-base"
            />
            <svg className="absolute left-3.5 top-3.5 w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filters */}
        <LawyerFilters onFilterChange={handleFilterChange} isLoading={isLoading} />

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 flex justify-between items-center">
            <span className="text-sm sm:text-base">{error}</span>
            <button
              onClick={clearError}
              className="text-red-600 hover:text-red-800 transition-colors ml-4 flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="mt-8 sm:mt-12 text-center py-12 sm:py-16">
            <div className="animate-spin inline-flex items-center justify-center w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
            <p className="mt-4 text-sm sm:text-base text-secondary">Loading lawyers...</p>
          </div>
        )}

        {/* Lawyers List */}
        {!isLoading && lawyers.length > 0 && (
          <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
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
          <div className="mt-8 sm:mt-12 text-center py-12 sm:py-16">
            <p className="text-lg sm:text-xl font-medium text-primary mb-2">No lawyers found</p>
            <p className="text-muted text-sm sm:text-base">Try adjusting your filters or search query</p>
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
