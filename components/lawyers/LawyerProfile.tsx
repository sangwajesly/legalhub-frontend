'use client';

import React, { useEffect, useState } from 'react';
import { useLawyerStore } from '@/lib/store/lawyer-store';
import BookingModal from './BookingModal';
import { X, Star, MapPin, Clock, CheckCircle, Calendar } from 'lucide-react';

interface LawyerProfileProps {
  lawyerId: string;
  onClose: () => void;
}

const LawyerProfile: React.FC<LawyerProfileProps> = ({ lawyerId, onClose }) => {
  const { selectedLawyer, selectLawyer, isLoading } = useLawyerStore();
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    selectLawyer(lawyerId);
  }, [lawyerId, selectLawyer]);

  if (isLoading || !selectedLawyer) return null;

  const l = selectedLawyer;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-white dark:bg-[#1a1a18] border border-[#E5E2DC] dark:border-stone-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[88vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E2DC] dark:border-stone-800 flex-shrink-0">
            <span className="text-[10px] font-bold text-[#B89868] uppercase tracking-widest">
              Lawyer Profile
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Profile top row */}
            <div className="flex gap-5 mb-6">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#E5E2DC] dark:border-stone-700 bg-stone-100 dark:bg-stone-800">
                  {l.avatar ? (
                    <img src={l.avatar} alt={l.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl font-serif font-bold text-stone-500">
                      {l.name.charAt(0)}
                    </div>
                  )}
                </div>
                {l.verified && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-[#B89868] rounded-full flex items-center justify-center border-2 border-white dark:border-[#1a1a18]">
                    <CheckCircle size={10} className="text-white" />
                  </div>
                )}
              </div>

              {/* Name + stats */}
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-semibold text-stone-900 dark:text-white leading-tight">
                  {l.name}
                </h1>
                <p className="text-sm text-[#B89868] font-medium mt-0.5">
                  {l.specialization[0]}
                </p>

                {/* Status */}
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: l.availability ? '#10b981' : '#9ca3af' }}
                  />
                  <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                    {l.availability ? 'Available for consultation' : 'Currently unavailable'}
                  </span>
                </div>

                {/* Quick stats */}
                <div className="flex flex-wrap gap-4 mt-3">
                  <div className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-300">
                    <Star size={12} className="fill-[#B89868] text-[#B89868]" />
                    <span className="font-semibold">{l.rating.toFixed(1)}</span>
                    <span className="text-stone-400">({l.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-300">
                    <Clock size={12} className="text-stone-400" />
                    <span>{l.yearsOfExperience} years experience</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-300">
                    <MapPin size={12} className="text-stone-400" />
                    <span>{l.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#E5E2DC] dark:border-stone-800 mb-5" />

            {/* Bio */}
            <div className="mb-5">
              <h2 className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-2">
                About
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {l.bio}
              </p>
            </div>

            {/* Areas of Expertise */}
            <div className="mb-5">
              <h2 className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-2">
                Areas of Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {l.specialization.map((spec, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-semibold border border-[#B89868]/40 text-[#B89868] rounded-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h2 className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-2">
                Languages
              </h2>
              <div className="flex gap-3 text-xs text-stone-600 dark:text-stone-300">
                <span>English (Fluent)</span>
                <span className="text-stone-300 dark:text-stone-600">·</span>
                <span>French (Professional)</span>
              </div>
            </div>
          </div>

          {/* Footer action bar */}
          <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-t border-[#E5E2DC] dark:border-stone-800">
            <div>
              <p className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest">
                Hourly Rate
              </p>
              <p className="text-lg font-semibold text-stone-900 dark:text-white leading-tight">
                {l.hourlyRate.toLocaleString()}
                <span className="text-sm font-normal text-stone-400 ml-1">CFA/hr</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold border border-[#E5E2DC] dark:border-stone-700 text-stone-600 dark:text-stone-300 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => setShowBookingModal(true)}
                disabled={!l.availability}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  l.availability
                    ? 'bg-[#1C1B19] dark:bg-[#FAF9F5] text-white dark:text-[#1C1B19] hover:bg-[#2C2A27] dark:hover:bg-[#E5E2DC]'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-400 cursor-not-allowed'
                }`}
              >
                <Calendar size={13} />
                {l.availability ? 'Book Consultation' : 'Unavailable'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showBookingModal && (
        <BookingModal
          lawyer={l}
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
