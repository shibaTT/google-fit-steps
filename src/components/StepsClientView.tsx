"use client";
import StepsChart, { StepData } from "./StepsChart";
import StepsSum from "./StepsSum";
import { useState } from "react";

interface Props {
  steps: StepData[];
}

export default function StepsClientView({ steps }: Props) {
  const [n, setN] = useState(3);
  return (
    <div className="w-full max-w-md">
      <StepsChart data={steps} />
      <div className="my-4">
        <label className="mr-2">合算日数（今日除く）:</label>
        <select
          className="select select-bordered w-20"
          value={n}
          onChange={e => setN(Number(e.target.value))}
        >
          {[...Array(7)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}日</option>
          ))}
        </select>
        <StepsSum data={steps} n={n} />
      </div>
    </div>
  );
}
