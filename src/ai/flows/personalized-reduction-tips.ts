'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized carbon emission reduction tips.
 *
 * It takes user's carbon footprint data as input and provides 3-5 actionable tips to reduce emissions.
 * - personalizedReductionTips - The function to generate personalized reduction tips.
 * - PersonalizedReductionTipsInput - The input type for the personalizedReductionTips function.
 * - PersonalizedReductionTipsOutput - The output type for the personalizedReductionTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedReductionTipsInputSchema = z.object({
  transportEmissions: z
    .number()
    .describe('Weekly carbon emissions from transportation in kgCO2e.'),
  electricityEmissions:
    z.number().describe('Weekly carbon emissions from electricity consumption in kgCO2e.'),
  foodEmissions: z.number().describe('Weekly carbon emissions from food consumption in kgCO2e.'),
  habitsDescription:
    z.string().describe('Description of user habits related to carbon emissions.'),
});

export type PersonalizedReductionTipsInput = z.infer<typeof PersonalizedReductionTipsInputSchema>;

const PersonalizedReductionTipsOutputSchema = z.object({
  tips: z.array(z.string()).describe('A list of 3-5 personalized tips to reduce carbon emissions.'),
});

export type PersonalizedReductionTipsOutput = z.infer<typeof PersonalizedReductionTipsOutputSchema>;

export async function personalizedReductionTips(
  input: PersonalizedReductionTipsInput
): Promise<PersonalizedReductionTipsOutput> {
  return personalizedReductionTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedReductionTipsPrompt',
  input: {schema: PersonalizedReductionTipsInputSchema},
  output: {schema: PersonalizedReductionTipsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized and practical tips for users to reduce their carbon footprint.

  Based on the following information about the user's weekly carbon emissions, provide 3-5 actionable tips to help them reduce their environmental impact.
  Consider a wide range of strategies, including transportation, energy consumption, and dietary choices.

  Transport Emissions: {{transportEmissions}} kgCO2e
  Electricity Emissions: {{electricityEmissions}} kgCO2e
  Food Emissions: {{foodEmissions}} kgCO2e
  Habits Description: {{habitsDescription}}

  Tips:
  `,
});

const personalizedReductionTipsFlow = ai.defineFlow(
  {
    name: 'personalizedReductionTipsFlow',
    inputSchema: PersonalizedReductionTipsInputSchema,
    outputSchema: PersonalizedReductionTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
