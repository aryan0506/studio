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
      <Button
        variant="secondary"
        onClick={fetchDetails}
        disabled={pending}
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
    <CardContent className="mt-4">
      <div className="mb-4">
        <strong>Job Outlook:</strong>
        <p className="mb-2">{details.jobOutlook}</p>
      </div>
      <div className="mb-4">
        <strong>Salary Expectations:</strong>
        <p className="mb-2">{details.salaryExpectations}</p>
      </div>
      <div className="mb-4">
        <strong>Required Education:</strong>
        <p className="mb-2">{details.requiredEducation}</p>
      </div>
      <div className="mb-4">
        <strong>Description:</strong>
        <p className="mb-2">{details.description}</p>
      </div>
      <div className="mb-4">
        <strong>Learning Sources:</strong>
        <p className="mb-2">{details.learningSources}</p>
      </div>
      <div className="mb-4">
        <strong>Job Roles:</strong>
        <p className="mb-2">{details.jobRoles}</p>
      </div>
      <div className="mb-4">
        <strong>Recommended Books:</strong>
        <p className="mb-2">{details.recommendedBooks}</p>
      </div>
      <div className="mb-4">
        <strong>Motivational Quote:</strong>
        <p className="mb-2">{details.motivationalQuote}</p>
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
        <CardTitle className="text-2xl font-bold">Recommended Career Paths</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <Accordion type="single" collapsible>
          {careers.map((career, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{career.title}</AccordionTrigger>
              <AccordionContent>
                {career.description}
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
