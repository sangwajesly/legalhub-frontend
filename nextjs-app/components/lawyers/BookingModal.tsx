'use client';

import React, { useState } from 'react';
import { Lawyer, Booking } from '@/types';
import { useLawyerStore } from '@/lib/store/lawyer-store';

interface BookingModalProps {
  lawyer: Lawyer;
  onClose: () => void;
  onBookingComplete: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  lawyer,
  onClose,
  onBookingComplete,
}) => {
  const { createBooking } = useLawyerStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    scheduledAt: '',
    duration: 60,
    type: 'video' as 'video' | 'in-person',
    notes: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.scheduledAt) {
      setError('Please select a date and time');
      return;
    }

    try {
      setIsSubmitting(true);
      const bookingData: Omit<Booking, 'id' | 'createdAt'> = {
        lawyerId: lawyer.id,
        userId: 'user-id', // Replace with actual user ID from auth
        scheduledAt: new Date(formData.scheduledAt).toISOString(),
        duration: formData.duration,
        type: formData.type,
        status: 'pending',
        notes: formData.notes || undefined,
      };

      await createBooking(bookingData);
      setSuccess(true);
      setTimeout(onBookingComplete, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 text-center max-w-md">
          <div className="text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-4">
            Your consultation with {lawyer.name} has been booked successfully.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting you back...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full m-4 relative">
        {/* Header */}
        <div className="bg-blue-500 text-white px-6 py-4 rounded-t-lg">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-blue-100 hover:text-white text-2xl"
          >
            ✕
          </button>
          <h2 className="text-xl font-bold">Book Consultation</h2>
          <p className="text-blue-100 text-sm">with {lawyer.name}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
              {error}
            </div>
          )}

          {/* Date and Time */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date & Time *
            </label>
            <input
              type="datetime-local"
              name="scheduledAt"
              value={formData.scheduledAt}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Duration (minutes)
            </label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            >
              <option value={30}>30 minutes - ${(lawyer.hourlyRate / 2).toFixed(2)}</option>
              <option value={60}>1 hour - ${lawyer.hourlyRate.toFixed(2)}</option>
              <option value={90}>1.5 hours - ${(lawyer.hourlyRate * 1.5).toFixed(2)}</option>
              <option value={120}>2 hours - ${(lawyer.hourlyRate * 2).toFixed(2)}</option>
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Consultation Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            >
              <option value="video">📹 Video Call</option>
              <option value="in-person">🏢 In-Person Meeting</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Brief description of your case or questions..."
              disabled={isSubmitting}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 resize-none"
            />
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Consultation Fee:</span>
              <span className="font-bold text-gray-900">
                ${((lawyer.hourlyRate / 60) * formData.duration).toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-gray-600">Payment will be processed after confirmation</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-semibold rounded-lg transition"
            >
              {isSubmitting ? '⏳ Booking...' : 'Confirm Booking'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 disabled:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center">
            By booking, you agree to our terms and cancellation policy
          </p>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
