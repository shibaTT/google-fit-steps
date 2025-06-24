"use client";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";

interface StepsChartProps {
  accessToken: string;
}

export interface StepData {
  date: string;
  steps: number;
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
        // Google Fit APIから過去7日分の歩数データを取得する
        // 実際のAPIリクエストは後で実装
        // 仮データで表示
        const now = new Date();
        const mock: StepData[] = Array.from({ length: 7 }).map((_, i) => {
          const d = new Date(now);
          d.setDate(now.getDate() - (6 - i));
          return {
            date: d.toLocaleDateString(),
            steps: Math.floor(Math.random() * 10000),
          };
        });
        setData(mock);
      } catch {
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
