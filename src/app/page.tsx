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
        {careers.length > 0 && (
          <div className="w-full md:w-1/2 bg-slate-700 p-6 overflow-y-auto">
            <SuggestionDisplay />
          </div>
        )}
      </div>
    </CareerContext.Provider>
  );
}
