"use client";
import StepsChart, { StepData } from "./StepsChart";
import { FaWalking } from "react-icons/fa";

interface Props {
    steps: StepData[];
}

export default function StepsClientView({ steps }: Props) {
    // 日付降順（新しい順）でソート
    const sortedSteps = [...steps].sort((a, b) => b.date.localeCompare(a.date));

    // 合算歩数: 今日を除く直近n日分（n=1〜7）
    const sums = Array.from({ length: 7 }, (_, i) => {
        const n = i + 1;
        if (!Array.isArray(sortedSteps) || sortedSteps.length < n + 1) return 0;
        // 0番目は今日なので、1番目以降n件を合算
        return sortedSteps.slice(1, n + 1).reduce((acc, d) => acc + d.steps, 0);
    });

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-8">
            {/* チャート中央寄せ */}
            <div className="flex justify-center">
                <div className="w-full max-w-xl">
                    <StepsChart data={sortedSteps} />
                </div>
            </div>
            {/* 合算歩数カード: 柔らかいシャドウ・枠線なし・丸み強調 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {sums.map((sum, i) => (
                    <div
                        key={i}
                        className="card bg-base-100 rounded-3xl shadow-md flex flex-col items-center p-4 transition-transform hover:scale-105"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="badge badge-primary text-xs px-2 py-1 rounded-full">
                                {i + 1}日合計
                            </span>
                            <FaWalking className="text-primary text-lg" aria-label="歩数アイコン" />
                        </div>
                        <span className="text-2xl font-bold text-primary-content">
                            {sum.toLocaleString()}
                        </span>
                        <span className="text-xs text-base-content">歩</span>
                    </div>
                ))}
            </div>
            {/* 日別歩数カードリスト: 柔らかいシャドウ・枠線なし・丸み強調 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sortedSteps.map((s, i) => (
                    <div
                        key={i}
                        className="card bg-base-200 rounded-2xl shadow-md flex flex-row items-center p-4 gap-4"
                    >
                        <FaWalking className="text-accent text-2xl" aria-label="歩数アイコン" />
                        <div className="flex flex-col">
                            <span className="text-sm text-base-content/70">{s.date}</span>
                            <span className="text-lg font-semibold text-accent-content">
                                {s.steps.toLocaleString()} <span className="text-xs">歩</span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
