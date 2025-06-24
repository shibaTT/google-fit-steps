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
            borderRadius: 8,
            barPercentage: 0.7,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "過去7日間の歩数",
            font: { size: 20 },
            color: "#2563eb",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 2000,
              color: "#64748b",
            },
            grid: {
              color: "#e5e7eb",
            },
          },
          x: {
            ticks: {
              color: "#64748b",
            },
            grid: {
              color: "#e5e7eb",
            },
          },
        },
      },
    });
    return () => chart.destroy();
  }, [data]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  if (error)
    return <div className="alert alert-error shadow-lg">{error}</div>;

  return (
    <div className="w-full max-w-md card bg-base-100 shadow-xl p-6">
      <canvas id={chartId} height={300}></canvas>
    </div>
  );
}
