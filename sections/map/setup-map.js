// Importer la bibliothèque D3.js
import { geoMercator, geoPath } from "d3-geo";
import { select } from "d3-selection";
import { json } from "d3-fetch";

const width = document.documentElement.clientWidth;
const height = window.innerHeight;
export const createMap = () => {
  return new Promise((resolve) => {
    json("../../data/map/france_italie_simplified.geojson").then((data) => {
      const svg = select("#map-section")
        .insert("svg", "img")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width} ${height}`);

      const projection = geoMercator().fitSize([width, height], data);
      const path = geoPath().projection(projection);

      svg
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "fill-yellow-500 stroke-[0.05] stroke-sky-900");

      // Résoudre la promesse avec la projection
      resolve(projection);
    });
  });
};

document.querySelector(".france-map").remove();
