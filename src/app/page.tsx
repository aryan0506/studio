'use client';

import SuggestionDisplay from '@/components/SuggestionDisplay';
import UserInputForm from '@/components/UserInputForm';
import {CareerContext} from '@/components/CareerContext';
import {useState} from 'react';

export default function Home() {
  const [careers, setCareers] = useState([]);

  return (
    <CareerContext.Provider value={{careers, setCareers}}>
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4">
          <UserInputForm />
        </div>
        {careers.length > 0 && (
          <div className="w-full md:w-1/2 p-4">
            <SuggestionDisplay />
          </div>
        )}
      </div>
    </CareerContext.Provider>
  );
}
