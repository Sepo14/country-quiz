"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

function ResultContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const scoreParam = searchParams.get("score");
    const totalParam = searchParams.get("total");

    const [score, setScore] = useState<number | null>(null);
    const [total, setTotal] = useState<number | null>(null);

    useEffect(() => {
        const s = scoreParam ? Number.parseInt(scoreParam, 10) : null;
        const t = totalParam ? Number.parseInt(totalParam, 10) : null;

        if (s !== null && !Number.isNaN(s)) setScore(s);
        if (t !== null && !Number.isNaN(t)) setTotal(t);

        if (s !== null && t !== null && !Number.isNaN(s) && !Number.isNaN(t)) {
            try {
                localStorage.setItem(
                    "lastQuizResult",
                    JSON.stringify({ score: s, total: t, at: new Date().toISOString() })
                );
            } catch (err) {
            }
        }
    }, [scoreParam, totalParam]);

    return (
        <main className="flex flex-col min-h-screen w-full items-center justify-center">
            <div className="flex flex-col bg-(--main-color1) rounded-xl p-8 shadow-sm min-w-[500px] w-1/2 min-h-80 items-center justify-between gap-4">
                <h2>Result</h2>
                {
                    score == 10 && total == 10 ? (
                        <Image src="/congrats.png" alt="Trophy" width={400} height={300} />
                    ) : null
                }
                <p className="text-(white)">
                    {score !== null && total !== null
                        ? `Tu puntuación: ${score} / ${total}`
                        : "No se encontró puntuación en la URL."}
                </p>

                <div className="flex gap-4 mt-4">
                    <button
                        className="button-primary max-w-[200px] w-[200px] bg-(--main-color1-light) rounded-full h-12 max-h-12 hover:cursor-pointer hover:shadow-lg"
                        onClick={() => router.push("/challenge")}
                    >
                        Volver a jugar
                    </button>
                </div>
            </div>
        </main>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Cargando...</div>}>
            <ResultContent />
        </Suspense>
    );
}