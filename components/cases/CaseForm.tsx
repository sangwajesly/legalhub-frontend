'use client';

import React, { useState } from 'react';
import { CaseSubmission } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertCircle, Send } from 'lucide-react';

interface CaseFormProps {
    onSubmit: (data: CaseSubmission) => Promise<void>;
    isLoading: boolean;
}

const CaseForm: React.FC<CaseFormProps> = ({ onSubmit, isLoading }) => {
    const [formData, setFormData] = useState<CaseSubmission>({
        title: '',
        description: '',
        caseType: '',
        severity: 'low',
        location: '',
        jurisdiction: '',
        isAnonymous: false,
        attachments: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <Card className="border-[#E5E2DC] dark:border-stone-800 shadow-sm bg-[#FDFCF9] dark:bg-stone-900/20 rounded-2xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-serif font-bold text-[#121315] dark:text-[#FAF9F5]">
                    <AlertCircle className="h-5 w-5 text-[#B89868]" />
                    Report a New Case
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <Label htmlFor="title" className="text-stone-700 dark:text-stone-300 font-semibold ml-1">Case Title</Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Brief summary of the incident"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="h-11 bg-[#FAF9F5] dark:bg-stone-950/40 border border-[#E5E2DC] dark:border-stone-850 rounded-xl focus:ring-2 focus:ring-[#B89868]/20 focus:border-[#B89868] dark:text-white placeholder-stone-400 dark:placeholder-stone-500"
                        />
                    </div>

                    {/* Type & Severity */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="caseType" className="text-stone-700 dark:text-stone-300 font-semibold ml-1">Case Type</Label>
                            <select
                                id="caseType"
                                name="caseType"
                                value={formData.caseType}
                                onChange={handleChange}
                                className="w-full h-11 px-3 bg-[#FAF9F5] dark:bg-stone-950/40 border border-[#E5E2DC] dark:border-stone-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B89868]/20 focus:border-[#B89868] text-sm text-[#121315] dark:text-white font-medium"
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="Civil Rights">Civil Rights</option>
                                <option value="Criminal">Criminal</option>
                                <option value="Family">Family</option>
                                <option value="Labor">Labor</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <Label htmlFor="severity" className="text-stone-700 dark:text-stone-300 font-semibold ml-1">Severity</Label>
                            <select
                                id="severity"
                                name="severity"
                                value={formData.severity}
                                onChange={handleChange}
                                className="w-full h-11 px-3 bg-[#FAF9F5] dark:bg-stone-950/40 border border-[#E5E2DC] dark:border-stone-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B89868]/20 focus:border-[#B89868] text-sm text-[#121315] dark:text-white font-medium"
                                required
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="description" className="text-stone-700 dark:text-stone-300 font-semibold ml-1">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Detailed description of what happened..."
                            rows={5}
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="bg-[#FAF9F5] dark:bg-stone-950/40 border border-[#E5E2DC] dark:border-stone-850 rounded-xl focus:ring-2 focus:ring-[#B89868]/20 focus:border-[#B89868] dark:text-white placeholder-stone-400 dark:placeholder-stone-500 font-normal"
                        />
                    </div>

                    {/* Location & Jurisdiction */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="location" className="text-stone-700 dark:text-stone-300 font-semibold ml-1">Location</Label>
                            <Input
                                id="location"
                                name="location"
                                placeholder="City, State, or Address"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="h-11 bg-[#FAF9F5] dark:bg-stone-950/40 border border-[#E5E2DC] dark:border-stone-850 rounded-xl focus:ring-2 focus:ring-[#B89868]/20 focus:border-[#B89868] dark:text-white placeholder-stone-400 dark:placeholder-stone-500"
                            />
                        </div>
                        <div>
                            <Label htmlFor="jurisdiction" className="text-stone-700 dark:text-stone-300 font-semibold ml-1">Jurisdiction</Label>
                            <Input
                                id="jurisdiction"
                                name="jurisdiction"
                                placeholder="e.g., Federal, State, Local"
                                value={formData.jurisdiction}
                                onChange={handleChange}
                                required
                                className="h-11 bg-[#FAF9F5] dark:bg-stone-950/40 border border-[#E5E2DC] dark:border-stone-850 rounded-xl focus:ring-2 focus:ring-[#B89868]/20 focus:border-[#B89868] dark:text-white placeholder-stone-400 dark:placeholder-stone-500"
                            />
                        </div>
                    </div>

                    {/* Anonymous & Submit */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#E5E2DC] dark:border-stone-850">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                name="isAnonymous"
                                checked={formData.isAnonymous}
                                onChange={handleCheckboxChange}
                                className="w-4 h-4 rounded accent-[#B89868] text-[#B89868] focus:ring-[#B89868]/20 border-stone-300 dark:border-stone-800 dark:bg-stone-950/40"
                            />
                            <span className="text-sm text-stone-700 dark:text-stone-300 font-medium">Submit Anonymously</span>
                        </label>

                        <Button type="submit" disabled={isLoading} className="bg-[#1C1B19] hover:bg-[#2C2A27] dark:bg-[#FAF9F5] dark:hover:bg-[#E5E2DC] text-white dark:text-[#121315] rounded-xl font-semibold px-6 py-2.5 h-auto transition-all shadow-sm">
                            {isLoading ? 'Submitting...' : (
                                <>
                                    Submit Report <Send className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default CaseForm;
