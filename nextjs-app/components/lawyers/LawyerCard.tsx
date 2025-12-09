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
    <Card className="group hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800/50 backdrop-blur-sm hover:border-blue-300 dark:hover:border-teal-600">
      <CardContent className="p-7">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="relative w-24 h-24 bg-gradient-to-br from-blue-400 to-teal-500 dark:from-teal-500 dark:via-emerald-500 dark:to-cyan-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg ring-4 ring-blue-100 dark:ring-teal-900/50 group-hover:scale-105 transition-transform duration-300">
              {lawyer.avatar && lawyer.avatar.startsWith('http') ? (
                <img src={lawyer.avatar} alt={lawyer.name} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                lawyer.name.charAt(0)
              )}
              {lawyer.verified && (
                <div className="absolute -top-1 -right-1 w-7 h-7 bg-teal-500 dark:bg-emerald-500 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-md">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
              <div>
                <h3 className="font-bold text-2xl text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-teal-400 transition-colors">
                  {lawyer.name}
                </h3>
                <p className="text-sm font-semibold text-blue-600 dark:text-teal-400 mt-1.5">
                  {lawyer.specialization.join(' • ')}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-5 text-sm mb-5">
              <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-lg">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <span className="font-bold text-slate-900 dark:text-white">{lawyer.rating.toFixed(1)}</span>
                <span className="text-slate-500 dark:text-slate-400">({lawyer.reviewCount})</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <MapPin className="h-4 w-4 text-blue-500 dark:text-teal-500" />
                <span className="font-medium">{lawyer.location}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Clock className="h-4 w-4 text-blue-500 dark:text-teal-500" />
                <span className="font-medium">{lawyer.yearsOfExperience} years exp</span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-6">
              {lawyer.bio}
            </p>

            {/* Rate and Action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">
                    {lawyer.hourlyRate} <span className="text-lg font-medium text-slate-500 dark:text-slate-400">{getCurrency()}</span>
                  </span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">per hour</span>
                </div>

                <div className="h-12 w-px bg-slate-200 dark:bg-slate-700"></div>

                <div className="flex items-center gap-2">
                  {lawyer.availability ? (
                    <>
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 dark:bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500 dark:bg-emerald-500"></span>
                      </span>
                      <span className="text-sm font-semibold text-teal-700 dark:text-emerald-400">Available</span>
                    </>
                  ) : (
                    <>
                      <span className="h-3 w-3 rounded-full bg-slate-400"></span>
                      <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Busy</span>
                    </>
                  )}
                </div>
              </div>

              <Button
                onClick={() => onSelectLawyer(lawyer)}
                disabled={!lawyer.availability}
                className={`w-full sm:w-auto px-6 py-6 font-semibold transition-all duration-300 rounded-xl text-base shadow-lg ${lawyer.availability
                  ? 'bg-gradient-to-r from-blue-600 to-teal-600 dark:from-teal-600 dark:to-emerald-600 hover:from-blue-700 hover:to-teal-700 dark:hover:from-teal-700 dark:hover:to-emerald-700 text-white hover:shadow-xl hover:scale-105'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
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
