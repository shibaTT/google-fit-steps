"use client";
import { useEffect, useState } from "react";

export default function AuthTokenDebugPage() {
    const [tokens, setTokens] = useState<{
        access_token?: string;
        refresh_token?: string;
        error?: string;
    } | null>(null);
    const [origin, setOrigin] = useState("");

    useEffect(() => {
        setOrigin(window.location.origin);
        // URLのクエリパラメータからcodeを取得
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        if (!code) return;

        // GoogleトークンエンドポイントにPOST
        const fetchTokens = async () => {
            try {
                const res = await fetch("/api/auth/google-token-exchange", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code }),
                });
                const data = await res.json();
                setTokens(data);
                // コンソールにも出力
                console.log("Google OAuth tokens:", data);
            } catch {
                setTokens({ error: "トークン取得に失敗しました" });
            }
        };
        fetchTokens();
    }, []);

    return (
        <main className="p-8 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Google OAuth トークン取得デバッグ</h1>
            <ol className="mb-4 list-decimal list-inside">
                <li>Google Cloud ConsoleでリダイレクトURIにこのページのURLを登録</li>
                <li>
                    下記URLにアクセスし、認証後codeを取得
                    <br />
                    <code className="block break-all bg-base-200 p-2 my-2">
                        https://accounts.google.com/o/oauth2/v2/auth?client_id=【GOOGLE_CLIENT_ID】&amp;redirect_uri={origin}/auth-debug&amp;response_type=code&amp;scope=https://www.googleapis.com/auth/fitness.activity.read&amp;access_type=offline&amp;prompt=consent
                    </code>
                </li>
                <li>認証後このページにリダイレクトされ、トークンが表示されます</li>
            </ol>
            {tokens ? (
                <div className="bg-base-200 p-4 rounded">
                    {tokens.error ? (
                        <span className="text-error">{tokens.error}</span>
                    ) : (
                        <>
                            <div>
                                <span className="font-bold">access_token:</span>{" "}
                                <span className="break-all">{tokens.access_token}</span>
                            </div>
                            <div>
                                <span className="font-bold">refresh_token:</span>{" "}
                                <span className="break-all">{tokens.refresh_token}</span>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <div className="text-gray-500">
                    codeパラメータが付与された状態でアクセスしてください
                </div>
            )}
        </main>
    );
}
