'use server';
/**
 * @fileOverview An AI agent that suggests careers based on user skills and interests.
 *
 * - suggestCareers - A function that suggests career paths.
 * - SuggestCareersInput - The input type for the suggestCareers function.
 * - SuggestCareersOutput - The return type for the suggestCareers function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SuggestCareersInputSchema = z.object({
  skills: z.string().describe('A comma-separated list of the user\'s skills.'),
  interests: z.string().describe('A comma-separated list of the user\'s interests.'),
});
export type SuggestCareersInput = z.infer<typeof SuggestCareersInputSchema>;

const SuggestCareersOutputSchema = z.object({
  careers: z.array(
    z.object({
      title: z.string().describe('The title of the suggested career.'),
      description: z.string().describe('A brief description of the career.'),
    })
  ).describe('An array of suggested careers.'),
});
export type SuggestCareersOutput = z.infer<typeof SuggestCareersOutputSchema>;

export async function suggestCareers(input: SuggestCareersInput): Promise<SuggestCareersOutput> {
  return suggestCareersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCareersPrompt',
  input: {
    schema: z.object({
      skills: z.string().describe('A comma-separated list of the user\'s skills.'),
      interests: z.string().describe('A comma-separated list of the user\'s interests.'),
    }),
  },
  output: {
    schema: z.object({
      careers: z.array(
        z.object({
          title: z.string().describe('The title of the suggested career.'),
          description: z.string().describe('A brief description of the career.'),
        })
      ).describe('An array of suggested careers.'),
    }),
  },
  prompt: `You are a career advisor. Based on the user\'s skills and interests, suggest some potential career paths.

Skills: {{{skills}}}
Interests: {{{interests}}}

Suggest 3-5 different career paths, providing a title and brief description for each.`, 
});

const suggestCareersFlow = ai.defineFlow<
  typeof SuggestCareersInputSchema,
  typeof SuggestCareersOutputSchema
>({
  name: 'suggestCareersFlow',
  inputSchema: SuggestCareersInputSchema,
  outputSchema: SuggestCareersOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
