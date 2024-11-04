const input = document.querySelector('input');
        const button = document.querySelector('button');
        const dictionary = document.querySelector('#dictionary-app');

        const dictSearch = async (word) => {
            try {
                const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
                if (!res.ok) {
                    throw new Error('Word not found');
                }
                const data = await res.json();
                return data[0];
            } catch (error) {
                console.error('Error fetching word:', error);
                return null;
            }
        };

        const createCard = async () => {
            try {
                if (!input.value.trim()) {
                    dictionary.innerHTML = `
                        <div class="transform transition-all duration-300 hover:-translate-y-1">
                            <div class="bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-6 rounded-xl text-gray-300 flex items-center gap-3">
                                <i class="fas fa-exclamation-circle text-xl"></i>
                                Please enter a word to search
                            </div>
                        </div>
                    `;
                    return;
                }

                const data = await dictSearch(input.value);
                
                if (!data) {
                    dictionary.innerHTML = `
                        <div class="transform transition-all duration-300 hover:-translate-y-1">
                            <div class="bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-6 rounded-xl text-gray-300 flex items-center gap-3">
                                <i class="fas fa-exclamation-circle text-xl"></i>
                                Word not found. Please try another word.
                            </div>
                        </div>
                    `;
                    return;
                }

                const definitionsByType = data.meanings.map(meaning => ({
                    partOfSpeech: meaning.partOfSpeech,
                    definitions: meaning.definitions
                }));

                const phonetic = data.phonetic || data.phonetics.find(p => p.text)?.text || 'Phonetic not available';
                const audio = data.phonetics.find(p => p.audio)?.audio || '';

                dictionary.innerHTML = `
                    <div class="transform transition-all duration-300">
                        <div class="bg-gray-800/50 backdrop-blur-lg p-6 rounded-2xl border border-gray-700">
                            <!-- Word Header -->
                            <div class="flex justify-between items-start mb-6 pb-6 border-b border-gray-700">
                                <div>
                                    <h2 class="text-3xl font-bold mb-2 text-white">${data.word}</h2>
                                    <div class="flex items-center gap-3">
                                        <span class="text-gray-400">${phonetic}</span>
                                        ${audio ? `
                                            <audio controls src="${audio}" class="h-8 w-56"></audio>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>

                            <!-- Definitions by Type -->
                            <div class="space-y-6">
                                ${definitionsByType.map(type => `
                                    <div class="pb-6 last:pb-0 last:border-b-0">
                                        <div class="flex items-center gap-3 mb-4">
                                            <span class="text-lg font-semibold text-gray-300">${type.partOfSpeech}</span>
                                            <div class="h-px bg-gray-700 flex-grow"></div>
                                        </div>
                                        <div class="space-y-4">
                                            ${type.definitions.map((def, index) => `
                                                <div class="pl-4 border-l-2 border-gray-700">
                                                    <div class="flex gap-3">
                                                        <span class="text-gray-500">${index + 1}.</span>
                                                        <p class="text-gray-300">${def.definition}</p>
                                                    </div>
                                                    ${def.example ? `
                                                        <div class="mt-2 ml-6">
                                                            <p class="text-gray-500 italic">"${def.example}"</p>
                                                        </div>
                                                    ` : ''}
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
            } catch (error) {
                console.error('Error creating card:', error);
                dictionary.innerHTML = `
                    <div class="transform transition-all duration-300 hover:-translate-y-1">
                        <div class="bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-6 rounded-xl text-gray-300 flex items-center gap-3">
                            <i class="fas fa-exclamation-circle text-xl"></i>
                            An error occurred. Please try again.
                        </div>
                    </div>
                `;
            }
        };

        button.addEventListener('click', createCard);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                createCard();
            }
        });

        button.addEventListener('click', () => {
            button.classList.add('opacity-75');
            setTimeout(() => button.classList.remove('opacity-75'), 500);
        });