// recupérer les informations du fichier json
import jerseyJson from '../../data/maillots.json' assert { type: 'json' };

// Récupérer le tag contenant la liste des cards 
const jerseyInfoContainer = document.querySelector('div#jersey-info-container');



const displayJerseyDetails = async(id) => {
    //console.log(id);
    // vider le contenu de l'élément 
    jerseyInfoContainer.innerHTML = '';
    const jerseySelected =  jerseyJson.find(jersey => jersey.id == id);
    //console.log(jerseySelected);

    if (jerseySelected) {
    
        const jerseyInfoCard = document.createElement('jersey-info-card');
        jerseyInfoCard.setAttribute('title', jerseySelected.titre);
        jerseyInfoCard.setAttribute('content', jerseySelected.contenu);
        jerseyInfoCard.setAttribute('img', jerseySelected.img);
        jerseyInfoCard.setAttribute('class', 'jersey-information');
        jerseyInfoContainer.appendChild(jerseyInfoCard);
    
       
    }   
    
}

export {displayJerseyDetails};