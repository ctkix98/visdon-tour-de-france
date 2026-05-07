
import jerseyJson from '../data/maillots.json';

class TdfStakes extends HTMLElement {
  constructor() {
    super();
    this.currentJerseyId = 1;
    console.log("TdfStakes: Component constructed");
  }

  connectedCallback() {
    console.log("TdfStakes: Connected to DOM");
    this.render();
  }

  setJersey(id) {
    console.log("TdfStakes: Setting jersey", id);
    this.currentJerseyId = id;
    this.render();
  }

  render() {
    this.classList.add("section-wrapper");
    
    // On trouve le maillot sélectionné
    const selectedJersey = jerseyJson.find(j => j.id == this.currentJerseyId) || jerseyJson[0];

    // Correction des chemins d'images : si ils commencent par ./../ on les nettoie pour repartir de la racine
    const fixImgPath = (path) => path.replace('./../', '');

    this.innerHTML = `
      <a href="#menu-section" class="btn-back">back</a>
      <div class="menu-section-title">Enjeux</div>
      <div class="third-cloumn flex flex-col">
        <div class="jersey-navigation flex flex-row items-start justify-start min-w-fit border-b-2 border-black-300 bg-black-50 overflow-x-auto">
          ${jerseyJson.map(jersey => `
            <div class="jersey-navigation-item flex flex-row items-center justify-center cursor-pointer p-4 min-w-fit flex-shrink-0 hover:bg-black-950 hover:text-white transition duration-300 ease-in-out ${jersey.id == this.currentJerseyId ? 'bg-black-950 text-white' : ''}" 
                 data-id="${jersey.id}">
              <img src="${fixImgPath(jersey.img)}" alt="${jersey.titre}" class="w-[50px] h-[50px] object-cover mr-2" />
              <p class="uppercase font-thin text-xs">${jersey.titre}</p>
            </div>
          `).join('')}
        </div>
        <div id="jersey-info-container">
          <jersey-info-card 
            title="${selectedJersey.titre}" 
            content="${selectedJersey.contenu}" 
            img="${fixImgPath(selectedJersey.img)}">
          </jersey-info-card>
        </div>
      </div>
    `;

    // Ajout des écouteurs d'événements pour les onglets
    this.querySelectorAll('.jersey-navigation-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        this.setJersey(id);
      });
    });
  }
}

customElements.define("tdf-stakes", TdfStakes);
