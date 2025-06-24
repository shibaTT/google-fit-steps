import { StepData } from "../components/StepsChart";
import { getGoogleFitAccessToken } from "./getGoogleFitAccessToken";

export async function fetchGoogleFitStepsFixedAccount(): Promise<StepData[]> {
  const accessToken = await getGoogleFitAccessToken();
  // ...既存のGoogle Fit API呼び出しロジック...
  const endpoint = "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate";
  const now = new Date();
  const endTimeMillis = now.getTime();
  const start = new Date(now);
  start.setDate(now.getDate() - 6);
  start.setHours(0, 0, 0, 0);
  const startTimeMillis = start.getTime();
  const body = {
    aggregateBy: [
      {
        dataTypeName: "com.google.step_count.delta",
        dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
      },
    ],
    bucketByTime: { durationMillis: 24 * 60 * 60 * 1000 },
    startTimeMillis,
    endTimeMillis,
  };
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to fetch Google Fit steps");
  const json = await res.json();
  const steps: StepData[] = (json.bucket || []).map((bucket: Record<string, unknown>) => {
    const date = new Date(Number(bucket.startTimeMillis));
    const dataset = bucket.dataset as Array<{ point: Array<{ value: Array<{ intVal: number }> }> }>;
    const count = dataset?.[0]?.point?.[0]?.value?.[0]?.intVal ?? 0;
    return {
      date: date.toLocaleDateString(),
      steps: count,
    };
  });
  return steps;
}
