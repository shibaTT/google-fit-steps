"use client";
import { signIn } from "next-auth/react";

export default function SignInButton() {
    return (
        <button className="btn btn-primary" onClick={() => signIn("google")}>
            Googleでログイン
        </button>
    );
}

// このファイルは現状未使用。Google認証UI・APIは不要なため削除予定。
