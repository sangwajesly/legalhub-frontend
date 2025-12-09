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
    <div className="min-h-screen animate-fade-in bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-600 dark:via-teal-600 dark:to-cyan-700 text-white py-16 px-4 mb-10">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <span className="w-2 h-2 bg-blue-300 dark:bg-teal-300 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-blue-50">Verified Legal Professionals</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-5 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-50">
            Find Your Legal Expert
          </h1>
          <p className="text-blue-50 text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Connect with verified lawyers specialized in your specific legal needs.
            Book consultations instantly and get expert help when you need it most.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto group">
            <input
              type="text"
              placeholder="Search by name, specialization, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-5 pl-14 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm text-slate-900 dark:text-white rounded-2xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-400/40 dark:focus:ring-teal-500/40 placeholder-slate-400 dark:placeholder-slate-500 text-lg transition-all duration-300 border border-white/20"
            />
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 h-6 w-6 transition-colors group-focus-within:text-blue-600 dark:group-focus-within:text-teal-400" />
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
            <div className="animate-spin inline-flex items-center justify-center w-16 h-16 border-4 border-blue-600 dark:border-teal-500 border-t-transparent rounded-full mb-6"></div>
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
          <div className="mt-12 text-center py-20 bg-white dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700">
            <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Search className="h-10 w-10 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">No lawyers found</h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
              We couldn't find any lawyers matching your criteria. Try adjusting your filters or search terms.
            </p>
            <Button
              variant="outline"
              className="px-6 py-3 border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl font-semibold"
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
