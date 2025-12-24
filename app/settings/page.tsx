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
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your account preferences and configurations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <nav className="space-y-1">
                    <Link href="/profile">
                        <Button variant="ghost" className="w-full justify-start text-slate-600 dark:text-slate-400 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400">
                            <User className="mr-2 h-4 w-4" />
                            Profile
                        </Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-start bg-blue-50 text-blue-700 font-semibold dark:bg-blue-900/20 dark:text-blue-400">
                        <Shield className="mr-2 h-4 w-4" />
                        Settings
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-slate-600 dark:text-slate-400">
                        <Shield className="mr-2 h-4 w-4" />
                        Security
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-slate-600 dark:text-slate-400">
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-slate-600 dark:text-slate-400">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Billing
                    </Button>
                </nav>

                <div className="md:col-span-3 space-y-6">
                    <Card className="dark:bg-slate-900 dark:border-slate-800">
                        <CardHeader>
                            <CardTitle className="dark:text-white">Profile Information</CardTitle>
                            <p className="text-sm text-muted-foreground dark:text-slate-400">Update your personal details and public profile.</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="dark:text-white">Full Name</Label>
                                <Input
                                    id="fullName"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="dark:text-white">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    disabled
                                    className="dark:bg-slate-800 dark:border-slate-700 dark:text-white opacity-60 cursor-not-allowed"
                                />
                            </div>
                            {/* Bio input removed or kept as placeholder if needed, but not functional for now as per type constraint */}
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSave} disabled={isSaving}>
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="dark:bg-slate-900 dark:border-slate-800">
                        <CardHeader>
                            <CardTitle className="dark:text-white">Account Preferences</CardTitle>
                            <p className="text-sm text-muted-foreground dark:text-slate-400">Customize your experience on LegalHub.</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white">Email Notifications</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Receive emails about your case updates.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white">Dark Mode</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Toggle dark theme for the interface.</p>
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
