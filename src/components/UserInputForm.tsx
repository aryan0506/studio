'use client';

import {suggestCareers} from '@/ai/flows/suggest-careers';
import {useToast} from '@/hooks/use-toast';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useState, useContext, useEffect} from 'react';
import {CareerContext} from './CareerContext';
import {useFormStatus} from 'react-dom';
import {useRouter} from 'next/navigation';
import {Textarea} from '@/components/ui/textarea';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

const UserInputForm = () => {
  const [name, setName] = useState('');
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
    
      <Card className="bg-card shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Tell us about yourself</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 bg-white">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="top-skill">Choose your top skill:</Label>
            <Select>
              <SelectTrigger id="top-skill">
                <SelectValue placeholder="-- Select a skill --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="writing">Writing</SelectItem>
                <SelectItem value="design">Design</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
            <Label htmlFor="interests">Pick your interest area:</Label>
            <Select>
              <SelectTrigger id="interest-area">
                <SelectValue placeholder="-- Select an interest --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="art">Art</SelectItem>
                <SelectItem value="science">Science</SelectItem>
              </SelectContent>
            </Select>
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
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="goal">Describe your goal:</Label>
            <Textarea
              id="goal"
              placeholder="e.g., Become a data scientist"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="secondary" type="reset">
            Reset
          </Button>
          <Button onClick={handleSubmit} disabled={pending}>
            {pending ? 'Getting Pathway...' : 'Get Pathway'}
          </Button>
        </CardFooter>
      </Card>
    
  );
};

export default UserInputForm;
