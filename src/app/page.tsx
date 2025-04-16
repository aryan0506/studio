'use client';

import SuggestionDisplay from '@/components/SuggestionDisplay';
import UserInputForm from '@/components/UserInputForm';
import {CareerContext} from '@/components/CareerContext';
import {useState} from 'react';

export default function Home() {
  const [careers, setCareers] = useState([]);

  return (
    <CareerContext.Provider value={{careers, setCareers}}>
      <div className="min-h-screen flex flex-col">
        <header className="bg-white p-6 shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            EDIFY Career Companion
          </h1>
          <p className="text-sm text-gray-500 text-center">
            Your personalized AI-powered roadmap to a brighter future
          </p>
        </header>

        <div className="flex flex-grow">
          <div className="w-full p-6">
            <UserInputForm />
          </div>
        </div>
        {careers.length > 0 && (
          <div className="w-full p-6">
            <SuggestionDisplay />
          </div>
        )}
      </div>
    </CareerContext.Provider>
  );
}
