'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bell, Shield, User, CreditCard } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import { useAuthStore } from '@/lib/store/auth-store';

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [isSaving, setIsSaving] = React.useState(false);

    const { user, updateProfile } = useAuthStore();

    React.useEffect(() => {
        setMounted(true);
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            // Bio is not part of User type yet
        }
    }, [user]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateProfile({ name });
            // Ideally show success toast here
        } catch (error) {
            // Ideally show error toast here
        } finally {
            setIsSaving(false);
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <div className="container mx-auto p-6 max-w-4xl space-y-8">
            <div>
                <h1 className="text-3xl font-serif font-bold text-[#121315] dark:text-[#FAF9F5]">Settings</h1>
                <p className="text-stone-500 dark:text-stone-400 mt-2 font-normal">Manage your account preferences and configurations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <nav className="space-y-1">
                    <Link href="/profile">
                        <Button variant="ghost" className="w-full justify-start text-stone-600 dark:text-stone-400 hover:bg-[#FAF9F5] dark:hover:bg-stone-900/40 rounded-xl font-semibold">
                            <User className="mr-2 h-4 w-4 text-[#B89868]" />
                            Profile
                        </Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-start bg-[#1C1B19] hover:bg-[#2C2A27] dark:bg-[#FAF9F5] dark:hover:bg-[#E5E2DC] text-white dark:text-[#121315] font-semibold rounded-xl shadow-sm transition-all duration-300">
                        <Shield className="mr-2 h-4 w-4 text-[#B89868]" />
                        Settings
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-stone-600 dark:text-stone-400 hover:bg-[#FAF9F5] dark:hover:bg-stone-900/40 rounded-xl font-semibold">
                        <Shield className="mr-2 h-4 w-4 text-[#B89868]" />
                        Security
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-stone-600 dark:text-stone-400 hover:bg-[#FAF9F5] dark:hover:bg-stone-900/40 rounded-xl font-semibold">
                        <Bell className="mr-2 h-4 w-4 text-[#B89868]" />
                        Notifications
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-stone-600 dark:text-stone-400 hover:bg-[#FAF9F5] dark:hover:bg-stone-900/40 rounded-xl font-semibold">
                        <CreditCard className="mr-2 h-4 w-4 text-[#B89868]" />
                        Billing
                    </Button>
                </nav>

                <div className="md:col-span-3 space-y-6">
                    <Card className="border-[#E5E2DC] dark:border-stone-800 bg-[#FDFCF9] dark:bg-stone-900/20 rounded-2xl shadow-sm">
                        <CardHeader className="p-6 pb-2">
                            <CardTitle className="text-xl font-serif font-bold text-[#121315] dark:text-[#FAF9F5]">Profile Information</CardTitle>
                            <p className="text-sm text-stone-500 dark:text-stone-400 font-normal">Update your personal details and public profile.</p>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-stone-700 dark:text-stone-300 font-semibold ml-1">Full Name</Label>
                                <Input
                                    id="fullName"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="h-11 bg-[#FAF9F5] dark:bg-stone-950/40 border border-[#E5E2DC] dark:border-stone-850 rounded-xl focus:ring-2 focus:ring-[#B89868]/20 focus:border-[#B89868] dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-stone-700 dark:text-stone-300 font-semibold ml-1">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    disabled
                                    className="h-11 bg-[#FAF9F5]/40 dark:bg-stone-950/20 border border-[#E5E2DC]/60 dark:border-stone-850 rounded-xl dark:text-white opacity-60 cursor-not-allowed"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="p-6 pt-4 border-t border-[#E5E2DC]/55 dark:border-stone-850">
                            <Button onClick={handleSave} disabled={isSaving} className="bg-[#1C1B19] hover:bg-[#2C2A27] dark:bg-[#FAF9F5] dark:hover:bg-[#E5E2DC] text-white dark:text-[#121315] rounded-xl font-semibold px-6 py-2.5 h-auto shadow-sm transition-all">
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="border-[#E5E2DC] dark:border-stone-800 bg-[#FDFCF9] dark:bg-stone-900/20 rounded-2xl shadow-sm">
                        <CardHeader className="p-6 pb-2">
                            <CardTitle className="text-xl font-serif font-bold text-[#121315] dark:text-[#FAF9F5]">Account Preferences</CardTitle>
                            <p className="text-sm text-stone-500 dark:text-stone-400 font-normal">Customize your experience on LegalHub.</p>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-between pb-4 border-b border-[#E5E2DC] dark:border-stone-850">
                                <div>
                                    <p className="font-semibold text-stone-800 dark:text-white">Email Notifications</p>
                                    <p className="text-sm text-stone-500 dark:text-stone-400 font-normal">Receive emails about your case updates.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-stone-800 dark:text-white">Dark Mode</p>
                                    <p className="text-sm text-stone-500 dark:text-stone-400 font-normal">Toggle dark theme for the interface.</p>
                                </div>
                                <Switch
                                    checked={theme === 'dark'}
                                    onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
