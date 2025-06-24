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
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-8">
            <StepsChart data={steps} />

            {/* 合算値カード */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {sums.map((sum, i) => (
                    <div key={i} className="card bg-primary text-primary-content shadow-xl">
                        <div className="card-body items-center">
                            <div className="flex items-center gap-2 mb-2">
                                <FaWalking size={20} />
                                <span className="text-lg font-bold">{i + 1}日合計</span>
                            </div>
                            <span className="text-2xl font-bold tracking-wide">
                                {sum.toLocaleString()}
                                <span className="text-base font-normal ml-1">歩</span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 日別歩数カードリスト */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {steps.map((s, i) => (
                    <div key={i} className="card bg-base-200 shadow-md">
                        <div className="card-body items-center">
                            <span className="badge badge-lg badge-info mb-2">{s.date}</span>
                            <div className="flex items-center gap-2">
                                <FaWalking size={18} className="text-primary" />
                                <span className="text-xl font-bold">{s.steps.toLocaleString()}</span>
                                <span className="text-sm">歩</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
