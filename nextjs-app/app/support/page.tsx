'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


export default function SupportPage() {
    return (
        <div className="container mx-auto p-6 space-y-8 max-w-5xl">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900">How can we help?</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Find answers to common questions or reach out to our support team for assistance with LegalHub.
                </p>
                <div className="max-w-md mx-auto relative pt-4">
                    <Input placeholder="Search for help..." className="pl-10 h-12 text-lg shadow-sm" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 absolute left-3 top-7 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                <Card className="hover:shadow-lg transition-shadow border-slate-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="p-2 bg-blue-100 text-blue-600 rounded-lg">📚</span>
                            Getting Started
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-600 mb-4">New to LegalHub? Learn the basics of finding lawyers and managing cases.</p>
                        <Button variant="link" className="px-0 text-blue-600">Read Guides &rarr;</Button>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-slate-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="p-2 bg-teal-100 text-teal-600 rounded-lg">💳</span>
                            Billing & Plans
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-600 mb-4">Manage your subscription, payment methods, and view your invoices.</p>
                        <Button variant="link" className="px-0 text-blue-600">View Billing &rarr;</Button>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-slate-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="p-2 bg-purple-100 text-purple-600 rounded-lg">🛡️</span>
                            Safety & Privacy
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-600 mb-4">Understand how we protect your data and maintain confidentiality.</p>
                        <Button variant="link" className="px-0 text-blue-600">Learn More &rarr;</Button>
                    </CardContent>
                </Card>
            </div>

            <div className="py-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                            <h3 className="font-semibold text-slate-900 mb-2">How do I verify a lawyer's credentials?</h3>
                            <p className="text-slate-600">All lawyers on LegalHub undergo a strict verification process. You can view their verified badge on their profile.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                            <h3 className="font-semibold text-slate-900 mb-2">Is my case information private?</h3>
                            <p className="text-slate-600">Yes, all case details submitted through standard channels are encrypted and only visible to you and the lawyers you choose to share them with.</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                            <h3 className="font-semibold text-slate-900 mb-2">Can I cancel my subscription anytime?</h3>
                            <p className="text-slate-600">Absolutely. You can cancel your subscription from the Settings page at any time without penalty.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                            <h3 className="font-semibold text-slate-900 mb-2">How much does it cost to post a case?</h3>
                            <p className="text-slate-600">Posting a basic case summary is free. Premium features like priority listing or anonymous posting may incur a fee.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Still need help?</h2>
                <p className="text-slate-300 mb-8 max-w-2xl mx-auto">Our support team is available 24/7 to assist you with any issues or questions you may have.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">Contact Support</Button>
                    <Button size="lg" variant="outline" className="text-white border-slate-600 hover:bg-slate-800">Email Us</Button>
                </div>
            </div>
        </div>
    );
}
