"use client";
import StepsChart, { StepData } from "./StepsChart";

interface Props {
  steps: StepData[];
}

export default function StepsClientView({ steps }: Props) {
  // 1〜7日分の合算値をまとめて計算
  const sums = Array.from({ length: 7 }, (_, i) => {
    const n = i + 1;
    if (!Array.isArray(steps) || steps.length < 2) return 0;
    return steps.slice(1, n + 1).reduce((acc, d) => acc + d.steps, 0);
  });

  return (
    <div className="w-full max-w-md">
      <StepsChart data={steps} />
      <div className="my-4">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>日数（今日除く）</th>
                <th>合計歩数</th>
              </tr>
            </thead>
            <tbody>
              {sums.map((sum, i) => (
                <tr key={i}>
                  <td>{i + 1}日</td>
                  <td>{sum.toLocaleString()} 歩</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="overflow-x-auto mt-6">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>日付</th>
              <th>歩数</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((s, i) => (
              <tr key={i}>
                <td>{s.date}</td>
                <td>{s.steps.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
