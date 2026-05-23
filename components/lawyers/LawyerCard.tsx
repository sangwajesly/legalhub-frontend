'use client';

import React from 'react';
import { Lawyer } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, CheckCircle } from 'lucide-react';

interface LawyerCardProps {
  lawyer: Lawyer;
  onSelectLawyer: (lawyer: Lawyer) => void;
}

const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer, onSelectLawyer }) => {
  const getCurrency = () => {
    if (lawyer.location.includes('Nigeria')) return '₦';
    if (lawyer.location.includes('Ghana')) return 'GH₵';
    return 'CFA';
  };

  return (
    <Card className="group hover:shadow-md transition-all duration-300 border-[#E5E2DC] dark:border-stone-800 overflow-hidden bg-[#FDFCF9] dark:bg-stone-900/20 backdrop-blur-sm hover:border-[#B89868] dark:hover:border-[#B89868] rounded-2xl">
      <CardContent className="p-7">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="relative w-24 h-24 bg-gradient-to-br from-[#FAF9F5] to-[#E5E2DC] dark:from-stone-800 dark:to-stone-900 rounded-2xl flex items-center justify-center text-[#1C1B19] dark:text-[#FAF9F5] font-serif font-bold text-3xl shadow-sm border border-[#E5E2DC] dark:border-stone-850 group-hover:scale-105 transition-transform duration-300">
              {lawyer.avatar && lawyer.avatar.startsWith('http') ? (
                <img src={lawyer.avatar} alt={lawyer.name} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                lawyer.name.charAt(0)
              )}
              {lawyer.verified && (
                <div className="absolute -top-1 -right-1 w-7 h-7 bg-[#B89868] rounded-full flex items-center justify-center border-4 border-[#FDFCF9] dark:border-stone-900 shadow-sm">
                  <CheckCircle className="h-4.5 w-4.5 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
              <div>
                <h3 className="font-serif font-bold text-2xl text-[#121315] dark:text-[#FAF9F5] group-hover:text-[#B89868] dark:group-hover:text-[#B89868] transition-colors">
                  {lawyer.name}
                </h3>
                <p className="text-sm font-semibold text-[#B89868] dark:text-[#B89868]/90 mt-1.5 tracking-wide">
                  {lawyer.specialization.join(' • ')}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-5 text-sm mb-5">
              <div className="flex items-center gap-2 bg-[#FAF9F5] dark:bg-stone-900/40 border border-[#E5E2DC] dark:border-stone-850 px-3 py-1.5 rounded-xl">
                <Star className="h-4 w-4 text-[#B89868] fill-[#B89868]" />
                <span className="font-bold text-[#121315] dark:text-white">{lawyer.rating.toFixed(1)}</span>
                <span className="text-stone-500 dark:text-stone-400">({lawyer.reviewCount})</span>
              </div>
              <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300">
                <MapPin className="h-4 w-4 text-[#B89868]" />
                <span className="font-medium">{lawyer.location}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300">
                <Clock className="h-4 w-4 text-[#B89868]" />
                <span className="font-medium">{lawyer.yearsOfExperience} years exp</span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed mb-6 font-normal">
              {lawyer.bio}
            </p>

            {/* Rate and Action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t border-[#E5E2DC] dark:border-stone-800">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-serif font-bold text-[#121315] dark:text-white">
                    {lawyer.hourlyRate} <span className="text-lg font-medium text-stone-500 dark:text-stone-400">{getCurrency()}</span>
                  </span>
                  <span className="text-xs font-medium text-stone-500 dark:text-stone-400">per hour</span>
                </div>

                <div className="h-12 w-px bg-[#E5E2DC] dark:bg-stone-800"></div>

                <div className="flex items-center gap-2">
                  {lawyer.availability ? (
                    <>
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                      <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Available Now</span>
                    </>
                  ) : (
                    <>
                      <span className="h-3 w-3 rounded-full bg-stone-400"></span>
                      <span className="text-sm font-semibold text-stone-500 dark:text-stone-400">Busy</span>
                    </>
                  )}
                </div>
              </div>

              <Button
                onClick={() => onSelectLawyer(lawyer)}
                disabled={!lawyer.availability}
                className={`w-full sm:w-auto px-6 py-6 font-semibold transition-all duration-300 rounded-xl text-base shadow-sm ${lawyer.availability
                  ? 'bg-[#1C1B19] hover:bg-[#2C2A27] dark:bg-[#FAF9F5] dark:hover:bg-[#E5E2DC] text-[#FAF9F5] dark:text-[#121315] hover:scale-[1.02]'
                  : 'bg-stone-100 dark:bg-stone-900 text-stone-400 dark:text-stone-600 border border-stone-200 dark:border-stone-800 cursor-not-allowed'
                  }`}
              >
                {lawyer.availability ? 'Book Consultation' : 'Unavailable'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LawyerCard;
