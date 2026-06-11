'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth-store';
import apiClient from '@/lib/api-client';
import Script from 'next/script';
import { Button } from '@/components/ui/button';
import { Loader2, PhoneOff, Scale, FileText, X, Calendar, Clock, ShieldAlert, VideoOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CallRoomPage() {
  const { bookingId } = useParams() as { bookingId: string };
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  
  const [isInitializing, setIsInitializing] = useState(true);
  const [booking, setBooking] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [localNotes, setLocalNotes] = useState('');
  const [callState, setCallState] = useState<'loading' | 'not_found' | 'unauthorized' | 'not_confirmed' | 'ready'>('loading');
  
  const jitsiApiRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load saved local notepad content
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`call-notes-${bookingId}`);
      if (saved) setLocalNotes(saved);
    }
  }, [bookingId]);

  // 1. Fetch booking details to show on UI and gatekeep entry
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    if (!user?.id) {
      setCallState('unauthorized');
      setIsInitializing(false);
      return;
    }

    const loadBooking = async () => {
      try {
        setCallState('loading');
        const foundBooking = await apiClient.getBooking(bookingId);
        
        if (!foundBooking) {
          setCallState('not_found');
          setIsInitializing(false);
          return;
        }

        // Authorization check
        const isClient = foundBooking.userId === user.id;
        const isLawyer = foundBooking.lawyerId === user.id;
        if (!isClient && !isLawyer) {
          setCallState('unauthorized');
          setIsInitializing(false);
          return;
        }

        // Status check
        if (foundBooking.status !== 'confirmed') {
          setBooking(foundBooking);
          setCallState('not_confirmed');
          setIsInitializing(false);
          return;
        }

        setBooking(foundBooking);
        setCallState('ready');
      } catch (err: any) {
        console.error('Failed to load booking details for call page:', err);
        setCallState('not_found');
        setIsInitializing(false);
      }
    };

    loadBooking();
  }, [bookingId, isAuthenticated, user?.id]);

  const handleExit = () => {
    // Clean up Jitsi Meet instance
    if (jitsiApiRef.current) {
      jitsiApiRef.current.dispose();
      jitsiApiRef.current = null;
    }
    // Redirect back
    if (user?.role === 'citizen') {
      router.replace('/bookings');
    } else {
      router.replace('/dashboard');
    }
  };

  const handleCompleteAndExit = async () => {
    try {
      // Transition booking to completed
      await apiClient.updateBookingStatus(bookingId, 'completed');
      toast.success('Consultation marked as completed');
    } catch (err) {
      console.error('Failed to update booking status on exit:', err);
    } finally {
      handleExit();
    }
  };

  const initializeJitsi = () => {
    if (typeof window === 'undefined' || !(window as any).JitsiMeetExternalAPI) {
      return;
    }

    setIsInitializing(false);

    try {
      const domain = '8x8.vc';
      const roomName = `vpaas-magic-cookie-a6d975d33f774eb39eacdbb0d41350a6/LegalHub-Consultation-${bookingId}`;

      const options = {
        roomName: roomName,
        parentNode: containerRef.current,
        width: '100%',
        height: '100%',
        configOverwrite: {
          prejoinPageEnabled: false,
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          disableDeepLinking: true, // Prevent Jitsi mobile app redirects
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
        },
        userInfo: {
          displayName: user?.name || 'User',
          email: user?.email || '',
        },
      };

      const api = new (window as any).JitsiMeetExternalAPI(domain, options);
      jitsiApiRef.current = api;

      // Event listener: Hang up / Leave conference
      api.addEventListener('videoConferenceLeft', () => {
        console.log('[CallPage] videoConferenceLeft triggered.');
        handleCompleteAndExit();
      });
    } catch (err) {
      console.error('[CallPage] Failed to initialize Jitsi:', err);
      toast.error('Failed to load video call environment.');
      setIsInitializing(false);
    }
  };

  // Clean up Jitsi on unmount
  useEffect(() => {
    return () => {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
      }
    };
  }, []);

  if (callState === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-[#0E0F11] text-[#FAF9F5] space-y-6">
        <div className="relative flex items-center justify-center">
          <Loader2 className="h-16 w-16 text-[#B89868] animate-spin" />
          <Scale className="absolute h-6 w-6 text-[#C5A880]" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-xl font-serif font-bold tracking-wide">Securing consultation environment...</h2>
          <p className="text-xs text-stone-500 max-w-xs mx-auto font-sans">Validating room credentials, checking attorney-client privilege layers, and establishing connection.</p>
        </div>
      </div>
    );
  }

  if (callState === 'not_found' || callState === 'unauthorized' || callState === 'not_confirmed') {
    const getWarningDetails = () => {
      switch (callState) {
        case 'not_found':
          return {
            title: 'Consultation Not Found',
            description: "We couldn't locate a consultation with the provided ID. Please verify the URL or select a valid session from your dashboard.",
            icon: X,
            color: 'text-rose-500 bg-rose-500/10 border-rose-500/20'
          };
        case 'unauthorized':
          return {
            title: 'Access Restricted',
            description: 'This room is secured under strict attorney-client privilege. Only the assigned citizen client and legal advisor are allowed entry.',
            icon: ShieldAlert,
            color: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
          };
        case 'not_confirmed':
        default:
          let statusText = "Consultation Call Room is not active. The meeting must be confirmed by the lawyer.";
          if (booking?.status === 'cancelled') {
            statusText = "This consultation has been cancelled.";
          } else if (booking?.status === 'completed') {
            statusText = "This consultation has already been completed.";
          }
          return {
            title: 'Consultation Room Inactive',
            description: statusText,
            icon: VideoOff,
            color: 'text-stone-400 bg-stone-550/10 border-stone-500/20'
          };
      }
    };

    const details = getWarningDetails();
    const WarningIcon = details.icon;

    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-[#0A0B0D] text-[#FAF9F5] p-6 font-sans">
        <div className="max-w-md w-full bg-[#111214] border border-[#1E2024] rounded-[2rem] p-8 md:p-10 shadow-2xl text-center space-y-8 animate-fade-in relative overflow-hidden">
          {/* Decorative radial gradient */}
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#B89868]/5 to-transparent pointer-events-none"></div>

          <div className={`w-20 h-20 rounded-3xl border ${details.color} flex items-center justify-center mx-auto shadow-md relative z-10`}>
            <WarningIcon className="h-10 w-10" />
          </div>

          <div className="space-y-3 relative z-10">
            <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-[#FAF9F5]">{details.title}</h1>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm mx-auto">{details.description}</p>
          </div>

          {booking && (
            <div className="p-5 rounded-2xl bg-[#0E0F11]/60 border border-stone-850 text-left space-y-3 font-sans text-xs relative z-10">
              <div className="flex justify-between items-center pb-2 border-b border-stone-850">
                <span className="text-stone-400 font-semibold uppercase tracking-wider">Session Info</span>
                <span className={`px-2 py-0.5 rounded-md font-bold uppercase text-[9px] ${
                  booking.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' :
                  booking.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                  'bg-stone-800 text-stone-400'
                }`}>{booking.status}</span>
              </div>
              <div className="space-y-2 text-stone-350">
                <p><span className="font-semibold text-stone-450">Advisor:</span> {booking.lawyerName || 'Scheduled Lawyer'}</p>
                <p><span className="font-semibold text-stone-450">Client:</span> {booking.clientName || 'Citizen User'}</p>
                <p><span className="font-semibold text-stone-450">Schedule:</span> {new Date(booking.scheduledAt).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' })}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2 relative z-10">
            <Button
              onClick={() => {
                if (user?.role === 'citizen') {
                  router.replace('/bookings');
                } else {
                  router.replace('/dashboard');
                }
              }}
              className="flex-1 h-12 bg-[#B89868] hover:bg-[#A38253] text-white font-bold rounded-xl shadow-sm transition-all duration-300"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0A0B0D] text-[#FAF9F5] overflow-hidden font-sans">
      {/* Dynamic Jitsi External API Script Loading */}
      <Script
        src="https://8x8.vc/vpaas-magic-cookie-a6d975d33f774eb39eacdbb0d41350a6/external_api.js"
        onLoad={initializeJitsi}
        onError={() => {
          toast.error('Failed to load video script. Check your internet connection.');
          setIsInitializing(false);
        }}
      />

      {/* Top Header Bar */}
      <header className="w-full h-16 px-3 sm:px-6 bg-[#111214] border-b border-[#1E2024] flex items-center justify-between z-10 shrink-0 shadow-md">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-8 w-8 sm:h-9 sm:w-9 border border-[#B89868]/30 rounded-xl flex items-center justify-center bg-stone-900/60 shrink-0">
            <Scale className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-[#B89868]" />
          </div>
          <div className="min-w-0">
            <span className="text-xs sm:text-base font-serif font-bold tracking-tight truncate block">
              Legal<span className="text-[#B89868] italic font-serif">Hub</span> Consultation
            </span>
            {booking && (
              <p className="text-[8px] sm:text-[10px] text-stone-500 font-medium tracking-wide uppercase mt-0.5 truncate block max-w-[120px] sm:max-w-none">
                With {user?.role === 'citizen' ? (booking.lawyerName || 'Advisor') : (booking.clientName || 'Citizen')}
              </p>
            )}
          </div>
        </div>

        {/* Live Security Connection Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold tracking-wider uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-450 animate-pulse" />
          Secure Encrypted Consultation
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <Button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            variant="outline"
            className="border-stone-800 hover:border-[#B89868]/50 bg-stone-900/40 hover:bg-stone-850 text-stone-300 hover:text-[#B89868] font-medium px-2.5 sm:px-3.5 h-9 rounded-xl text-xs flex items-center gap-1.5 sm:gap-2 transition-all shadow-sm"
          >
            <FileText className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">{isSidebarOpen ? 'Hide Case Details' : 'Show Case Details'}</span>
            <span className="hidden min-[400px]:inline sm:hidden">{isSidebarOpen ? 'Hide' : 'Details'}</span>
          </Button>
          <Button
            onClick={handleCompleteAndExit}
            variant="outline"
            className="border-rose-500/30 hover:border-rose-500/50 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 font-semibold px-2.5 sm:px-3.5 h-9 rounded-xl text-xs flex items-center gap-1.5 sm:gap-2 transition-all shadow-sm"
          >
            <PhoneOff className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">End Consultation</span>
            <span className="hidden min-[400px]:inline sm:hidden">End</span>
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex min-h-0 w-full bg-[#0E0F11] relative overflow-hidden">
        {/* Call Area */}
        <div className="flex-1 h-full min-h-0 relative">
          {/* Loading overlay */}
          {isInitializing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0E0F11] z-20 space-y-4">
              <Loader2 className="h-10 w-10 text-[#B89868] animate-spin" />
              <div className="text-center">
                <p className="text-sm font-semibold text-stone-300">Setting up secure call room...</p>
                <p className="text-xs text-stone-500 mt-1">Connecting to Jitsi Virtual Servers</p>
              </div>
            </div>
          )}

          {/* Jitsi Meet iframe Node */}
          <div ref={containerRef} id="jaas-container" className="w-full h-full" />
        </div>

        {/* Sidebar Panel */}
        <aside className={`fixed lg:relative top-16 lg:top-0 right-0 z-40 lg:z-auto h-[calc(100vh-4rem)] lg:h-full border-[#1E2024] bg-[#111214]/98 backdrop-blur-md lg:backdrop-blur-none flex flex-col shrink-0 shadow-2xl transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-full sm:w-96 translate-x-0 opacity-100 border-l' : 'w-0 translate-x-full opacity-0 border-none overflow-hidden'}`}>
          <div className="w-full sm:w-96 flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="h-14 border-b border-[#1E2024] px-6 flex items-center justify-between shrink-0 bg-[#0E0F11]/40">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#B89868]" />
                <span className="font-serif font-bold text-sm tracking-tight text-[#FAF9F5]">Case Details & Notes</span>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-stone-400 hover:text-white p-1.5 hover:bg-stone-900 rounded-lg transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Sidebar Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-stone-800 scrollbar-track-transparent">
              {/* Consultation Details */}
              {booking ? (
                <div className="space-y-5">
                  {/* Party Information */}
                  <div className="p-4 rounded-xl bg-stone-900/40 border border-[#1E2024] space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-[#B89868]/10 border border-[#B89868]/30 flex items-center justify-center font-serif text-sm font-bold text-[#B89868]">
                        {user?.role === 'citizen'
                          ? (booking.lawyerName?.[0] || 'A')
                          : (booking.clientName?.[0] || 'C')}
                      </div>
                      <div>
                        <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#B89868]">
                          {user?.role === 'citizen' ? 'Assigned Lawyer' : 'Citizen Client'}
                        </h4>
                        <p className="text-sm font-semibold text-stone-200 mt-0.5">
                          {user?.role === 'citizen' ? booking.lawyerName : booking.clientName}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time Schedule */}
                  <div className="p-4 rounded-xl bg-[#121315] border border-stone-850/50 space-y-3">
                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#B89868]">Consultation Schedule</h4>
                    <div className="grid grid-cols-1 gap-2.5 text-xs text-stone-300">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-400">
                          <Calendar className="h-3.5 w-3.5" />
                        </div>
                        <span>
                          {new Date(booking.scheduledAt).toLocaleDateString(undefined, {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-400">
                          <Clock className="h-3.5 w-3.5" />
                        </div>
                        <span>
                          {new Date(booking.scheduledAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}{' '}
                          ({booking.duration} minutes)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Case Notes & Objectives */}
                  <div className="space-y-2.5">
                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#B89868]">Case Description</h4>
                    {booking.notes ? (
                      <div className="relative p-4 bg-stone-900/30 border border-stone-850/40 rounded-xl text-xs text-stone-350 italic leading-relaxed pl-8">
                        <span className="absolute left-3 top-3 text-2xl font-serif text-[#B89868]/30 leading-none">“</span>
                        {booking.notes}
                      </div>
                    ) : (
                      <p className="text-xs text-stone-500 italic pl-1">No description provided for this consultation.</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-stone-500 space-y-2">
                  <Loader2 className="h-5 w-5 animate-spin text-[#B89868]" />
                  <p className="text-xs">Loading booking details...</p>
                </div>
              )}

              <div className="h-px bg-[#1E2024]" />

              {/* In-Call Scratchpad */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#B89868]">Consultation Scratchpad</h4>
                  <span className="text-[9px] text-stone-500 font-medium">Auto-saves locally</span>
                </div>
                <textarea
                  value={localNotes}
                  onChange={(e) => {
                    setLocalNotes(e.target.value);
                    localStorage.setItem(`call-notes-${bookingId}`, e.target.value);
                  }}
                  placeholder="Type any private call notes here..."
                  className="w-full h-48 p-4 bg-stone-900/40 border border-stone-800 text-xs text-stone-200 placeholder-stone-600 rounded-xl focus:outline-none focus:border-[#B89868]/50 focus:ring-1 focus:ring-[#B89868]/30 resize-none font-sans leading-relaxed transition-all"
                />
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-[#1E2024] bg-[#0E0F11]/40 text-center shrink-0">
              <p className="text-[9px] uppercase tracking-wider text-stone-500 font-semibold">
                🔒 Secured under Attorney-Client Privilege
              </p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
