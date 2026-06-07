document.addEventListener('DOMContentLoaded', function () {

    // ===== ACTIVIDAD 1: EMPAREJAMIENTO =====
    const pairs = { 'base': 'def-base', 'dim': 'def-dim', 'rango': 'def-rango', 'nulidad': 'def-nulidad', 'nulo': 'def-nulo' };
    let selectedConcept = null;
    const matched = {};

    document.querySelectorAll('.concept-item').forEach(item => {
        item.addEventListener('click', function () {
            if (matched[this.dataset.concept]) return;
            document.querySelectorAll('.concept-item').forEach(c => c.classList.remove('ring-2','ring-green-500'));
            selectedConcept = this.dataset.concept;
            this.classList.add('ring-2','ring-green-500');
        });
    });

    document.querySelectorAll('.definition-item').forEach(item => {
        item.addEventListener('click', function () {
            if (!selectedConcept) return;
            const defId = this.dataset.definition;
            if (matched[selectedConcept]) return;
            if (pairs[selectedConcept] === 'def-' + defId) {
                matched[selectedConcept] = defId;
                const el = document.querySelector(`.concept-item[data-concept="${selectedConcept}"]`);
                el.classList.add('opacity-60'); el.querySelector('.hint-text').textContent = '✅';
                this.classList.add('bg-green-100','border-green-400');
                const mc = this.querySelector('.matched-concept'); mc.textContent = '✅ Correcto'; mc.classList.remove('hidden');
            } else {
                this.classList.add('bg-red-100','border-red-400');
                setTimeout(() => this.classList.remove('bg-red-100','border-red-400'), 700);
            }
            document.querySelectorAll('.concept-item').forEach(c => c.classList.remove('ring-2','ring-green-500'));
            selectedConcept = null;
            if (Object.keys(matched).length === Object.keys(pairs).length)
                document.getElementById('matching-result').innerHTML = '<span class="text-green-700 font-bold">🎉 ¡Emparejaste todos los conceptos correctamente!</span>';
        });
    });

    document.getElementById('check-matching-btn')?.addEventListener('click', function () {
        const done = Object.keys(matched).length, total = Object.keys(pairs).length;
        document.getElementById('matching-result').innerHTML =
            `<span class="${done===total?'text-green-700':'text-yellow-700'} font-bold">${done===total?'🎉 ¡Perfecto!':'Has emparejado '+done+' de '+total+'. ¡Continúa!'}</span>`;
    });
    document.getElementById('reset-matching-btn')?.addEventListener('click', () => location.reload());

    // ===== ACTIVIDAD 2: VERDADERO O FALSO =====
    const vfAnswers = { vf1:'V', vf2:'F', vf3:'V', vf4:'F', vf5:'V', vf6:'F', vf7:'V' };
    document.getElementById('check-vf-btn')?.addEventListener('click', function () {
        let score = 0;
        Object.entries(vfAnswers).forEach(([id, correct]) => {
            const input = document.getElementById(id); if (!input) return;
            const val = input.value.trim().toUpperCase();
            input.classList.remove('border-green-500','border-red-500');
            if (val === correct) { input.classList.add('border-green-500'); score++; }
            else input.classList.add('border-red-500');
        });
        const total = Object.keys(vfAnswers).length;
        document.getElementById('vf-result').innerHTML =
            `<span class="${score===total?'text-green-700':'text-yellow-700'} font-bold">${score} de ${total} correctas. ${score===total?'🎉 ¡Excelente!':'📚 Revisa tus respuestas.'}</span>`;
    });
    document.getElementById('reset-vf-btn')?.addEventListener('click', function () {
        Object.keys(vfAnswers).forEach(id => { const i = document.getElementById(id); if(i){i.value='';i.classList.remove('border-green-500','border-red-500');} });
        document.getElementById('vf-result').innerHTML = '';
    });

    // ===== ACTIVIDAD 3: VERIFICADOR RANGO-NULIDAD =====
    document.getElementById('calc-rn-btn')?.addEventListener('click', function () {
        const n = parseInt(document.getElementById('rn-cols').value);
        const r = parseInt(document.getElementById('rn-rango').value);
        const fb = document.getElementById('rn-result');
        if (isNaN(n)||isNaN(r)||n<1||r<0||r>n) {
            fb.innerHTML = '<span class="text-red-700">⚠️ Verifica los valores: el rango no puede ser mayor que el número de columnas.</span>';
            fb.classList.remove('hidden'); return;
        }
        const nul = n - r;
        fb.innerHTML = `<div class="bg-green-50 border border-green-300 rounded-lg p-4 space-y-1">
            <p class="font-bold text-green-800">📊 Resultado:</p>
            <p class="font-mono">Rango(A) = ${r}</p>
            <p class="font-mono">Nulidad(A) = n − rango = ${n} − ${r} = <strong>${nul}</strong></p>
            <p class="font-mono text-green-700">Verificación: ${r} + ${nul} = ${r+nul} = n = ${n} ✓</p>
            <p class="text-sm text-slate-600 mt-2">El espacio nulo tiene dimensión ${nul}. ${nul===0?'El sistema Ax=0 solo tiene la solución trivial.':'El sistema Ax=0 tiene infinitas soluciones con '+nul+' parámetro(s) libre(s).'}</p>
        </div>`;
        fb.classList.remove('hidden');
    });
});
