export type ActivityData = {
  driveDistance: number; // in km
  publicTransportDistance: number; // in km
  electricityUsage: number; // in kWh
  diet: 'meat-heavy' | 'balanced' | 'vegetarian' | 'vegan';
  habitsDescription: string;
};

export type EmissionData = {
  transport: number;
  electricity: number;
  food: number;
  total: number;
};

export type FootprintRecord = {
  id: string; // Used as a key
  date: string; // ISO string
  activity: ActivityData;
  emissions: EmissionData;
  tips: string[];
};
