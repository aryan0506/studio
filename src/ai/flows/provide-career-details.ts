'use server';
/**
 * @fileOverview Provides detailed information about a suggested career path using AI.
 *
 * - provideCareerDetails - A function that provides career details.
 * - ProvideCareerDetailsInput - The input type for the provideCareerDetails function.
 * - ProvideCareerDetailsOutput - The return type for the provideCareerDetails function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ProvideCareerDetailsInputSchema = z.object({
  careerName: z.string().describe('The name of the career to get details for.'),
});
export type ProvideCareerDetailsInput = z.infer<typeof ProvideCareerDetailsInputSchema>;

const ProvideCareerDetailsOutputSchema = z.object({
  jobOutlook: z.string().describe('The job outlook for the career.'),
  salaryExpectations: z.string().describe('The salary expectations for the career.'),
  requiredEducation: z.string().describe('The required education for the career.'),
  description: z.string().describe('A detailed description of the career.'),
  learningSources: z.string().describe('Free and low-cost learning sources for this career.'),
  jobRoles: z.string().describe('Common job roles in this career.'),
  recommendedBooks: z.string().describe('Recommended books for this career.'),
  motivationalQuote: z.string().describe('A motivational quote related to this career.'),
});
export type ProvideCareerDetailsOutput = z.infer<typeof ProvideCareerDetailsOutputSchema>;

export async function provideCareerDetails(input: ProvideCareerDetailsInput): Promise<ProvideCareerDetailsOutput> {
  return provideCareerDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideCareerDetailsPrompt',
  input: {
    schema: z.object({
      careerName: z.string().describe('The name of the career to get details for.'),
    }),
  },
  output: {
    schema: z.object({
      jobOutlook: z.string().describe('The job outlook for the career.'),
      salaryExpectations: z.string().describe('The salary expectations for the career.'),
      requiredEducation: z.string().describe('The required education for the career.'),
      description: z.string().describe('A detailed description of the career.'),
      learningSources: z.string().describe('Free and low-cost learning sources for this career.'),
      jobRoles: z.string().describe('Common job roles in this career.'),
      recommendedBooks: z.string().describe('Recommended books for this career.'),
      motivationalQuote: z.string().describe('A motivational quote related to this career.'),
    }),
  },
  prompt: `You are a career advisor. Provide detailed information about the following career, including:
- Job outlook
- Salary expectations
- Required education
- A detailed description
- Free and low-cost most relevant source for learnings from internet
- Job roles
- Recommended books
- A motivational quote related to that career

Career: {{{careerName}}}`,
});

const provideCareerDetailsFlow = ai.defineFlow<
  typeof ProvideCareerDetailsInputSchema,
  typeof ProvideCareerDetailsOutputSchema
>({
  name: 'provideCareerDetailsFlow',
  inputSchema: ProvideCareerDetailsInputSchema,
  outputSchema: ProvideCareerDetailsOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
