'use client';

import {suggestCareers} from '@/ai/flows/suggest-careers';
import {useToast} from '@/hooks/use-toast';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {useState, useContext, useEffect} from 'react';
import {CareerContext} from './CareerContext';
import {useFormStatus} from 'react-dom';
import {useRouter} from 'next/navigation';
import {Loader2} from 'lucide-react';

const UserInputForm = () => {
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const {setCareers} = useContext(CareerContext);
  const {toast} = useToast();
  const {pending} = useFormStatus();
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [setCareers, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!skills || !interests) {
      toast({
        title: 'Error',
        description: 'Please fill in both skills and interests.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const suggestions = await suggestCareers({skills, interests});
      setCareers(suggestions.careers); // Update the careers state
      toast({
        title: 'Success',
        description: 'Career suggestions generated!',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description:
          error?.message || 'Failed to generate career suggestions. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    
      <Card className="shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Tell us about yourself</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="skills">Enter your skill</Label>
            <Textarea
              id="skills"
              placeholder="Enter your skill"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="interests">Enter your interest</Label>
            <Textarea
              id="interests"
              placeholder="Enter your interest"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="secondary" type="reset">
            Reset
          </Button>
          <Button onClick={handleSubmit} disabled={pending}>
            {pending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting Pathway...
              </>
            ) : (
              'Get Pathway'
            )}
          </Button>
        </CardFooter>
      </Card>
    
  );
};

export default UserInputForm;
