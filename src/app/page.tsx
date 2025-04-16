'use client';

import SuggestionDisplay from '@/components/SuggestionDisplay';
import UserInputForm from '@/components/UserInputForm';
import {CareerContext} from '@/components/CareerContext';
import {useState} from 'react';

export default function Home() {
  const [careers, setCareers] = useState([]);

  return (
    <CareerContext.Provider value={{careers, setCareers}}>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <header className="bg-card p-6 shadow-md">
          <h1 className="text-3xl font-bold text-primary text-center">
            EDIFY Career Companion
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            Your personalized AI-powered roadmap to a brighter future
          </p>
        </header>

        <div className="flex flex-grow">
          <div className="w-1/2 p-6">
            <UserInputForm />
          </div>
          <div className="w-1/2 p-6 bg-secondary rounded-r-lg">
            <SuggestionDisplay />
          </div>
        </div>
      </div>
    </CareerContext.Provider>
  );
}
