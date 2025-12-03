'use client';

import React, { useEffect } from 'react';
import { useLawyerStore } from '@/lib/store/lawyer-store';


const BookingsPage: React.FC = () => {
  const { bookings, fetchUserBookings, cancelBooking, isLoading, error, clearError } =
    useLawyerStore();

  useEffect(() => {
    // Replace with actual user ID from auth
    fetchUserBookings('user-id');
  }, [fetchUserBookings]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      await cancelBooking(bookingId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">My Bookings</h1>
          <p className="text-blue-100">Manage your lawyer consultations</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 flex justify-between items-center">
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
          <div className="text-center py-12">
            <div className="animate-spin inline-flex items-center justify-center w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <p className="mt-4 text-gray-600">Loading your bookings...</p>
          </div>
        )}

        {/* Bookings List */}
        {!isLoading && bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        Lawyer Consultation
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-semibold text-gray-900">📅 Date & Time</span>
                        <p>{new Date(booking.scheduledAt).toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">⏱️ Duration</span>
                        <p>{booking.duration} minutes</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">📞 Type</span>
                        <p>
                          {booking.type === 'video' ? '📹 Video Call' : '🏢 In-Person'}
                        </p>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Notes:</span> {booking.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    {booking.status === 'pending' && (
                      <>
                        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition">
                          View Details
                        </button>
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="px-4 py-2 border-2 border-red-500 text-red-500 hover:bg-red-50 rounded-lg font-semibold transition"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {booking.status === 'confirmed' && (
                      <>
                        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition">
                          Join Call
                        </button>
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="px-4 py-2 border-2 border-red-500 text-red-500 hover:bg-red-50 rounded-lg font-semibold transition"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {(booking.status === 'completed' || booking.status === 'cancelled') && (
                      <button className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg font-semibold cursor-not-allowed">
                        {booking.status === 'completed' ? 'Completed' : 'Cancelled'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && bookings.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <div className="text-5xl mb-4">📅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No bookings yet</h2>
            <p className="text-gray-600 mb-6">
              Start by finding a lawyer and booking a consultation
            </p>
            <a
              href="/lawyers"
              className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition"
            >
              Browse Lawyers
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
