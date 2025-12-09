'use client';

import React, { useEffect, useState } from 'react';
import { useLawyerStore } from '@/lib/store/lawyer-store';
import BookingModal from './BookingModal';
import { X, Star, MapPin, Clock, CheckCircle, Calendar, DollarSign, Globe, Scale } from 'lucide-react';

interface LawyerProfileProps {
  lawyerId: string;
  onClose: () => void;
}

const LawyerProfile: React.FC<LawyerProfileProps> = ({ lawyerId, onClose }) => {
  const { selectedLawyer, selectLawyer, isLoading, error } = useLawyerStore();
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    selectLawyer(lawyerId);
  }, [lawyerId, selectLawyer]);

  const getCurrency = (location: string) => {
    if (location.includes('Nigeria')) return '₦';
    if (location.includes('Ghana')) return 'GH₵';
    return 'CFA';
  };

  if (isLoading) return null;

  if (!selectedLawyer) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden animate-fade-in">

          {/* Header - Fixed & Compact */}
          <div className="flex-none bg-gradient-to-r from-blue-600 to-teal-600 dark:from-teal-600 dark:to-emerald-600 text-white px-5 py-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Lawyer Profile</h2>
            <button
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-all text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-5">
            <div className="grid md:grid-cols-3 gap-6">

              {/* Left Column: Image & Quick Stats */}
              <div className="md:col-span-1 space-y-4">
                {/* Profile Image Card */}
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="relative w-32 h-32 mx-auto mb-3">
                    <img
                      src={selectedLawyer.avatar}
                      alt={selectedLawyer.name}
                      className="w-full h-full object-cover rounded-full border-4 border-white dark:border-slate-800 shadow-lg"
                    />
                    {selectedLawyer.verified && (
                      <div className="absolute bottom-1 right-1 bg-blue-500 text-white p-1 rounded-full border-2 border-white dark:border-slate-800" title="Verified Lawyer">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight mb-1">
                    {selectedLawyer.name}
                  </h1>
                  <p className="text-sm font-semibold text-blue-600 dark:text-teal-400 mb-3">
                    {selectedLawyer.specialization[0]}
                  </p>

                  {/* Availability Badge */}
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${selectedLawyer.availability
                      ? 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 border border-teal-200 dark:border-teal-800'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                    <span className={`w-2 h-2 rounded-full ${selectedLawyer.availability ? 'bg-teal-500 animate-pulse' : 'bg-slate-400'}`}></span>
                    {selectedLawyer.availability ? 'Available Now' : 'Busy'}
                  </div>
                </div>

                {/* Vertical Key Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                      <Star className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Rating</p>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">
                        {selectedLawyer.rating.toFixed(1)} <span className="text-slate-400 fw-normal text-xs">({selectedLawyer.reviewCount})</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Experience</p>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">
                        {selectedLawyer.yearsOfExperience}+ Years
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Location</p>
                      <p className="font-bold text-slate-900 dark:text-white text-sm max-w-[120px] truncate" title={selectedLawyer.location}>
                        {selectedLawyer.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Bio & Details */}
              <div className="md:col-span-2 space-y-5">
                {/* Bio Section */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Scale className="h-4 w-4 text-slate-400" />
                    About Lawyer
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/30 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    {selectedLawyer.bio}
                  </p>
                </div>

                {/* Expertise Badges */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-slate-400" />
                    Areas of Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedLawyer.specialization.map((spec, i) => (
                      <span key={i} className="px-3 py-1.5 bg-blue-50 dark:bg-teal-900/20 text-blue-700 dark:text-teal-300 text-xs font-semibold rounded-lg border border-blue-100 dark:border-teal-800">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages (Mocked for now) */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Languages</h3>
                  <div className="flex gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">🇬🇧 English (Fluent)</span>
                    <span className="flex items-center gap-1.5">🇫🇷 French (Professional)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Footer Action Bar */}
          <div className="flex-none p-4 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-slate-600 dark:text-slate-300" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">Hourly Rate</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white leading-none">
                  {selectedLawyer.hourlyRate} <span className="text-sm text-slate-500">{getCurrency(selectedLawyer.location)}</span>
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 border-2 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm"
              >
                Close
              </button>
              <button
                onClick={() => setShowBookingModal(true)}
                disabled={!selectedLawyer.availability}
                className={`px-6 py-2.5 rounded-xl font-bold text-white shadow-lg text-sm flex items-center gap-2 ${selectedLawyer.availability
                    ? 'bg-gradient-to-r from-blue-600 to-teal-600 dark:from-teal-600 dark:to-emerald-600 hover:scale-105 transition-transform'
                    : 'bg-slate-300 cursor-not-allowed'
                  }`}
              >
                <Calendar className="h-4 w-4" />
                {selectedLawyer.availability ? 'Book Consultation' : 'Unavailable'}
              </button>
            </div>
          </div>

        </div>
      </div>

      {showBookingModal && (
        <BookingModal
          lawyer={selectedLawyer}
          onClose={() => setShowBookingModal(false)}
          onBookingComplete={() => {
            setShowBookingModal(false);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default LawyerProfile;
