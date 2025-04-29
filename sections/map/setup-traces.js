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
    appendAndStyles(line, "stroke-green-900 fill-none stroke-[0.5]");
    setStartPoints(line.geometry.coordinates[0]);
    setLastPoints(
      line.geometry.coordinates[line.geometry.coordinates.length - 1]
    );
  });
};

const setImportantPoint = (coordinates, natureOfPoint) => {
  const point = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: coordinates,
    },
    properties: {},
  };

  switch (natureOfPoint) {
    case "start":
      appendAndStyles(point, "stroke-blue-900 fill-none stroke-5");
      break;
    case "end":
      appendAndStyles(point, "stroke-red-900 fill-none stroke-5");

    default:
      break;
  }
};

const setStartPoints = (param) => {
  setImportantPoint(param, "start");
};
const setLastPoints = (param) => {
  setImportantPoint(param, "end");
};

const appendAndStyles = (result, style) => {
  const svg = select("svg");

  svg.append("path").datum(result).attr("d", path).attr("class", style);
};

for (let i = 1; i <= etapes.length; i++) {
  createTraces(i);
}
