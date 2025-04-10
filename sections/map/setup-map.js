// Importer la bibliothèque D3.js
import { geoMercator, geoPath } from "d3-geo";
import { select } from "d3-selection";
import { json } from "d3-fetch";
import simplify from "@turf/simplify";

Promise.all([
  json("../../data/map/france_italie_simplified.geojson")]).then(([data]) => {
  // Créer un élément SVG
  const width = 800;
  const height = 600;
  const svg = select("#map-section")
    .insert("svg", "img")
    .attr("width", width)
    .attr("height", height);

  // Concaténer les données


  // Créer un générateur de chemin
  const projection = geoMercator().fitSize([width, height], data);
  const path = geoPath().projection(projection);

 console.log(data.features)

  // var options = { tolerance: 0.01, highQuality: false };

  // var simple = simplify(data.features)
  // Ajouter les chemins (les régions) à l'élément SVG
  svg
    .selectAll("path")
    .data(data.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("class", "fill-yellow-500 stroke-1 stroke-sky-900");
  // .attr("class", "stroke-1")
  // .attr("stroke", "black")
});

document.querySelector(".france-map").remove();
