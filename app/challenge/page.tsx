"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [allQuestions, setAllQuestions] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [points, setPoints] = useState(0);
    const [loading, setLoading] = useState(true);

    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswering, setIsAnswering] = useState(false);

    useEffect(() => {
        async function loadQuestions() {
            try {
                const res = await fetch("/api/questions");
                const data = await res.json();
                setAllQuestions(data);
            } catch (err) {
                console.error("Error cargando preguntas:", err);
            } finally {
                setLoading(false);
            }
        }
        loadQuestions();
    }, []);

    if (loading) return <main className="flex flex-col min-h-screen w-full items-center justify-center">
            <div className="mb-8 flex min-w-[500px] w-1/2 justify-between items-center">
                <h2>Country Quiz</h2>
                <div className="px-4 py-2 gradient-text rounded-full">
                    <p className="text-(white)">Points: </p>
                </div>
            </div>
            <div className="flex flex-col bg-(--main-color1) rounded-xl p-8 shadow-sm min-w-[500px] w-1/2 min-h-80 items-center justify-between gap-4">
                <p className="text-(white)">Loading questions...</p>
            </div>
        </main>;
    if (allQuestions.length === 0) return <div className="flex min-h-screen items-center justify-center">Error loading questions</div>;

    const currentQuestion = allQuestions[currentIndex];
    const isLastQuestion = currentIndex === allQuestions.length - 1;

    const handleAnswer = (option: string) => {
        if (isAnswering) return;

        setIsAnswering(true);
        setSelectedOption(option);

        const isCorrect = option === currentQuestion.correct;
        const finalScore = isCorrect ? points + 1 : points; 
        if (isCorrect) {
            setPoints((p) => p + 1);
        }

        
        const DELAY_MS = 800;
        setTimeout(() => {
            setSelectedOption(null);
            setIsAnswering(false);

            if (isLastQuestion) {
                router.push(`/result?score=${finalScore}&total=${allQuestions.length}`);
            } else {
                setCurrentIndex((i) => i + 1);
            }
        }, DELAY_MS);
    };

    return (
            <main className="flex flex-col min-h-screen w-full items-center justify-center">
                <div className="mb-8 flex min-w-[500px] w-1/2 justify-between items-center">
                    <h2>Country Quiz</h2>
                    <div className="px-4 py-2 gradient-text rounded-full">
                        <p className="text-(white)">Points: {points}/{allQuestions.length}</p>
                    </div>
                </div>
                <div className="flex flex-col bg-(--main-color1) rounded-xl p-8 shadow-sm min-w-[500px] w-1/2 min-h-80 items-center justify-between gap-4">
                <ul className="flex gap-4 flex-wrap justify-center">
                    {allQuestions.map((q: any, idx: number) => (
                        <li 
                            key={q.id} 
                            className={`flex justify-center items-center w-10 h-10 rounded-full shadow-sm ${
                                idx === currentIndex ? 'gradient-text' : 'bg-(--main-color1-light)'
                            }`}
                        >
                            {q.id}
                        </li>
                    ))}
                </ul>
                
                <div className="text-center">
                    <h3 className="text-lg mb-4">{currentQuestion.question}</h3>
                    {currentQuestion.flag && (
                        <img src={currentQuestion.flag} alt={currentQuestion.countryName} className="w-24 h-16 mx-auto mb-4 rounded" />
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {currentQuestion.options.map((option: string, idx: number) => {
                        const isSelected = selectedOption === option;
                        const isCorrect = option === currentQuestion.correct;

                        let extraClasses = "";
                        if (selectedOption !== null) {
                            if (isCorrect) extraClasses = "button-primary-pressed";
                            else if (isSelected && !isCorrect) extraClasses = "button-primary-pressed";
                            else extraClasses = "opacity-60";
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(option)}
                                disabled={isAnswering}
                                className={`bg-(--main-color1-light) button-primary max-w-[200px] w-[200px] rounded-full h-12 max-h-12 hover:cursor-pointer hover:shadow-lg flex items-center justify-center gap-2 ${extraClasses}`}
                                aria-pressed={isSelected}
                            >
                                {isCorrect && selectedOption !== null && (
                                    <Image src="/Check_round_fill.svg" alt="Correct" width={20} height={20} />
                                )}
                                {!isCorrect && selectedOption !== null && (
                                    <Image src="/Close_round_fill.svg" alt="Incorrect" width={20} height={20} />
                                )}

                                <span className="whitespace-nowrap">{option}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}