// Récupérer le tag contenant la liste des sections du menu (bubbles)

const bubbleList = document.querySelector('#menu-section');

const displayCategories = () => {
    // vider le contenu de l'élément 
    bubbleList.innerHTML = '';

    const categories = [
        { name: 'Equipes', href: '#teams-section', id: 'teams' },
        { name: 'Enjeux', href: '#stakes-section', id: 'stakes' },
        { name: 'Equipment', href: '#equipment-section', id: 'equipment' },
        { name: 'Parcours', href: '#route-section' , id: 'route' },
        { name: 'Réglement', href: '#rules-section', id: 'rules' },
    ];

    const totalBubbles = categories.length;
    const orbitRadius = 38;              // % du conteneur (distance centre → bulle)
    const startAngle = -Math.PI / 2 + (Math.PI / 6);  // Départ décalé de 30° par rapport à 12h

    categories.forEach((category, index) => {
        // Calcul de l'angle pour cette bulle (répartition uniforme sur 360°)
        const angle = startAngle + (2 * Math.PI / totalBubbles) * index;
        const x = 50 + orbitRadius * Math.cos(angle);  // % horizontal
        const y = 50 + orbitRadius * Math.sin(angle);   // % vertical

        const bubble = document.createElement('menu-bubble');
        const link = document.createElement('a');
        link.setAttribute('href', category.href);
        bubble.setAttribute('id', category.id);
        bubble.setAttribute('class', 'menu-bubble');
        bubble.setAttribute('name', category.name);

        // Positionnement orbital via CSS custom properties
        bubble.style.setProperty('--orbit-x', `${x}%`);
        bubble.style.setProperty('--orbit-y', `${y}%`);

        // Décalage d'animation pour un flottement désynchronisé
        bubble.style.animationDelay = `${index * 1.5}s`;

        link.appendChild(bubble);
        bubbleList.appendChild(link);
    });

    const centerLogo = document.createElement('img');
    const centerLogoContainer = document.createElement('div');
    centerLogoContainer.setAttribute('class', 'logo-container');
    centerLogo.setAttribute('class', 'logo-tdf');
    centerLogo.setAttribute('src', '../../assets/img/favicon_io/logo_tdf.png');

    centerLogoContainer.appendChild(centerLogo);
    bubbleList.appendChild(centerLogoContainer);

    // Cercle d'orbite (debug visuel)
    const orbitCircle = document.createElement('div');
    orbitCircle.classList.add('orbit-debug');
    bubbleList.appendChild(orbitCircle);

}
export {displayCategories};
