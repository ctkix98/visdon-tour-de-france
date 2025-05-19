import { xml } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import { line } from "d3-shape";
import { select } from "d3-selection";
import { max, min } from "d3-array";
import etapes from "../../data/etapes.json";

const urlStart = "../../coordonnees_etapes/stage-";
const urlEnd = "-route.gpx";
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = 500 - margin.left - margin.right;
const height = 300 - margin.top + margin.bottom;

let elevations = [];
let distances = [0];

const loadElevationData = async (stageNumber) => {
  const data = await xml(`${urlStart}${stageNumber}${urlEnd}`);
  const trkpts = data.querySelectorAll("trkpt");
  
  // Filtrer les points qui ont une élévation
  const validPoints = Array.from(trkpts).filter(trkpt => trkpt.querySelector("ele"));
  
  const etapeElevations = validPoints.map((trkpt) => {
    const ele = trkpt.querySelector("ele").textContent.trim();
    return parseFloat(ele);
  });

  elevations = elevations.concat(etapeElevations);

  // Ajuster les distances pour ne prendre en compte que les points valides
  const lastDistance = distances[distances.length - 1];
  const newDistances = validPoints.map((_, index) => lastDistance + index);
  distances = distances.concat(newDistances.slice(1));
};

const createElevationProfile = () => {
  const xScale = scaleLinear()
    .domain([distances[0], distances[distances.length - 1]])
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([min(elevations), max(elevations)])
    .range([height, 0]);

  const elevationLine = line()
    .x((d, i) => xScale(distances[i]))
    .y((d) => yScale(d));

  const svg = select("#elevation-profile")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  svg
    .append("path")
    .datum(elevations)
    .attr("d", elevationLine)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5);

  const xAxis = (g) =>
    g
      .attr("transform", `translate(0, ${height})`)
      .call((g) =>
        g
          .append("g")
          .call((axis) => axis.selectAll(".tick line").remove())
          .call((axis) => axis.select(".domain").remove())
      );

  const yAxis = (g) =>
    g.call((g) =>
      g
        .append("g")
        .call((axis) => axis.selectAll(".tick line").remove())
        .call((axis) => axis.select(".domain").remove())
    );

  svg
    .append("g")
    .call(
      (g) =>
        g
          .call(xAxis)
          .append("text")
          .attr("x", width / 2)
          .attr("y", 30)
          .attr("text-anchor", "middle")
          .text("Distance")
    );

  svg
    .append("g")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -30)
    .attr("text-anchor", "middle")
    .text("Élévation (m)");
};

const main = async () => {
  for (let i = 1; i <= etapes.length; i++) {
    await loadElevationData(i);
  }
  createElevationProfile();
};

main();
