import "/node_modules/flag-icons/css/flag-icons.min.css";
import "/sections/menu/menu.js"
import "/custom-elements/menu-bubble.js";
import "/custom-elements/RulesCard.js";
import "/sections/menu/rules.js"

import { displayCategories } from "./sections/menu/menu";
import { displaySection, activateLink} from "./helpers";
import { displayCards } from "./sections/menu/rules";
import { injectSlideShapes } from "./sections/slides/slidesShapes";

/* const drapeau = document.querySelector(".drapeau");
drapeau.innerHTML = `<span class="fi fi-fr"></span> <span class="fi fi-gr fis"></span>`; */

console.log("coucou");
injectSlideShapes();


const routes = () => {
    const hash = window.location.hash || '#menu-section';
    const hashs = hash.split('-')
    activateLink(hashs[0]);
    
    switch(hashs[0]) {
      case '#menu':
          displaySection('menu')
          displayCategories();
      break;

      case '#stakes':
          displaySection('stakes')
          //displayCategories();
      break;

      case '#equipment':
          displaySection('equipment')
          //displayCategories();
      break;

      case '#route':
        displaySection('route')
        //displayCategories();
      break;

      case '#rules':
        displaySection('rules')
          displayCards();
      break;
    }
  }

  // On veut être averti des changements
  window.addEventListener('hashchange', routes)
  routes()

