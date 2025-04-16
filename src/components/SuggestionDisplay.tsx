'use client';

import {provideCareerDetails} from '@/ai/flows/provide-career-details';
import {useToast} from '@/hooks/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
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
      <p>
        <strong>Job Outlook:</strong> {details.jobOutlook}
      </p>
      <p>
        <strong>Salary Expectations:</strong> {details.salaryExpectations}
      </p>
      <p>
        <strong>Required Education:</strong> {details.requiredEducation}
      </p>
      <p>
        <strong>Description:</strong> {details.description}
      </p>
    </CardContent>
  );
}

const SuggestionDisplay = () => {
  return (
    <Card className="bg-card shadow-md rounded-lg h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Recommended Career Path</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <p className="font-bold">Months 1-3</p>
        <ul className="list-disc pl-5 mb-4">
          <li>Strengthen Python &amp; FastAPI: Build small projects to gain hands-on experience.</li>
          <li>Learn Databases: Master a relational (PostgreSQL/MySQL) and a NoSQL database (MongoDB).</li>
          <li>Version Control: Get comfortable with Git and GitHub.</li>
        </ul>

        <p className="font-bold">Months 4-6</p>
        <ul className="list-disc pl-5">
          <li>Major Project: Build a full-stack application focusing on API development.</li>
          <li>Cloud Platform Basics: Learn the basics of AWS, Azure, or GCP.</li>
          <li>Internship Applications: Focus on showcasing your portfolio projects.</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default SuggestionDisplay;
