// Emission factors (kgCO2e)
// Sources are simplified for this example app.

// Transport
export const EMISSION_FACTORS = {
  DRIVING_PER_KM: 0.21, // Average car
  PUBLIC_TRANSPORT_PER_KM: 0.04, // Average bus/train

  // Electricity
  ELECTRICITY_PER_KWH: 0.45, // Global average

  // Food (per week)
  DIET: {
    'meat-heavy': 60, // ~8.5 kg/day
    balanced: 45, // ~6.4 kg/day
    vegetarian: 30, // ~4.3 kg/day
    vegan: 20, // ~2.8 kg/day
  },
};
