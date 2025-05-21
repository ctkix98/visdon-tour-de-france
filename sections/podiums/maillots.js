export async function showMaillots() {
  try {
    const [etapes, coureursData] = await Promise.all([
      fetch("./data/etapes.json").then((res) => res.json()),
      fetch("./data/coureur.json").then((res) => res.json()),
    ]);

    const etape = etapes.find((e) => e.id === 21);
    if (!etape) return;

    const classement = etape.classements.find(c => c.classement_maillots);
    if (!classement) return;

    const data = classement.classement_maillots;

    const maillots = [
      {
        type: "jaune",
        id_coureur: data.classement_maillot_jaune[0].id_coureur,
        valeur: data.classement_maillot_jaune[0].temps
      },
      {
        type: "vert",
        id_coureur: data.classement_maillot_vert[0].id_coureur,
        valeur: `${data.classement_maillot_vert[0].points} pts`
      },
      {
        type: "blanc",
        id_coureur: data.classement_maillot_blanc[0].id_coureur,
        valeur: data.classement_maillot_blanc[0].temps
      },
      {
        type: "pois",
        id_coureur: data.classement_maillot_a_pois[0].id_coureur,
        valeur: `${data.classement_maillot_a_pois[0].points} pts`
      }
    ];

    let currentIndex = 0;

    function renderMaillot(index) {
        
      const maillot = maillots[index];
      const titreEl = document.getElementById("maillot-titre");
if (titreEl) {
  const nomsMaillots = {
    jaune: "Maillot jaune",
    vert: "Maillot vert",
    blanc: "Maillot blanc",
    pois: "Maillot à pois"
  };
  titreEl.textContent = nomsMaillots[maillot.type] || "Maillot";
}

      
      const coureur = coureursData.coureurs.find(
        (c) => parseInt(c.id) === maillot.id_coureur
      );
      if (!coureur) return;

      const fullName = `${coureur.prenom.toUpperCase()} ${coureur.nom.toUpperCase()}`;
      const nationCode = coureur.nation?.toUpperCase() || "";
      const equipe = coureur.equipe || "(Équipe inconnue)";
      const image =
        coureur.image?.replace(/\\/g, "/") || "/assets/placeholders/rider.png";

      // MAJ DOM
      document.getElementById("maillot-img").src = image;
      document.getElementById("maillot-img").alt = fullName;

      document.getElementById("maillot-valeur").textContent = maillot.valeur;

      const nameEl = document.getElementById("maillot-name");
      if (nameEl) {
        nameEl.innerHTML = `${fullName} <span id="maillot-nation" class="text-sm font-light uppercase">${nationCode}</span>`;
      }

      const teamEl = document.getElementById("maillot-team");
      if (teamEl) {
        teamEl.textContent = equipe;
      }

      //changer fond ou style selon type de maillot
      const bg = document.getElementById("maillot-background");
if (bg) {
  bg.className = "absolute inset-0 z-0"; // reset
  switch (maillot.type) {
    case "jaune":
      bg.classList.add("maillot-bg-jaune");
      break;
    case "vert":
      bg.classList.add("maillot-bg-vert");
      break;
    case "blanc":
      bg.classList.add("maillot-bg-blanc");
      break;
    case "pois":
      bg.classList.add("maillot-bg-pois");
      break;
  }
}

    }

    // Navigation
    document.getElementById("maillot-prev")?.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + maillots.length) % maillots.length;
      renderMaillot(currentIndex);
    });

    document.getElementById("maillot-next")?.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % maillots.length;
      renderMaillot(currentIndex);
    });

    // Initialisation
    renderMaillot(currentIndex);

  } catch (err) {
    console.error("❌ Erreur chargement maillots :", err);
  }
}
