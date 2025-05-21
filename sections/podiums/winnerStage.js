export async function showWinnerStage() {
  try {
    const [etapes, coureursData] = await Promise.all([
      fetch("./data/etapes.json").then((res) => res.json()),
      fetch("./data/coureur.json").then((res) => res.json()),
    ]);

    const etape = etapes.find((e) => e.id === 21);
    if (!etape) return;

    const classementEtape = etape.classements[0].classement_etape.slice(0, 9);
    let currentIndex = 0;

    function renderCyclist(index) {
      const classement = classementEtape[index];
      if (!classement) return;

      const coureur = coureursData.coureurs.find(
        (c) => parseInt(c.id) === classement.id_coureur
      );
      if (!coureur) return;

      const fullName = `${coureur.prenom.toUpperCase()} ${coureur.nom.toUpperCase()}`;
      const nationCode = coureur.nation?.toUpperCase() || "";
      const parcours = `${etape.nom_ville_depart} – ${etape.nom_ville_arrivee}`;
      const distance = `${etape.distance} km`;
      const temps = classement.temps;
      const equipe = coureur.equipe || "(Équipe inconnue)";
      const image =
        coureur.image?.replace(/\\/g, "/") || "/assets/placeholders/rider.png";

      // 🔁 Mise à jour des éléments DOM
      const title = document.getElementById("stage-winner-title");
      if (title) title.textContent = parcours;

      const subtitle = document.getElementById("stage-winner-subtitle");
      if (subtitle) subtitle.textContent = `Étape ${etape.id} - ${distance}`;

      const img = document.getElementById("winner-stage-img");
      if (img) {
        img.src = image;
        img.alt = fullName;
      }

      const suffix = classement.no_classement === 1 ? "er" : "e";
      const rankEl = document.getElementById("winner-rank");
      if (rankEl) {
        rankEl.innerHTML = `${classement.no_classement}<span class="text-sm align-top">${suffix}</span>`;
      }

      const timeEl = document.getElementById("winner-temps");
      if (timeEl) timeEl.textContent = temps;

      const nameEl = document.getElementById("winner-name");
      if (nameEl) {
        nameEl.innerHTML = `${fullName} <span id="winner-nation" class="text-sm font-light uppercase">${nationCode}</span>`;
      }

      const teamEl = document.getElementById("winner-team");
      if (teamEl) teamEl.textContent = equipe;

      // 🖼️ Fond avec drapeau (si tu veux le conserver — sinon commente)
      //const bg = document.getElementById("flag-background");
      //if (bg) {
      //  bg.className = "";
      //  bg.classList.add("w-full", "h-full", "bg-cover", "bg-center");
      //  bg.style.backgroundImage = `url(/assets/flags/${nationCode.toLowerCase()}.svg)`;
      //}

      console.log("▶️ Cycliste affiché :", fullName, "-", equipe, "-", nationCode);
    }

    // 🔁 Navigation entre les cyclistes
    document.getElementById("winner-prev")?.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + classementEtape.length) % classementEtape.length;
      renderCyclist(currentIndex);
    });

    document.getElementById("winner-next")?.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % classementEtape.length;
      renderCyclist(currentIndex);
    });

    // 🔄 Initialisation
    renderCyclist(currentIndex);
  } catch (err) {
    console.error("❌ Erreur chargement vainqueur d'étape :", err);
  }
}
