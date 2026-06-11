import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Users,
  Coins,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Booking, User } from '@/types';
import apiClient from '@/lib/api-client';
import toast from 'react-hot-toast';

interface LawyerDashboardProps {
  user: User;
}

export const LawyerDashboard: React.FC<LawyerDashboardProps> = ({ user }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLawyerVerified, setIsLawyerVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [declineBookingId, setDeclineBookingId] = useState<string | null>(null);
  const [declineReason, setDeclineReason] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    earnings: 0
  });

  const loadLawyerData = async () => {
    try {
      setIsLoading(true);
      // Fetch lawyer profile
      const profile = await apiClient.getLawyerById(user.id);
      setIsLawyerVerified(profile.verified);

      // Fetch bookings for this lawyer
      const bookingsResponse = await apiClient.getLawyerBookings(user.id);
      const fetchedBookings = bookingsResponse.data || [];
      setBookings(fetchedBookings);

      // Compute stats
      const pendingCount = fetchedBookings.filter(b => b.status === 'pending').length;
      const confirmedCount = fetchedBookings.filter(b => b.status === 'confirmed').length;
      const completedCount = fetchedBookings.filter(b => b.status === 'completed').length;
      
      const rate = profile.hourlyRate || 15000;
      const totalEarnings = fetchedBookings
        .filter(b => b.status === 'completed')
        .reduce((sum, b) => {
          // Use explicit booking fee if defined and valid; otherwise compute proportionally using duration
          if (b.fee && b.fee > 0) {
            return sum + b.fee;
          }
          const sessionDuration = b.duration || 30;
          return sum + (sessionDuration / 60) * rate;
        }, 0);

      setStats({
        total: fetchedBookings.length,
        pending: pendingCount,
        confirmed: confirmedCount,
        completed: completedCount,
        earnings: Math.round(totalEarnings)
      });
    } catch (err) {
      console.error('Failed to load lawyer dashboard data:', err);
      toast.error('Failed to sync dashboard details with the server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLawyerData();
  }, [user.id]);

  const handleUpdateStatus = async (bookingId: string, newStatus: 'confirmed' | 'cancelled', notes?: string) => {
    try {
      await apiClient.updateBookingStatus(bookingId, newStatus, notes);
      toast.success(newStatus === 'confirmed' ? 'Booking approved successfully!' : 'Booking declined.');
      loadLawyerData();
    } catch (err) {
      console.error('Failed to update booking status:', err);
      toast.error('Failed to update booking status.');
    }
  };

  const handleJoinCall = (bookingId: string) => {
    window.open(`/call/${bookingId}`, '_blank');
  };

  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const activeBookings = bookings.filter(b => b.status === 'confirmed');

  return (
    <div className="space-y-8 animate-fade-in pb-12 relative">
      {/* Verification Warning Banner */}
      {!isLawyerVerified && !isLoading && (
        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 p-5 rounded-2xl flex items-start gap-4 shadow-sm">
          <AlertTriangle className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold font-serif text-base">Account Pending Manual Verification</h4>
            <p className="text-sm text-stone-600 dark:text-stone-300 font-normal leading-relaxed">
              Your credentials are being reviewed by the LegalHub administrator. You cannot be searched by citizens or receive bookings online until approved. Thank you for your patience.
            </p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Booking Requests', value: stats.pending, detail: 'Awaiting approval', icon: Calendar, color: 'text-amber-500' },
          { label: 'Confirmed Meetings', value: stats.confirmed, detail: 'Upcoming sessions', icon: CheckCircle, color: 'text-emerald-500' },
          { label: 'Completed Consults', value: stats.completed, detail: 'Total resolved', icon: Users, color: 'text-[#B89868]' },
          { label: 'Estimated Revenue', value: `${stats.earnings.toLocaleString()} FCFA`, detail: 'From completed consults', icon: Coins, color: 'text-[#C5A880]' },
        ].map((stat, idx) => (
          <Card key={idx} className="border-[#E5E2DC] dark:border-stone-800 bg-[#FDFCF9] dark:bg-stone-900/10 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden group">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">{stat.label}</p>
                <p className="text-3xl font-bold font-serif text-[#121315] dark:text-[#FAF9F5]">{isLoading ? '...' : stat.value}</p>
                <span className="text-[10px] text-stone-400 font-medium">{stat.detail}</span>
              </div>
              <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-[#FAF9F5] dark:bg-stone-950/40 border border-[#E5E2DC] dark:border-stone-850 group-hover:scale-105 transition-all">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column: Pending Requests */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-[#E5E2DC] dark:border-stone-800 bg-[#FDFCF9] dark:bg-stone-900/10 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="p-6 pb-2">
              <CardTitle className="text-2xl font-serif font-bold text-[#121315] dark:text-[#FAF9F5] tracking-tight">Booking Approvals</CardTitle>
              <CardDescription className="text-stone-500 dark:text-stone-400">Review and approve incoming consultation requests.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin inline-flex w-8 h-8 border-2 border-[#B89868] border-t-transparent rounded-full mb-2"></div>
                  <p className="text-sm text-stone-400">Loading bookings...</p>
                </div>
              ) : pendingBookings.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-[#E5E2DC] dark:border-stone-850 rounded-xl">
                  <MessageSquare className="h-8 w-8 text-stone-300 mx-auto mb-2" />
                  <p className="text-stone-400 font-semibold text-sm">No pending booking requests.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingBookings.map((b) => (
                    <div key={b.id} className="p-5 rounded-xl border border-[#E5E2DC] dark:border-stone-850 bg-[#FAF9F5] dark:bg-stone-950/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                          <span className="text-sm font-bold text-[#121315] dark:text-[#FAF9F5]">
                            {b.clientName || 'Anonymous Citizen'}
                          </span>
                          <Badge className="bg-[#FAF9F5] dark:bg-stone-900 border border-[#E5E2DC] dark:border-stone-800 text-[#B89868] capitalize text-[10px] py-0.5 px-2 rounded-md">{b.type}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-stone-500">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-[#B89868]" />
                            <span>{new Date(b.scheduledAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-[#B89868]" />
                            <span>{new Date(b.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({b.duration} min)</span>
                          </div>
                          {b.location && (
                            <div className="flex items-center gap-1.5 sm:col-span-2 mt-1">
                              <MapPin className="h-3.5 w-3.5 text-[#B89868]" />
                              <span>{b.location}</span>
                            </div>
                          )}
                        </div>
                        {b.notes && (
                          <div className="mt-2 text-xs text-stone-600 dark:text-stone-400 italic bg-white dark:bg-stone-900/30 p-2.5 rounded-lg border border-[#E5E2DC]/50 dark:border-stone-800">
                            "{b.notes}"
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 shrink-0 md:self-center">
                        <Button
                          onClick={() => handleUpdateStatus(b.id, 'confirmed')}
                          className="bg-[#B89868] hover:bg-[#A38253] text-white rounded-xl text-xs font-semibold px-4 py-2.5 shadow-sm active:scale-[0.98] transition-all"
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setDeclineBookingId(b.id)}
                          className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl text-xs font-semibold px-4 py-2.5 active:scale-[0.98] transition-all"
                        >
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: Confirmed Consultations */}
        <div className="space-y-8">
          <Card className="border-[#E5E2DC] dark:border-stone-800 bg-[#FDFCF9] dark:bg-stone-900/10 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="p-6 pb-2">
              <CardTitle className="text-lg font-serif font-bold text-[#121315] dark:text-[#FAF9F5] tracking-tight">Confirmed Meetings</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {isLoading ? (
                <p className="text-sm text-stone-400 text-center py-4">Syncing...</p>
              ) : activeBookings.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-6 w-6 text-stone-300 mx-auto mb-2" />
                  <p className="text-stone-400 text-xs font-medium">No confirmed sessions yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeBookings.map((b) => (
                    <div key={b.id} className="p-4 rounded-xl border border-[#E5E2DC] dark:border-stone-850 bg-[#FAF9F5] dark:bg-stone-950/20 space-y-3">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-[#121315] dark:text-[#FAF9F5]">
                          Meeting with {b.clientName || 'Citizen'}
                        </p>
                        <div className="flex items-center gap-1.5 text-[11px] text-stone-500 pt-0.5">
                          <Calendar className="h-3 w-3 text-[#B89868]" />
                          <span>{new Date(b.scheduledAt).toLocaleDateString()} at {new Date(b.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => handleJoinCall(b.id)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold py-2 flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
                      >
                        <Video className="h-4 w-4" />
                        Join Video Call
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Decline Booking Reason Modal */}
      {declineBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md p-6 rounded-3xl border border-[#E5E2DC] dark:border-stone-800/80 bg-white dark:bg-stone-950 backdrop-blur-xl shadow-2xl space-y-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-[#121315] dark:text-white">Decline Consultation</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Please provide a brief reason for declining this booking. This will be shared with the client.</p>
            </div>
            <textarea
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              placeholder="e.g., Scheduling conflict, personal emergency, or out of office..."
              className="w-full min-h-[100px] p-3 text-xs bg-white dark:bg-stone-900/40 border border-[#E5E2DC] dark:border-stone-850 focus:ring-2 focus:ring-[#B89868]/20 focus:border-[#B89868] outline-none transition-all rounded-xl dark:text-white resize-none"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setDeclineBookingId(null);
                  setDeclineReason('');
                }}
                className="rounded-xl text-xs font-semibold px-4 py-2 border-[#E5E2DC] dark:border-stone-800 hover:bg-[#FAF9F5] dark:hover:bg-stone-900 text-stone-600 dark:text-stone-300"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleUpdateStatus(declineBookingId, 'cancelled', declineReason);
                  setDeclineBookingId(null);
                  setDeclineReason('');
                }}
                disabled={!declineReason.trim()}
                className="bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold px-4 py-2 shadow-sm active:scale-[0.98] transition-all"
              >
                Decline Booking
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LawyerDashboard;
