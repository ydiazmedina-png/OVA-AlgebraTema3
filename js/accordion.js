document.addEventListener('DOMContentLoaded', function () {
    // Main tabs functionality
    document.querySelectorAll('.main-tab-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const tabId = this.dataset.mainTab;
            
            // Update main tab buttons
            document.querySelectorAll('.main-tab-btn').forEach(b => {
                b.classList.remove('bg-green-600', 'text-white', 'shadow-md');
                b.classList.add('bg-green-100', 'text-green-800');
            });
            this.classList.remove('bg-green-100', 'text-green-800');
            this.classList.add('bg-green-600', 'text-white', 'shadow-md');
            
            // Show/hide main tab content
            document.querySelectorAll('.main-tab-content').forEach(content => {
                content.classList.add('hidden');
            });
            document.getElementById(tabId).classList.remove('hidden');
            
            updateProgress();
        });
    });

    // Tags functionality
    document.querySelectorAll('.tag').forEach(function (tag) {
        tag.addEventListener('click', function () {
            const info = this.dataset.info;
            const parentContainer = this.closest('.bg-white');
            const infoBox = parentContainer.querySelector('[id^="tag-info"]');
            const infoText = parentContainer.querySelector('[id^="tag-info-text"]');
            
            if (infoBox && infoText) {
                infoText.textContent = info;
                infoBox.classList.remove('hidden');
            }
            
            // Highlight selected tag
            parentContainer.querySelectorAll('.tag').forEach(t => t.classList.remove('ring-2', 'ring-offset-2'));
            this.classList.add('ring-2', 'ring-offset-2');
        });
    });

    // Dropdown functionality
    document.querySelectorAll('.dropdown-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const dropdown = this.nextElementSibling;
            const arrow = this.querySelector('.dropdown-arrow');
            
            dropdown.classList.toggle('hidden');
            arrow.style.transform = dropdown.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
        });
    });

    // Flashcard flip functionality
    document.querySelectorAll('.flashcard').forEach(function (card) {
        card.addEventListener('click', function () {
            const inner = this.querySelector('.flashcard-inner');
            if (this.classList.contains('flipped')) {
                inner.style.transform = 'rotateY(0deg)';
                this.classList.remove('flipped');
            } else {
                inner.style.transform = 'rotateY(180deg)';
                this.classList.add('flipped');
            }
        });
    });

    // Rango-Nulidad Calculator functionality
    const calcBtn = document.getElementById('calc-rn-btn');
    if (calcBtn) {
        calcBtn.addEventListener('click', function () {
            const cols = parseInt(document.getElementById('rn-cols').value);
            const rango = parseInt(document.getElementById('rn-rango').value);
            const resultDiv = document.getElementById('rn-result');
            
            if (isNaN(cols) || isNaN(rango) || cols < 1 || rango < 0 || rango > cols) {
                resultDiv.innerHTML = '<div class="bg-red-100 border-2 border-red-400 rounded-lg p-4 text-red-800 font-semibold">❌ Valores inválidos. El rango debe estar entre 0 y el número de columnas.</div>';
                resultDiv.classList.remove('hidden');
                return;
            }
            
            const nulidad = cols - rango;
            resultDiv.innerHTML = `
                <div class="bg-green-100 border-2 border-green-400 rounded-lg p-4">
                    <p class="text-green-800 font-bold text-lg">✅ Resultado:</p>
                    <p class="font-mono text-xl text-center mt-2">nulidad(A) = ${cols} - ${rango} = <strong>${nulidad}</strong></p>
                    <p class="text-sm text-green-700 mt-2 text-center">Verificación: ${rango} + ${nulidad} = ${cols} = n ✓</p>
                </div>
            `;
            resultDiv.classList.remove('hidden');
        });
    }

    // Progress tracking based on visited tabs
    let visitedTabs = new Set();
    
    function updateProgress() {
        const totalTabs = document.querySelectorAll('.main-tab-content').length;
        const currentTab = document.querySelector('.main-tab-content:not(.hidden)');
        
        if (currentTab) {
            visitedTabs.add(currentTab.id);
        }
        
        const progress = Math.round((visitedTabs.size / totalTabs) * 100);
        
        document.getElementById('progress-bar').style.width = progress + '%';
        document.getElementById('progress-text').textContent = progress + '%';
    }

    // Initialize progress
    updateProgress();
});
