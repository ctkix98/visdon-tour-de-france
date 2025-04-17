// Récupérer le tag contenant la liste des sections du menu (bubbles)

const bubbleList = document.querySelector('#menu-section');

const displayCategories = () => {
    // vider le contenu de l'élément 
    bubbleList.innerHTML = '';

    const categories = [
        { name: 'Equipes', href: '#teams-section', id: 'teams', number: 1 },
        { name: 'Enjeux', href: '#stakes-section', id: 'stakes', number: 2 },
        { name: 'Equipment', href: '#equipment-section', id: 'equipment', number: 3 },
        { name: 'Parcours', href: '#route-section' , id: 'route', number: 4 },
        { name: 'Reglement', href: '#rules-section', id: 'rules' , number: 5 },
    ];

    categories.forEach(category => {
        const bubble = document.createElement('menu-bubble');
        const link = document.createElement('a');
        link.setAttribute('href', category.href);
        bubble.setAttribute('id', category.id);
        bubble.setAttribute('class',`menu-bubble  box-${category.number}`);
        bubble.setAttribute('name', category.name);
        link.appendChild(bubble);
        bubbleList.appendChild(link);
    });

    const centerLogo = document.createElement('img');
    const centerLogoContainer = document.createElement('div');
    centerLogoContainer.setAttribute('class', 'logo-container');
    centerLogo.setAttribute('class', 'logo-tdf center');
    centerLogo.setAttribute('src', '../../assets/img/favicon_io/logo_tdf.png');

    centerLogoContainer.appendChild(centerLogo);
    bubbleList.appendChild(centerLogoContainer);

}
export {displayCategories};

