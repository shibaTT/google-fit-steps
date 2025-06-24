import { fetchGoogleFitStepsFixedAccount } from "../lib/fetchGoogleFitStepsFixedAccount";
import StepsChart from "../components/StepsChart";
import StepsSum from "../components/StepsSum";
import { useState } from "react";

export default async function HomePage() {
    // ログイン不要・常に特定アカウントの歩数を表示
    let steps = [];
    let error = null;
    try {
        steps = await fetchGoogleFitStepsFixedAccount();
    } catch (e) {
        error = (e as Error).message;
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-base-100">
            <h1 className="text-3xl font-bold mb-8">Google Fit 歩数可視化（固定アカウント）</h1>
            {error ? (
                <div className="alert alert-error shadow-lg">{error}</div>
            ) : (
                <div className="w-full max-w-md">
                    <StepsChart data={steps} />
                    <SumWithSelector steps={steps} />
                </div>
            )}
        </main>
    );
}

// クライアント側でn選択＆合算表示
'use client';
import { StepData } from "../components/StepsChart";
import StepsSum from "../components/StepsSum";
import { useState } from "react";

function SumWithSelector({ steps }: { steps: StepData[] }) {
    const [n, setN] = useState(3);
    return (
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
    );
}
