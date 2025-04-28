// recupérer les informations du fichier json
import rulesJson from '../../data/regles.json' assert { type: 'json' };

// Récupérer le tag contenant la liste des cards 
const cardList = document.querySelector('div.rules');


const displayCards = async() => {
    // vider le contenu de l'élément 
    cardList.innerHTML = '';

    rulesJson.forEach(rule => {
        const card = document.createElement('rules-card');
        card.setAttribute('title', rule.titre);
        card.setAttribute('content', rule.contenu);
        card.setAttribute('class', 'group min-h-64  w-74 [perspective:1000px] ');
        cardList.appendChild(card);
    });
    ;

    
    console.log(rulesJson);
}

export {displayCards};