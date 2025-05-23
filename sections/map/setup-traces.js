import { geoPath } from "d3-geo";
import { select } from "d3-selection";
import { xml } from "d3-fetch";
import { createMap } from "./setup-map";
import etapes from "../../data/etapes.json";

// Configuration initiale
const urlStart = "../../coordonnees_etapes/stage-";
const urlEnd = "-route.gpx";
const projection = await createMap();
const path = geoPath().projection(projection);
const svg = select("#tdf-map");
const importantStagesNumber = [1,3,4,5,9,21]
const importantStagesCoords = []
const importantStages = etapes.filter(etape => importantStagesNumber.includes(etape.id))

// Map pour suivre les villes déjà affichées (évite les doublons)
const displayedCities = new Map();

const createTrace = async (stageNumber) => {
  return new Promise((resolve) => {
    xml(`${urlStart}${stageNumber}${urlEnd}`).then((data) => {
      // Extraire les coordonnées du fichier GPX
      const trkpts = data.querySelectorAll("trkpt");
      const coords = Array.from(trkpts).map((trkpt) => [
        parseFloat(trkpt.getAttribute("lon")),
        parseFloat(trkpt.getAttribute("lat")),
      ]);
      if (importantStagesNumber.includes(stageNumber)) {
        importantStagesCoords.push(coords[Math.floor(coords.length/2)])
      }
      // Créer et afficher la ligne du tracé
      const line = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: coords,
        },
      };

      // Créer un groupe principal pour l'étape
      const stageGroup = svg.append("g")
        .attr("class", `stage-${stageNumber}`)
        .style("cursor", "pointer");

      // Ajouter la zone cliquable invisible
      stageGroup.append("path")
        .datum(line)
        .attr("d", path)
        .attr("class", "stroke-transparent fill-none")
        .attr("stroke-width", 20)
        .on("mouseenter", () => {
          // Afficher les labels de l'étape avec transition
          stageGroup.selectAll(`.stage-${stageNumber}-label`)
            .transition()
            .duration(200)
            .style("opacity", 1);
          hideStages(stageNumber);
        })
        .on("mouseleave", () => {
          // Masquer les labels de l'étape avec transition
          stageGroup.selectAll(`.stage-${stageNumber}-label`)
            .transition()
            .duration(200)
            .style("opacity", 0);
          showStages();
        });

      // Ajouter le tracé visible
      stageGroup.append("path")
        .datum(line)
        .attr("d", path)
        .attr("class", "stroke-gray-500 fill-none stroke-2");

      // Points de départ et d'arrivée
      const startCoord = coords[0];
      const endCoord = coords[coords.length - 1];
      const etape = etapes[stageNumber - 1];

      // Ajouter points + étiquettes
      addPointWithLabel(
        startCoord,
        "start",
        stageNumber,
        etape.nom_ville_depart,
        stageGroup
      );
      addPointWithLabel(
        endCoord,
        "end",
        stageNumber,
        etape.nom_ville_arrivee,
        stageGroup
      );

      resolve();
    });
  });
};

// Fonction pour ajouter un point sur la carte avec son étiquette
const addPointWithLabel = (coordinates, pointType, stageNumber, cityName, parentGroup) => {
  // Ajouter le point
  addPoint(coordinates, pointType, parentGroup, stageNumber);

  // Ajouter l'étiquette s'il y a un nom de ville
  if (cityName) {
    addCityLabel(coordinates, cityName, pointType, stageNumber, parentGroup);
  }
};

// Fonction pour ajouter un point (marqueur) sur la carte
const addPoint = (coordinates, pointType, parentGroup, stageNumber) => {
  // Créer le point GeoJSON
  const point = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: coordinates,
    },
  };
  const radius = pointType === "important" ? 8 : 4;
  

  // Déterminer le style selon le type de point
  let pointStyle;
  switch (pointType) {
    case "start":
      pointStyle = "stroke-blue-900 fill-blue-500 stroke-[1]";
      break;
    case "end":
      pointStyle = "stroke-red-900 fill-red-500 stroke-[1]";
      break;
    case "important":
      pointStyle = "stroke-gray-700 fill-yellow-500 stroke-2 drop-shadow-lg";
      break;
    default:
      pointStyle = "stroke-gray-900 fill-gray-500 stroke-[]";
  }

  // Ajouter le point à la carte
  parentGroup.append("path")
    .datum(point)
    .attr("d", path)
    .attr("class", pointStyle);

  // Créer le cercle du marqueur
  const [x, y] = projection(coordinates);
  const markerGroup = parentGroup
    .append("g")
    .attr("transform", `translate(${x}, ${y})`)
    .attr("class", `${pointType}-point`)
    .attr("id", `${stageNumber}`)
    .attr("data-coordinates", JSON.stringify(coordinates));

  markerGroup.append("circle")
    .attr("r", radius)
    .attr("class", pointStyle);
};

// Fonction pour ajouter une étiquette de ville
const addCityLabel = (coordinates, cityName, pointType, stageNumber, parentGroup) => {
  if (!cityName) return;

  // Vérifier si la ville a déjà été affichée (éviter les doublons)
  const cityKey = cityName.toLowerCase().trim();
  if (displayedCities.has(cityKey)) return;

  // Enregistrer la ville comme affichée
  displayedCities.set(cityKey, coordinates);

  // Calculer la position et le style
  const [x, y] = projection(coordinates);
  
  // Trouver les coordonnées du point opposé (départ si on est à l'arrivée, arrivée si on est au départ)
  const stageGroup = parentGroup;
  const oppositePointType = pointType === "start" ? "end" : "start";
  const oppositePoint = stageGroup.select(`.${oppositePointType}-point`).node();
  let xOffset;
  let anchor;
  
  if (oppositePoint) {
    const oppositeCoords = JSON.parse(oppositePoint.getAttribute("data-coordinates"));
    const [oppositeX] = projection(oppositeCoords);
    
    // Si le point actuel est plus à l'ouest que le point opposé
    if (x < oppositeX) {
      xOffset = -20;
      anchor = "end";
    } else {
      xOffset = 20;
      anchor = "start";
    }
  } else {
    // Fallback au comportement par défaut si on ne trouve pas le point opposé
    xOffset = pointType === "start" ? -20 : 20;
    anchor = pointType === "start" ? "end" : "start";
  }

  const textColor = pointType === "start" ? "blue" : "red";
  const fontSize = 24;

  // Créer le groupe pour l'étiquette
  const labelGroup = parentGroup.append("g")
    .attr("transform", `translate(${x}, ${y})`)
    .attr("class", `stage-${stageNumber}-label`)
    .style("opacity", 0)
    .style("pointer-events", "none");

  // Créer temporairement le texte pour mesurer sa taille
  const tempText = labelGroup
    .append("text")
    .attr("x", xOffset)
    .attr("y", 0)
    .attr("text-anchor", anchor)
    .attr("font-size", `${fontSize}px`)
    .text(cityName)
    .attr("opacity", 0);

  // Calculer la taille puis supprimer le texte temporaire
  const bbox = tempText.node().getBBox();
  tempText.remove();

  // Ajouter le fond de l'étiquette
  const paddingX = 6; // Padding horizontal
  const paddingY = 4; // Padding vertical

  // Déterminer la position horizontale du rectangle selon l'ancrage du texte
  let rectX;
  if (anchor === "end") {
    rectX = xOffset - bbox.width - paddingX;
  } else {
    rectX = xOffset;
  }

  // Centrer verticalement le texte dans le rectangle
  // La valeur de base de y est 0, donc on calcule le décalage vertical
  const halfHeight = (bbox.height + paddingY * 2) / 2;

  // Ajouter le fond de l'étiquette
  labelGroup
    .append("rect")
    .attr("x", rectX)
    .attr("y", -halfHeight) // Ajuster la position verticale pour centrer
    .attr("width", bbox.width + paddingX * 2)
    .attr("height", bbox.height + paddingY * 2)
    .attr("fill", "#F8F8F5")
    .attr("fill-opacity", 1)
    .attr("rx", 6) // Coins arrondis plus grands
    .attr("ry", 6); // Coins arrondis plus grands

  // Ajouter le texte final, centré dans le rectangle
  labelGroup
    .append("text")
    .attr("x", xOffset)
    .attr("y", 0) // Centrer verticalement
    .attr("text-anchor", anchor)
    .attr("dominant-baseline", "middle") // Centrer verticalement le texte
    .attr("fill", textColor)
    .attr("font-size", `${fontSize}px`)
    .text(cityName);
};

const hideStages = (currentStageNumber) => {
  for (let i = 1; i <= etapes.length; i++) {
    svg.selectAll(".stage-" + i)
      .filter((d, i, nodes) => {
        const group = nodes[i];
      return !group.classList.contains(`stage-${currentStageNumber}`);
    })
    .transition()
    .duration(200)
    .style("opacity", 0.5);
  }
};

const showStages = () => {
  for (let i = 1; i <= etapes.length; i++) {
    svg.selectAll(".stage-" + i)
      .transition()
      .duration(200)
      .style("opacity", 1);
  }
};

const initImportantStages = async () => {
  for (let i = 0; i < importantStages.length; i++) {
    const stageNumber = importantStages[i].id;
    const stageGroup = svg.select(`.stage-${stageNumber}`);
    if (stageGroup.node()) {
      const etape = importantStages[i];
      addPointWithLabel(
        importantStagesCoords[i],
        "important",
        stageNumber,
        etape.nom_ville_depart,
        stageGroup
      );
    }
  }
}

// Fonction d'initialisation qui charge toutes les étapes séquentiellement
export const init = async () => {
  for (let i = 1; i <= etapes.length; i++) {
    await createTrace(i);
  }
  await initImportantStages();
  return projection;
};



// Lancer l'initialisation
// export {init};
