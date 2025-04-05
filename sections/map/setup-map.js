// Importer la bibliothèque D3.js
import { geoMercator, geoPath } from "d3-geo";
import { select } from "d3-selection";
import { json } from "d3-fetch";

Promise.all([
  json("../../data/map/france.geojson"),
  json("../../data/map/italy.geojson"),
]).then(([france, italie]) => {
  // Créer un élément SVG
  const width = 800;
  const height = 600;
  const svg = select("#map-section")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Concaténer les données
  const data = {
    type: "FeatureCollection",
    features: france.features.concat(italie.features),
  };

  // Créer un générateur de chemin
  const projection = geoMercator().fitSize([width, height], data);
  const path = geoPath().projection(projection);

  // Ajouter les chemins (les régions) à l'élément SVG
  svg
    .selectAll("path")
    .data(data.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", "lightblue")
    .attr("stroke", "black");
});

document.querySelector(".france-map").remove()
