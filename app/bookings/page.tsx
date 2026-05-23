'use client';

import React, { useEffect } from 'react';
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

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchUserBookings(user.id);
    }
  }, [fetchUserBookings, user?.id, isAuthenticated]);

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
    if (confirm('Are you sure you want to cancel this booking?')) {
      try {
        await cancelBooking(bookingId);
        toast.success('Booking cancelled successfully');
      } catch (err) {
        toast.error('Failed to cancel booking');
      }
    }
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

        {/* Bookings List */}
        {!isLoading && bookings.length > 0 && (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-all duration-300 border-[#E5E2DC] dark:border-stone-800 overflow-hidden bg-[#FDFCF9] dark:bg-stone-900/20 rounded-2xl">
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
                          <h3 className="text-xl font-bold font-serif text-[#121315] dark:text-[#FAF9F5]">
                            Lawyer Consultation
                          </h3>
                          <Badge variant={getStatusVariant(booking.status) as any} className="capitalize px-3 py-1 rounded-lg">
                            {booking.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-stone-600 dark:text-stone-450">
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
                          <div className="p-4 bg-[#FAF9F5] dark:bg-stone-950/40 rounded-xl border border-[#E5E2DC] dark:border-stone-850 text-sm text-stone-600 dark:text-stone-300 italic">
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
                              className="w-full text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/20 border-red-200 dark:border-red-900/30 rounded-xl font-semibold transition-all duration-300"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <>
                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-sm transition-all duration-300">
                              Join Call
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/20 border-red-200 dark:border-red-900/30 rounded-xl font-semibold transition-all duration-300"
                              onClick={() => handleCancelBooking(booking.id)}
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
        {!isLoading && bookings.length === 0 && (
          <div className="text-center py-16 bg-[#FDFCF9] dark:bg-stone-900/10 rounded-2xl border border-dashed border-[#E5E2DC] dark:border-stone-800 shadow-sm">
            <div className="w-16 h-16 bg-[#FAF9F5] dark:bg-stone-900/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#E5E2DC] dark:border-stone-850">
              <Calendar className="h-8 w-8 text-stone-400" />
            </div>
            <h2 className="text-2xl font-bold font-serif text-[#121315] dark:text-[#FAF9F5] mb-2">No bookings yet</h2>
            <p className="text-stone-555 dark:text-stone-400 mb-8 max-w-md mx-auto font-normal text-sm">
              You haven't scheduled any consultations yet. Find a legal companion to get started on your path.
            </p>
            <Button
              className="bg-[#1C1B19] hover:bg-[#2C2A27] dark:bg-[#FAF9F5] dark:hover:bg-[#E5E2DC] text-[#FAF9F5] dark:text-[#121315] rounded-xl font-semibold shadow-sm transition-all duration-300 px-8 py-5 h-auto text-base"
              onClick={() => window.location.href = '/lawyers'}
            >
              Find a Lawyer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
