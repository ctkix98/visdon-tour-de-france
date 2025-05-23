import etapes from "../../data/etapes.json";
import { select } from "d3-selection";
import { createMap } from "./setup-map";
import { init } from "./setup-traces";

// const stageInfos = etapes.filter(etape => importantStagesNumber.includes(etape.id))

// Attendre que la carte et les points importants soient initialisés
const initStageInfos = async () => {
  await init(); // Cette fonction initialise la carte et ajoute les points importants
  const svg = select("#tdf-map");
  console.log(svg.selectAll(".important-point"));
};

initStageInfos();