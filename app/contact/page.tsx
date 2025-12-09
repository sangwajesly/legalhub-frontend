'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 mb-4">Get in touch</h1>
                        <p className="text-lg text-slate-600">
                            We'd love to hear from you. Please fill out this form or shoot us an email.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                                <Mail className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">Email</h3>
                                <p className="text-slate-600">Our friendly team is here to help.</p>
                                <p className="text-blue-600 font-medium mt-1">support@legalhub.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-teal-100 text-teal-600 rounded-lg">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">Office</h3>
                                <p className="text-slate-600">Come say hello at our office headquarters.</p>
                                <p className="text-slate-900 font-medium mt-1">
                                    100 Smith Street<br />
                                    Collingwood VIC 3066 AU
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                                <Phone className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">Phone</h3>
                                <p className="text-slate-600">Mon-Fri from 8am to 5pm.</p>
                                <p className="text-slate-900 font-medium mt-1">+1 (555) 000-0000</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Card className="border-slate-200 shadow-lg">
                    <CardHeader>
                        <CardTitle>Send us a message</CardTitle>
                        <p className="text-sm text-muted-foreground">We'll get back to you as soon as possible.</p>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">First name</Label>
                                    <Input id="first-name" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name">Last name</Label>
                                    <Input id="last-name" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone number</Label>
                                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" placeholder="Leave us a message..." className="min-h-[120px]" />
                            </div>
                            <Button className="w-full gap-2">
                                <Send className="h-4 w-4" />
                                Send Message
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
