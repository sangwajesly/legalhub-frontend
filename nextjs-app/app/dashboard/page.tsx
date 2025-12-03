'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { AnalyticsData } from '@/types';

const DashboardPage: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    serviceType: 'all',
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await apiClient.getAnalytics(filters);
        setAnalyticsData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch analytics data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDownloadReport = async (format: 'pdf' | 'excel' | 'csv') => {
    try {
      // For demonstration, not actually saving the file on client-side
      const blob = await apiClient.getAnalyticsReport(format);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics_report.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      alert(`Report downloaded in ${format} format!`);
    } catch (err: any) {
      alert(`Failed to download report: ${err.message || 'Unknown error'}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin inline-flex items-center justify-center w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="ml-4 text-gray-600">Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
          <p>No analytics data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">NGO-GO Analytics Dashboard</h1>

        {/* Filters and Report Download */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-wrap gap-4 items-center">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">
              Service Type
            </label>
            <select
              id="serviceType"
              name="serviceType"
              value={filters.serviceType}
              onChange={handleFilterChange}
              className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="all">All</option>
              <option value="legal">Legal Consultation</option>
              <option value="chat">Chat Support</option>
              <option value="case">Case Submission</option>
            </select>
          </div>
          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => handleDownloadReport('pdf')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Download PDF
            </button>
            <button
              onClick={() => handleDownloadReport('excel')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Download Excel
            </button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Total Cases</h2>
            <p className="text-4xl font-bold text-blue-600">{analyticsData.totalCases}</p>
            <p className="text-sm text-gray-500">Across all services</p>
          </div>

        </div>

        {/* Example Charts (Placeholder) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Consultations by Type</h2>
            {/* Replace with actual chart component */}
            <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400">
              Chart Placeholder (e.g., Bar Chart)
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h2>
            {/* Replace with actual chart component */}
            <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400">
              Chart Placeholder (e.g., Line Chart)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
