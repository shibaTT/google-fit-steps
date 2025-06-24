import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Google OAuth2のリフレッシュトークンからアクセストークンを取得
 */
export async function getGoogleFitAccessToken(): Promise<string> {
    const refreshToken = process.env.GOOGLE_FIT_REFRESH_TOKEN;
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (!refreshToken || !clientId || !clientSecret) {
        throw new Error("Google Fit認証情報が未設定です");
    }
    const params = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
    });
    const res = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
    });
    if (!res.ok) throw new Error("Googleアクセストークンの取得に失敗しました");
    const json = await res.json();
    return json.access_token;
}
