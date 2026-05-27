'use client';

import React from 'react';
import { Lawyer } from '@/types';
import { MapPin, Star, CheckCircle } from 'lucide-react';

interface LawyerCardProps {
  lawyer: Lawyer;
  onSelectLawyer: (lawyer: Lawyer) => void;
}

const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer, onSelectLawyer }) => {
  return (
    <div
      className="flex items-center gap-4 px-5 py-4 border-b border-[#E5E2DC] dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900/30 transition-colors duration-150 group"
    >
      {/* Avatar */}
      <div className="flex-shrink-0 w-11 h-11 rounded-full overflow-hidden bg-stone-100 dark:bg-stone-800 border border-[#E5E2DC] dark:border-stone-700">
        {lawyer.avatar ? (
          <img
            src={lawyer.avatar}
            alt={lawyer.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm font-bold text-stone-500 dark:text-stone-400 font-serif">
            {lawyer.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Name + specialization */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <h3 className="text-sm font-semibold text-stone-900 dark:text-white truncate group-hover:text-[#B89868] transition-colors">
            {lawyer.name}
          </h3>
          {lawyer.verified && (
            <CheckCircle size={13} className="text-[#B89868] flex-shrink-0" />
          )}
        </div>
        <p className="text-xs text-stone-500 dark:text-stone-400 truncate mt-0.5">
          {lawyer.specialization.join(' · ')}
        </p>
      </div>

      {/* Location */}
      <div className="hidden md:flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 w-36 flex-shrink-0">
        <MapPin size={11} className="flex-shrink-0" />
        <span className="truncate">{lawyer.location.replace(', Cameroon', '')}</span>
      </div>

      {/* Rating */}
      <div className="hidden sm:flex items-center gap-1 w-14 flex-shrink-0">
        <Star size={11} className="fill-[#B89868] text-[#B89868] flex-shrink-0" />
        <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
          {lawyer.rating.toFixed(1)}
        </span>
      </div>

      {/* Rate */}
      <div className="hidden lg:block text-right w-28 flex-shrink-0">
        <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
          {lawyer.hourlyRate.toLocaleString()}
        </span>
        <span className="text-xs text-stone-400 dark:text-stone-500"> CFA/hr</span>
      </div>

      {/* Availability dot */}
      <div className="flex-shrink-0 w-2 h-2 rounded-full hidden sm:block"
        style={{ backgroundColor: lawyer.availability ? '#10b981' : '#d1d5db' }}
        title={lawyer.availability ? 'Available' : 'Unavailable'}
      />

      {/* CTA */}
      <button
        onClick={() => onSelectLawyer(lawyer)}
        disabled={!lawyer.availability}
        className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-150 ${
          lawyer.availability
            ? 'border-[#1C1B19] dark:border-[#FAF9F5] text-[#1C1B19] dark:text-[#FAF9F5] hover:bg-[#1C1B19] dark:hover:bg-[#FAF9F5] hover:text-white dark:hover:text-[#1C1B19]'
            : 'border-stone-200 dark:border-stone-700 text-stone-300 dark:text-stone-600 cursor-not-allowed'
        }`}
      >
        {lawyer.availability ? 'View' : 'Busy'}
      </button>
    </div>
  );
};

export default LawyerCard;
