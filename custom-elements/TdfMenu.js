
class TdfMenu extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    // On définit les catégories directement ici pour l'instant (Data)
    const categories = [
      { name: 'Équipes', href: '#teams-section', id: 'teams' },
      { name: 'Enjeux', href: '#stakes-section', id: 'stakes' },
      { name: 'Équipement', href: '#equipment-section', id: 'equipment' },
      { name: 'Parcours', href: '#route-section', id: 'route' },
      { name: 'Règlement', href: '#rules-section', id: 'rules' },
    ];

    const totalBubbles = categories.length;
    const orbitRadius = 38; // % du conteneur
    const startAngle = -Math.PI / 2 + (Math.PI / 6); // Départ décalé de 30° par rapport à 12h

    // On prépare le container principal avec les classes Tailwind
    // On utilise innerHTML pour vider et reconstruire proprement
    this.classList.add("grid-menu", "layout-wrapper", "block", "relative", "mx-auto", "aspect-square", "w-[min(80vh,80vw)]");
    this.innerHTML = '';

    // 1. Création des bulles orbitales
    categories.forEach((category, index) => {
      const angle = startAngle + (2 * Math.PI / totalBubbles) * index;
      const x = 50 + orbitRadius * Math.cos(angle);
      const y = 50 + orbitRadius * Math.sin(angle);

      const link = document.createElement('a');
      link.href = category.href;
      
      const bubble = document.createElement('menu-bubble');
      bubble.id = category.id;
      bubble.className = 'menu-bubble';
      bubble.setAttribute('name', category.name);

      // Styles dynamiques (seuls autorisés en JS selon les règles)
      bubble.style.setProperty('--orbit-x', `${x}%`);
      bubble.style.setProperty('--orbit-y', `${y}%`);
      bubble.style.animationDelay = `${index * 1.5}s`;

      link.appendChild(bubble);
      this.appendChild(link);
    });

    // 2. Logo central
    const logoContainer = document.createElement('div');
    logoContainer.className = 'logo-container';
    
    const logo = document.createElement('img');
    logo.className = 'logo-tdf';
    logo.src = 'assets/img/favicon_io/logoTDF.png';
    logo.alt = 'Logo Tour de France';

    logoContainer.appendChild(logo);
    this.appendChild(logoContainer);
  }
}

customElements.define('tdf-menu', TdfMenu);
