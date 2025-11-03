// utils/AISummary.js

// const BASE_URL = import.meta.env.VITE_AI_API_URL || 'https://klukoo-ai.onrender.com';
const BASE_URL = 'http://localhost:8000';

/**
 * 🔹 1. Forecast glucose level after 30 mins
 */
export async function getForecast(currentGlucose) {
  const res = await fetch(`${BASE_URL}/forecast`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ currentGlucose }),
  });
  const data = await res.json();
  console.log(data);
  return data.forecast;
}

/**
 * 🔹 2. Predict risks and generate alert (main alert + alert list)
 */
export async function getPredictiveAlert(
  glucoseHistory,
  insulinType,
  insulinUnits,
  calories,
  activity
) {
  const res = await fetch(`${BASE_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      glucoseHistory,
      insulinType,
      insulinUnits,
      calories,
      activity,
    }),
  });
  const data = await res.json();
  console.log(data);
  return {
    forecast_mgdl: data.forecast_mgdl,
    main_alert: data.main_alert,
    alerts: data.alerts,
  };
}

/**
 * 🔹 3. Generate AI summary of patient state
 */
export async function getAISummary(values) {
  const res = await fetch(`${BASE_URL}/summarize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ values }),
  });
  const data = await res.json();
  console.log(data);
  return data.summary;
}
