'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { AnalyticsData } from '@/types';

interface NGODashboardProps {
  data: AnalyticsData;
  isLoading: boolean;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function NGODashboard({ data, isLoading }: NGODashboardProps) {
  if (isLoading) {
    return <div className="p-8 text-center">Loading Analytics...</div>;
  }

  const categoryData = Object.entries(data.casesByCategory || {}).map(([name, value]) => ({
    name,
    value,
  }));

  const severityData = Object.entries(data.casesBySeverity || {}).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">NGO Analytics Dashboard</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Regional tracking and legal trend analysis.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="rounded-[2rem] border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle>Case Categories</CardTitle>
            <CardDescription>Distribution of cases by legal area</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle>Case Severities</CardTitle>
            <CardDescription>Breakdown of reported issue severity</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {severityData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-[2rem] border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <CardHeader>
          <CardTitle>Status Overview</CardTitle>
          <CardDescription>Current state of all monitored cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl flex-1 text-center">
              <p className="text-sm font-bold text-slate-500 uppercase">Total Cases</p>
              <p className="text-3xl font-black text-blue-600">{data.totalCases}</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-2xl flex-1 text-center">
              <p className="text-sm font-bold text-slate-500 uppercase">Resolution Rate</p>
              <p className="text-3xl font-black text-green-600">{(data.resolutionRate * 100).toFixed(0)}%</p>
            </div>
            <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl flex-1 text-center">
              <p className="text-sm font-bold text-slate-500 uppercase">Avg. Resolution</p>
              <p className="text-3xl font-black text-amber-600">{data.averageResolutionTime}d</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
