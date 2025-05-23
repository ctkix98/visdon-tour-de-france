import * as d3 from "d3";

export function animateIntroLogo() {
  const logo = d3.select("#intro-logo");
  const text = d3.select("#intro-text");

  // Forcer le scroll tout en haut au chargement
  window.scrollTo(0, 0);

  // Cache le texte au départ
  text.style("opacity", 0);

  // Petit délai avant le zoom
  setTimeout(() => {
    logo
      .style("transform", "scale(1)")
      .transition()
      .duration(2000)
      .ease(d3.easeCubicOut)
      .style("transform", "scale(1.7)")
      .on("end", () => {
        // ➕ Texte en fondu
        text.transition()
          .duration(200)
          .style("opacity", 1)
          .on("end", () => {
            // S'assure que le texte reste visible
            text.style("opacity", 1);

            // ⏱️ Scroll vers la suite après 1s
            setTimeout(() => {
              const target = document.querySelector("#slide-1");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }, 2000);
          });
      });
  }, 100);
}
