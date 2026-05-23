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
                <Card key={caseItem.id} className="hover:shadow-md transition-all duration-300 border-[#E5E2DC] dark:border-stone-800 bg-[#FDFCF9] dark:bg-stone-900/20 rounded-2xl hover:border-[#B89868]">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-serif font-bold text-lg text-[#121315] dark:text-[#FAF9F5]">{caseItem.title}</h3>
                                    <Badge variant={getStatusColor(caseItem.status)} className="rounded-lg capitalize">
                                        {caseItem.status.replace('-', ' ')}
                                    </Badge>
                                </div>

                                <p className="text-stone-600 dark:text-stone-350 text-sm mb-4 line-clamp-2 font-normal">
                                    {caseItem.description}
                                </p>

                                <div className="flex flex-wrap gap-4 text-xs text-stone-500 dark:text-stone-400">
                                    <div className="flex items-center gap-1.5">
                                        <Shield className="h-3.5 w-3.5 text-[#B89868]" />
                                        <span className="capitalize">{caseItem.caseType}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="h-3.5 w-3.5 text-[#B89868]" />
                                        <span>{caseItem.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="h-3.5 w-3.5 text-[#B89868]" />
                                        <span>{new Date(caseItem.submittedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-start md:items-end justify-between min-w-[100px] gap-2 md:gap-0">
                                <Badge variant={getSeverityColor(caseItem.severity)} className="capitalize rounded-lg px-2.5 py-0.5">
                                    {caseItem.severity} Priority
                                </Badge>
                                {caseItem.isAnonymous && (
                                    <span className="text-xs text-stone-400 dark:text-stone-500 italic mt-2">Anonymous</span>
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
