'use client';

import React, { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';
import { Case, CaseSubmission } from '@/types';
import CaseForm from '@/components/cases/CaseForm';
import CaseList from '@/components/cases/CaseList';
import { FileText, Plus, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

import { DUMMY_CASES } from '@/lib/mock-data';

export default function CasesPage() {
    const [cases, setCases] = useState<Case[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState<'list' | 'new'>('list');

    const fetchCases = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.getCases();
            if (response && response.data) {
                setCases(response.data);
            } else {
                 console.log('Using dummy cases');
                 setCases(DUMMY_CASES);
            }
        } catch (error) {
            console.error('Failed to fetch cases, using dummy data:', error);
            setCases(DUMMY_CASES);
            // Don't show error toast if we have a fallback
            // toast.error('Failed to load your cases');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCases();
    }, []);

    const handleSubmitCase = async (data: CaseSubmission) => {
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

    return (
        <div className="min-h-screen animate-fade-in bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-teal-600 dark:from-teal-600 dark:via-emerald-600 dark:to-cyan-700 text-white py-12 px-4 rounded-xl mb-8 shadow-lg">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-4 backdrop-blur-sm">
                        <FileText className="h-6 w-6 text-blue-300 dark:text-emerald-300" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 tracking-tight">Case Reporting Center</h1>
                    <p className="text-blue-50 text-lg max-w-2xl mx-auto">
                        Securely report legal incidents and track their status.
                        We prioritize your privacy and safety.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 pb-12">
                {/* Navigation Tabs */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <Button
                        variant={view === 'list' ? 'default' : 'outline'}
                        onClick={() => setView('list')}
                        className={`gap-2 ${view === 'list' ? 'bg-blue-600 dark:bg-teal-600 text-white hover:bg-blue-700 dark:hover:bg-teal-700' : 'bg-white dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700'}`}
                    >
                        <List className="h-4 w-4" /> My Cases
                    </Button>
                    <Button
                        variant={view === 'new' ? 'default' : 'outline'}
                        onClick={() => setView('new')}
                        className={`gap-2 ${view === 'new' ? 'bg-blue-600 dark:bg-gradient-to-r dark:from-teal-600 dark:to-emerald-600 text-white hover:bg-blue-700 dark:hover:from-teal-700 dark:hover:to-emerald-700' : 'bg-white dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700'}`}
                    >
                        <Plus className="h-4 w-4" /> New Report
                    </Button>
                </div>

                {/* Content */}
                {view === 'new' ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <CaseForm onSubmit={handleSubmitCase} isLoading={isLoading} />
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {isLoading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin inline-flex items-center justify-center w-8 h-8 border-4 border-blue-600 dark:border-teal-500 border-t-transparent rounded-full mb-4"></div>
                                <p className="text-slate-500 dark:text-slate-400">Loading your cases...</p>
                            </div>
                        ) : cases.length === 0 ? (
                            <div className="text-center py-16 bg-white dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                                <FileText className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No cases reported yet</h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-6">You haven't submitted any case reports.</p>
                                <Button onClick={() => setView('new')} className="bg-blue-600 dark:bg-gradient-to-r dark:from-teal-600 dark:to-emerald-600 hover:bg-blue-700 dark:hover:from-teal-700 dark:hover:to-emerald-700">
                                    Report a Case
                                </Button>
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
