import { xml } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import { line } from "d3-shape";
import { select } from "d3-selection";
import { max, min } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import etapes from "../../data/etapes.json";

const urlStart = "../../coordonnees_etapes/stage-";
const urlEnd = "-route.gpx";
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = window.innerWidth*5 - margin.left - margin.right;
const height = window.innerHeight*0.9 - margin.top + margin.bottom;

let elevations = [];
let distances = [0];

// Fonction pour calculer la distance entre deux points en kilomètres
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

const loadElevationData = async (stageNumber) => {
  const data = await xml(`${urlStart}${stageNumber}${urlEnd}`);
  const trkpts = data.querySelectorAll("trkpt");
  
  let lastValidElevation = 0;
  let lastLat = null;
  let lastLon = null;
  let totalDistance = distances[distances.length - 1];
  
  const etapeElevations = Array.from(trkpts).map((trkpt) => {
    const eleElement = trkpt.querySelector("ele");
    const lat = parseFloat(trkpt.getAttribute("lat"));
    const lon = parseFloat(trkpt.getAttribute("lon"));
    
    // Calculer la distance depuis le dernier point
    if (lastLat !== null && lastLon !== null) {
      const distance = calculateDistance(lastLat, lastLon, lat, lon);
      totalDistance += distance;
      distances.push(totalDistance);
    } else {
      distances.push(totalDistance);
    }
    
    lastLat = lat;
    lastLon = lon;
    
    if (!eleElement) return lastValidElevation;
    
    const ele = eleElement.textContent.trim();
    const parsedInt = parseInt(ele);
    
    if (isNaN(parsedInt)) {
      return lastValidElevation;
    }
    
    lastValidElevation = parsedInt;
    return parsedInt;
  });

  elevations = elevations.concat(etapeElevations);
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

  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(axisBottom(xScale)
      .ticks(10)
      .tickFormat(d => `${d.toFixed(0)} km`)
    )
    .append("text")
    .attr("x", width / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .text("Distance");

  svg.append("g")
    .call(axisLeft(yScale)
      .ticks(10)
      .tickFormat(d => `${d.toFixed(0)} m`)
    )
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -30)
    .attr("text-anchor", "middle")
    .text("Élévation");

  svg.append("g")
    .attr("class", "grid")
    .call(axisLeft(yScale)
      .tickSize(-width)
      .tickFormat("")
    )
    .style("stroke-dasharray", "2,2")
    .style("stroke", "#ccc");

  svg.append("g")
    .attr("class", "grid")
    .attr("transform", `translate(0,${height})`)
    .call(axisBottom(xScale)
      .tickSize(-height)
      .tickFormat("")
    )
    .style("stroke-dasharray", "2,2")
    .style("stroke", "#ccc");
};


const createFullElevationProfile = async () => {
  // Vider les données précédentes
  elevations = [];
  distances = [0];
  select("#elevation-profile").selectAll("*").remove();
  for (let i = 1; i <= etapes.length; i++) {
    await loadElevationData(i);
    console.log(i);
  }

  createElevationProfile();
};
export { createFullElevationProfile };
