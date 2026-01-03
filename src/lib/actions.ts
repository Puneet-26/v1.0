'use server';

import { z } from 'zod';
import { personalizedReductionTips } from '@/ai/flows/personalized-reduction-tips';
import { EMISSION_FACTORS } from '@/lib/constants';
import type { EmissionData } from '@/lib/types';

const activitySchema = z.object({
  driveDistance: z.coerce.number().min(0, "Distance can't be negative."),
  publicTransportDistance: z.coerce.number().min(0, "Distance can't be negative."),
  electricityUsage: z.coerce.number().min(0, "Usage can't be negative."),
  diet: z.enum(['meat-heavy', 'balanced', 'vegetarian', 'vegan']),
  habitsDescription: z.string().min(10, 'Please describe your habits in a bit more detail for better tips.'),
});

export type ActivityDataForState = z.infer<typeof activitySchema>;

export type FormState = {
    message: string;
    data?: {
        activity: ActivityDataForState,
        emissions: EmissionData;
        tips: string[];
    }
    errors?: {
        [key:string]: string[] | undefined;
        driveDistance?: string[];
        publicTransportDistance?: string[];
        electricityUsage?: string[];
        diet?: string[];
        habitsDescription?: string[];
    };
};

export async function logActivityAndGetTips(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = activitySchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check your inputs.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    driveDistance,
    publicTransportDistance,
    electricityUsage,
    diet,
    habitsDescription,
  } = validatedFields.data;

  try {
    // 1. Calculate emissions
    const transportEmissions =
      driveDistance * EMISSION_FACTORS.DRIVING_PER_KM +
      publicTransportDistance * EMISSION_FACTORS.PUBLIC_TRANSPORT_PER_KM;

    const electricityEmissions = electricityUsage * EMISSION_FACTORS.ELECTRICITY_PER_KWH;

    const foodEmissions = EMISSION_FACTORS.DIET[diet];

    const totalEmissions = transportEmissions + electricityEmissions + foodEmissions;

    const emissions: EmissionData = {
        transport: parseFloat(transportEmissions.toFixed(2)),
        electricity: parseFloat(electricityEmissions.toFixed(2)),
        food: parseFloat(foodEmissions.toFixed(2)),
        total: parseFloat(totalEmissions.toFixed(2)),
    };

    // 2. Get personalized tips from AI
    const aiResponse = await personalizedReductionTips({
      transportEmissions,
      electricityEmissions,
      foodEmissions,
      habitsDescription,
    });

    if (!aiResponse || !aiResponse.tips || aiResponse.tips.length === 0) {
      throw new Error('Failed to generate reduction tips from AI.');
    }

    return {
        message: 'Activity logged successfully!',
        data: {
            activity: validatedFields.data,
            emissions,
            tips: aiResponse.tips,
        }
    };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
        message: `An error occurred while processing your data: ${errorMessage}`,
    };
  }
}
