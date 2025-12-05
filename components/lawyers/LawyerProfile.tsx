'use client';

import React, { useEffect, useState } from 'react';
import { useLawyerStore } from '@/lib/store/lawyer-store';
import BookingModal from './BookingModal';

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

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 text-center">
          <div className="animate-spin inline-flex items-center justify-center w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!selectedLawyer) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 text-center max-w-md">
          <p className="text-red-600 font-semibold mb-4">{error || 'Failed to load profile'}</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full m-4 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold z-10"
          >
            ✕
          </button>

          {/* Header with Avatar */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8">
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-4xl border-4 border-white">
                {selectedLawyer.name.charAt(0)}
              </div>
              <div className="pb-2">
                <h1 className="text-3xl font-bold text-white">{selectedLawyer.name}</h1>
                <p className="text-blue-100">{selectedLawyer.specialization.join(', ')}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm font-semibold">Rating</p>
                <p className="text-2xl font-bold text-yellow-500 mt-1">
                  ⭐ {selectedLawyer.rating.toFixed(1)}
                </p>
                <p className="text-xs text-gray-600 mt-1">{selectedLawyer.reviewCount} reviews</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm font-semibold">Experience</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  {selectedLawyer.yearsOfExperience}+
                </p>
                <p className="text-xs text-gray-600 mt-1">Years</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm font-semibold">Hourly Rate</p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  ${selectedLawyer.hourlyRate}
                </p>
                <p className="text-xs text-gray-600 mt-1">Per hour</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm font-semibold">Location</p>
                <p className="text-lg font-bold text-gray-900 mt-1">📍</p>
                <p className="text-xs text-gray-600 mt-1">{selectedLawyer.location}</p>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">About</h3>
              <p className="text-gray-700 leading-relaxed">{selectedLawyer.bio}</p>
            </div>

            {/* Availability */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${selectedLawyer.availability ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="font-semibold text-gray-900">
                  {selectedLawyer.availability ? '✓ Available for consultation' : '✕ Not available right now'}
                </span>
              </div>
            </div>

            {/* Verified Badge */}
            {selectedLawyer.verified && (
              <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800">
                  <span className="font-semibold">✓ Verified Lawyer</span> - Credentials verified by LegalHub
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowBookingModal(true)}
                disabled={!selectedLawyer.availability}
                className={`flex-1 py-3 rounded-lg font-semibold transition ${
                  selectedLawyer.availability
                    ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
              >
                📅 Book Consultation
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-900 hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
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
