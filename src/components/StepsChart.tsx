"use client";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { fetchGoogleFitSteps } from "../lib/fetchGoogleFitSteps";

export interface StepData {
  date: string;
  steps: number;
}

interface StepsChartProps {
  accessToken: string;
}

export default function StepsChart({ accessToken }: StepsChartProps) {
  const [data, setData] = useState<StepData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const chartId = "steps-chart";

  useEffect(() => {
    async function fetchSteps() {
      setLoading(true);
      setError(null);
      try {
        const steps = await fetchGoogleFitSteps(accessToken);
        setData(steps);
      } catch (err) {
        setError("歩数データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    }
    fetchSteps();
  }, [accessToken]);

  useEffect(() => {
    if (!data.length) return;
    const ctx = document.getElementById(chartId) as HTMLCanvasElement | null;
    if (!ctx) return;
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((d) => d.date),
        datasets: [
          {
            label: "歩数",
            data: data.map((d) => d.steps),
            backgroundColor: "#2563eb",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
      },
    });
    return () => chart.destroy();
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-error">{error}</div>;

  return (
    <div className="w-full max-w-md">
      <canvas id={chartId} height={300}></canvas>
    </div>
  );
}
