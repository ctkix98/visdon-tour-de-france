import etapes from "../../data/etapes.json";
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

const setUpStageInfos = (stageNumber) => {
  const stage = etapes.find(etape => etape.id == stageNumber);
  const stageInfos = select("stage-infos");
  const overlay = select("#stage-overlay");
  
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
    <button class="absolute top-4 left-4 text-2xl hover:text-gray-600 transition-colors">
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
    </div>
  `);

  // Configurer le bouton de fermeture
  stageInfos.select("button").on("click", () => {
    stageInfos.style("right", "-50%");
    overlay.style("opacity", "0");
    overlay.style("pointer-events", "none");
    // Cacher complètement après l'animation
    setTimeout(() => {
      stageInfos.style("display", "none");
    }, 300);
  });
}

initStageInfos();