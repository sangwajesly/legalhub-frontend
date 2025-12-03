'use client';

import React from 'react';
import { Lawyer } from '@/types';


interface LawyerCardProps {
  lawyer: Lawyer;
  onSelectLawyer: (lawyer: Lawyer) => void;
}

const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer, onSelectLawyer }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 border border-gray-200">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {lawyer.name.charAt(0)}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-lg text-gray-900">{lawyer.name}</h3>
              <p className="text-sm text-gray-600">{lawyer.specialization.join(', ')}</p>
            </div>
            {lawyer.verified && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                ✓ Verified
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="mt-2 flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">⭐</span>
              <span className="font-semibold">{lawyer.rating.toFixed(1)}</span>
              <span className="text-gray-600">({lawyer.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <span>📍</span>
              <span className="text-gray-600">{lawyer.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>⏰</span>
              <span className="text-gray-600">{lawyer.yearsOfExperience} yrs exp.</span>
            </div>
          </div>

          {/* Rate and Availability */}
          <div className="mt-3 flex items-center justify-between">
            <div className="text-lg font-bold text-blue-600">
              ${lawyer.hourlyRate}/hr
            </div>
            <div className="flex items-center gap-2">
              {lawyer.availability ? (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                  ● Available
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded">
                  ● Unavailable
                </span>
              )}
            </div>
          </div>

          {/* Bio */}
          <p className="mt-3 text-sm text-gray-600 line-clamp-2">{lawyer.bio}</p>

          {/* Action Button */}
          <button
            onClick={() => onSelectLawyer(lawyer)}
            disabled={!lawyer.availability}
            className={`mt-4 w-full py-2 rounded-lg font-semibold transition ${
              lawyer.availability
                ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
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
