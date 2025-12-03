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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Find a Lawyer</h1>
          <p className="text-blue-100">Connect with verified legal professionals</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search lawyers by name, specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-4 top-3 text-xl">🔍</span>
          </div>
        </div>

        {/* Filters */}
        <LawyerFilters onFilterChange={handleFilterChange} isLoading={isLoading} />

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={clearError}
              className="text-red-600 hover:text-red-800 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="mt-8 text-center">
            <div className="animate-spin inline-flex items-center justify-center w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <p className="mt-4 text-gray-600">Loading lawyers...</p>
          </div>
        )}

        {/* Lawyers List */}
        {!isLoading && lawyers.length > 0 && (
          <div className="mt-8 space-y-4">
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
          <div className="mt-8 text-center py-12">
            <p className="text-2xl text-gray-600 mb-4">No lawyers found</p>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
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
