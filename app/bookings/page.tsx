'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLawyerStore } from '@/lib/store/lawyer-store';
import { useAuthStore } from '@/lib/store/auth-store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, MapPin, AlertCircle, CalendarDays } from 'lucide-react';
import toast from 'react-hot-toast';

const BookingsPage: React.FC = () => {
  const { bookings, fetchUserBookings, cancelBooking, isLoading, error, clearError } =
    useLawyerStore();
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [cancelConfirmId, setCancelConfirmId] = useState<string | null>(null);

  const upcomingBookings = bookings.filter(
    (b) => b.status === 'pending' || b.status === 'confirmed'
  );
  const pastBookings = bookings.filter(
    (b) => b.status === 'completed' || b.status === 'cancelled'
  );

  const displayedBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === 'lawyer' || user?.role === 'admin' || user?.role === 'government') {
        router.replace('/dashboard');
        return;
      }
      if (user?.id) {
        fetchUserBookings(user.id);
      }
    }
  }, [fetchUserBookings, user, isAuthenticated, router]);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'completed': return 'info';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await cancelBooking(bookingId);
      toast.success('Booking cancelled successfully');
    } catch (err) {
      toast.error('Failed to cancel booking');
    }
  };

  const handleJoinCall = (bookingId: string) => {
    window.open(`/call/${bookingId}`, '_blank');
  };

  return (
    <div className="min-h-screen animate-fade-in bg-[#FAF9F5] dark:bg-[#121315]">
      {/* Header */}
      <div className="relative overflow-hidden bg-[#121315] border border-[#E5E2DC]/10 dark:border-stone-850 text-white py-12 px-4 rounded-2xl mb-8 shadow-sm">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 border border-[#B89868]/30 rounded-xl mb-4 bg-stone-900/60 shadow-sm">
            <CalendarDays className="h-6 w-6 text-[#B89868]" />
          </div>
          <h1 className="text-4xl font-serif font-bold mb-4 tracking-tight text-[#FAF9F5]">My Bookings</h1>
          <p className="text-stone-300 text-base max-w-2xl mx-auto font-normal">
            Manage your upcoming consultations and view past appointments with your legal companions.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-[#FDFCF9] dark:bg-stone-900/20 border border-red-200 dark:border-red-900/30 rounded-xl text-red-600 dark:text-red-400 flex justify-between items-center shadow-sm">
            <span className="flex items-center gap-2 font-medium text-sm">
              <AlertCircle className="h-5 w-5 text-red-500" />
              {error}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearError}
              className="text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-white rounded-lg"
            >
              Dismiss
            </Button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin inline-flex items-center justify-center w-12 h-12 border-4 border-[#B89868] border-t-transparent rounded-full mb-4"></div>
            <p className="text-stone-500 dark:text-stone-400 font-medium">Loading your bookings...</p>
          </div>
        )}

        {/* Tab Switcher */}
        {!isLoading && bookings.length > 0 && (
          <div className="flex border-b border-[#E5E2DC]/80 dark:border-stone-800 mb-8 w-full">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-3 px-6 font-semibold text-sm transition-all border-b-2 -mb-[2px] ${
                activeTab === 'upcoming'
                  ? 'border-[#B89868] text-[#B89868]'
                  : 'border-transparent text-stone-500 hover:text-stone-850 dark:hover:text-white'
              }`}
            >
              Upcoming consultations ({upcomingBookings.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`py-3 px-6 font-semibold text-sm transition-all border-b-2 -mb-[2px] ${
                activeTab === 'past'
                  ? 'border-[#B89868] text-[#B89868]'
                  : 'border-transparent text-stone-500 hover:text-stone-850 dark:hover:text-white'
              }`}
            >
              Past & Cancelled ({pastBookings.length})
            </button>
          </div>
        )}

        {/* Bookings List */}
        {!isLoading && displayedBookings.length > 0 && (
          <div className="space-y-6 animate-fade-in">
            {displayedBookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-all duration-300 border-[#E5E2DC] dark:border-stone-800 overflow-hidden bg-[#FDFCF9] dark:bg-stone-900/20 rounded-2xl animate-fade-in">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Status Strip */}
                    <div className={`w-full md:w-2 h-2 md:h-auto ${booking.status === 'confirmed' ? 'bg-emerald-500' :
                      booking.status === 'pending' ? 'bg-[#B89868]' :
                      booking.status === 'cancelled' ? 'bg-stone-400' :
                      'bg-[#1C1B19]'
                      }`}></div>

                    <div className="p-6 flex-1 flex flex-col md:flex-row gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-3">
                            {booking.lawyerAvatar ? (
                              <img
                                src={booking.lawyerAvatar}
                                alt={booking.lawyerName || 'Lawyer'}
                                className="w-10 h-10 rounded-full object-cover border border-[#E5E2DC] dark:border-stone-700 shadow-sm"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-[#FAF9F5] dark:bg-stone-800 flex items-center justify-center border border-[#E5E2DC] dark:border-stone-700">
                                <span className="text-xs font-bold text-[#B89868]">
                                  {(booking.lawyerName || 'L').charAt(0)}
                                </span>
                              </div>
                            )}
                            <div>
                              <h3 className="text-lg font-semibold text-[#121315] dark:text-[#FAF9F5]">
                                {booking.lawyerName || 'Lawyer Consultation'}
                              </h3>
                            </div>
                          </div>
                          <Badge variant={getStatusVariant(booking.status) as any} className="capitalize px-3 py-1 rounded-lg">
                            {booking.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-stone-600 dark:text-stone-450 font-sans">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-[#B89868]" />
                            <span className="font-medium text-stone-850 dark:text-white">
                              {new Date(booking.scheduledAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-[#B89868]" />
                            <span className="font-medium text-stone-850 dark:text-white">
                              {new Date(booking.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({booking.duration} min)
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {booking.type === 'video' ? <Video className="h-4 w-4 text-[#B89868]" /> : <MapPin className="h-4 w-4 text-[#B89868]" />}
                            <span className="font-medium text-stone-850 dark:text-white capitalize">
                              {booking.type === 'video' ? 'Video Call' : 'In-Person Meeting'}
                            </span>
                          </div>
                        </div>

                        {booking.notes && (
                          <div className="p-4 bg-[#FAF9F5] dark:bg-stone-950/40 rounded-xl border border-[#E5E2DC] dark:border-stone-850 text-sm text-stone-600 dark:text-stone-300 italic font-sans">
                            "{booking.notes}"
                          </div>
                        )}
                      </div>

                      <div className="flex flex-row md:flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-[#E5E2DC] dark:border-stone-850 pt-4 md:pt-0 md:pl-6 min-w-[160px]">
                        {booking.status === 'pending' && (
                          <>
                            <Button className="w-full bg-[#1C1B19] hover:bg-[#2C2A27] dark:bg-[#FAF9F5] dark:hover:bg-[#E5E2DC] text-[#FAF9F5] dark:text-[#121315] rounded-xl font-semibold shadow-sm transition-all duration-300">
                              View Details
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/20 border-red-200 dark:border-red-900/30 rounded-xl font-semibold transition-all duration-300 animate-fade-in"
                              onClick={() => setCancelConfirmId(booking.id)}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <>
                            <Button
                              onClick={() => handleJoinCall(booking.id)}
                              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-sm transition-all duration-300 animate-fade-in"
                            >
                              Join Call
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/20 border-red-200 dark:border-red-900/30 rounded-xl font-semibold transition-all duration-300"
                              onClick={() => setCancelConfirmId(booking.id)}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        {(booking.status === 'completed' || booking.status === 'cancelled') && (
                          <Button variant="secondary" disabled className="w-full opacity-60 dark:bg-stone-800 dark:text-stone-400 rounded-xl font-semibold">
                            {booking.status === 'completed' ? 'Completed' : 'Cancelled'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && (bookings.length === 0 || displayedBookings.length === 0) && (
          <div className="text-center py-16 bg-[#FDFCF9] dark:bg-stone-900/10 rounded-2xl border border-dashed border-[#E5E2DC] dark:border-stone-800 shadow-sm animate-fade-in">
            <div className="w-16 h-16 bg-[#FAF9F5] dark:bg-stone-900/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#E5E2DC] dark:border-stone-850">
              <Calendar className="h-8 w-8 text-stone-400" />
            </div>
            <h2 className="text-2xl font-bold font-serif text-[#121315] dark:text-[#FAF9F5] mb-2">
              {bookings.length === 0 ? 'No bookings yet' : activeTab === 'upcoming' ? 'No upcoming consultations' : 'No past history'}
            </h2>
            <p className="text-stone-500 dark:text-stone-400 mb-8 max-w-md mx-auto font-normal text-sm font-sans leading-relaxed">
              {bookings.length === 0 
                ? "You haven't scheduled any consultations yet. Find a legal companion to get started on your path."
                : activeTab === 'upcoming'
                  ? "You don't have any upcoming scheduled consultations. Find a legal companion to book a session."
                  : "You don't have any past completed or cancelled consultations in your record."}
            </p>
            {(bookings.length === 0 || (activeTab === 'upcoming' && displayedBookings.length === 0)) && (
              <Button
                className="bg-[#1C1B19] hover:bg-[#2C2A27] dark:bg-[#FAF9F5] dark:hover:bg-[#E5E2DC] text-[#FAF9F5] dark:text-[#121315] rounded-xl font-semibold shadow-sm transition-all duration-300 px-8 py-5 h-auto text-base"
                onClick={() => window.location.href = '/lawyers'}
              >
                Find a Lawyer
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Custom Confirmation Modal */}
      {cancelConfirmId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-[#FAF9F5] dark:bg-[#0E0F11] rounded-[2rem] p-8 max-w-sm w-full shadow-2xl border border-[#E5E2DC] dark:border-stone-850 animate-scale-in">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-950/20 text-red-600 dark:text-red-450 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white text-center mb-2">Cancel Consultation?</h2>
            <p className="text-sm text-slate-650 dark:text-slate-400 text-center mb-6 leading-relaxed font-sans">
              Are you sure you want to cancel this consultation? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setCancelConfirmId(null)}
                className="flex-1 rounded-xl py-3 font-semibold border-[#E5E2DC] dark:border-stone-800 dark:text-stone-300 dark:hover:bg-stone-900 font-sans"
              >
                No, Keep
              </Button>
              <Button
                onClick={() => {
                  const id = cancelConfirmId;
                  setCancelConfirmId(null);
                  handleCancelBooking(id);
                }}
                className="flex-1 rounded-xl py-3 font-semibold bg-red-600 hover:bg-red-700 text-white font-sans"
              >
                Yes, Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
