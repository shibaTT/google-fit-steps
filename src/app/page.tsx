import { fetchGoogleFitStepsFixedAccount } from "../lib/fetchGoogleFitStepsFixedAccount";
import StepsClientView from "../components/StepsClientView";
import { StepData } from "../components/StepsChart";
import { unstable_noStore as noStore } from 'next/cache';

export default async function HomePage() {
    noStore();
    // サーバー側で歩数データ取得
    let steps: StepData[] = [];
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
                <div className="alert alert-error shadow-lg">{error}d</div>
            ) : (
                <StepsClientView steps={steps} />
            )}
        </main>
    );
}
