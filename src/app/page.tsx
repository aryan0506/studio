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
        <UserInputForm />
        <SuggestionDisplay />
      </div>
    </CareerContext.Provider>
  );
}


    
