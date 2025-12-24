'use client';

import React, { useEffect, useState } from 'react';
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
import { AnalyticsData } from '@/types';
import { useAuthStore } from '@/lib/store/auth-store';
import { NGODashboard } from '@/components/dashboard/NGODashboard';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const data = await apiClient.getAnalyticsOverview();
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Showing active legal status from local history.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const displayStats = stats || {
    totalCases: 3,
    casesByCategory: { 'Property': 1, 'Employment': 1, 'Trademark': 1 },
    casesByLocation: { 'Nairobi': 2, 'Mombasa': 1 },
    casesBySeverity: { 'high': 1, 'medium': 1, 'low': 1 },
    resolutionRate: 0.85,
    averageResolutionTime: 12,
    trends: [
      { date: '2023-10-01', count: 2, category: 'General' },
      { date: '2023-11-01', count: 5, category: 'General' },
      { date: '2023-12-01', count: 3, category: 'General' },
    ]
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
              <Avatar className="h-20 w-20 ring-4 ring-blue-50 dark:ring-slate-900 shadow-xl">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-2xl font-black">
                  {user?.name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 h-6 w-6 bg-green-500 border-4 border-white dark:border-slate-950 rounded-full"></div>
           </div>
           <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    Jambo, {user?.name?.split(' ')[0] || (user?.role === 'lawyer' ? 'Advocate' : 'Citizen')}
                </h1>
                <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 border-none font-bold">
                   {user?.role?.toUpperCase() || 'MEMBER'}
                </Badge>
              </div>
              <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium italic">Empowering your pursuit of justice today.</p>
           </div>
        </div>

        <div className="flex gap-3 w-full lg:w-auto">
          <Link href="/cases" className="flex-1">
            <Button className="w-full lg:w-auto h-14 px-8 gap-2 bg-blue-600 dark:bg-gradient-to-r dark:from-teal-600 dark:to-emerald-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 group">
              <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform" />
              New Case Report
            </Button>
          </Link>
          <Link href="/lawyers">
            <Button variant="outline" className="h-14 px-6 gap-2 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 rounded-2xl font-bold">
              <Search className="h-5 w-5" />
              Find Expert
            </Button>
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-blue-50/50 dark:bg-slate-900/50 border border-blue-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 px-6 py-4 rounded-3xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
             <ShieldCheck className="h-5 w-5 text-blue-600" />
             <span className="text-sm font-semibold">{error}</span>
          </div>
          <Badge className="bg-blue-600 text-white border-none text-[10px]">ENCRYPTED</Badge>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Cases', value: displayStats.totalCases.toString(), trend: '+1 this week', icon: Gavel, color: 'text-blue-600', bg: 'bg-blue-50/50 dark:bg-blue-900/10' },
          { label: 'Expert Bookings', value: '2', trend: 'Next: Friday', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50/50 dark:bg-purple-900/10' },
          { label: 'AI Resolution Rate', value: `${(displayStats.resolutionRate * 100).toFixed(0)}%`, trend: 'Top 5% user', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50/50 dark:bg-amber-900/10' },
          { label: 'Unread Intel', value: '12', trend: 'Law updates', icon: FileText, color: 'text-teal-600', bg: 'bg-teal-50/50 dark:bg-teal-900/10' },
        ].map((stat, index) => (
          <Card key={index} className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-900 group rounded-[2.5rem] overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${stat.bg} group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`h-7 w-7 ${stat.color}`} />
                </div>
                 <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400 p-0">{stat.trend}</span>
                 </div>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                <p className="text-4xl font-black text-slate-900 dark:text-white">{isLoading ? '...' : stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Cases/Intelligence */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden">
            <CardHeader className="p-8 pb-0 flex flex-row items-center justify-between">
              <div>
                 <CardTitle className="text-2xl font-black dark:text-white tracking-tight">Case Intelligence</CardTitle>
                 <CardDescription className="dark:text-slate-400 font-medium">Tracking your active legal matters.</CardDescription>
              </div>
              <Link href="/cases">
                 <Button variant="ghost" size="sm" className="text-blue-600 dark:text-teal-400 font-bold hover:bg-blue-50 dark:hover:bg-teal-900/20">View All</Button>
              </Link>
            </CardHeader>
            <CardContent className="p-8 pt-6">
              <div className="space-y-4">
                {[
                  { title: 'Property Ownership - Nairobi East', status: 'In Review', severity: 'Medium', time: 'updated 2h ago' },
                  { title: 'Employment Contract Dispute', status: 'Analysing', severity: 'High', time: 'updated 5h ago' },
                  { title: 'Trademark Infringement Notice', status: 'Pending Lawyer', severity: 'Low', time: 'updated Yesterday' },
                ].map((item, i) => (
                  <div key={i} className="group p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-teal-700 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-between">
                    <div className="flex items-center gap-5">
                       <div className="h-12 w-12 rounded-xl bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center">
                          <Gavel className="h-6 w-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
                       </div>
                       <div>
                          <p className="text-base font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-teal-400 transition-colors">{item.title}</p>
                          <div className="flex items-center gap-3 mt-1">
                             <Badge className={`text-[10px] font-black border-none ${
                                item.severity === 'High' ? 'bg-red-500 text-white' : 
                                item.severity === 'Medium' ? 'bg-amber-500 text-white' : 
                                'bg-green-500 text-white'
                             }`}>{item.severity}</Badge>
                             <span className="text-xs text-slate-500 dark:text-slate-500 font-bold uppercase tracking-wider">{item.status}</span>
                             <span className="text-[10px] text-slate-400">• {item.time}</span>
                          </div>
                       </div>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: AI Suggestions & Quick Actions */}
        <div className="space-y-8">
          <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-teal-600 dark:via-emerald-600 dark:to-cyan-700 text-white border-none shadow-2xl rounded-[3rem] p-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-1000"></div>
            <CardContent className="p-8 relative z-10 space-y-6">
              <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center">
                 <Zap className="h-6 w-6 text-white animate-pulse" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black leading-tight tracking-tight tracking-tighter">Instant Legal Insight Available.</h3>
                <p className="text-white/80 text-sm font-medium leading-relaxed">
                  Upload your documents and let our AI analyze potential risks in seconds.
                </p>
              </div>
              <Link href="/chat">
                <Button className="w-full h-14 bg-white text-blue-600 dark:text-teal-600 hover:bg-white/90 font-black rounded-2xl text-lg shadow-xl shadow-black/10">
                  Open AI Consultant
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-[3rem] p-8 space-y-6 overflow-hidden">
            <div className="flex items-center justify-between">
               <h3 className="text-lg font-black dark:text-white uppercase tracking-widest text-slate-400">Quick Actions</h3>
               <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Legal Templates', icon: FileText, color: 'text-amber-500', href: '/articles' },
                { label: 'Verified Lawyers', icon: Search, color: 'text-blue-500', href: '/lawyers' },
                { label: 'Booking History', icon: Calendar, color: 'text-purple-500', href: '/bookings' },
              ].map((action, k) => (
                <Link key={k} href={action.href}>
                  <Button variant="outline" className="w-full justify-start gap-4 h-14 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-teal-400 hover:border-blue-200 dark:hover:border-teal-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:border-slate-800 rounded-2xl transition-all font-bold">
                    <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
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
