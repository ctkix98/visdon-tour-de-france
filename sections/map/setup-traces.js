import { geoPath } from "d3-geo";
import { select } from "d3-selection";
import { xml } from "d3-fetch";
import { createMap } from "./setup-map";
import etapes from "../../data/etapes.json";

const urlStart = "../../coordonnees_etapes/stage-";
const urlEnd = "-route.gpx";
const projection = await createMap();
const path = geoPath().projection(projection);


const createTraces = async (stageNumber) => {
  xml(`${urlStart}${stageNumber}${urlEnd}`).then((data) => {
    const svg = select("svg"); // Sélectionnez l'élément SVG existant
    const trkpts = data.querySelectorAll("trkpt");
    const coords = Array.from(trkpts).map((trkpt) => {
      const lat = parseFloat(trkpt.getAttribute("lat"));
      const lon = parseFloat(trkpt.getAttribute("lon"));
      return [lon, lat];
    });


    const line = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: coords,
      },
      properties: {},
    };
    setStartPoints(line.geometry.coordinates[0]);
    setLastPoints(line.geometry.coordinates[line.geometry.coordinates.length-1])

    svg
      .append("path")
      .datum(line)
      .attr("d", path)
      .attr("class", "stroke-green-900 fill-none stroke-[0.5]");
  });
};

const setImportantPoint = (coordinates) => {
  const svg = select("svg");
  const point = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: coordinates,
    },
    properties: {},
  };
  svg
    .append("path")
    .datum(point)
    .attr("d", path)
    .attr("class", "stroke-blue-900 fill-none stroke-5");
};

const setStartPoints = (param) => {
    setImportantPoint(param)
    console.log(param)
}
const setLastPoints = (param) => {
    setImportantPoint(param)
}

for (let i = 1; i <= etapes.length; i++) {
  await createTraces(i);
}
