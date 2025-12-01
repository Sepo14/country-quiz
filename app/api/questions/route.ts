import Questions from "@/app/questions/questions";

export async function GET() {
    try {
        const questions = await Questions();
        return Response.json(questions);
    } catch (error) {
        return Response.json({ error: "Error al obtener preguntas" }, { status: 500 });
    }
}