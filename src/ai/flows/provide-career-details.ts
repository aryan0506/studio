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
  jobOutlook: z.string().describe('The job outlook for the career. Provide in Markdown format.'),
  salaryExpectations: z.string().describe('The salary expectations for the career. Provide in Markdown format.'),
  requiredEducation: z.string().describe('The required education for the career. Provide in Markdown format.'),
  description: z.string().describe('A detailed description of the career. Provide in Markdown format.'),
  learningSources: z.string().describe('Free and low-cost learning sources for this career. Provide in Markdown format.'),
  jobRoles: z.string().describe('Common job roles in this career. Provide in Markdown format.'),
  recommendedBooks: z.string().describe('Recommended books for this career. Provide in Markdown format.'),
  motivationalQuote: z.string().describe('A motivational quote related to this career. Provide in Markdown format.'),
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
      jobOutlook: z.string().describe('The job outlook for the career. Provide in Markdown format.'),
      salaryExpectations: z.string().describe('The salary expectations for the career. Provide in Markdown format.'),
      requiredEducation: z.string().describe('The required education for the career. Provide in Markdown format.'),
      description: z.string().describe('A detailed description of the career. Provide in Markdown format.'),
      learningSources: z.string().describe('Free and low-cost most relevant source for learnings from internet. Provide in Markdown format.'),
      jobRoles: z.string().describe('Common job roles in this career. Provide in Markdown format.'),
      recommendedBooks: z.string().describe('Recommended books for this career. Provide in Markdown format.'),
      motivationalQuote: z.string().describe('A motivational quote related to this career. Provide in Markdown format.'),
    }),
  },
  prompt: `You are a career advisor. Provide detailed information about the following career, using Markdown format:

# Job Outlook
Provide job outlook for career

# Salary Expectations
Provide salary expectations for career

# Required Education
Provide required education for career

# Description
Provide a detailed description of career

# Learning Sources
Provide free and low-cost most relevant source for learnings from internet

# Job Roles
Provide job roles

# Recommended Books
Provide books

# A motivational quote related to that career

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
