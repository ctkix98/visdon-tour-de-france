// recupérer les informations du fichier json
import teamsJson from '../../data/equipe.json' assert { type: 'json' };
import runnerJson from '../../data/coureur.json' assert { type: 'json' };

const equipes = teamsJson.equipes;
const coureurs = runnerJson.coureurs;
const teamList = document.querySelector('#teams-section .third-cloumn > div');
console.log(equipes);

const displayTeams = async() => {
    // vider le contenu de l'élément
    teamList.innerHTML = '';
    
    // Créer une div pour chaque équipe
    equipes.forEach((team) => {
        const card = document.createElement('div');
        card.className = `
            team-card flex overflow-hidden transition-all duration-500 max-h-20 cursor-pointer rounded-tl-[25px] rounded-tr-[5px] rounded-br-[25px] rounded-bl-[5px] mb-8;
        `;

        card.innerHTML = `
            <div class="flex w-full">
                <div class="bg-yellow-500 p-4 flex items-center justify-center w-1/3">
                    <img src="${team.image}" alt="${team.nom}" class="w-12 h-12 object-contain" />
                </div>
                <div class="bg-black text-white w-2/3">
                    <div class="p-4">
                        <h3 class="text-lg font-semibold">${team.nom}</h3>
                        <p class="text-sm text-gray-400">${team.nationalite}</p>
                    </div>
                    <div class="team-details opacity-0 px-4 pb-4 transition-opacity duration-300">
                        <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mt-2">
                            ${team.coureurs.map((id, i) => {
                                const coureur = coureurs.find(c => c.id === id.toString());
                                return `
                                    <div class="flex items-center gap-2">
                                        <span class="bg-yellow-500 text-black px-2 py-0.5 rounded-tl-[10px] rounded-tr-[0px] rounded-br-[10px] rounded-bl-[0px] text-xs">${id}</span>
                                        <span>${coureur ? `${coureur.prenom} ${coureur.nom}` : `Coureur #${id}`}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Ajouter le listener
        card.addEventListener('click', () => {
            const isExpanded = card.classList.contains('max-h-96');
            
            // Reset all cards
            document.querySelectorAll('.team-card').forEach(el => {
                el.classList.remove('max-h-96');
                el.classList.add('max-h-20');
                el.querySelector('.team-details').classList.remove('opacity-100');
                el.querySelector('.team-details').classList.add('opacity-0');
            });

            // If the clicked card wasn't expanded, expand it
            if (!isExpanded) {
                card.classList.remove('max-h-20');
                card.classList.add('max-h-96');
                card.querySelector('.team-details').classList.remove('opacity-0');
                card.querySelector('.team-details').classList.add('opacity-100');
            }
        });

        teamList.appendChild(card);
    });
}

export { displayTeams }; 