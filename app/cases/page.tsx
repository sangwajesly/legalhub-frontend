'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/lib/store/auth-store';
import { Case, CaseSubmission } from '@/types';
import CaseForm from '@/components/cases/CaseForm';
import CaseList from '@/components/cases/CaseList';
import { FileText, Plus, List, Lock, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { DUMMY_CASES } from '@/lib/mock-data';

export default function CasesPage() {
    const { user, isAuthenticated } = useAuthStore();
    const [cases, setCases] = useState<Case[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState<'list' | 'new'>('list');

    const fetchCases = useCallback(async () => {
        if (!isAuthenticated || !user?.id) {
            setCases([]);
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const response = await apiClient.getUserCases(user.id);
            if (response && response.data) {
                setCases(response.data);
            } else {
                 setCases(DUMMY_CASES);
            }
        } catch (error) {
            console.error('Failed to fetch cases, using dummy data:', error);
            setCases(DUMMY_CASES);
        } finally {
            setIsLoading(false);
        }
    }, [isAuthenticated, user?.id]);

    useEffect(() => {
        fetchCases();
    }, [fetchCases]);

    // Role check: Only citizens and NGOs can report cases
    const isEligibleToReport = user?.role === 'citizen' || user?.role === 'ngo';

    const handleSubmitCase = async (data: CaseSubmission) => {
        if (!isEligibleToReport) {
            toast.error('Only Citizens and NGOs can report legal incidents.');
            return;
        }

        try {
            setIsLoading(true);
            await apiClient.submitCase(data);
            toast.success('Case reported successfully');
            setView('list');
            fetchCases();
        } catch (error) {
            console.error('Failed to submit case:', error);
            toast.error('Failed to submit case report');
            setIsLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-[#FAF9F5] dark:bg-[#121315]">
                <div className="w-20 h-20 bg-[#FDFCF9] dark:bg-stone-900/40 border border-[#E5E2DC] dark:border-stone-850 rounded-3xl flex items-center justify-center mb-6 text-[#B89868] shadow-sm animate-pulse">
                    <Lock className="h-10 w-10" />
                </div>
                <h1 className="text-3xl font-serif font-bold text-[#121315] dark:text-[#FAF9F5] mb-3 text-center">Authentication Required</h1>
                <p className="text-stone-500 dark:text-stone-400 mb-8 text-center max-w-md font-normal">Please sign in to access your secure cases and report new incidents.</p>
                <Link href="/login">
                    <Button className="bg-[#1C1B19] hover:bg-[#2C2A27] dark:bg-[#FAF9F5] dark:hover:bg-[#E5E2DC] text-white dark:text-[#121315] px-10 h-12 rounded-xl font-semibold shadow-sm transition-all duration-300">
                        <LogIn className="mr-2 h-5 w-5" /> Sign In Now
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen animate-fade-in bg-[#FAF9F5] dark:bg-[#121315]">
            {/* Header */}
            <div className="relative overflow-hidden bg-[#121315] border border-[#E5E2DC]/10 dark:border-stone-850 text-white py-12 px-4 rounded-2xl mb-8 shadow-sm">
                <div className="absolute inset-0 opacity-[0.03]">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center p-3 border border-[#B89868]/30 rounded-xl mb-4 bg-stone-900/60 shadow-sm">
                        <FileText className="h-6 w-6 text-[#B89868]" />
                    </div>
                    <h1 className="text-4xl font-serif font-bold mb-4 tracking-tight text-[#FAF9F5]">Case Reporting Center</h1>
                    <p className="text-stone-300 text-base max-w-2xl mx-auto font-normal">
                        Securely report legal incidents and track their status. 
                        We prioritize your complete privacy and safety.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 pb-12">
                {/* Navigation Tabs */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <Button
                        variant={view === 'list' ? 'default' : 'outline'}
                        onClick={() => setView('list')}
                        className={`gap-2 h-11 px-5 rounded-xl font-semibold transition-all duration-300 shadow-sm ${
                            view === 'list' 
                                ? 'bg-[#1C1B19] hover:bg-[#2C2A27] dark:bg-[#FAF9F5] dark:hover:bg-[#E5E2DC] text-white dark:text-[#121315]' 
                                : 'bg-[#FAF9F5] dark:bg-stone-900/30 text-stone-600 dark:text-stone-300 border border-[#E5E2DC] dark:border-stone-850 hover:bg-[#E5E2DC]'
                        }`}
                    >
                        <List className="h-4.5 w-4.5 text-[#B89868]" /> My Cases
                    </Button>
                    <Button
                        variant={view === 'new' ? 'default' : 'outline'}
                        onClick={() => setView('new')}
                        className={`gap-2 h-11 px-5 rounded-xl font-semibold transition-all duration-300 shadow-sm ${
                            view === 'new' 
                                ? 'bg-[#1C1B19] hover:bg-[#2C2A27] dark:bg-[#FAF9F5] dark:hover:bg-[#E5E2DC] text-white dark:text-[#121315]' 
                                : 'bg-[#FAF9F5] dark:bg-stone-900/30 text-stone-600 dark:text-stone-300 border border-[#E5E2DC] dark:border-stone-850 hover:bg-[#E5E2DC]'
                        }`}
                    >
                        <Plus className="h-4.5 w-4.5 text-[#B89868]" /> New Report
                    </Button>
                </div>

                {/* Content */}
                {view === 'new' ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {!isEligibleToReport ? (
                            <Card className="p-12 text-center border-[#E5E2DC] dark:border-stone-800 bg-[#FDFCF9] dark:bg-stone-900/10 rounded-2xl shadow-sm">
                                <div className="w-20 h-20 bg-[#FAF9F5] dark:bg-stone-900 border border-[#E5E2DC] dark:border-stone-800 text-[#B89868] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                                    <Lock className="h-10 w-10" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-[#121315] dark:text-white mb-3">Unauthorized Role</h3>
                                <p className="text-stone-500 dark:text-stone-400 max-w-md mx-auto mb-8 font-normal text-sm">
                                    Reporting cases is currently restricted to Citizen and NGO accounts. 
                                    Government and Lawyer accounts should use their respective dashboards for case management.
                                </p>
                                <div className="inline-block px-4 py-2 bg-[#FAF9F5] dark:bg-stone-950/40 rounded-xl border border-[#E5E2DC] dark:border-stone-850 text-sm font-semibold text-stone-555">
                                    Your Role: <span className="text-[#B89868] uppercase">{user?.role}</span>
                                </div>
                            </Card>
                        ) : (
                            <CaseForm onSubmit={handleSubmitCase} isLoading={isLoading} />
                        )}
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {isLoading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin inline-flex items-center justify-center w-8 h-8 border-4 border-[#B89868] border-t-transparent rounded-full mb-4"></div>
                                <p className="text-stone-500 dark:text-stone-400 font-medium">Loading your cases...</p>
                            </div>
                        ) : cases.length === 0 ? (
                            <div className="text-center py-16 bg-[#FDFCF9] dark:bg-stone-900/10 rounded-2xl border border-dashed border-[#E5E2DC] dark:border-stone-800 shadow-sm">
                                <FileText className="h-12 w-12 text-[#B89868] mx-auto mb-4" />
                                <h3 className="text-xl font-bold font-serif text-[#121315] dark:text-[#FAF9F5] mb-2">No cases reported yet</h3>
                                <p className="text-stone-500 dark:text-stone-400 mb-6 text-sm font-normal">You haven't submitted any case reports yet.</p>
                                {isEligibleToReport && (
                                    <Button onClick={() => setView('new')} className="bg-[#1C1B19] hover:bg-[#2C2A27] dark:bg-[#FAF9F5] dark:hover:bg-[#E5E2DC] text-white dark:text-[#121315] rounded-xl font-semibold px-6 py-2.5 h-auto transition-all shadow-sm">
                                        Report a Case
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <CaseList cases={cases} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
