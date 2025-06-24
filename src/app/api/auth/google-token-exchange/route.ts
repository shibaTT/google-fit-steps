import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge"; // Edge Runtimeを使用

export async function POST(req: NextRequest) {
    const { code } = await req.json();
    if (!code) {
        return NextResponse.json({ error: "codeがありません" }, { status: 400 });
    }

    // 環境変数からクライアント情報取得
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const client_secret = process.env.GOOGLE_CLIENT_SECRET;
    const redirect_uri = `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/auth-debug`;

    const params = new URLSearchParams({
        code,
        client_id: client_id || "",
        client_secret: client_secret || "",
        redirect_uri,
        grant_type: "authorization_code",
    });

    try {
        const res = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params.toString(),
        });
        const data = await res.json();
        if (data.error) {
            return NextResponse.json(
                { error: data.error_description || data.error },
                { status: 400 }
            );
        }
        return NextResponse.json({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
        });
    } catch {
        return NextResponse.json({ error: "GoogleトークンAPI通信エラー" }, { status: 500 });
    }
}
