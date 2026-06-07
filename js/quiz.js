document.addEventListener('DOMContentLoaded', function () {
    const questions = [
        {
            q: "¿Cuáles son las dos condiciones que debe cumplir un conjunto B para ser base de un espacio V?",
            opts: [
                "Que sea finito y no vacío",
                "Que genere V y que sea linealmente independiente",
                "Que tenga el vector cero y que sea linealmente dependiente",
                "Que tenga exactamente n+1 vectores y sea linealmente independiente"
            ], ans: 1
        },
        {
            q: "¿Cuántos vectores tiene cualquier base de ℝ⁴?",
            opts: ["3", "5", "4", "Infinitos"],
            ans: 2
        },
        {
            q: "¿Qué es el rango de una matriz A?",
            opts: [
                "El número de filas de A",
                "El número de columnas de A",
                "El número de pivotes en la forma escalonada de A",
                "El número de soluciones del sistema Ax=0"
            ], ans: 2
        },
        {
            q: "Si una matriz A es de tamaño 3×5 y tiene rango 2, ¿cuál es su nulidad?",
            opts: ["1", "2", "3", "5"],
            ans: 2
        },
        {
            q: "El Teorema Rango-Nulidad establece que para una matriz m×n:",
            opts: [
                "rango(A) + nulidad(A) = m",
                "rango(A) × nulidad(A) = n",
                "rango(A) + nulidad(A) = n",
                "rango(A) − nulidad(A) = 0"
            ], ans: 2
        },
        {
            q: "¿Cuál es la dimensión del espacio de polinomios P₃(ℝ) = {a₀+a₁x+a₂x²+a₃x³}?",
            opts: ["3", "4", "2", "Infinita"],
            ans: 1
        },
        {
            q: "Para encontrar una base del espacio columna de A, se deben tomar:",
            opts: [
                "Todas las columnas de la forma escalonada",
                "Las columnas de A original que corresponden a columnas con pivote",
                "Las filas no nulas de la forma escalonada",
                "Las columnas sin pivote de la forma escalonada"
            ], ans: 1
        },
        {
            q: "El conjunto B = {(1,1), (2,2)} en ℝ²:",
            opts: [
                "Sí es base de ℝ², porque tiene dos vectores",
                "No es base porque no genera ℝ² (solo cubre una recta)",
                "Sí es base porque los vectores son distintos",
                "No es base porque tiene demasiados vectores"
            ], ans: 1
        },
        {
            q: "El espacio nulo de una matriz A es el conjunto de:",
            opts: [
                "Todas las filas de A",
                "Los vectores b para los que Ax=b tiene solución",
                "Todas las soluciones del sistema homogéneo Ax=0",
                "Los vectores que generan las columnas de A"
            ], ans: 2
        },
        {
            q: "Si dim(V) = n y tienes exactamente n vectores L.I. en V, ¿qué puedes concluir?",
            opts: [
                "Nada, hay que verificar también que generan V",
                "Que son automáticamente una base de V",
                "Que son linealmente dependientes",
                "Que el espacio tiene dimensión n+1"
            ], ans: 1
        }
    ];

    const container = document.getElementById('quiz-container');
    if (!container) return;
    questions.forEach((q, i) => {
        const div = document.createElement('div');
        div.className = 'mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200';
        div.innerHTML = `<p class="font-semibold text-slate-800 mb-3">${i + 1}. ${q.q}</p>
        <div class="space-y-2">${q.opts.map((o, j) =>
            `<label class="quiz-option flex items-center p-3 rounded-lg border-2 border-gray-200 cursor-pointer">
                <input type="radio" name="q${i}" value="${j}" class="mr-3 accent-green-600">
                <span class="text-slate-700">${o}</span>
            </label>`).join('')}</div>
        <div class="feedback-${i} mt-2 text-sm font-medium hidden"></div>`;
        container.appendChild(div);
    });

    document.getElementById('submit-quiz-btn').addEventListener('click', function () {
        let score = 0;
        questions.forEach((q, i) => {
            const sel = document.querySelector(`input[name="q${i}"]:checked`);
            const fb = document.querySelector(`.feedback-${i}`);
            if (sel) {
                const val = parseInt(sel.value);
                if (val === q.ans) { score++; fb.textContent = '✅ ¡Correcto!'; fb.className = `feedback-${i} mt-2 text-sm font-medium text-green-700`; }
                else { fb.textContent = `❌ Incorrecto. Respuesta correcta: "${q.opts[q.ans]}"`; fb.className = `feedback-${i} mt-2 text-sm font-medium text-red-700`; }
                fb.classList.remove('hidden');
            }
        });
        const pct = Math.round((score / questions.length) * 100);
        document.getElementById('quiz-result').innerHTML =
            `<div class="p-4 rounded-lg ${pct >= 70 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
            Obtuviste <strong>${score} de ${questions.length}</strong> correctas (${pct}%).
            ${pct >= 70 ? '🎉 ¡Excelente dominio del tema!' : '📚 Revisa el contenido e inténtalo de nuevo.'}
            </div>`;
    });

    // Reset quiz functionality
    const resetBtn = document.getElementById('reset-quiz-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            // Clear all radio selections
            questions.forEach((q, i) => {
                const radios = document.querySelectorAll(`input[name="q${i}"]`);
                radios.forEach(radio => radio.checked = false);
                
                // Hide feedback
                const fb = document.querySelector(`.feedback-${i}`);
                if (fb) fb.classList.add('hidden');
            });
            
            // Hide result
            document.getElementById('quiz-result').innerHTML = '';
        });
    }
});
