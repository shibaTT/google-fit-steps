import { StepData } from "./StepsChart";
import { useMemo } from "react";

interface StepsSumProps {
  data: StepData[];
  n: number; // 合算対象日数（今日を除く最大7）
}

export default function StepsSum({ data, n }: StepsSumProps) {
  // 今日を除く直近n日分の合算
  const sum = useMemo(() => {
    if (!Array.isArray(data) || data.length < 2) return 0;
    // データは日付降順（今日が先頭）想定
    return data.slice(1, n + 1).reduce((acc, d) => acc + d.steps, 0);
  }, [data, n]);

  return (
    <div className="my-4 p-4 bg-base-200 rounded text-center">
      <span className="font-bold">過去{n}日分（今日除く）合計：</span>
      <span className="text-primary text-xl font-bold">{sum.toLocaleString()}</span>
      <span className="ml-1">歩</span>
    </div>
  );
}
