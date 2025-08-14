// 404.html for GitHub Pages static export

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="flex flex-col items-center bg-white/80 rounded-xl shadow-xl p-8">
                <Image src="/globe.svg" alt="Not Found" width={128} height={128} className="mb-6 animate-bounce" />
                <h1 className="text-5xl font-extrabold text-indigo-600 mb-2">404</h1>
                <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
                <p className="mb-6 text-gray-600">お探しのページは見つかりませんでした。<br />URLが間違っているか、ページが削除された可能性があります。</p>
                <Link href="/" className="btn btn-primary btn-wide">ホームに戻る</Link>
            </div>
        </main>
    );
}
