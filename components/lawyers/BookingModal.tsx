'use client';

import React, { useState } from 'react';
import { Lawyer, Booking } from '@/types';
import { useLawyerStore } from '@/lib/store/lawyer-store';
import { useAuthStore } from '@/lib/store/auth-store';
import { X, CheckCircle, Calendar, Clock, Monitor, Video, Building, FileText, ArrowRight, Lock, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

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
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'mtn' | 'orange' | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const [formData, setFormData] = useState({
    scheduledAt: '',
    duration: 60,
    type: 'video' as 'video' | 'in-person',
    notes: '',
  });

  // Role check: Only citizens and NGOs can book consultations
  const isEligible = user?.role === 'citizen' || user?.role === 'ngo';

  const getMinDateTime = () => {
    const minDate = new Date(Date.now() + 16 * 60000); // 16 minutes in advance
    // Format to YYYY-MM-DDTHH:MM local time
    const pad = (n: number) => n.toString().padStart(2, '0');
    const yyyy = minDate.getFullYear();
    const mm = pad(minDate.getMonth() + 1);
    const dd = pad(minDate.getDate());
    const hh = pad(minDate.getHours());
    const min = pad(minDate.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) : value,
    }));
  };

  const handleProceedToPayment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      setError('Please sign in to book a consultation');
      toast.error('Please sign in to book a consultation');
      return;
    }
    if (!isEligible) {
      setError('Only Citizens and NGOs can book lawyer consultations.');
      toast.error('Only Citizens and NGOs can book lawyer consultations.');
      return;
    }
    if (!formData.scheduledAt) {
      setError('Please select a date and time');
      toast.error('Please select a date and time');
      return;
    }

    // Validate that the scheduled time is at least 15 minutes in advance in JS
    const selectedTime = new Date(formData.scheduledAt).getTime();
    const minAllowedTime = Date.now() + 15 * 60000;
    if (selectedTime < minAllowedTime) {
      setError('Bookings must be scheduled at least 15 minutes in advance');
      toast.error('Bookings must be scheduled at least 15 minutes in advance');
      return;
    }

    setError(null);
    setStep('payment');
  };

  const handlePay = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!paymentMethod) {
      setError('Please select a payment method');
      toast.error('Please select a payment method');
      return;
    }
    if (!phoneNumber || phoneNumber.length < 9) {
      setError('Please enter a valid phone number');
      toast.error('Please enter a valid phone number');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      // Mock payment delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const bookingData: Omit<Booking, 'id' | 'createdAt'> = {
        lawyerId: lawyer.id,
        userId: user!.id,
        scheduledAt: new Date(formData.scheduledAt).toISOString(),
        duration: formData.duration,
        type: formData.type,
        status: 'pending',
        notes: formData.notes || undefined,
        paymentMethod: 'mobile_money',
        fee: (lawyer.hourlyRate / 60) * formData.duration,
      };

      await createBooking(bookingData);
      setSuccess(true);
      setTimeout(() => {
        onBookingComplete();
        router.push('/bookings');
      }, 2000);
    } catch (err: any) {
      let msg = 'Payment or booking failed';
      if (err.detail) {
        if (typeof err.detail === 'string') {
          msg = err.detail;
        } else if (Array.isArray(err.detail)) {
          msg = err.detail.map((d: any) => d.msg || JSON.stringify(d)).join(', ');
        } else {
          msg = JSON.stringify(err.detail);
        }
      } else if (err.message) {
        msg = err.message;
      }
      setError(msg);
      toast.error(msg);

      // Auto-fallback to details tab if error is related to timing or scheduling conflict
      const lowerMsg = msg.toLowerCase();
      if (
        lowerMsg.includes('minutes in advance') ||
        lowerMsg.includes('already booked') ||
        lowerMsg.includes('slot') ||
        lowerMsg.includes('conflict')
      ) {
        setStep('details');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrency = () => {
    if (lawyer.location.includes('Nigeria')) return '₦';
    if (lawyer.location.includes('Ghana')) return 'GH₵';
    return 'FCFA';
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
        <div className="bg-[#FAF9F5] dark:bg-[#0E0F11] rounded-[2.5rem] p-10 text-center max-w-sm w-full shadow-2xl border border-[#E5E2DC] dark:border-stone-800/80">
          <div className="w-20 h-20 bg-[#B89868]/10 dark:bg-[#B89868]/20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-[#B89868] dark:text-[#C5A880]">
            <Lock className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white mb-3">Authentication Required</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">Please sign in to your account to book a consultation with {lawyer.name}.</p>
          <div className="flex flex-col gap-3">
            <Link href="/login">
              <button className="w-full py-4 bg-[#1C1B19] hover:bg-[#2C2A27] dark:bg-[#FAF9F5] dark:hover:bg-[#E5E2DC] text-[#FAF9F5] dark:text-[#121315] font-bold rounded-2xl flex items-center justify-center gap-2 transition-all">
                <LogIn size={20} />
                Sign In Now
              </button>
            </Link>
            <button onClick={onClose} className="text-sm font-bold text-slate-500 dark:text-slate-400 py-2">Maybe Later</button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
        <div className="bg-[#FAF9F5] dark:bg-[#0E0F11] rounded-[2.5rem] p-10 text-center max-w-sm w-full shadow-2xl border border-[#E5E2DC] dark:border-stone-800/80">
          <div className="w-20 h-20 bg-gradient-to-br from-[#B89868] to-[#C5A880] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#B89868]/20 animate-bounce">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white mb-3">Booking Confirmed!</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed tabular-nums">Consultation with {lawyer.name} booked successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <form 
        onSubmit={(e) => e.preventDefault()}
        className="bg-[#FAF9F5] dark:bg-[#0E0F11] rounded-[2rem] shadow-2xl w-full max-w-2xl flex flex-col max-h-[95vh] border border-[#E5E2DC] dark:border-stone-850 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#B89868] to-[#C5A880] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={lawyer.avatar} alt={lawyer.name} className="w-12 h-12 rounded-2xl border-2 border-white/20 object-cover" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-[#0E0F11] rounded-full"></div>
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif leading-tight">Book Consultation</h2>
              <p className="text-sm text-[#FAF9F5]/90 font-medium">with {lawyer.name}</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          {!isEligible ? (
             <div className="h-full flex flex-col items-center justify-center text-center py-10 space-y-6">
                <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/20 rounded-3xl flex items-center justify-center text-amber-600 dark:text-amber-500">
                  <Lock className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Professional Account Required</h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                    Consultation booking is currently limited to Citizens and NGO accounts.
                  </p>
                </div>
                <div className="p-4 bg-[#FAF9F5] dark:bg-stone-900 border border-[#E5E2DC] dark:border-stone-850 rounded-2xl text-xs font-medium text-slate-500">
                  Your current role: <span className="text-[#B89868] dark:text-[#C5A880] uppercase">{user?.role}</span>
                </div>
             </div>
          ) : step === 'details' ? (
            <div className="space-y-8 animate-in slide-in-from-right-2">
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
                      <Calendar size={16} className="text-[#B89868] dark:text-[#C5A880]" />
                      Preferred Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      name="scheduledAt"
                      value={formData.scheduledAt}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      min={getMinDateTime()}
                      className="w-full px-4 py-3 bg-[#FAF9F5] dark:bg-stone-900 border border-[#E5E2DC] dark:border-stone-850 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B89868]/25 focus:border-[#B89868] transition-all font-medium tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Clock size={16} className="text-[#B89868] dark:text-[#C5A880]" />
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
                              ? 'border-[#B89868] dark:border-[#C5A880] bg-[#B89868]/5 dark:bg-[#C5A880]/10 text-[#B89868] dark:text-[#C5A880] shadow-md shadow-[#B89868]/5'
                              : 'border-[#E5E2DC] dark:border-stone-850 text-stone-600 dark:text-stone-400 hover:bg-[#FAF9F5] dark:hover:bg-stone-900'
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
                      <Monitor size={16} className="text-[#B89868] dark:text-[#C5A880]" />
                      Meeting Format
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, type: 'video' }))}
                        className={`flex-1 flex flex-col items-center justify-center p-4 border-2 rounded-2xl transition-all gap-2 ${
                          formData.type === 'video'
                            ? 'border-[#B89868] dark:border-[#C5A880] bg-[#B89868]/5 dark:bg-[#C5A880]/10 text-[#B89868] dark:text-[#C5A880] shadow-lg shadow-[#B89868]/5'
                            : 'border-[#E5E2DC] dark:border-stone-850 text-slate-500 dark:text-slate-400 hover:bg-[#FAF9F5] dark:hover:bg-stone-900'
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
                            ? 'border-[#B89868] dark:border-[#C5A880] bg-[#B89868]/5 dark:bg-[#C5A880]/10 text-[#B89868] dark:text-[#C5A880] shadow-lg shadow-[#B89868]/5'
                            : 'border-[#E5E2DC] dark:border-stone-850 text-slate-500 dark:text-slate-400 hover:bg-[#FAF9F5] dark:hover:bg-stone-900'
                        }`}
                      >
                        <Building size={24} />
                        <span className="text-xs font-bold">In-Person</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <FileText size={16} className="text-[#B89868] dark:text-[#C5A880]" />
                      Case Summary
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Briefly describe your legal needs..."
                      disabled={isSubmitting}
                      rows={3}
                      className="w-full px-4 py-3 bg-[#FAF9F5] dark:bg-stone-900 border border-[#E5E2DC] dark:border-stone-850 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B89868]/25 focus:border-[#B89868] transition-all font-medium text-sm resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-right-2">
              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-red-700 dark:text-red-400 text-sm font-medium animate-in slide-in-from-top-2">
                  {error}
                </div>
              )}
              
              <div className="max-w-md mx-auto space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Select Payment Method</h3>
                  <p className="text-sm text-slate-500">Securely pay via Mobile Money</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mtn')}
                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-2xl transition-all gap-3 ${
                      paymentMethod === 'mtn'
                        ? 'border-[#FFCC00] bg-[#FFCC00]/10 text-slate-900 dark:text-white shadow-lg shadow-[#FFCC00]/10'
                        : 'border-[#E5E2DC] dark:border-stone-850 opacity-60 hover:opacity-100 hover:bg-stone-50 dark:hover:bg-stone-900 text-slate-500'
                    }`}
                  >
                    <div className="w-12 h-12 bg-[#FFCC00] rounded-full flex items-center justify-center font-bold text-slate-900">MTN</div>
                    <span className="text-xs font-bold">MTN MoMo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('orange')}
                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-2xl transition-all gap-3 ${
                      paymentMethod === 'orange'
                        ? 'border-[#FF6600] bg-[#FF6600]/10 text-slate-900 dark:text-white shadow-lg shadow-[#FF6600]/10'
                        : 'border-[#E5E2DC] dark:border-stone-850 opacity-60 hover:opacity-100 hover:bg-stone-50 dark:hover:bg-stone-900 text-slate-500'
                    }`}
                  >
                    <div className="w-12 h-12 bg-[#FF6600] rounded-full flex items-center justify-center font-bold text-white">OM</div>
                    <span className="text-xs font-bold">Orange Money</span>
                  </button>
                </div>

                {paymentMethod && (
                  <div className="mt-6 animate-in fade-in zoom-in-95 duration-200">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 block">
                      Mobile Number
                    </label>
                    <div className="flex shadow-sm rounded-xl">
                      <div className="flex items-center justify-center px-4 bg-stone-100 dark:bg-stone-800 border border-r-0 border-[#E5E2DC] dark:border-stone-850 rounded-l-xl text-slate-500 font-bold">
                        +237
                      </div>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder={paymentMethod === 'mtn' ? '650 000 000' : '690 000 000'}
                        disabled={isSubmitting}
                        maxLength={9}
                        className="w-full px-4 py-3 bg-[#FAF9F5] dark:bg-stone-900 border border-[#E5E2DC] dark:border-stone-850 text-slate-900 dark:text-white rounded-r-xl focus:outline-none focus:ring-2 focus:ring-[#B89868]/25 focus:border-[#B89868] transition-all font-bold tracking-wider"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#FAF9F5] dark:bg-stone-900/30 p-6 border-t border-[#E5E2DC] dark:border-stone-850">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Estimated Cost</p>
              <p className="text-2xl font-display font-bold text-slate-900 dark:text-white tabular-nums">
                {((lawyer.hourlyRate / 60) * formData.duration).toFixed(0)} <span className="text-sm font-sans font-medium text-slate-500">{getCurrency()}</span>
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {step === 'payment' && isEligible ? (
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none px-6 py-3.5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Back
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none px-6 py-3.5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {isEligible ? 'Cancel' : 'Close'}
                </button>
              )}
              {isEligible && step === 'details' && (
                <button
                  type="button"
                  onClick={handleProceedToPayment}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center px-10 py-3.5 bg-[#1C1B19] hover:bg-[#2C2A27] dark:bg-[#FAF9F5] dark:hover:bg-[#E5E2DC] text-[#FAF9F5] dark:text-[#121315] font-bold rounded-2xl hover:shadow-[#B89868]/10 transition-all shadow-lg group disabled:opacity-50"
                >
                  Proceed to Payment
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
              {isEligible && step === 'payment' && (
                <button
                  type="button"
                  onClick={handlePay}
                  disabled={isSubmitting || !paymentMethod || phoneNumber.length < 9}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center px-10 py-3.5 bg-[#1C1B19] hover:bg-[#2C2A27] dark:bg-[#FAF9F5] dark:hover:bg-[#E5E2DC] text-[#FAF9F5] dark:text-[#121315] font-bold rounded-2xl hover:shadow-[#B89868]/10 transition-all shadow-lg group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white dark:border-slate-900/30 dark:border-t-slate-900 rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Pay {((lawyer.hourlyRate / 60) * formData.duration).toFixed(0)} {getCurrency()}
                      <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingModal;
