'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Case } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const CaseDetailPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [caseItem, setCaseItem] = useState<Case | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCase = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        setError(null);
        const fetchedCase = await apiClient.getCaseById(id as string);
        setCaseItem(fetchedCase);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch case.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCase();
  }, [id]);

  const getSeverityColor = (severity: Case['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: Case['status']) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'under-review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'submitted':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin inline-flex items-center justify-center w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="ml-4 text-gray-600">Loading case...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          <p>{error}</p>
          <Link href="/cases" className="text-blue-600 hover:underline mt-2 block">
            Back to Cases
          </Link>
        </div>
      </div>
    );
  }

  if (!caseItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
          <p>Case not found.</p>
          <Link href="/cases" className="text-blue-600 hover:underline mt-2 block">
            Back to Cases
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/cases"
          className="text-blue-600 hover:underline mb-4 inline-block flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Cases
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{caseItem.title}</h1>
                {caseItem.isAnonymous && (
                  <span className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded">
                    Anonymous
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className={`px-3 py-1 text-sm font-medium rounded border ${getSeverityColor(caseItem.severity)}`}>
                  Severity: {caseItem.severity.toUpperCase()}
                </span>
                <span className={`px-3 py-1 text-sm font-medium rounded border ${getStatusColor(caseItem.status)}`}>
                  Status: {caseItem.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Case Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Case Type</p>
                  <p className="font-medium text-gray-900">{caseItem.caseType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-900">{caseItem.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Jurisdiction</p>
                  <p className="font-medium text-gray-900">{caseItem.jurisdiction}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Submitted</p>
                  <p className="font-medium text-gray-900">
                    {new Date(caseItem.submittedAt).toLocaleDateString()}
                  </p>
                </div>
                {caseItem.updatedAt !== caseItem.submittedAt && (
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="font-medium text-gray-900">
                      {new Date(caseItem.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
              <div className="prose prose-blue max-w-none text-gray-800 leading-relaxed bg-gray-50 p-4 rounded-lg">
                <p className="whitespace-pre-wrap">{caseItem.description}</p>
              </div>
            </div>

            {caseItem.attachments && caseItem.attachments.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Attachments</h2>
                <div className="space-y-2">
                  {caseItem.attachments.map((attachment, index) => (
                    <a
                      key={index}
                      href={attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                    >
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm text-gray-700">Attachment {index + 1}</span>
                      <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetailPage;

