'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Shield, 
  FileText, 
  ChevronRight, 
  MessageSquare, 
  User,
  Gavel,
  History,
  AlertCircle,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '@/lib/api-client';
import { Case } from '@/types';
import toast from 'react-hot-toast';

export default function CaseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCase = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const response = await apiClient.getCaseById(id as string);
        setCaseData(response.data);
      } catch (err) {
        console.error('Failed to fetch case:', err);
        // Using demo data if fetch fails for the prototype
        setCaseData({
          id: id as string,
          title: "Property Dispute - Nairobi East",
          category: "Real Estate",
          description: "A dispute regarding boundaries and ownership of a residential plot. The neighbor has claimed an additional 2 meters into our property.",
          status: "in-progress",
          location: "Nairobi, Kenya",
          severity: "Medium",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: "user-123"
        } as Case);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCase();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
           <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
           <p className="text-slate-500 font-medium">Loading case details...</p>
        </div>
      </div>
    );
  }

  if (!caseData) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.back()} className="gap-2 text-slate-600 dark:text-slate-400">
            <ArrowLeft className="h-4 w-4" /> Back to Cases
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full dark:border-slate-800">
              <MoreVertical className="h-4 w-4" />
            </Button>
            <Button className="bg-blue-600 dark:bg-teal-600 hover:bg-blue-700 dark:hover:bg-teal-700 text-white gap-2 rounded-xl">
              <MessageSquare className="h-4 w-4" /> Chat with Lawyer
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 capitalize px-3 py-1 font-bold">
                    {caseData.category}
                 </Badge>
                 <Badge className={`px-3 py-1 font-bold border-none ${
                    caseData.status === 'in-progress' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                    caseData.status === 'resolved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                 }`}>
                    {caseData.status.replace('-', ' ')}
                 </Badge>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">{caseData.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-slate-500 dark:text-slate-400 text-sm font-medium">
                 <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Reported on {new Date(caseData.createdAt).toLocaleDateString()}
                 </div>
                 <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {caseData.location}
                 </div>
                 <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" /> ID: {caseData.id.slice(0, 8).toUpperCase()}
                 </div>
              </div>
            </div>

            {/* Description Card */}
            <Card className="rounded-[2rem] border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <CardHeader>
                 <CardTitle className="text-xl font-black dark:text-white">Case Summary</CardTitle>
              </CardHeader>
              <CardContent>
                 <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespaces-pre-wrap">
                    {caseData.description}
                 </p>
              </CardContent>
            </Card>

            {/* Evidence/Files Mockup */}
            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-900 dark:text-white px-2">Attachments & Evidence</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                 {[
                   { name: "Property Deed.pdf", size: "2.4 MB", type: "document" },
                   { name: "Boundary Photo.jpg", size: "1.1 MB", type: "image" }
                 ].map((file, idx) => (
                    <div key={idx} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                         <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-blue-600 dark:text-teal-500" />
                         </div>
                         <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{file.name}</p>
                            <p className="text-xs text-slate-500">{file.size}</p>
                         </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </div>
                 ))}
              </div>
            </div>

            {/* Timeline/History Mockup */}
            <div className="space-y-6 pt-4">
              <h3 className="text-xl font-black text-slate-900 dark:text-white px-2 flex items-center gap-2">
                 <History className="h-5 w-5 text-blue-600" /> Case Timeline
              </h3>
              <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200 dark:before:bg-slate-800">
                 {[
                   { title: "Legal Consultation Scheduled", desc: "Assigned to Advocate Sarah Wilson", time: "2 hours ago", status: "upcoming", icon: Clock },
                   { title: "Evidence Verified", desc: "Deed documents were successfully verified by our system.", time: "Yesterday, 4:12 PM", status: "completed", icon: Shield },
                   { title: "Case Reported", desc: "Initial report submitted to LegalHub portal.", time: "Oct 12, 2025", status: "completed", icon: Gavel }
                 ].map((step, idx) => (
                   <div key={idx} className="relative">
                      <div className={`absolute -left-[37px] top-1 h-6 w-6 rounded-full border-4 border-white dark:border-slate-950 flex items-center justify-center z-10 
                        ${step.status === 'upcoming' ? 'bg-amber-500' : 'bg-blue-600'}`}>
                        {step.status === 'completed' && <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>}
                      </div>
                      <div className="space-y-1">
                        <p className="font-black text-slate-900 dark:text-white">{step.title}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{step.desc}</p>
                        <p className="text-xs font-bold text-blue-600 dark:text-teal-500 uppercase tracking-widest">{step.time}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
             {/* Assigned Professional Card */}
             <Card className="rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden shadow-2xl border-none">
                <CardHeader className="pb-2">
                  <Badge className="w-fit bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-2">Assigned Advocate</Badge>
                  <CardTitle className="text-xl font-black">Sarah Wilson</CardTitle>
                  <CardDescription className="text-slate-400">Senior Property Attorney</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-4">
                  <div className="flex items-center gap-4">
                     <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                        <User className="h-7 w-7 text-emerald-400" />
                     </div>
                     <div>
                        <p className="text-sm font-bold">12 Years Exp.</p>
                        <p className="text-xs text-slate-400">Bar ID: LH-992384</p>
                     </div>
                  </div>
                  <Button className="w-full h-12 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-black text-sm">
                    View Full Profile
                  </Button>
                </CardContent>
             </Card>

             {/* Quick Actions/Alerts */}
             <Card className="rounded-[2.5rem] border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                <div className="bg-amber-50 dark:bg-amber-900/10 p-4 flex items-center gap-3">
                   <AlertCircle className="h-5 w-5 text-amber-600" />
                   <p className="text-sm font-bold text-amber-900 dark:text-amber-400">Action Required</p>
                </div>
                <CardContent className="p-6 space-y-4 text-left">
                   <p className="text-sm text-slate-600 dark:text-slate-300">
                     Please sign the <span className="font-bold text-blue-600">Representation Agreement</span> to proceed with the boundary survey.
                   </p>
                   <Button size="sm" className="w-full bg-blue-600 dark:bg-teal-600 text-white rounded-xl">
                     Review & Sign
                   </Button>
                </CardContent>
             </Card>

             <Card className="rounded-[2.5rem] border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6 space-y-4">
                <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">Need immediate help?</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Our AI Legal Assistant can answer specific questions about Nairobi property bylaws 24/7.</p>
                <Link href="/chat">
                    <Button variant="outline" className="w-full h-12 rounded-xl border-blue-200 dark:border-teal-900 text-blue-600 dark:text-teal-400 hover:bg-blue-50 dark:hover:bg-teal-900/20 font-black">
                    Ask AI Assistant
                    </Button>
                </Link>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
