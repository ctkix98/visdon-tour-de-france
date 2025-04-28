const SHAPE_POSITIONS = [
  { top: "10%", left: "-5%", color: "shape-yellow" },
  { top: "5%", right: "10%", color: "shape-white" },
  { bottom: "20%", left: "15%", color: "shape-black" },
  { top: "30%", left: "55%", color: "shape-white" },
  { top: "60%", right: "-5%", color: "shape-yellow" },
  { bottom: "10%", right: "20%", color: "shape-black" },
  { top: "75%", left: "5%", color: "shape-white" },
  { bottom: "30%", left: "60%", color: "shape-yellow" },
  { top: "15%", right: "35%", color: "shape-black" },
  { bottom: "5%", left: "-5%", color: "shape-white" },
];

export function injectSlideShapes() {
  document.querySelectorAll(".slide").forEach((slide) => {
    SHAPE_POSITIONS.forEach((shapeData) => {
      const shape = document.createElement("div");
      shape.classList.add("custom-shape", shapeData.color, "z-0");

      // Ajoute les positions
      if (shapeData.top) shape.style.top = shapeData.top;
      if (shapeData.bottom) shape.style.bottom = shapeData.bottom;
      if (shapeData.left) shape.style.left = shapeData.left;
      if (shapeData.right) shape.style.right = shapeData.right;

      slide.appendChild(shape);
    });
  });
}
