'use server';
/**
 * @fileOverview Provides detailed information about a career path.
 *
 * - getCareerDetails - A function that gets career details.
 * - GetCareerDetailsInput - The input type for the getCareerDetails function.
 * - GetCareerDetailsOutput - The return type for the getCareerDetails function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GetCareerDetailsInputSchema = z.object({
  careerName: z.string().describe('The name of the career to get details for.'),
});
export type GetCareerDetailsInput = z.infer<typeof GetCareerDetailsInputSchema>;

const GetCareerDetailsOutputSchema = z.object({
  jobOutlook: z.string().describe('The job outlook for the career.'),
  salaryExpectations: z.string().describe('The salary expectations for the career.'),
  requiredEducation: z.string().describe('The required education for the career.'),
  description: z.string().describe('A detailed description of the career.'),
});
export type GetCareerDetailsOutput = z.infer<typeof GetCareerDetailsOutputSchema>;

export async function getCareerDetails(input: GetCareerDetailsInput): Promise<GetCareerDetailsOutput> {
  return getCareerDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getCareerDetailsPrompt',
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
  prompt: `You are a career advisor. Provide detailed information about the following career, including job outlook, salary expectations, required education, and a detailed description.\n\nCareer: {{{careerName}}}`,
});

const getCareerDetailsFlow = ai.defineFlow<
  typeof GetCareerDetailsInputSchema,
  typeof GetCareerDetailsOutputSchema
>({
  name: 'getCareerDetailsFlow',
  inputSchema: GetCareerDetailsInputSchema,
  outputSchema: GetCareerDetailsOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
