'use client';

import React, { useEffect, useState } from 'react';
import {
  Briefcase,
  Calendar,
  MessageSquare,
  FileText,
  ArrowUpRight,
  Plus,
  Search,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';
import { AnalyticsData } from '@/types';

export default function Dashboard() {
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
        setError('Failed to load live data. Showing demo data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const displayStats = stats || {
    totalCases: 3,
    casesByCategory: {},
    casesByLocation: {},
    casesBySeverity: {},
    resolutionRate: 0,
    averageResolutionTime: 0,
    trends: []
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back, Alex</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Here's what's happening with your legal matters today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/lawyers">
            <Button variant="outline" className="gap-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
              <Search className="h-4 w-4" />
              Find Lawyer
            </Button>
          </Link>
          <Link href="/cases">
            <Button className="gap-2 bg-blue-600 dark:bg-gradient-to-r dark:from-teal-600 dark:to-emerald-600 hover:bg-blue-700 dark:hover:from-teal-700 dark:hover:to-emerald-700">
              <Plus className="h-4 w-4" />
              New Case
            </Button>
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Cases', value: displayStats.totalCases.toString(), icon: Briefcase, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Upcoming Bookings', value: '2', icon: Calendar, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
          { label: 'Unread Messages', value: '5', icon: MessageSquare, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
          { label: 'Saved Articles', value: '12', icon: FileText, color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-900/20' },
        ].map((stat, index) => (
          <Card key={index} className="border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-slate-800/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{isLoading ? '...' : stat.value}</p>
                </div>
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-800/50">
            <CardHeader>
              <CardTitle className="dark:text-white">Recent Activity</CardTitle>
              <CardDescription className="dark:text-slate-400">Your latest interactions and updates.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { title: 'Consultation confirmed with Sarah Wilson', time: '2 hours ago', type: 'booking', icon: Calendar },
                  { title: 'New response in "Property Dispute" case', time: '5 hours ago', type: 'message', icon: MessageSquare },
                  { title: 'You saved "Understanding Tenant Rights"', time: '1 day ago', type: 'article', icon: FileText },
                  { title: 'Case #1234 status updated to "In Review"', time: '2 days ago', type: 'case', icon: Briefcase },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-teal-900/30 transition-colors">
                      <activity.icon className="h-5 w-5 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-teal-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{activity.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Tips */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-teal-600 dark:via-emerald-600 dark:to-cyan-700 text-white border-none shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-2">Need Legal Help?</h3>
              <p className="text-blue-100 dark:text-teal-100 text-sm mb-6">
                Our AI assistant is ready to help you understand your legal situation instantly.
              </p>
              <Link href="/chat">
                <Button className="w-full bg-white text-blue-600 dark:text-teal-600 hover:bg-blue-50 dark:hover:bg-teal-50 border-none">
                  Start Chat
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-800/50">
            <CardHeader>
              <CardTitle className="dark:text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/lawyers">
                <Button variant="outline" className="w-full justify-start gap-3 h-12 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-teal-400 hover:border-blue-200 dark:hover:border-teal-600 hover:bg-blue-50 dark:hover:bg-teal-900/20 dark:border-slate-700">
                  <Search className="h-4 w-4" />
                  Find a Lawyer
                </Button>
              </Link>
              <Link href="/cases">
                <Button variant="outline" className="w-full justify-start gap-3 h-12 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-teal-400 hover:border-blue-200 dark:hover:border-teal-600 hover:bg-blue-50 dark:hover:bg-teal-900/20 dark:border-slate-700">
                  <FileText className="h-4 w-4" />
                  File a Report
                </Button>
              </Link>
              <Link href="/bookings">
                <Button variant="outline" className="w-full justify-start gap-3 h-12 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-teal-400 hover:border-blue-200 dark:hover:border-teal-600 hover:bg-blue-50 dark:hover:bg-teal-900/20 dark:border-slate-700">
                  <Calendar className="h-4 w-4" />
                  Schedule Consultation
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
