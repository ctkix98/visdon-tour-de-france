import { geoPath } from "d3-geo";
import { select } from "d3-selection";
import { xml } from "d3-fetch";
import { createMap } from "./setup-map";

const url = "../../coordonnees_etapes/stage-17-route.gpx";

const createTraces = async () => {
  const projection = await createMap();
  console.log(projection)
  xml(url).then((data) => {
    const svg = select("svg"); // Sélectionnez l'élément SVG existant
    const trkpts = data.querySelectorAll("trkpt");
    const coords = Array.from(trkpts).map((trkpt) => {
      const lat = parseFloat(trkpt.getAttribute("lat"));
      const lon = parseFloat(trkpt.getAttribute("lon"));
      return [lon, lat];
    });

    const path = geoPath().projection(projection);

    const line = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: coords,
      },
      properties: {},
    };

    console.log(line)
    console.log(svg.node());
    svg
      .append("path")
      .datum(line)
      .attr("d", path)
      .attr("class", "stroke-green-900 fill-none stroke-[0.5]");
  });
};

await createTraces();
