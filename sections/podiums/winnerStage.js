export async function showWinnerStage() {
  try {
    const [etapes, coureurs] = await Promise.all([
      fetch("./data/etapes.json").then(res => res.json()),
      fetch("./data/coureur.json").then(res => res.json()),
    ]);

    const etape = etapes.find(e => e.id === 21);
    if (!etape) return;

    const classementEtape = etape.classements[0].classement_etape.slice(0, 9);
    let currentIndex = 0;

    function renderCyclist(index) {
      const classement = classementEtape[index];
      if (!classement) return;

      const coureur = coureurs.coureurs.find(c => parseInt(c.id) === classement.id_coureur);
      if (!coureur) return;

      const fullName = `${coureur.prenom.toUpperCase()} ${coureur.nom.toUpperCase()}`;
      const nationCode = coureur.nation?.toUpperCase() || '';
      const parcours = `${etape.nom_ville_depart} – ${etape.nom_ville_arrivee}`;
      const distance = `${etape.distance} km`;
      const temps = classement.temps;
      const equipe = coureur.equipe;
      const image = coureur.image || "/assets/placeholders/rider.png";

      // Titre principal : parcours
      const title = document.getElementById("stage-winner-title");
      if (title) title.textContent = parcours;

      // Sous-titre : étape + distance
      const subtitle = document.getElementById("stage-winner-subtitle");
      if (subtitle) subtitle.textContent = `Étape ${etape.id} - ${distance}`;

      // Image
      const img = document.getElementById("winner-stage-img");
      if (img) {
        img.src = image;
        img.alt = fullName;
      }

      // Infos texte
      const suffix = classement.no_classement === 1 ? "er" : "e";
      document.getElementById("winner-rank").innerHTML = `${classement.no_classement}<span class="text-sm align-top">${suffix}</span>`;
      
      document.getElementById("winner-temps").textContent = temps;
      document.getElementById("winner-name").textContent = fullName;
      document.getElementById("winner-nation").textContent = nationCode;
      document.getElementById("winner-team").textContent = equipe;

      // Fond avec drapeau
      const bg = document.getElementById("flag-background");
      if (bg) {
        bg.className = ""; // reset classes
        bg.classList.add("w-full", "h-full", "bg-cover", "bg-center");
        bg.style.backgroundImage = `url(/assets/flags/${nationCode.toLowerCase()}.svg)`;
      }
    }

    // Navigation
    document.getElementById("winner-prev")?.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + classementEtape.length) % classementEtape.length;
      renderCyclist(currentIndex);
    });

    document.getElementById("winner-next")?.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % classementEtape.length;
      renderCyclist(currentIndex);
    });

    // Initial render
    renderCyclist(currentIndex);

  } catch (err) {
    console.error("Erreur chargement vainqueur d'étape :", err);
  }
}
