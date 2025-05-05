'use client';

import SuggestionDisplay from '@/components/SuggestionDisplay';
import UserInputForm from '@/components/UserInputForm';
import { CareerContext } from '@/components/CareerContext';
import { useState } from 'react';

export default function Home() {
  const [careers, setCareers] = useState([]);

  return (
    <CareerContext.Provider value={{ careers, setCareers }}>
      {/* Full-screen, two-column layout */}
      <div className="h-screen flex overflow-hidden">
        {/* ← LEFT: fixed input pane */}
        <div className="w-full md:w-1/2 bg-slate-800 p-6">
          {/* sticky so it stays in view */}
          <div className="sticky top-0">
            <UserInputForm />
          </div>
        </div>

        {/* ← RIGHT: only shows when there are results */}
          <div className="w-full md:w-1/2 bg-slate-700 p-6 overflow-y-auto">
          {careers.length > 0 ? (
            <SuggestionDisplay />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-6 bg-slate-800 rounded-lg shadow-inner border border-slate-600">
              <svg
                className="w-12 h-12 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-gray-300 text-xl font-medium">No details are available</p>
              <p className="text-gray-500 mt-2 text-sm">Please try adjusting your search or check back later.</p>
            </div>
            )}
          </div>
      </div>
    </CareerContext.Provider>
  );
}
