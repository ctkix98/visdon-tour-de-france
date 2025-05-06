
export async function showWinnerStage() {
    try {
      const [etapes, coureurs] = await Promise.all([
        fetch("./data/etapes.json").then(res => res.json()),
        fetch("/data/coureur.json").then(res => res.json()),
      ]);
  
      const etape = etapes.find(e => e.id === 21);
      if (!etape) return;
  
      const classement = etape.classements[0].classement_etape.find(c => c.no_classement === 1);
      if (!classement) return;
  
      const coureur = coureurs.coureurs.find(c => parseInt(c.id) === classement.id_coureur);
      if (!coureur) return;
  
      const tooltip = document.getElementById("tooltip-etape-content");
      if (!tooltip) return;
  
      const fullName = `${coureur.prenom} ${coureur.nom}`;
      const course = etape.type_etape;
      const distance = `${etape.distance} km`;
      const parcours = `${etape.nom_ville_depart} - ${etape.nom_ville_arrivee}`;
      const temps = classement.temps;
      const equipe = coureur.equipe;
      const image = coureur.image || "/assets/placeholders/rider.png";
  
      tooltip.innerHTML = `
        <p class="tooltip-title">${fullName}</p>
        <p class="tooltip-text">Course : ${course}</p>
        <p class="tooltip-text">Distance : ${distance}</p>
        <p class="tooltip-text">Parcours : ${parcours}</p>
        <p class="tooltip-text">Temps : ${temps}</p>
        <p class="tooltip-text">Équipe : ${equipe}</p>
      `;
  
      // Met à jour l'image du coureur
      const img = document.querySelector("#podium-etape img.podium-img");
      if (img) img.src = image;
      img.alt = fullName;
  
    } catch (err) {
      console.error("Erreur chargement vainqueur d'étape :", err);
    }
  }
  