'use client';

import React, { useState } from 'react';
import { Lawyer, Booking } from '@/types';
import { useLawyerStore } from '@/lib/store/lawyer-store';
import { X, CheckCircle } from 'lucide-react';

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
        userId: 'user-id',
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

  const getCurrency = () => {
    if (lawyer.location.includes('Nigeria')) return '₦';
    if (lawyer.location.includes('Ghana')) return 'GH₵';
    return 'CFA';
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center max-w-sm w-full shadow-2xl">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 dark:text-slate-400">Consultation with {lawyer.name} booked successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
        {/* Header - Fixed */}
        <div className="flex-none bg-gradient-to-r from-blue-600 to-teal-600 dark:from-teal-600 dark:to-emerald-600 text-white px-5 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <img src={lawyer.avatar} alt={lawyer.name} className="w-10 h-10 rounded-full border-2 border-white/30" />
            <div>
              <h2 className="text-base font-bold leading-tight">Book Consultation</h2>
              <p className="text-xs text-blue-100 dark:text-teal-100 leading-tight">with {lawyer.name} ({lawyer.specialization[0]})</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white rounded-full p-1 transition-all hover:bg-white/10">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <form onSubmit={handleSubmit} id="booking-form" className="p-5 space-y-4">
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300 text-xs">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Side */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1.5">
                    📅 Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    name="scheduledAt"
                    value={formData.scheduledAt}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-500 text-sm"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1.5">
                    ⏱️ Duration
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[30, 60, 90, 120].map((dur) => (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, duration: dur }))}
                        className={`py-2 px-1 border rounded-lg text-xs font-medium transition-all ${formData.duration === dur
                            ? 'border-blue-600 dark:border-teal-500 bg-blue-50 dark:bg-teal-900/20 text-blue-700 dark:text-teal-400'
                            : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 hover:border-blue-300 dark:hover:border-teal-700'
                          }`}
                      >
                        {dur === 30 ? '30m' : dur === 60 ? '1h' : dur === 90 ? '1.5h' : '2h'}
                        {' - '}
                        {((lawyer.hourlyRate / 60) * dur).toFixed(0)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1.5">
                    💻 Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, type: 'video' }))}
                      className={`py-2.5 border-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-2 ${formData.type === 'video'
                          ? 'border-blue-600 dark:border-teal-500 bg-blue-50 dark:bg-teal-900/20 text-blue-700 dark:text-teal-400'
                          : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400'
                        }`}
                    >
                      <span className="text-lg">📹</span> Video Call
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, type: 'in-person' }))}
                      className={`py-2.5 border-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-2 ${formData.type === 'in-person'
                          ? 'border-blue-600 dark:border-teal-500 bg-blue-50 dark:bg-teal-900/20 text-blue-700 dark:text-teal-400'
                          : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400'
                        }`}
                    >
                      <span className="text-lg">🏢</span> In-Person
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1.5">
                    📝 Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Describe your case..."
                    disabled={isSubmitting}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-500 text-sm resize-none"
                  />
                </div>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 dark:text-slate-500 text-center pt-2">
              By confirming, you agree to the terms of service and cancellation policy.
            </p>
          </form>
        </div>

        {/* Footer - Fixed */}
        <div className="flex-none p-4 border-t border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50 rounded-b-2xl">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-xs text-gray-500 dark:text-slate-400">Total Payment</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                {((lawyer.hourlyRate / 60) * formData.duration).toFixed(0)} {getCurrency()}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2.5 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit} // Trigger form submit via button click
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-teal-600 dark:from-teal-600 dark:to-emerald-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 dark:shadow-teal-500/30 transition-all transform active:scale-95 text-sm"
              >
                {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
