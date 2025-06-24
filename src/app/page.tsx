import { fetchGoogleFitStepsFixedAccount } from "../lib/fetchGoogleFitStepsFixedAccount";
import StepsChart from "../components/StepsChart";

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
                <StepsChart data={steps} />
            )}
        </main>
    );
}
