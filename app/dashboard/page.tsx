'use client';

import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    return (
        <main className="flex flex-col min-h-screen w-full items-center justify-center">
            <div className="bg-(--main-color1) rounded-xl p-8 shadow-sm min-w-[500px] w-1/2 min-h-80 flex flex-col items-center justify-center gap-4">
                <h1>Country Quiz</h1>
                <button onClick={() => router.push('/challenge')} className="button-primary max-w-[200px] w-[200px] bg-(--main-color1-light) rounded-full h-12 max-h-12 hover:cursor-pointer hover:shadow-lg">
                    Go to Challenge
                </button>
            </div>
        </main>
    );
}