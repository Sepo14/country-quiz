export default async function Questions() {
    const res = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,flags', { cache: 'no-store' });
    if (!res.ok) throw new Error('Error al obtener países: ' + res.status);
    const countries = await res.json();
    if (!Array.isArray(countries)) throw new Error('Respuesta inesperada');

    // Fisher‑Yates shuffle
    const shuffled = [...countries];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const sample = shuffled.slice(0, 10);

    // Generar preguntas con opciones
    const questions = sample.map((country: any, index: number) => {
        const name = country?.name?.common ?? 'Desconocido';
        const capital = Array.isArray(country?.capital) ? country.capital[0] : country?.capital ?? 'Desconocida';
        const flag = country?.flags?.svg ?? country?.flags?.png ?? '';

        // Generar 3 opciones incorrectas aleatorias
        const wrongOptions = sample
            .filter((c: any) => c?.name?.common !== name)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map((c: any) => Array.isArray(c?.capital) ? c.capital[0] : c?.capital ?? 'Desconocida');

        // Mezclar opciones correcta + incorrectas
        const options = [capital, ...wrongOptions].sort(() => Math.random() - 0.5);

        return {
            id: index + 1,
            question: `What is the capital of ${name}?`,
            options,
            correct: capital,
            flag,
            countryName: name
        };
    });

    return questions;
}