'use client';

import React, { useEffect } from 'react';
import { useLawyerStore } from '@/lib/store/lawyer-store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, MapPin, AlertCircle, CalendarDays } from 'lucide-react';
import toast from 'react-hot-toast';

const BookingsPage: React.FC = () => {
  const { bookings, fetchUserBookings, cancelBooking, isLoading, error, clearError } =
    useLawyerStore();

  useEffect(() => {
    // Replace with actual user ID from auth
    fetchUserBookings('user-id');
  }, [fetchUserBookings]);

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
    <div className="min-h-screen animate-fade-in bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-teal-600 dark:from-teal-600 dark:via-emerald-600 dark:to-cyan-700 text-white py-12 px-4 rounded-xl mb-8 shadow-lg">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-4 backdrop-blur-sm">
            <CalendarDays className="h-6 w-6 text-blue-300 dark:text-emerald-300" />
          </div>
          <h1 className="text-4xl font-bold mb-4 tracking-tight">My Bookings</h1>
          <p className="text-blue-50 text-lg max-w-2xl mx-auto">
            Manage your upcoming consultations and view past appointments.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 pb-12">
        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-800 dark:text-red-300 flex justify-between items-center shadow-sm">
            <span className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              {error}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearError}
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40"
            >
              Dismiss
            </Button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin inline-flex items-center justify-center w-12 h-12 border-4 border-blue-600 dark:border-teal-500 border-t-transparent rounded-full mb-4"></div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Loading your bookings...</p>
          </div>
        )}

        {/* Bookings List */}
        {!isLoading && bookings.length > 0 && (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800/50">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Status Strip */}
                    <div className={`w-full md:w-2 h-2 md:h-auto ${booking.status === 'confirmed' ? 'bg-green-500 dark:bg-emerald-500' :
                      booking.status === 'pending' ? 'bg-yellow-500 dark:bg-amber-500' :
                        booking.status === 'cancelled' ? 'bg-red-500' :
                          'bg-blue-500 dark:bg-teal-500'
                      }`}></div>

                    <div className="p-6 flex-1 flex flex-col md:flex-row gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            Lawyer Consultation
                          </h3>
                          <Badge variant={getStatusVariant(booking.status) as any} className="capitalize px-3 py-1">
                            {booking.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-400">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-blue-600 dark:text-teal-500" />
                            <span className="font-medium text-slate-900 dark:text-white">
                              {new Date(booking.scheduledAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-600 dark:text-teal-500" />
                            <span className="font-medium text-slate-900 dark:text-white">
                              {new Date(booking.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({booking.duration} min)
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {booking.type === 'video' ? <Video className="h-4 w-4 text-blue-600 dark:text-teal-500" /> : <MapPin className="h-4 w-4 text-blue-600 dark:text-teal-500" />}
                            <span className="font-medium text-slate-900 dark:text-white capitalize">
                              {booking.type === 'video' ? 'Video Call' : 'In-Person Meeting'}
                            </span>
                          </div>
                        </div>

                        {booking.notes && (
                          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 italic">
                            "{booking.notes}"
                          </div>
                        )}
                      </div>

                      <div className="flex flex-row md:flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-700 pt-4 md:pt-0 md:pl-6 min-w-[160px]">
                        {booking.status === 'pending' && (
                          <>
                            <Button className="w-full bg-blue-600 dark:bg-teal-600 hover:bg-blue-700 dark:hover:bg-teal-700">
                              View Details
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-800"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <>
                            <Button className="w-full bg-green-600 dark:bg-emerald-600 hover:bg-green-700 dark:hover:bg-emerald-700">
                              Join Call
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-800"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        {(booking.status === 'completed' || booking.status === 'cancelled') && (
                          <Button variant="secondary" disabled className="w-full opacity-70 dark:bg-slate-700 dark:text-slate-400">
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
          <div className="text-center py-16 bg-white dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-slate-400 dark:text-slate-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No bookings yet</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
              You haven't scheduled any consultations yet. Find a lawyer to get started.
            </p>
            <Button
              className="bg-blue-600 dark:bg-gradient-to-r dark:from-teal-600 dark:to-emerald-600 hover:bg-blue-700 dark:hover:from-teal-700 dark:hover:to-emerald-700 px-8"
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
