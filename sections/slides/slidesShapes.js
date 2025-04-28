const COLORS = ["shape-yellow", "shape-black", "shape-white"];

const SHAPE_WIDTH_VW = 13; // équivalent à w-50 (~200px si viewport 1536px)
const SHAPE_HEIGHT_VH = 10; // équivalent à h-40 (~160px si 1000px height)

const Y_MARGIN_TOP = 15;
const Y_MARGIN_BOTTOM = 85;

const EXCLUSION_ZONE = {
  xMinPercent: 20,
  xMaxPercent: 80,
  yMinPercent: 25,
  yMaxPercent: 75,
};

function isInsideExclusion(x, y) {
  return (
    x >= EXCLUSION_ZONE.xMinPercent &&
    x <= EXCLUSION_ZONE.xMaxPercent &&
    y >= EXCLUSION_ZONE.yMinPercent &&
    y <= EXCLUSION_ZONE.yMaxPercent
  );
}

function isOverlapping(shape1, shape2) {
  return !(
    shape1.x + SHAPE_WIDTH_VW < shape2.x ||
    shape1.x > shape2.x + SHAPE_WIDTH_VW ||
    shape1.y + SHAPE_HEIGHT_VH < shape2.y ||
    shape1.y > shape2.y + SHAPE_HEIGHT_VH
  );
}

export function injectSlideShapes() {
  document.querySelectorAll(".slide").forEach((slide) => {
    const shapeCount = Math.floor(Math.random() * 3) + 8;
    const placedShapes = [];

    for (let i = 0; i < shapeCount; i++) {
      let xPercent, yPercent, colorClass;
      let attempts = 0;
      let valid = false;

      while (!valid && attempts < 50) {
        xPercent = Math.random() * 120 - 10;
        yPercent = Math.random() * (Y_MARGIN_BOTTOM - Y_MARGIN_TOP) + Y_MARGIN_TOP;
        colorClass = COLORS[Math.floor(Math.random() * COLORS.length)];

        const sameColorOverlap = placedShapes.some((s) => {
          return (
            s.color === colorClass &&
            isOverlapping({ x: xPercent, y: yPercent }, s)
          );
        });

        if (!sameColorOverlap && !isInsideExclusion(xPercent, yPercent)) {
          valid = true;
        }

        attempts++;
      }

      const shape = document.createElement("div");
      shape.classList.add("custom-shape", colorClass);
      shape.style.left = `${xPercent}vw`;
      shape.style.top = `${yPercent}vh`;
      slide.appendChild(shape);

      placedShapes.push({ x: xPercent, y: yPercent, color: colorClass });
    }
  });
}
