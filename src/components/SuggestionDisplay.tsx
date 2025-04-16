'use client';

import {provideCareerDetails} from '@/ai/flows/provide-career-details';
import {useToast} from '@/hooks/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {useFormStatus} from 'react-dom';
import {useContext, useState} from 'react';
import {CareerContext} from './CareerContext';
import {Button} from './ui/button';
import {Loader2} from 'lucide-react';

import ReactMarkdown from 'react-markdown';

function CareerDetails({careerName}: { careerName: string }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const {toast} = useToast();
  const {pending} = useFormStatus();

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const details = await provideCareerDetails({careerName});
      setDetails(details);
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
      <div className="flex items-center justify-center p-4">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading career details...
      </div>
    );
  }

  if (!details) {
    return (
      <Button variant="secondary" onClick={fetchDetails} disabled={pending}>
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
    <CardContent className="mt-4">
      <div className="mb-2 text-left">
        <strong className="block mb-1">Job Outlook:</strong>
        <ReactMarkdown>{details.jobOutlook}</ReactMarkdown>
      </div>
      <div className="mb-2 text-left">
        <strong className="block mb-1">Salary Expectations:</strong>
        <ReactMarkdown>{details.salaryExpectations}</ReactMarkdown>
      </div>
      <div className="mb-2 text-left">
        <strong className="block mb-1">Required Education:</strong>
        <ReactMarkdown>{details.requiredEducation}</ReactMarkdown>
      </div>
      <div className="mb-2 text-left">
        <strong className="block mb-1">Description:</strong>
        <ReactMarkdown>{details.description}</ReactMarkdown>
      </div>
      <div className="mb-2 text-left">
        <strong className="block mb-1">Learning Sources:</strong>
        <ReactMarkdown>{details.learningSources}</ReactMarkdown>
      </div>
      <div className="mb-2 text-left">
        <strong className="block mb-1">Job Roles:</strong>
        <ReactMarkdown>{details.jobRoles}</ReactMarkdown>
      </div>
      <div className="mb-2 text-left">
        <strong className="block mb-1">Recommended Books:</strong>
        <ReactMarkdown>{details.recommendedBooks}</ReactMarkdown>
      </div>
      <div className="mb-2 text-left">
        <strong className="block mb-1">Motivational Quote:</strong>
        <ReactMarkdown>{details.motivationalQuote}</ReactMarkdown>
      </div>
    </CardContent>
  );
}

const SuggestionDisplay = () => {
  const {careers} = useContext(CareerContext);

  if (!careers || careers.length === 0) {
    return null;
  }

  return (
    <Card className="shadow-md rounded-lg h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Recommended Career Paths
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <Accordion type="single" collapsible>
          {careers.map((career, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{career.title}</AccordionTrigger>
              <AccordionContent className="p-2 m-1 text-sm md:text-base">
                <p>{career.description}</p>
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
