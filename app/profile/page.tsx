'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/lib/store/auth-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Globe,
    Camera,
    Save,
    X,
    Edit2,
    Calendar,
    Briefcase,
    FileText,
    BookOpen,
    MessageSquare,
    Twitter,
    Linkedin,
    Facebook
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import apiClient from '@/lib/api-client';

export default function ProfilePage() {
    const { user, updateProfile } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [stats, setStats] = useState<any>(null);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        bio: user?.bio || '',
        phone: user?.phone || '',
        location: user?.location || '',
        website: user?.website || '',
        twitter: user?.socialLinks?.twitter || '',
        linkedin: user?.socialLinks?.linkedin || '',
        facebook: user?.socialLinks?.facebook || '',
    });

    const fetchUserStats = useCallback(async () => {
        if (!user?.id) return;
        try {
            const statsData = await apiClient.getUserStats(user.id);
            setStats(statsData);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    }, [user?.id]);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                bio: user.bio || '',
                phone: user.phone || '',
                location: user.location || '',
                website: user.website || '',
                twitter: user.socialLinks?.twitter || '',
                linkedin: user.socialLinks?.linkedin || '',
                facebook: user.socialLinks?.facebook || '',
            });

            // Fetch user stats
            fetchUserStats();
        }
    }, [user, fetchUserStats]);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            let avatarUrl = user?.avatar;

            // Upload avatar if changed
            if (avatarFile) {
                const uploadResult = await apiClient.uploadAvatar(avatarFile);
                avatarUrl = uploadResult.url;
                toast.success('Avatar uploaded successfully!');
            }

            // Update profile
            await updateProfile({
                name: formData.name,
                bio: formData.bio,
                phone: formData.phone,
                location: formData.location,
                website: formData.website,
                avatar: avatarUrl,
                socialLinks: {
                    twitter: formData.twitter,
                    linkedin: formData.linkedin,
                    facebook: formData.facebook,
                },
            });

            toast.success('Profile updated successfully!');
            setIsEditing(false);
            setAvatarFile(null);
            setAvatarPreview(null);
        } catch (error: any) {
            toast.error(error?.message || 'Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setAvatarFile(null);
        setAvatarPreview(null);
        if (user) {
            setFormData({
                name: user.name || '',
                bio: user.bio || '',
                phone: user.phone || '',
                location: user.location || '',
                website: user.website || '',
                twitter: user.socialLinks?.twitter || '',
                linkedin: user.socialLinks?.linkedin || '',
                facebook: user.socialLinks?.facebook || '',
            });
        }
    };

    if (!user) {
        return (
            <div className="container mx-auto p-6 max-w-6xl">
                <Card>
                    <CardContent className="p-12 text-center">
                        <p className="text-slate-500">Please log in to view your profile.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'lawyer': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'ngo': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'government': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200';
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-6xl space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Profile</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your personal information and preferences</p>
                </div>
                {!isEditing && (
                    <Button onClick={() => setIsEditing(true)} className="gap-2">
                        <Edit2 className="h-4 w-4" />
                        Edit Profile
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Profile Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Main Profile Card */}
                    <Card className="dark:bg-slate-900 dark:border-slate-800">
                        <CardHeader>
                            <CardTitle className="dark:text-white">Profile Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Avatar Section */}
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src={avatarPreview || user.avatar} alt={user.name} />
                                        <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                            {user.name.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    {isEditing && (
                                        <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition-colors">
                                            <Camera className="h-4 w-4" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleAvatarChange}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
                                    <p className="text-slate-500 dark:text-slate-400">{user.email}</p>
                                    <Badge className={`mt-2 ${getRoleBadgeColor(user.role)}`}>
                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                    </Badge>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="dark:text-white">
                                        <User className="h-4 w-4 inline mr-2" />
                                        Full Name
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="dark:text-white">
                                        <Mail className="h-4 w-4 inline mr-2" />
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        value={user.email}
                                        disabled
                                        className="dark:bg-slate-800 dark:border-slate-700 dark:text-white opacity-60"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="dark:text-white">
                                        <Phone className="h-4 w-4 inline mr-2" />
                                        Phone Number
                                    </Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="+1 (555) 123-4567"
                                        className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location" className="dark:text-white">
                                        <MapPin className="h-4 w-4 inline mr-2" />
                                        Location
                                    </Label>
                                    <Input
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="City, Country"
                                        className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="website" className="dark:text-white">
                                        <Globe className="h-4 w-4 inline mr-2" />
                                        Website
                                    </Label>
                                    <Input
                                        id="website"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="https://example.com"
                                        className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="bio" className="dark:text-white">
                                        <FileText className="h-4 w-4 inline mr-2" />
                                        Bio
                                    </Label>
                                    <Textarea
                                        id="bio"
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="Tell us about yourself..."
                                        rows={4}
                                        className="dark:bg-slate-800 dark:border-slate-700 dark:text-white resize-none"
                                    />
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="space-y-4 pt-4 border-t dark:border-slate-800">
                                <h3 className="font-semibold text-slate-900 dark:text-white">Social Links</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="twitter" className="dark:text-white">
                                            <Twitter className="h-4 w-4 inline mr-2" />
                                            Twitter
                                        </Label>
                                        <Input
                                            id="twitter"
                                            name="twitter"
                                            value={formData.twitter}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            placeholder="@username"
                                            className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="linkedin" className="dark:text-white">
                                            <Linkedin className="h-4 w-4 inline mr-2" />
                                            LinkedIn
                                        </Label>
                                        <Input
                                            id="linkedin"
                                            name="linkedin"
                                            value={formData.linkedin}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            placeholder="linkedin.com/in/username"
                                            className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="facebook" className="dark:text-white">
                                            <Facebook className="h-4 w-4 inline mr-2" />
                                            Facebook
                                        </Label>
                                        <Input
                                            id="facebook"
                                            name="facebook"
                                            value={formData.facebook}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            placeholder="facebook.com/username"
                                            className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {isEditing && (
                                <div className="flex gap-3 pt-4">
                                    <Button onClick={handleSave} disabled={isLoading} className="gap-2">
                                        <Save className="h-4 w-4" />
                                        {isLoading ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                    <Button onClick={handleCancel} variant="outline" disabled={isLoading} className="gap-2">
                                        <X className="h-4 w-4" />
                                        Cancel
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Stats & Activity */}
                <div className="space-y-6">
                    {/* Stats Card */}
                    <Card className="dark:bg-slate-900 dark:border-slate-800">
                        <CardHeader>
                            <CardTitle className="dark:text-white">Activity Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-600 rounded-lg">
                                        <Briefcase className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Bookings</p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                            {stats?.totalBookings || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-600 rounded-lg">
                                        <FileText className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Cases</p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                            {stats?.totalCases || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-600 rounded-lg">
                                        <BookOpen className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Articles Read</p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                            {stats?.articlesRead || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-orange-600 rounded-lg">
                                        <MessageSquare className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Articles Written</p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                            {stats?.articlesWritten || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Account Info Card */}
                    <Card className="dark:bg-slate-900 dark:border-slate-800">
                        <CardHeader>
                            <CardTitle className="dark:text-white">Account Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-slate-500" />
                                <span className="text-slate-600 dark:text-slate-400">
                                    Joined {new Date(user.createdAt).toLocaleDateString('en-US', {
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                            {user.updatedAt && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Edit2 className="h-4 w-4 text-slate-500" />
                                    <span className="text-slate-600 dark:text-slate-400">
                                        Last updated {new Date(user.updatedAt).toLocaleDateString()}
                                    </span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
