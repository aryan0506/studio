'use client'

import { suggestCareers } from '@/ai/flows/suggest-careers'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useState, useContext, useEffect } from 'react'
import { CareerContext } from './CareerContext'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const UserInputForm = () => {
  const [skills, setSkills] = useState('')
  const [interests, setInterests] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { setCareers } = useContext(CareerContext)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    router.refresh()
  }, [setCareers, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!skills || !interests) {
      return toast({
        title: 'Error',
        description: 'Please fill in both skills and interests.',
        variant: 'destructive',
      })
    }
    setIsLoading(true)
    try {
      const suggestions = await suggestCareers({ skills, interests })
      setCareers(suggestions.careers)
      toast({
        title: 'Success',
        description: 'Career suggestions generated!',
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description:
          error?.message ||
          'Failed to generate career suggestions. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-slate-700 text-slate-100 shadow-lg rounded-lg max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          Tell Us About Yourself
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 p-6">
        <div>
          <Label htmlFor="skills" className="text-slate-200">
            Your Skills
          </Label>
          <Textarea
            id="skills"
            placeholder="e.g. JavaScript, React"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="bg-slate-600 placeholder-slate-400 text-white"
          />
        </div>

        <div>
          <Label htmlFor="interests" className="text-slate-200">
            Your Interests
          </Label>
          <Textarea
            id="interests"
            placeholder="e.g. AI, Web Development"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="bg-slate-600 placeholder-slate-400 text-white"
          />
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-6">
        <Button variant="secondary" type="reset" onClick={() => {
          setSkills('')
          setInterests('')
        }}>
          Reset
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating…
            </>
          ) : (
            'Get Pathway'
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default UserInputForm
