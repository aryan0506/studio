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
    }),
  },
  prompt: `You are a career advisor. Provide detailed information about the following career, including job outlook, salary expectations, required education, and a detailed description. 

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
