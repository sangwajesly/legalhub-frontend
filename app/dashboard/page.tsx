'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  Calendar,
  FileText,
  ArrowUpRight,
  Plus,
  Search,
  Gavel,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';
import { AnalyticsData, Case } from '@/types';
import { useAuthStore } from '@/lib/store/auth-store';
import { useLawyerStore } from '@/lib/store/lawyer-store';
import { NGODashboard } from '@/components/dashboard/NGODashboard';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { bookings, fetchUserBookings } = useLawyerStore();
  const [stats, setStats] = useState<AnalyticsData | null>(null);
  const [recentCases, setRecentCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      // Fetch concurrent data
      const [analytics, casesResponse] = await Promise.all([
        apiClient.getAnalyticsOverview().catch(() => null),
        apiClient.getUserCases(user.id).catch(() => ({ data: [] }))
      ]);

      if (analytics) setStats(analytics);
      if (casesResponse && casesResponse.data) {
        setRecentCases(casesResponse.data.slice(0, 3)); // Only show top 3
      }
      
      // Also fetch bookings for the stat counter
      await fetchUserBookings(user.id);

    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError('Showing active legal status from local history.');
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, fetchUserBookings]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const displayStats = stats || {
    totalCases: recentCases.length || 0,
    casesByCategory: {},
    casesByLocation: {},
    casesBySeverity: {},
    resolutionRate: 0.85,
    averageResolutionTime: 12,
    trends: []
  };

  // If user is NGO or Government, show the specialized analytics dashboard
  if (user?.role === 'ngo' || user?.role === 'government') {
    return (
      <div className="pb-12">
        <NGODashboard data={displayStats} isLoading={isLoading} />
      </div>
    );
  }

  // Default Dashboard for Citizens and Lawyers/Advocates
  return (
    <div className="space-y-10 animate-fade-in pb-12">
      {/* Upper Section: Welcome & Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-center gap-6">
           <div className="relative">
              <Avatar className="h-20 w-20 ring-4 ring-[#FAF9F5] dark:ring-stone-900 shadow-sm">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-[#1C1B19] to-[#B89868] text-white text-2xl font-serif font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 h-6 w-6 bg-[#B89868] border-4 border-[#FAF9F5] dark:border-stone-950 rounded-full"></div>
           </div>
           <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl lg:text-4xl font-serif font-bold text-[#121315] dark:text-[#FAF9F5] tracking-tight">
                    Hello, {user?.name || (user?.role === 'lawyer' ? 'Advocate' : 'Friend')}
                </h1>
                <Badge className="bg-[#FAF9F5] dark:bg-stone-900 border border-[#E5E2DC] dark:border-stone-800 text-[#B89868] font-semibold text-xs rounded-xl px-2.5 py-0.5">
                   {user?.role?.toUpperCase() || 'MEMBER'}
                </Badge>
              </div>
              <p className="text-stone-500 dark:text-stone-400 mt-1 font-normal italic">
                Welcome back. We're here to help you navigate your legal journey with ease and clarity.
              </p>
           </div>
        </div>

        <div className="flex gap-3 w-full lg:w-auto">
          {user?.role && (['citizen', 'ngo'] as string[]).includes(user.role) && (
            <Link href="/cases" className="flex-1">
              <Button className="w-full lg:w-auto h-12 px-6 gap-2 bg-[#B89868] hover:bg-[#A38253] text-[#FAF9F5] font-semibold rounded-xl shadow-sm transition-all duration-300">
                <Plus className="h-5 w-5" />
                New Case Report
              </Button>
            </Link>
          )}
          <Link href="/lawyers">
            <Button variant="outline" className="h-12 px-6 gap-2 border-[#E5E2DC] dark:border-stone-800 bg-[#FDFCF9] dark:bg-stone-900/50 text-stone-700 dark:text-stone-300 rounded-xl font-semibold shadow-sm hover:bg-[#FAF9F5] dark:hover:bg-stone-900 transition-all">
              <Search className="h-5 w-5 text-[#B89868]" />
              Find Expert
            </Button>
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-[#FDFCF9] dark:bg-stone-900/20 border border-[#E5E2DC] dark:border-stone-850 text-stone-600 dark:text-stone-400 px-6 py-4 rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
             <ShieldCheck className="h-5 w-5 text-[#B89868]" />
             <span className="text-sm font-medium">{error}</span>
          </div>
          <Badge className="bg-[#B89868] text-white border-none text-[10px] px-2 py-0.5 rounded-lg">SECURED</Badge>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Cases', value: recentCases.length.toString(), trend: 'Real-time sync', icon: Gavel },
          { label: 'Expert Bookings', value: bookings.length.toString(), trend: 'Total sessions', icon: Calendar },
          { label: 'AI Resolution Rate', value: `${(displayStats.resolutionRate * 100).toFixed(0)}%`, trend: 'System average', icon: Zap },
          { label: 'Legal Intel', value: '5', trend: 'Law updates', icon: FileText },
        ].map((stat, index) => (
          <Card key={index} className="border-[#E5E2DC] dark:border-stone-800 shadow-sm hover:shadow-md transition-all duration-300 bg-[#FDFCF9] dark:bg-stone-900/10 group rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-[#FAF9F5] dark:bg-stone-950/40 border border-[#E5E2DC] dark:border-stone-850 group-hover:scale-105 transition-transform duration-300">
                  <stat.icon className="h-5 w-5 text-[#B89868]" />
                </div>
                 <div className="text-right">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 p-0">{stat.trend}</span>
                 </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold font-serif text-[#121315] dark:text-[#FAF9F5]">{isLoading ? '...' : stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Cases/Intelligence */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-[#E5E2DC] dark:border-stone-800 shadow-sm bg-[#FDFCF9] dark:bg-stone-900/10 rounded-2xl overflow-hidden">
            <CardHeader className="p-6 pb-0 flex flex-row items-center justify-between">
              <div>
                 <CardTitle className="text-2xl font-serif font-bold text-[#121315] dark:text-[#FAF9F5] tracking-tight">Case Intelligence</CardTitle>
                 <CardDescription className="text-stone-500 dark:text-stone-400 font-normal">Tracking your active legal matters.</CardDescription>
              </div>
              <Link href="/cases">
                 <Button variant="ghost" size="sm" className="text-[#B89868] dark:text-[#B89868]/90 font-semibold hover:bg-[#FAF9F5] dark:hover:bg-stone-900/40 rounded-lg">View All</Button>
              </Link>
            </CardHeader>
            <CardContent className="p-6 pt-6">
              <div className="space-y-4">
                {recentCases.length === 0 && !isLoading ? (
                  <div className="text-center py-10">
                    <p className="text-stone-400 font-semibold">No active cases found.</p>
                    <Link href="/cases">
                      <Button variant="link" className="text-[#B89868] dark:text-[#B89868]/90 font-medium">Start a report</Button>
                    </Link>
                  </div>
                ) : (
                  recentCases.map((caseItem, i) => (
                    <Link key={i} href={`/cases/${caseItem.id}`}>
                      <div className="group p-5 rounded-xl border border-[#E5E2DC] dark:border-stone-850 hover:border-[#B89868] dark:hover:border-[#B89868] bg-[#FAF9F5] dark:bg-stone-950/20 hover:bg-[#FDFCF9] dark:hover:bg-stone-900/40 transition-all cursor-pointer flex items-center justify-between mb-4">
                        <div className="flex items-center gap-5">
                          <div className="h-12 w-12 rounded-xl bg-white dark:bg-stone-900 shadow-sm border border-[#E5E2DC] dark:border-stone-800 flex items-center justify-center">
                              <Gavel className="h-6 w-6 text-stone-400 group-hover:text-[#B89868] transition-colors" />
                          </div>
                          <div>
                              <p className="text-base font-bold text-[#121315] dark:text-[#FAF9F5] group-hover:text-[#B89868] dark:group-hover:text-[#B89868] transition-colors font-serif">{caseItem.title}</p>
                              <div className="flex items-center gap-3 mt-1">
                                <Badge className={`text-[10px] font-semibold border-none capitalize rounded-lg ${
                                    caseItem.severity === 'high' || caseItem.severity === 'critical' ? 'bg-red-500/10 text-red-600 border border-red-500/20' : 
                                    caseItem.severity === 'medium' ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20' : 
                                    'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                                }`}>{caseItem.severity}</Badge>
                                <span className="text-xs text-stone-500 dark:text-stone-500 font-semibold uppercase tracking-wider">{caseItem.status}</span>
                                <span className="text-[10px] text-stone-400">• {new Date(caseItem.submittedAt).toLocaleDateString()}</span>
                              </div>
                          </div>
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-stone-300 group-hover:text-[#B89868] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: AI Suggestions & Quick Actions */}
        <div className="space-y-8">
          <Card className="bg-[#1C1B19] dark:bg-stone-900/40 text-[#FAF9F5] border border-[#E5E2DC] dark:border-stone-850 shadow-sm rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B89868]/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-1000"></div>
            <CardContent className="p-6 relative z-10 space-y-6">
              <div className="h-12 w-12 bg-[#B89868] rounded-xl flex items-center justify-center">
                 <Zap className="h-5 w-5 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-serif font-bold text-[#FAF9F5] leading-tight">Instant AI Guidance Available</h3>
                <p className="text-stone-300 text-sm font-normal leading-relaxed">
                  Have a quick legal question or a document you need decoded? Speak with our citizen companion for clear, jargon-free support.
                </p>
              </div>
              <Link href="/chat">
                <Button className="w-full h-12 bg-[#B89868] text-white hover:bg-[#A38253] font-semibold rounded-xl text-base shadow-sm transition-all duration-300">
                  Open AI Consultant
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-[#E5E2DC] dark:border-stone-800 shadow-sm bg-[#FDFCF9] dark:bg-stone-900/10 rounded-2xl p-6 space-y-6 overflow-hidden">
            <div className="flex items-center justify-between">
               <h3 className="text-xs font-semibold dark:text-stone-400 uppercase tracking-wider text-stone-400">Quick Actions</h3>
               <div className="h-1.5 w-1.5 rounded-full bg-[#B89868]"></div>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Legal Templates', icon: FileText, color: 'text-[#B89868]', href: '/articles' },
                { label: 'Verified Lawyers', icon: Search, color: 'text-[#B89868]', href: '/lawyers' },
                { label: 'Booking History', icon: Calendar, color: 'text-[#B89868]', href: '/bookings' },
              ].map((action, k) => (
                <Link key={k} href={action.href}>
                  <Button variant="outline" className="w-full justify-start gap-4 h-12 text-stone-600 dark:text-stone-300 hover:text-[#B89868] dark:hover:text-[#B89868] hover:border-[#B89868]/50 dark:hover:border-[#B89868]/50 hover:bg-[#FAF9F5] dark:hover:bg-[#121315]/30 border-[#E5E2DC] dark:border-stone-850 rounded-xl transition-all font-medium">
                    <div className="h-8 w-8 rounded-lg bg-[#FAF9F5] dark:bg-stone-950/40 border border-[#E5E2DC] dark:border-stone-800 flex items-center justify-center">
                      <action.icon className={`h-4 w-4 ${action.color}`} />
                    </div>
                    {action.label}
                  </Button>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
