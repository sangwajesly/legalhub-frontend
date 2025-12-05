'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Lawyer } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import BookingModal from '@/components/lawyers/BookingModal';

const LawyerProfilePage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    const fetchLawyer = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        setError(null);
        const fetchedLawyer = await apiClient.getLawyerById(id as string);
        setLawyer(fetchedLawyer);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch lawyer profile.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLawyer();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin inline-flex items-center justify-center w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="ml-4 text-gray-600">Loading lawyer profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          <p>{error}</p>
          <Link href="/lawyers" className="text-blue-600 hover:underline mt-2 block">
            Back to Lawyers
          </Link>
        </div>
      </div>
    );
  }

  if (!lawyer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
          <p>Lawyer not found.</p>
          <Link href="/lawyers" className="text-blue-600 hover:underline mt-2 block">
            Back to Lawyers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Link
          href="/lawyers"
          className="text-blue-600 hover:underline mb-4 inline-block flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Lawyers
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-8 text-white">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                {lawyer.avatar ? (
                  <img
                    src={lawyer.avatar}
                    alt={lawyer.name}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white flex items-center justify-center">
                    <span className="text-4xl text-gray-400">{lawyer.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{lawyer.name}</h1>
                  {lawyer.verified && (
                    <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <p className="text-blue-100 mb-4">{lawyer.bio}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold">{lawyer.rating.toFixed(1)}</span>
                    <span className="text-blue-100">({lawyer.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{lawyer.yearsOfExperience} years experience</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{lawyer.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Specializations</h2>
                  <div className="flex flex-wrap gap-2">
                    {lawyer.specialization.map((spec) => (
                      <span
                        key={spec}
                        className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                  <p className="text-gray-700 leading-relaxed">{lawyer.bio}</p>
                </div>

                {/* Reviews Section - Placeholder */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h2>
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <p className="text-gray-600">Reviews will be displayed here</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {lawyer.reviewCount} review{lawyer.reviewCount !== 1 ? 's' : ''} total
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      ${lawyer.hourlyRate}
                      <span className="text-lg font-normal text-gray-600">/hour</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      {lawyer.availability ? (
                        <>
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Available now</span>
                        </>
                      ) : (
                        <>
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <span>Not available</span>
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setShowBookingModal(true)}
                    disabled={!lawyer.availability}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition mb-4"
                  >
                    Book Consultation
                  </button>

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Experience</span>
                      <span className="font-medium text-gray-900">{lawyer.yearsOfExperience} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating</span>
                      <span className="font-medium text-gray-900">
                        {lawyer.rating.toFixed(1)} / 5.0
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reviews</span>
                      <span className="font-medium text-gray-900">{lawyer.reviewCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location</span>
                      <span className="font-medium text-gray-900">{lawyer.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showBookingModal && (
        <BookingModal
          lawyer={lawyer}
          onClose={() => setShowBookingModal(false)}
          onSuccess={() => {
            setShowBookingModal(false);
            router.push('/bookings');
          }}
        />
      )}
    </div>
  );
};

export default LawyerProfilePage;

