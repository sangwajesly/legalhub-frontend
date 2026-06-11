'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  ShieldCheck, 
  Gavel, 
  Calendar, 
  BookOpen, 
  Database, 
  Activity, 
  RefreshCw
} from 'lucide-react';
import { Case } from '@/types';
import apiClient from '@/lib/api-client';
import toast from 'react-hot-toast';

interface AdminOverviewProps {
  stats: {
    totalUsers: number;
    totalLawyers: number;
    totalCases: number;
    totalBookings: number;
    totalArticles: number;
  } | null;
  recentCases: Case[];
  isLoading: boolean;
  onRefresh: () => void;
}

export function AdminOverview({ stats, recentCases, isLoading, onRefresh }: AdminOverviewProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusUpdate = async (caseId: string, newStatus: Case['status']) => {
    try {
      setUpdatingId(caseId);
      await apiClient.updateCaseStatus(caseId, newStatus, 'Status updated by system administrator via Admin Dashboard.');
      toast.success(`Case status updated to ${newStatus}`);
      onRefresh();
    } catch (err) {
      console.error('Failed to update case status:', err);
      toast.error('Failed to update case status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const isLocalDBMode = typeof window !== 'undefined' && process.env.NEXT_PUBLIC_USE_LOCAL_DATABASE === 'true';

  // Calculate severity stats for recent cases to show some distributions
  const severityCounts = recentCases.reduce((acc, c) => {
    acc[c.severity] = (acc[c.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalSev = recentCases.length || 1;
  const criticalPct = Math.round(((severityCounts.critical || 0) / totalSev) * 100);
  const highPct = Math.round(((severityCounts.high || 0) / totalSev) * 100);
  const mediumPct = Math.round(((severityCounts.medium || 0) / totalSev) * 100);
  const lowPct = Math.round(((severityCounts.low || 0) / totalSev) * 100);

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#E5E2DC] dark:border-stone-850 pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#121315] dark:text-[#FAF9F5] tracking-tight flex items-center gap-3">
            Admin System Overview
          </h1>
          <p className="text-stone-500 dark:text-stone-400 mt-1 text-sm font-normal">
            Real-time platform activity metrics, global cases audit log, and connection diagnostics.
          </p>
        </div>
        <Button 
          onClick={onRefresh} 
          variant="outline" 
          size="sm" 
          disabled={isLoading}
          className="gap-2 h-10 border-[#E5E2DC] dark:border-stone-800 bg-[#FDFCF9] dark:bg-stone-900/40 text-stone-600 dark:text-stone-300 rounded-xl"
        >
          <RefreshCw className={`h-4 w-4 text-[#B89868] ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      {/* Diagnostics / Status Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* DB Connection */}
        <Card className="border-[#E5E2DC] dark:border-stone-800 bg-[#FDFCF9] dark:bg-stone-900/10 rounded-2xl shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#B89868]/10 text-[#B89868] rounded-xl">
                <Database className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Database Mode</p>
                <p className="text-sm font-bold text-stone-700 dark:text-stone-300">
                  {isLocalDBMode ? 'Local JSON Fallback' : 'Firebase Firestore'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              Active
            </div>
          </CardContent>
        </Card>

        {/* Vector Engine */}
        <Card className="border-[#E5E2DC] dark:border-stone-800 bg-[#FDFCF9] dark:bg-stone-900/10 rounded-2xl shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#B89868]/10 text-[#B89868] rounded-xl">
                <Activity className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">RAG Vector Store</p>
                <p className="text-sm font-bold text-stone-700 dark:text-stone-300">FAISS / SentenceTransformers</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-[#B89868]/15 border border-[#B89868]/30 text-[#B89868] px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B89868] animate-ping"></span>
              Loaded
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="border-[#E5E2DC] dark:border-stone-800 bg-[#FDFCF9] dark:bg-stone-900/10 rounded-2xl shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#B89868]/10 text-[#B89868] rounded-xl">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Auth & Verification</p>
                <p className="text-sm font-bold text-stone-700 dark:text-stone-300">RBAC Security Active</p>
              </div>
            </div>
            <Badge className="bg-stone-100 dark:bg-stone-900 text-stone-500 border border-stone-200 dark:border-stone-800 text-[10px] uppercase font-semibold">SECURED</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Platform Users', value: stats?.totalUsers || 0, icon: Users, desc: 'Citizen accounts' },
          { label: 'Legal Advocates', value: stats?.totalLawyers || 0, icon: ShieldCheck, desc: 'Lawyer profiles' },
          { label: 'Reported Cases', value: stats?.totalCases || 0, icon: Gavel, desc: 'Total incidents' },
          { label: 'Client Bookings', value: stats?.totalBookings || 0, icon: Calendar, desc: 'Consultation requests' },
          { label: 'Legal Guides', value: stats?.totalArticles || 0, icon: BookOpen, desc: 'Published guides' },
        ].map((item, i) => (
          <Card key={i} className="border-[#E5E2DC] dark:border-stone-800 bg-[#FDFCF9] dark:bg-stone-900/10 shadow-sm rounded-2xl">
            <CardContent className="p-5 text-left">
              <div className="h-10 w-10 rounded-xl bg-[#FAF9F5] dark:bg-stone-950/40 border border-[#E5E2DC] dark:border-stone-850 flex items-center justify-center mb-3">
                <item.icon className="h-4.5 w-4.5 text-[#B89868]" />
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 mb-1">{item.label}</p>
              <p className="text-2xl font-bold font-serif text-[#121315] dark:text-[#FAF9F5]">{isLoading ? '...' : item.value}</p>
              <p className="text-[10px] text-stone-400 mt-1">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cases Audit & Analytics distributions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cases Audit Log */}
        <div className="lg:col-span-2">
          <Card className="border-[#E5E2DC] dark:border-stone-800 bg-[#FDFCF9] dark:bg-stone-900/10 rounded-2xl shadow-sm overflow-hidden h-full">
            <CardHeader className="p-6 border-b border-[#E5E2DC] dark:border-stone-850">
              <CardTitle className="text-xl font-serif font-bold text-[#121315] dark:text-[#FAF9F5] text-left">Global Platform Cases Log</CardTitle>
              <CardDescription className="text-stone-500 dark:text-stone-400 text-left">Audit and manage the status of reported legal incidents system-wide.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin inline-flex w-8 h-8 border-2 border-[#B89868] border-t-transparent rounded-full mb-2"></div>
                  <p className="text-sm text-stone-400">Loading cases...</p>
                </div>
              ) : recentCases.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-[#E5E2DC] dark:border-stone-850 rounded-xl">
                  <Gavel className="h-10 w-10 text-stone-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-stone-450">No cases found in database.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentCases.map((c) => (
                    <div key={c.id} className="p-4 rounded-xl border border-[#E5E2DC] dark:border-stone-850 bg-[#FAF9F5] dark:bg-stone-950/20 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="text-left space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-serif font-bold text-sm text-[#121315] dark:text-[#FAF9F5]">{c.title}</p>
                          <Badge variant={c.severity === 'critical' ? 'destructive' : c.severity === 'high' ? 'warning' : 'outline'} className="rounded-lg text-[9px] uppercase tracking-wider scale-90">
                            {c.severity}
                          </Badge>
                        </div>
                        <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 max-w-md">{c.description}</p>
                        <div className="flex items-center gap-2 text-[10px] text-stone-400">
                          <span>{c.caseType}</span>
                          <span>•</span>
                          <span>{c.location}</span>
                          <span>•</span>
                          <span>{new Date(c.submittedAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Action selector */}
                      <div className="flex items-center gap-2 shrink-0">
                        <select
                          value={c.status}
                          disabled={updatingId === c.id}
                          onChange={(e) => handleStatusUpdate(c.id, e.target.value as Case['status'])}
                          className="px-3 py-1.5 bg-[#FDFCF9] dark:bg-stone-900 border border-[#E5E2DC] dark:border-stone-800 rounded-lg text-xs font-semibold text-stone-600 dark:text-stone-300 focus:outline-none focus:ring-1 focus:ring-[#B89868] cursor-pointer"
                        >
                          <option value="submitted">Submitted</option>
                          <option value="under-review">Under Review</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Severity Metrics Distribution */}
        <div>
          <Card className="border-[#E5E2DC] dark:border-stone-800 bg-[#FDFCF9] dark:bg-stone-900/10 rounded-2xl shadow-sm h-full flex flex-col justify-between">
            <CardHeader className="p-6 border-b border-[#E5E2DC] dark:border-stone-850">
              <CardTitle className="text-xl font-serif font-bold text-[#121315] dark:text-[#FAF9F5] text-left">Incident Priority Breakdown</CardTitle>
              <CardDescription className="text-stone-500 dark:text-stone-400 text-left">System-wide critical priority distribution.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col justify-center space-y-6">
              {[
                { label: 'Critical Severity', pct: criticalPct, color: 'bg-red-500', text: 'text-red-600' },
                { label: 'High Severity', pct: highPct, color: 'bg-amber-500', text: 'text-amber-600' },
                { label: 'Medium Severity', pct: mediumPct, color: 'bg-[#B89868]', text: 'text-[#B89868]' },
                { label: 'Low Severity', pct: lowPct, color: 'bg-emerald-500', text: 'text-emerald-600' },
              ].map((item, index) => (
                <div key={index} className="space-y-1.5 text-left">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-stone-500 dark:text-stone-450">{item.label}</span>
                    <span className={item.text}>{item.pct}%</span>
                  </div>
                  <div className="h-2 w-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all duration-500`} 
                      style={{ width: `${item.pct}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminOverview;
