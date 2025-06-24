import { getServerSession } from "next-auth/next";
import SignInButton from "../components/SignInButton";
import StepsChart from "../components/StepsChart";
import { Session } from "next-auth";

export default async function HomePage() {
  const session = (await getServerSession()) as (Session & { accessToken?: string }) | null;

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-base-100">
        <h1 className="text-3xl font-bold mb-8">Google Fit 歩数可視化</h1>
        <SignInButton />
      </main>
    );
  }

  // 認証済みの場合は歩数グラフを表示
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-base-100">
      <h1 className="text-3xl font-bold mb-8">Google Fit 歩数可視化</h1>
      <StepsChart accessToken={session.accessToken ?? ""} />
    </main>
  );
}
