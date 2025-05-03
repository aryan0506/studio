'use client';

import { provideCareerDetails } from '@/ai/flows/provide-career-details';
import { useToast } from '@/hooks/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormStatus } from 'react-dom';
import { useContext, useState } from 'react';
import { CareerContext } from './CareerContext';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Career {
  title: string;
  description: string;
}

function CareerDetails({ careerName }: { careerName: string }) {
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { pending } = useFormStatus();

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const data = await provideCareerDetails({ careerName });
      setDetails(data);
    } catch (error) {
      toast({
        title: 'Error fetching details',
        description: 'Failed to retrieve career details. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4 text-slate-100">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading career details...
      </div>
    );
  }

  if (!details) {
    return (
      <Button
        variant="secondary"
        onClick={fetchDetails}
        disabled={pending}
        className="mt-2"
      >
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          'Get Details'
        )}
      </Button>
    );
  }

  return (
    <CardContent className="mt-4 bg-slate-600 rounded-lg p-4 text-slate-100">
      {Object.entries({
        'Job Outlook': details.jobOutlook,
        'Salary Expectations': details.salaryExpectations,
        'Required Education': details.requiredEducation,
        Description: details.description,
        'Learning Sources': details.learningSources,
        'Job Roles': details.jobRoles,
        'Recommended Books': details.recommendedBooks,
        'Motivational Quote': details.motivationalQuote,
      }).map(([label, md]) => (
        <div key={label} className="mb-4 text-left">
          <strong className="block mb-1 text-slate-200">{label}:</strong>
          <div className="prose prose-invert text-slate-100">
            <ReactMarkdown>{md as string}</ReactMarkdown>
          </div>
        </div>
      ))}
    </CardContent>
  );
}

const SuggestionDisplay = () => {
  const { careers } = useContext(CareerContext) as { careers: Career[] };

  if (!careers || careers.length === 0) {
    return null;
  }

  return (
    <Card className="bg-transparent shadow-md rounded-lg h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-slate-100">
          Recommended Career Paths
        </CardTitle>
      </CardHeader>

      <CardContent className="text-sm space-y-4">
        <Accordion type="single" collapsible>
          {careers.map((career, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-slate-100">
                {career.title}
              </AccordionTrigger>

              <AccordionContent className="p-4 bg-slate-600 rounded text-slate-100">
                <p className="mb-2 text-slate-200">{career.description}</p>
                <CareerDetails careerName={career.title} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default SuggestionDisplay;
