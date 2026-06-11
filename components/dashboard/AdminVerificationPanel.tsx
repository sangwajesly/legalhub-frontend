import React, { useState, useEffect } from 'react';
import { ShieldCheck, UserCheck, Award, MapPin, Coins } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lawyer } from '@/types';
import apiClient from '@/lib/api-client';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/store/auth-store';

export const AdminVerificationPanel: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const [pendingLawyers, setPendingLawyers] = useState<Lawyer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPending = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getPendingLawyers();
      setPendingLawyers(response.data || []);
    } catch (err) {
      console.error('Failed to fetch pending lawyers:', err);
      toast.error('Failed to fetch pending registration requests.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      fetchPending();
    } else if (isAuthenticated && user?.role !== 'admin') {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  const handleVerify = async (lawyerId: string) => {
    try {
      await apiClient.verifyLawyer(lawyerId, true);
      toast.success('Lawyer profile successfully verified!');
      fetchPending();
    } catch (err) {
      console.error('Failed to verify lawyer:', err);
      toast.error('Failed to approve verification.');
    }
  };

  return (
    <Card className="border-[#E5E2DC] dark:border-stone-800 bg-[#FDFCF9] dark:bg-stone-900/10 shadow-sm rounded-2xl overflow-hidden max-w-4xl mx-auto">
      <CardHeader className="p-6 border-b border-[#E5E2DC] dark:border-stone-850">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-[#B89868] rounded-xl flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-serif font-bold text-[#121315] dark:text-[#FAF9F5] tracking-tight">Manual Lawyer Verification</CardTitle>
            <CardDescription className="text-stone-555 dark:text-stone-400">Review and verify credentials for new lawyer signups.</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin inline-flex w-8 h-8 border-2 border-[#B89868] border-t-transparent rounded-full mb-2"></div>
            <p className="text-sm text-stone-400">Loading pending requests...</p>
          </div>
        ) : pendingLawyers.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[#E5E2DC] dark:border-stone-850 rounded-2xl">
            <UserCheck className="h-12 w-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-stone-600 dark:text-stone-400">All caught up!</h3>
            <p className="text-stone-400 text-sm mt-1 max-w-xs mx-auto">No lawyer accounts are currently awaiting manual verification.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pendingLawyers.map((lawyer) => (
              <div key={lawyer.id} className="p-6 rounded-xl border border-[#E5E2DC] dark:border-stone-850 bg-[#FAF9F5] dark:bg-stone-950/20 space-y-4 shadow-sm hover:shadow transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E2DC]/50 dark:border-stone-800 pb-3">
                  <div>
                    <h3 className="text-lg font-bold font-serif text-[#121315] dark:text-[#FAF9F5]">{lawyer.name}</h3>
                    <p className="text-xs text-stone-500">{lawyer.email}</p>
                  </div>
                  <Button
                    onClick={() => handleVerify(lawyer.id)}
                    className="bg-[#B89868] hover:bg-[#A38253] text-white rounded-xl text-xs font-semibold px-5 py-2.5 flex items-center gap-1.5 shrink-0"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Approve Verification
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-[#B89868]" />
                    <div>
                      <p className="font-semibold text-stone-400 uppercase tracking-wider text-[9px]">License Number</p>
                      <p className="text-stone-700 dark:text-stone-300 font-medium">{lawyer.licenseNumber || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#B89868]" />
                    <div>
                      <p className="font-semibold text-stone-400 uppercase tracking-wider text-[9px]">Location</p>
                      <p className="text-stone-700 dark:text-stone-300 font-medium">{lawyer.location || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-[#B89868]" />
                    <div>
                      <p className="font-semibold text-stone-400 uppercase tracking-wider text-[9px]">Hourly Rate / Experience</p>
                      <p className="text-stone-700 dark:text-stone-300 font-medium">{lawyer.hourlyRate || 0} FCFA/hr ({lawyer.yearsOfExperience || 0} yrs)</p>
                    </div>
                  </div>
                </div>

                {lawyer.specialization && lawyer.specialization.length > 0 && (
                  <div className="space-y-1.5">
                    <p className="text-[9px] font-semibold text-stone-400 uppercase tracking-wider">Practice Areas</p>
                    <div className="flex flex-wrap gap-1.5">
                      {lawyer.specialization.map((area, index) => (
                        <Badge key={index} className="bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-850 text-stone-600 dark:text-stone-300 font-medium text-[10px] rounded-lg px-2 py-0.5">{area}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {lawyer.bio && (
                  <div className="space-y-1 bg-white dark:bg-stone-900/30 p-4 rounded-xl border border-[#E5E2DC]/50 dark:border-stone-800">
                    <p className="text-[9px] font-semibold text-stone-400 uppercase tracking-wider">Professional Statement</p>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-normal italic">"{lawyer.bio}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default AdminVerificationPanel;
