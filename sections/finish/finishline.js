import * as d3 from "d3";

export function setupFinishScrollRace() {
  const wrapper = document.getElementById("finish-scroll-wrapper");
  const riders = d3.selectAll(".rider-wrapper");
  const maxDistance = window.innerWidth - 150;

  function updatePositions() {
    const wrapperRect = wrapper.getBoundingClientRect();
    const scrollRange = wrapper.offsetHeight - window.innerHeight;

    const scrollProgress = Math.min(
      Math.max(0, -wrapperRect.top / scrollRange),
      1
    );

    riders.each(function () {
      const el = d3.select(this);
      const speed = parseFloat(el.attr("data-speed")) || 1;
      const shift = scrollProgress * maxDistance * speed;

      el.style("transform", `translateX(${shift}px)`);
    });
  }

  window.addEventListener("scroll", updatePositions);
  updatePositions();
}

document.addEventListener("DOMContentLoaded", setupFinishScrollRace);
