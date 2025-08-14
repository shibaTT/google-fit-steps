import Link from "next/link";
import Image from "next/image";

export default function Error500() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
            <div className="flex flex-col items-center bg-white/80 rounded-xl shadow-xl p-8">
                <Image src="/window.svg" alt="Server Error" width={128} height={128} className="mb-6 animate-pulse" />
                <h1 className="text-5xl font-extrabold text-red-600 mb-2">500</h1>
                <h2 className="text-2xl font-semibold mb-4">Internal Server Error</h2>
                <p className="mb-6 text-gray-600">サーバーで予期しないエラーが発生しました。<br />しばらくしてから再度お試しください。</p>
                <Link href="/" className="btn btn-error btn-wide">ホームに戻る</Link>
            </div>
        </main>
    );
}
