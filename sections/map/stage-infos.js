import etapes from "../../data/etapes.json";
import coureurs from "../../data/coureur.json";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { select } from "d3-selection";
import { init } from "./setup-traces";
console.log(etapes);

// const stageInfos = etapes.filter(etape => importantStagesNumber.includes(etape.id))
const svg = select("#tdf-map");

// Attendre que la carte et les points importants soient initialisés
const initStageInfos = async () => {
  await init(); // Cette fonction initialise la carte et ajoute les points importants
  const svg = select("#tdf-map");

  // Créer l'overlay
  svg.append("div")
    .attr("id", "stage-overlay")
    .style("position", "fixed")
    .style("top", "0")
    .style("left", "0")
    .style("width", "100%")
    .style("height", "100%")
    .style("background-color", "rgba(0, 0, 0, 0.5)")
    .style("opacity", "0")
    .style("pointer-events", "none")
    .style("transition", "opacity 0.3s ease");

  // Configurer le conteneur stage-infos
  select("stage-infos")
    .style("display", "none")
    .style("position", "fixed")
    .style("top", "0")
    .style("right", "-50%") // Commencer hors de l'écran
    .style("width", "50%")
    .style("height", "100vh")
    .style("background-color", "white")
    .style("box-shadow", "-2px 0 10px rgba(0, 0, 0, 0.1)")
    .style("padding", "2rem")
    .style("box-sizing", "border-box")
    .style("transition", "right 0.3s ease");

  // Attacher l'événement de clic après l'initialisation
  svg.selectAll(".important-point").on("click", (e) => {
    const stageNumber = getStageNumber(e);
    setUpStageInfos(stageNumber);
  });
};

const getStageNumber = (e) => {
  const stageNumber = e.target.dataset.id;
  return stageNumber;
}

function getCoureurNom(coureur_id) {
  const coureur = coureurs.coureurs.find(c => c.id == coureur_id);
  return coureur ? coureur.prenom + " " + coureur.nom : "Inconnu";
}

const getCoureurFlag = (coureur_id) => {
  const coureur = coureurs.coureurs.find(c => c.id == coureur_id);
  return coureur ? `<span class="fi fi-${coureur.nation}"></span>` : "Inconnu";
}


const setUpStageInfos = (stageNumber) => {
  const stage = etapes.find(etape => etape.id == stageNumber);
  const stageInfos = select("stage-infos");
  const overlay = select("#stage-overlay");
  
  // Désactiver le scroll du body
  document.body.style.overflow = 'hidden';
  
  // Afficher stage-infos et l'overlay
  stageInfos.style("display", "block");
  // Petit délai pour permettre l'animation
  setTimeout(() => {
    stageInfos.style("right", "0");
    overlay.style("opacity", "1");
    overlay.style("pointer-events", "auto");
  }, 10);

  // Créer la structure HTML avec les classes Tailwind
  stageInfos.html(`
    <button class="absolute top-4 left-4 text-2xl hover:text-gray-600 transition-colors cursor-pointer border-2 border-gray-300 rounded-full p-4">
      ×
    </button>
    <div class="h-full overflow-y-auto">
      <img 
        src="assets/profils/profil_${stageNumber}.jpg" 
        alt="Profil de l'étape ${stageNumber}"
        class="w-full h-auto rounded-lg mb-8"
      />
      <div class="bg-gray-50 rounded-lg p-6 shadow-sm">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">
          Etape n°${stage.id} - ${stage.distance} km - ${stage.denivele} m de dénivelé
        </h2>
        <h3 class="text-xl text-gray-600 mb-4">
          ${stage.nom_ville_depart} - ${stage.nom_ville_arrivee} - ${stage.type_etape.charAt(0).toUpperCase() + stage.type_etape.slice(1)}
        </h3>
        <p class="text-gray-500 mb-4">${stage.date}</p>
        <p class="text-gray-700 italic leading-relaxed">${stage.anecdote}</p>
      </div>
      <div class="bg-gray-50 rounded-lg p-6 shadow-sm">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">
          Classement de l'étape
        </h2>
        <table class="min-w-full bg-white rounded-lg shadow text-sm">
          <thead>
            <tr>
              <th class="text-center">Classement</th>
              <th class="text-center">Coureur</th>
              <th class="text-center">Temps</th>
            </tr>
          </thead>
          <tbody id="classementTbody">
            <tr>
              
            </tr>
            <!-- Rows will go here -->
          </tbody>
        </table>
      </div>
    </div>
  
  `);

  setClassement(stageNumber);

  // Configurer le bouton de fermeture
  stageInfos.select("button").on("click", () => {
    stageInfos.style("right", "-50%");
    overlay.style("opacity", "0");
    overlay.style("pointer-events", "none");
    // Réactiver le scroll du body
    document.body.style.overflow = 'auto';
    // Cacher complètement après l'animation
    setTimeout(() => {
      stageInfos.style("display", "none");
    }, 300);
  });
}


 const setClassement = (stageNumber) => {
  const stage = etapes.find(etape => etape.id == stageNumber);
  const classement = stage.classements[0].classement_etape;
  const classementTbody = select("#classementTbody");
  classementTbody.html("");
  for (const coureur of classement) {
        classementTbody.append("tr")
      .attr("class", `${coureur.no_classement % 2 == 0 ? "bg-yellow-500 p-6 h-10 rounded-lg shadow-sm" : "bg-white p-6 h-10 rounded-lg shadow-sm"}`)
      .html(`
        <td class="text-center">${coureur.no_classement}</td>
        <td class="text-center">${getCoureurNom(coureur.id_coureur)}</td>
        <td class="text-center">${coureur.temps}</td>
      `);
  }
}

initStageInfos();