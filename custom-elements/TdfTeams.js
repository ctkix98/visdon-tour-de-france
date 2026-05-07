
import teamsData from '../data/equipe.json';
import runnersData from '../data/coureur.json';

class TdfTeams extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const teams = teamsData.equipes;
    const runners = runnersData.coureurs;

    this.classList.add("section-wrapper");
    
    this.innerHTML = `
      <a href="#menu-section" class="btn-back">back</a>
      <div class="menu-section-title">Équipes</div>
      <div class="third-cloumn h-[90vh]">
        <div class="h-full overflow-y-auto pr-4 scrollbar-hide" 
             style="mask-image: linear-gradient(to bottom, black 85%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);">
          <div class="flex flex-col gap-4 p-4 pb-32">
            <!-- Les cartes seront insérées ici -->
          </div>
        </div>
      </div>
    `;

    const container = this.querySelector('.flex-col');

    teams.forEach(team => {
      // On pré-filtre les coureurs pour cette équipe
      const teamRunners = team.coureurs.map(id => 
        runners.find(r => r.id === id.toString()) || { id, prenom: 'Coureur', nom: `#${id}` }
      );

      const card = document.createElement('team-card');
      card.setAttribute('team', JSON.stringify(team));
      card.setAttribute('runners', JSON.stringify(teamRunners));
      
      container.appendChild(card);
    });

    this.addEventListener('toggle-team', (e) => {
      // On ne ferme les autres que si on est en train d'ouvrir une équipe
      if (e.detail.newState) {
        const allCards = this.querySelectorAll('team-card');
        allCards.forEach(card => {
          const cardTeam = JSON.parse(card.getAttribute('team'));
          if (cardTeam.id !== e.detail.teamId && card.isExpanded) {
            card.toggle(false); // Force la fermeture
          }
        });
      }
    });
  }
}

customElements.define("tdf-teams", TdfTeams);
