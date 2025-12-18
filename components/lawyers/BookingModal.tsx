'use client';

import React, { useState } from 'react';
import { Lawyer, Booking } from '@/types';
import { useLawyerStore } from '@/lib/store/lawyer-store';
import { X, CheckCircle, Calendar, Clock, Monitor, Video, Building, FileText, ArrowRight } from 'lucide-react';

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
        userId: 'user-id', // This should come from auth store
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
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 text-center max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-800">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/20 animate-bounce">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Booking Confirmed!</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed tabular-nums">Consultation with {lawyer.name} booked successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl w-full max-w-2xl flex flex-col max-h-[95vh] border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 dark:from-teal-600 dark:to-emerald-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={lawyer.avatar} alt={lawyer.name} className="w-12 h-12 rounded-2xl border-2 border-white/20 object-cover" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-teal-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight">Book Consultation</h2>
              <p className="text-sm text-blue-100 dark:text-teal-100 font-medium">with {lawyer.name}</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-red-700 dark:text-red-400 text-sm font-medium animate-in slide-in-from-top-2">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Date Selection */}
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Calendar size={16} className="text-blue-600 dark:text-teal-400" />
                    Preferred Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="scheduledAt"
                    value={formData.scheduledAt}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-teal-500 transition-all font-medium tabular-nums"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Clock size={16} className="text-blue-600 dark:text-teal-400" />
                    Session Duration
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[30, 60, 90, 120].map((dur) => (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, duration: dur }))}
                        className={`py-3 px-2 border rounded-xl text-sm font-bold transition-all tabular-nums ${
                          formData.duration === dur
                            ? 'border-blue-600 dark:border-teal-500 bg-blue-50 dark:bg-teal-900/30 text-blue-700 dark:text-teal-400 shadow-md shadow-blue-500/10'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        {dur === 30 ? '30m' : dur === 60 ? '1h' : dur === 90 ? '1.5h' : '2h'}
                        <span className="block text-[10px] opacity-60 mt-0.5">
                          {((lawyer.hourlyRate / 60) * dur).toFixed(0)} {getCurrency()}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Type Selection */}
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Monitor size={16} className="text-blue-600 dark:text-teal-400" />
                    Meeting Format
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, type: 'video' }))}
                      className={`flex-1 flex flex-col items-center justify-center p-4 border-2 rounded-2xl transition-all gap-2 ${
                        formData.type === 'video'
                          ? 'border-blue-600 dark:border-teal-500 bg-blue-50 dark:bg-teal-900/30 text-blue-700 dark:text-teal-400 shadow-lg shadow-blue-500/10'
                          : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Video size={24} />
                      <span className="text-xs font-bold">Video Call</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, type: 'in-person' }))}
                      className={`flex-1 flex flex-col items-center justify-center p-4 border-2 rounded-2xl transition-all gap-2 ${
                        formData.type === 'in-person'
                          ? 'border-blue-600 dark:border-teal-500 bg-blue-50 dark:bg-teal-900/30 text-blue-700 dark:text-teal-400 shadow-lg shadow-blue-500/10'
                          : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Building size={24} />
                      <span className="text-xs font-bold">In-Person</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <FileText size={16} className="text-blue-600 dark:text-teal-400" />
                    Case Summary
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Briefly describe your legal needs..."
                    disabled={isSubmitting}
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-teal-500 transition-all font-medium text-sm resize-none"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Estimated Cost</p>
              <p className="text-2xl font-display font-bold text-slate-900 dark:text-white tabular-nums">
                {((lawyer.hourlyRate / 60) * formData.duration).toFixed(0)} <span className="text-sm font-sans font-medium text-slate-500">{getCurrency()}</span>
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 sm:flex-none px-6 py-3.5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-10 py-3.5 bg-blue-600 dark:bg-teal-600 text-white font-bold rounded-2xl hover:bg-blue-700 dark:hover:bg-teal-700 transition-all shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-teal-500/25 group disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Confirm Booking
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
