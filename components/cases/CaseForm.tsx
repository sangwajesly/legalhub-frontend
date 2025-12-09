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
        <Card className="border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-800/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl dark:text-white">
                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-teal-400" />
                    Report a New Case
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <Label htmlFor="title" className="dark:text-slate-300">Case Title</Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Brief summary of the incident"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
                        />
                    </div>

                    {/* Type & Severity */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="caseType" className="dark:text-slate-300">Case Type</Label>
                            <select
                                id="caseType"
                                name="caseType"
                                value={formData.caseType}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-teal-500/20 focus:border-blue-500 dark:focus:border-teal-500 text-slate-900 dark:text-white"
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
                            <Label htmlFor="severity" className="dark:text-slate-300">Severity</Label>
                            <select
                                id="severity"
                                name="severity"
                                value={formData.severity}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-teal-500/20 focus:border-blue-500 dark:focus:border-teal-500 text-slate-900 dark:text-white"
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
                        <Label htmlFor="description" className="dark:text-slate-300">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Detailed description of what happened..."
                            rows={5}
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
                        />
                    </div>

                    {/* Location & Jurisdiction */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="location" className="dark:text-slate-300">Location</Label>
                            <Input
                                id="location"
                                name="location"
                                placeholder="City, State, or Address"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
                            />
                        </div>
                        <div>
                            <Label htmlFor="jurisdiction" className="dark:text-slate-300">Jurisdiction</Label>
                            <Input
                                id="jurisdiction"
                                name="jurisdiction"
                                placeholder="e.g., Federal, State, Local"
                                value={formData.jurisdiction}
                                onChange={handleChange}
                                required
                                className="dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
                            />
                        </div>
                    </div>

                    {/* Anonymous & Submit */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="isAnonymous"
                                checked={formData.isAnonymous}
                                onChange={handleCheckboxChange}
                                className="w-4 h-4 text-blue-600 dark:text-teal-600 rounded border-slate-300 dark:border-slate-600 focus:ring-blue-500 dark:focus:ring-teal-500 dark:bg-slate-900"
                            />
                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Submit Anonymously</span>
                        </label>

                        <Button type="submit" disabled={isLoading} className="bg-blue-600 dark:bg-gradient-to-r dark:from-teal-600 dark:to-emerald-600 hover:bg-blue-700 dark:hover:from-teal-700 dark:hover:to-emerald-700">
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
