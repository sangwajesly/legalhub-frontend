'use client';

import React from 'react';
import { Lawyer } from '@/types';


interface LawyerCardProps {
  lawyer: Lawyer;
  onSelectLawyer: (lawyer: Lawyer) => void;
}

const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer, onSelectLawyer }) => {
  return (
    <div className="bg-white rounded-xl border border-border hover:border-primary/20 p-5 sm:p-6 transition-all duration-200 hover:shadow-sm">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-base sm:text-lg border border-border">
            {lawyer.name.charAt(0)}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base sm:text-lg text-primary mb-1 leading-tight">{lawyer.name}</h3>
              <p className="text-xs sm:text-sm text-secondary">{lawyer.specialization.join(', ')}</p>
            </div>
            {lawyer.verified && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-light text-primary text-xs font-medium rounded-full border border-border self-start sm:self-auto">
                ✓ Verified
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm mb-3 sm:mb-4">
            <div className="flex items-center gap-1.5">
              <span className="text-primary">⭐</span>
              <span className="font-medium text-primary">{lawyer.rating.toFixed(1)}</span>
              <span className="text-muted">({lawyer.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-muted">📍</span>
              <span className="text-secondary">{lawyer.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-muted">⏰</span>
              <span className="text-secondary">{lawyer.yearsOfExperience} yrs</span>
            </div>
          </div>

          {/* Rate and Availability */}
          <div className="flex items-center justify-between mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-border">
            <div className="text-lg sm:text-xl font-semibold text-primary">
              ${lawyer.hourlyRate}<span className="text-xs sm:text-sm font-normal text-muted">/hr</span>
            </div>
            <div className="flex items-center gap-2">
              {lawyer.availability ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-light text-primary text-xs font-medium rounded-full border border-border">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Available
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-light text-muted text-xs font-medium rounded-full border border-border">
                  <span className="w-1.5 h-1.5 bg-muted rounded-full"></span>
                  Unavailable
                </span>
              )}
            </div>
          </div>

          {/* Bio */}
          <p className="text-xs sm:text-sm text-secondary line-clamp-2 mb-4 sm:mb-5 leading-relaxed">{lawyer.bio}</p>

          {/* Action Button */}
          <button
            onClick={() => onSelectLawyer(lawyer)}
            disabled={!lawyer.availability}
            className={`w-full py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base ${
              lawyer.availability
                ? 'bg-primary hover:bg-primary/90 text-white cursor-pointer'
                : 'bg-light text-muted cursor-not-allowed border border-border'
            }`}
          >
            {lawyer.availability ? 'View & Book' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LawyerCard;
