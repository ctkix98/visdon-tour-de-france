
class TeamCard extends HTMLElement {
  constructor() {
    super();
    this.isExpanded = false;
  }

  connectedCallback() {
    this.render();
  }

  toggle(forceState) {
    this.isExpanded = forceState !== undefined ? forceState : !this.isExpanded;
    
    if (this.isExpanded) {
      this.classList.remove('max-h-20');
      this.classList.add('max-h-[500px]');
      this.querySelector('.team-details').classList.remove('opacity-0');
      this.querySelector('.team-details').classList.add('opacity-100');
    } else {
      this.classList.add('max-h-20');
      this.classList.remove('max-h-[500px]');
      this.querySelector('.team-details').classList.add('opacity-0');
      this.querySelector('.team-details').classList.remove('opacity-100');
    }
  }

  render() {
    const team = JSON.parse(this.getAttribute('team') || '{}');
    const runners = JSON.parse(this.getAttribute('runners') || '[]');

    this.className = `team-card flex flex-col overflow-hidden transition-all duration-500 cursor-pointer rounded-tl-[25px] rounded-tr-[5px] rounded-br-[25px] rounded-bl-[5px] mb-4 bg-black text-white max-h-20`;

    this.innerHTML = `
      <div class="flex w-full h-20 shrink-0">
        <div class="bg-yellow-500 p-4 flex items-center justify-center w-1/3">
          <img src="${team.image}" alt="${team.nom}" class="w-12 h-12 object-contain" />
        </div>
        <div class="w-2/3 p-4 flex flex-col justify-center">
          <h3 class="text-lg font-bold truncate">${team.nom}</h3>
          <p class="text-sm text-gray-400 uppercase tracking-tighter">${team.nationalite}</p>
        </div>
      </div>
      
      <div class="team-details px-4 pb-4 transition-opacity duration-300 opacity-0">
        <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mt-4 pt-2 border-t border-white/10">
          ${runners.map(runner => `
            <div class="flex items-center gap-3 font-light text-gray-200 py-1">
              <span class="bg-yellow-500 text-black font-bold px-2 py-0.5 rounded-tl-[10px] rounded-br-[10px] text-[10px] w-8 text-center flex-shrink-0">${runner.id}</span>
              <span class="flex items-center gap-2 truncate">
                <span class="inline-block scale-110 mb-0.5">${runner.drapeau || ''}</span>
                <span class="truncate">${runner.prenom} ${runner.nom}</span>
              </span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.onclick = (e) => {
      this.dispatchEvent(new CustomEvent('toggle-team', {
        bubbles: true,
        detail: { teamId: team.id, newState: !this.isExpanded }
      }));
      this.toggle();
    };
  }
}

customElements.define("team-card", TeamCard);
