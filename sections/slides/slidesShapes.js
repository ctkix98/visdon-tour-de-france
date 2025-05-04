import * as d3 from "d3";

export function injectSlideShapes() {
  return new Promise((resolve) => {
    const SHAPE_POSITIONS = [
      { top: 5, left: -5, color: "shape-yellow" },
      { top: 10, left: 75, color: "shape-white" },
      { top: 15, left: 90, color: "shape-black" },
      { top: 60, left: 80, color: "shape-yellow" },
      { top: 80, left: 90, color: "shape-white" },
      { top: 85, left: 5, color: "shape-black" },
      { top: 70, left: 20, color: "shape-yellow" },
      { top: 25, left: 5, color: "shape-black" },
      { top: 22, left: 40, color: "shape-white" },
      { top: 75, left: 45, color: "shape-black" },
    ];

    const slides = document.querySelectorAll(".slide");

    slides.forEach((slide) => {
      const d3Slide = d3.select(slide);

      SHAPE_POSITIONS.forEach((pos, i) => {
        const shape = d3Slide
          .append("div")
          .attr("class", `custom-shape ${pos.color} slide-shape`)
          .style("left", `${pos.left}%`)
          .style("top", `${pos.top + 10}%`) // position de départ +10% plus bas
          .style("opacity", 0)
          .style("transition", `all 0.7s ease ${i * 50}ms`) // stagger

        // Sauvegarde la position finale
        shape.node().dataset.finalTop = `${pos.top}%`;
      });
    });

    resolve();
  });
}
