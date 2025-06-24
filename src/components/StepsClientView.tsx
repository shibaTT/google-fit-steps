"use client";
import StepsChart, { StepData } from "./StepsChart";
import { FaWalking } from "react-icons/fa";

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
        <div className="w-full max-w-2xl mx-auto">
            <StepsChart data={steps} />
            {/* 合算歩数カード */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
                {sums.map((sum, i) => (
                    <div key={i} className="card bg-base-100 shadow-md border border-base-200 flex flex-col items-center p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="badge badge-primary text-xs px-2 py-1">{i + 1}日合計</span>
                            <FaWalking className="text-primary text-lg" aria-label="歩数アイコン" />
                        </div>
                        <span className="text-xl font-bold text-primary-content">{sum.toLocaleString()}</span>
                        <span className="text-xs text-base-content">歩</span>
                    </div>
                ))}
            </div>
            {/* 日別歩数カードリスト */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {steps.map((s, i) => (
                    <div key={i} className="card bg-base-200 shadow flex flex-row items-center p-4 gap-4">
                        <FaWalking className="text-accent text-2xl" aria-label="歩数アイコン" />
                        <div className="flex flex-col">
                            <span className="text-sm text-base-content/70">{s.date}</span>
                            <span className="text-lg font-semibold text-accent-content">{s.steps.toLocaleString()} <span className="text-xs">歩</span></span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
