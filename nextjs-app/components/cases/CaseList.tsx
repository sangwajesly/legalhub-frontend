'use client';

import React from 'react';
import { Case } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Shield } from 'lucide-react';

interface CaseListProps {
    cases: Case[];
}

const CaseList: React.FC<CaseListProps> = ({ cases }) => {
    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'critical': return 'destructive';
            case 'high': return 'warning';
            case 'medium': return 'secondary';
            case 'low': return 'success';
            default: return 'default';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'resolved': return 'success';
            case 'under-review': return 'secondary';
            case 'submitted': return 'outline';
            default: return 'default';
        }
    };

    return (
        <div className="space-y-4">
            {cases.map((caseItem) => (
                <Card key={caseItem.id} className="hover:shadow-md transition-shadow border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">{caseItem.title}</h3>
                                    <Badge variant={getStatusColor(caseItem.status)}>
                                        {caseItem.status.replace('-', ' ')}
                                    </Badge>
                                </div>

                                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">
                                    {caseItem.description}
                                </p>

                                <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
                                    <div className="flex items-center gap-1">
                                        <Shield className="h-3.5 w-3.5 text-blue-500 dark:text-teal-500" />
                                        <span className="capitalize">{caseItem.caseType}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-3.5 w-3.5 text-blue-500 dark:text-teal-500" />
                                        <span>{caseItem.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3.5 w-3.5 text-blue-500 dark:text-teal-500" />
                                        <span>{new Date(caseItem.submittedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end justify-between min-w-[100px]">
                                <Badge variant={getSeverityColor(caseItem.severity)} className="capitalize">
                                    {caseItem.severity} Priority
                                </Badge>
                                {caseItem.isAnonymous && (
                                    <span className="text-xs text-slate-400 dark:text-slate-500 italic mt-2">Anonymous</span>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default CaseList;
