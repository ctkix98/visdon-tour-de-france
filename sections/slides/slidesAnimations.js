import { injectSlideShapes } from "./slidesShapes.js";

export function initSlideAnimations() {
    injectSlideShapes().then(() => {
        const allSlides = document.querySelectorAll(".slide");
    
        // Apparition initiale via IntersectionObserver
        const slideObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            const slide = entry.target;
            const shapes = slide.querySelectorAll(".slide-shape");
            const content = slide.querySelector(".slide-content");
    
            if (entry.isIntersecting) {
              shapes.forEach((shape) => {
                shape.style.opacity = 1;
                shape.style.top = shape.dataset.finalTop;
              });
    
              if (content) {
                content.style.opacity = 1;
                content.style.transform = "translateY(0)";
              }
            }
          });
        }, { threshold: 0.4 });
    
        allSlides.forEach((slide) => {
          slideObserver.observe(slide);
        });
    
        // Scroll logic
        let lastScrollY = window.scrollY;
    
        window.addEventListener("scroll", () => {
          const scrollingDown = window.scrollY > lastScrollY;
          lastScrollY = window.scrollY;
    
          allSlides.forEach((slide) => {
            const rect = slide.getBoundingClientRect();
            const shapes = slide.querySelectorAll(".slide-shape");
            const content = slide.querySelector(".slide-content");
    
            const slideCenter = rect.top + rect.height / 2;
            const isPastThreshold = slideCenter < window.innerHeight * 0.25;
    
            // Disparition si on scrolle vers le bas et qu'on a passé le seuil
            if (scrollingDown && isPastThreshold) {
              shapes.forEach((shape) => {
                shape.style.opacity = 0;
                shape.style.top = "-20%";
              });
    
              if (content) {
                content.style.opacity = 0;
                content.style.transform = "translateY(-50%)";
              }
            }
    
            // Réapparition si on remonte
            if (!scrollingDown && rect.top < window.innerHeight && rect.bottom > 0) {
              shapes.forEach((shape) => {
                shape.style.opacity = 1;
                shape.style.top = shape.dataset.finalTop;
              });
    
              if (content) {
                content.style.opacity = 1;
                content.style.transform = "translateY(0)";
              }
            }
          });
        });
      });
    };
    