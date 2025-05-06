export async function populateGeneralPodium() {
    try {
      const [etapesRes, coureursRes] = await Promise.all([
        fetch("/data/etapes.json"),
        fetch("/data/coureur.json"),
      ]);
  
      const etapes = await etapesRes.json();
      const coureurs = await coureursRes.json();
  
      const etape21 = etapes.find(e => e.id === 21);
  
      const classementJaune = etape21?.classements?.[1]?.classement_maillots?.classement_maillot_jaune;
      if (!classementJaune) {
        console.warn("Classement général (maillot jaune) introuvable.");
        return;
      }
  
      const podiumContainer = document.getElementById("general-podium-container");
      podiumContainer.innerHTML = ""; // On nettoie
  
      classementJaune.slice(0, 3).forEach((entry, index) => {
        const coureur = coureurs.coureurs.find(c => parseInt(c.id) === entry.id_coureur);
        if (!coureur) return;
  
        const podium = document.createElement("div");
        podium.className = "podium-block group";
        podium.innerHTML = `
          <div class="podium-character">
            <img src="${coureur.image}" alt="${coureur.prenom} ${coureur.nom}" class="podium-img" />
            <div class="tooltip-graphic"></div>
            <div class="tooltip-content">
              <p class="tooltip-title">${coureur.prenom} ${coureur.nom} ${coureur.drapeau || ""}</p>
              <p class="tooltip-text">Équipe : ${coureur.equipe}</p>
              <p class="tooltip-text">Temps total : ${entry.temps}</p>
            </div>
          </div>
        `;
  
        podiumContainer.appendChild(podium);
      });
    } catch (error) {
      console.error("Erreur lors du chargement du classement général :", error);
    }
  }
  