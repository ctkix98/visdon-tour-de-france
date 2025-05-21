export async function showGeneralPodium() {
  try {
    const [etapes, coureursData] = await Promise.all([
      fetch("./data/etapes.json").then(res => res.json()),
      fetch("./data/coureur.json").then(res => res.json())
    ]);

    // Récupère l'étape finale (21)
    const etape = etapes.find(e => e.id === 21);
    if (!etape) return;

    const classement = etape.classements.find(c => c.classement_maillots);
    if (!classement?.classement_maillots?.classement_maillot_jaune) return;

    const top3 = classement.classement_maillots.classement_maillot_jaune.slice(0, 3);

    top3.forEach((item, index) => {
      const coureur = coureursData.coureurs.find(c => parseInt(c.id) === item.id_coureur);
      if (!coureur) return;

      const num = index + 1;
      const fullName = `${coureur.prenom.toUpperCase()} ${coureur.nom.toUpperCase()}`;
      const image = coureur.image?.replace(/\\/g, "/") || "/assets/placeholders/rider.png";

      // Mise à jour DOM
      const imgEl = document.getElementById(`gen-img-${num}`);
      if (imgEl) {
        imgEl.src = image;
        imgEl.alt = fullName;
      }

      const nameEl = document.getElementById(`gen-name-${num}`);
      if (nameEl) nameEl.textContent = fullName;

      const timeEl = document.getElementById(`gen-time-${num}`);
      if (timeEl) timeEl.textContent = item.temps;
    });

  } catch (err) {
    console.error("❌ Erreur chargement podium général :", err);
  }
}
