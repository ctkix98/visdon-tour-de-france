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

  // Cacher stage-infos par défaut
  select("stage-infos").style("display", "none");

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
  
  // Afficher stage-infos
  stageInfos.style("display", "block");

  // Configurer le bouton de fermeture
  stageInfos.select("button").on("click", () => {
    stageInfos.style("display", "none");
  });

  const stageSubtitle = `${stage.nom_ville_depart} - ${stage.nom_ville_arrivee} - ${stage.type_etape.charAt(0).toUpperCase() + stage.type_etape.slice(1)}`;
      
  // Mettre à jour le contenu
  stageInfos.select("img").attr("src", `assets/profils/profil_${stageNumber}.jpg`);
    stageInfos.select(".stage-title").text(stage.nom_ville_arrivee);
  stageInfos.select(".stage-subtitle").text(stageSubtitle);
  stageInfos.select(".stage-date").text(stage.date);
  stageInfos.select(".stage-anecdote").text(stage.anecdote);
  console.log(stageNumber);
}






initStageInfos();