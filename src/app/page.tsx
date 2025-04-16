'use client';

import SuggestionDisplay from '@/components/SuggestionDisplay';
import UserInputForm from '@/components/UserInputForm';
import {CareerContext} from '@/components/CareerContext';
import {useState} from 'react';

export default function Home() {
  const [careers, setCareers] = useState([]);

  return (
    <CareerContext.Provider value={{careers, setCareers}}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Career Compass</h1>
        <div className="flex">
          <div className="w-1/2 p-4">
            <UserInputForm />
          </div>
          <div className="w-1/2 p-4">
            <SuggestionDisplay />
          </div>
        </div>
      </div>
    </CareerContext.Provider>
  );
}
