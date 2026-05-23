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
import Link from 'next/link';

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
        setCaseData(response);
      } catch (err: any) {
        console.error('Failed to fetch case:', err);
        // Using demo data if fetch fails for the prototype
        setCaseData({
          id: id as string,
          title: "Property Dispute - Nairobi East",
          caseType: "Real Estate",
          description: "A dispute regarding boundaries and ownership of a residential plot. The neighbor has claimed an additional 2 meters into our property.",
          status: "under-review",
          location: "Nairobi, Kenya",
          severity: "medium",
          submittedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          submittedBy: "user-123",
          jurisdiction: "Nairobi",
          attachments: [],
          isAnonymous: false
        } as Case);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCase();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F5] dark:bg-[#121315]">
        <div className="flex flex-col items-center gap-4">
           <div className="h-12 w-12 border-4 border-[#B89868] border-t-transparent rounded-full animate-spin"></div>
           <p className="text-stone-555 font-medium text-sm">Loading case details...</p>
        </div>
      </div>
    );
  }

  if (!caseData) return null;

  return (
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#121315] pb-20">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-30 bg-[#FAF9F5]/90 dark:bg-[#121315]/90 backdrop-blur-md border-b border-[#E5E2DC] dark:border-stone-850">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.back()} className="gap-2 text-stone-600 dark:text-stone-400 font-semibold">
            <ArrowLeft className="h-4 w-4 text-[#B89868]" /> Back to Cases
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-xl border-[#E5E2DC] dark:border-stone-800 bg-[#FDFCF9] dark:bg-stone-900/30">
              <MoreVertical className="h-4 w-4 text-stone-500" />
            </Button>
            <Button className="bg-[#1C1B19] hover:bg-[#2C2A27] dark:bg-[#FAF9F5] dark:hover:bg-[#E5E2DC] text-white dark:text-[#121315] gap-2 rounded-xl font-semibold shadow-sm transition-all duration-300">
              <MessageSquare className="h-4 w-4 text-[#B89868]" /> Chat with Lawyer
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
                 <Badge className="bg-[#FDFCF9] dark:bg-stone-900 border border-[#E5E2DC] dark:border-stone-800 text-[#B89868] font-semibold capitalize px-3 py-1 rounded-lg">
                    {caseData.caseType}
                 </Badge>
                 <Badge className={`px-3 py-1 font-semibold rounded-lg border ${
                    caseData.status === 'under-review' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                    caseData.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                    'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-400 border-stone-200'
                 }`}>
                    {caseData.status.replace('-', ' ')}
                 </Badge>
              </div>
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-[#121315] dark:text-white tracking-tight">{caseData.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-stone-500 dark:text-stone-400 text-sm font-medium">
                 <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#B89868]" /> Reported on {new Date(caseData.submittedAt).toLocaleDateString()}
                 </div>
                 <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#B89868]" /> {caseData.location}
                 </div>
                 <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-[#B89868]" /> ID: {caseData.id.slice(0, 8).toUpperCase()}
                 </div>
              </div>
            </div>

            {/* Description Card */}
            <Card className="rounded-2xl border-[#E5E2DC] dark:border-stone-800 bg-[#FDFCF9] dark:bg-stone-900/20 shadow-sm">
              <CardHeader className="p-6 pb-2">
                 <CardTitle className="text-xl font-serif font-bold text-[#121315] dark:text-white">Case Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-2">
                 <p className="text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre-wrap font-normal">
                    {caseData.description}
                 </p>
              </CardContent>
            </Card>

            {/* Evidence/Files Mockup */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-[#121315] dark:text-white px-2">Attachments & Evidence</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                 {[
                   { name: "Property Deed.pdf", size: "2.4 MB", type: "document" },
                   { name: "Boundary Photo.jpg", size: "1.1 MB", type: "image" }
                 ].map((file, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-[#E5E2DC] dark:border-stone-850 bg-[#FAF9F5] dark:bg-stone-950/20 flex items-center justify-between hover:bg-[#FDFCF9] hover:border-[#B89868] transition-all duration-300 cursor-pointer group">
                      <div className="flex items-center gap-3">
                         <div className="h-10 w-10 rounded-xl bg-white dark:bg-stone-900 border border-[#E5E2DC] dark:border-stone-800 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-[#B89868]" />
                         </div>
                         <div>
                            <p className="text-sm font-bold text-[#121315] dark:text-white group-hover:text-[#B89868] transition-colors">{file.name}</p>
                            <p className="text-xs text-stone-500 font-normal">{file.size}</p>
                         </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-stone-400 group-hover:text-[#B89868] transition-colors" />
                    </div>
                 ))}
              </div>
            </div>

            {/* Timeline/History Mockup */}
            <div className="space-y-6 pt-4">
              <h3 className="text-xl font-serif font-bold text-[#121315] dark:text-white px-2 flex items-center gap-2">
                 <History className="h-5 w-5 text-[#B89868]" /> Case Timeline
              </h3>
              <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#E5E2DC] dark:before:bg-stone-850">
                 {[
                   { title: "Legal Consultation Scheduled", desc: "Assigned to Advocate Sarah Wilson", time: "2 hours ago", status: "upcoming", icon: Clock },
                   { title: "Evidence Verified", desc: "Deed documents were successfully verified by our system.", time: "Yesterday, 4:12 PM", status: "completed", icon: Shield },
                   { title: "Case Reported", desc: "Initial report submitted to LegalHub portal.", time: "Oct 12, 2025", status: "completed", icon: Gavel }
                 ].map((step, idx) => (
                   <div key={idx} className="relative">
                      <div className={`absolute -left-[37px] top-1 h-6 w-6 rounded-full border-4 border-[#FAF9F5] dark:border-stone-950 flex items-center justify-center z-10 
                        ${step.status === 'upcoming' ? 'bg-[#B89868]' : 'bg-[#1C1B19] dark:bg-[#FAF9F5]'}`}>
                        {step.status === 'completed' && <div className="h-2 w-2 rounded-full bg-white dark:bg-stone-900 animate-pulse"></div>}
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-[#121315] dark:text-white">{step.title}</p>
                        <p className="text-sm text-stone-500 dark:text-stone-450 font-normal">{step.desc}</p>
                        <p className="text-xs font-semibold text-[#B89868] dark:text-[#B89868]/90 uppercase tracking-wider">{step.time}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
             {/* Assigned Professional Card */}
             <Card className="rounded-2xl bg-[#121315] border border-[#E5E2DC]/10 text-white overflow-hidden shadow-sm">
                <CardHeader className="p-6 pb-2">
                  <Badge className="w-fit bg-emerald-500/10 text-emerald-450 border border-emerald-500/20 mb-2 rounded-lg font-semibold">Assigned Advocate</Badge>
                  <CardTitle className="text-xl font-serif font-bold text-[#FAF9F5]">Sarah Wilson</CardTitle>
                  <CardDescription className="text-stone-400 font-normal">Senior Property Attorney</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6 pt-4">
                  <div className="flex items-center gap-4">
                     <div className="h-14 w-14 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                        <User className="h-7 w-7 text-[#B89868]" />
                     </div>
                     <div>
                        <p className="text-sm font-bold">12 Years Exp.</p>
                        <p className="text-xs text-stone-500 font-normal">Bar ID: LH-992384</p>
                     </div>
                  </div>
                  <Button className="w-full h-11 rounded-xl bg-[#B89868] hover:bg-[#A38253] text-[#FAF9F5] font-semibold text-sm transition-all duration-300">
                    View Full Profile
                  </Button>
                </CardContent>
             </Card>

             {/* Quick Actions/Alerts */}
             <Card className="rounded-2xl border-[#E5E2DC] dark:border-stone-800 bg-[#FDFCF9] dark:bg-stone-900/10 shadow-sm overflow-hidden">
                <div className="bg-amber-500/10 border-b border-[#E5E2DC]/30 p-4 flex items-center gap-3">
                   <AlertCircle className="h-5 w-5 text-amber-600" />
                   <p className="text-sm font-bold text-amber-800 dark:text-amber-450">Action Required</p>
                </div>
                <CardContent className="p-6 space-y-4 text-left">
                   <p className="text-sm text-stone-600 dark:text-stone-300 font-normal leading-relaxed">
                     Please sign the <span className="font-semibold text-[#B89868] hover:underline cursor-pointer">Representation Agreement</span> to proceed with the boundary survey.
                   </p>
                   <Button size="sm" className="w-full bg-[#1C1B19] hover:bg-[#2C2A27] dark:bg-[#FAF9F5] dark:hover:bg-[#E5E2DC] text-white dark:text-[#121315] rounded-xl font-semibold h-10 shadow-sm transition-all">
                     Review & Sign
                   </Button>
                </CardContent>
             </Card>

             <Card className="rounded-2xl border-[#E5E2DC] dark:border-stone-800 bg-[#FDFCF9] dark:bg-stone-900/10 shadow-sm p-6 space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">Need immediate help?</h4>
                <p className="text-xs text-stone-555 leading-relaxed font-normal">Our AI Legal Assistant can answer specific questions about Nairobi property bylaws 24/7.</p>
                <Link href="/chat">
                    <Button variant="outline" className="w-full h-11 rounded-xl border-[#B89868] text-[#B89868] hover:bg-[#FAF9F5] dark:hover:bg-stone-900 font-semibold text-sm transition-all shadow-sm">
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
