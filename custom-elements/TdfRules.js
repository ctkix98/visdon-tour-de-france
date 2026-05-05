
import rulesJson from '../data/regles.json' assert { type: 'json' };

class TdfRules extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.className = "section-wrapper pr-10";
    
    this.innerHTML = `
      <a href="#menu-section" class="btn-back"> back </a>
      <div class="menu-section-title">Règlement</div>
      <div class="rules third-cloumn grid grid-flow-col grid-rows-3 gap-4 flex-1">
        <!-- Les cartes seront insérées ici -->
      </div>
    `;

    const cardContainer = this.querySelector('.rules');

    rulesJson.forEach(rule => {
      const card = document.createElement('rules-card');
      card.setAttribute('title', rule.titre);
      card.setAttribute('content', rule.contenu);
      cardContainer.appendChild(card);
    });
  }
}

customElements.define("tdf-rules", TdfRules);
