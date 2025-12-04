'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Case } from '@/types';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

const CasesPage: React.FC = () => {
  const { user } = useAuth();
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCases = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await apiClient.getUserCases(user.uid);
        setCases(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch cases.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCases();
  }, [user]);

  const getSeverityColor = (severity: Case['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: Case['status']) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'under-review':
        return 'bg-blue-100 text-blue-800';
      case 'submitted':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin inline-flex items-center justify-center w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="ml-4 text-gray-600">Loading cases...</p>
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Cases</h1>
          <Link
            href="/cases/report"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          >
            Report New Case
          </Link>
        </div>

        {cases.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Cases Found</h2>
            <p className="text-gray-600 mb-6">You haven't submitted any cases yet.</p>
            <Link
              href="/cases/report"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Report Your First Case
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cases.map((caseItem) => (
              <Link
                key={caseItem.id}
                href={`/cases/${caseItem.id}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold text-gray-900">{caseItem.title}</h2>
                      {caseItem.isAnonymous && (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                          Anonymous
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{caseItem.description}</p>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className={`px-3 py-1 text-xs font-medium rounded ${getSeverityColor(caseItem.severity)}`}>
                        {caseItem.severity.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 text-xs font-medium rounded ${getStatusColor(caseItem.status)}`}>
                        {caseItem.status.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500">
                        {caseItem.caseType}
                      </span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{caseItem.location}</span>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm text-gray-500">
                      {new Date(caseItem.submittedAt).toLocaleDateString()}
                    </p>
                    {caseItem.attachments && caseItem.attachments.length > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        {caseItem.attachments.length} attachment(s)
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CasesPage;

