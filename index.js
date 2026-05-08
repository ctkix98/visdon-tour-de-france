import "flag-icons/css/flag-icons.min.css";
import "/sections/menu/menu.js";
import "/custom-elements/MenuBubble.js";
import "/custom-elements/RulesCard.js";
import "/custom-elements/TdfRules.js";
import "/custom-elements/JerseyInfoCard.js";
import "/custom-elements/TdfStakes.js";
import "/custom-elements/TeamCard.js";
import "/custom-elements/TdfTeams.js";
import "/sections/podiums/podiumsTabs.js"
import "/sections/map/stage-infos.js"
import "/custom-elements/TdfEquipment.js";
import "/sections/menu/route.js"


import "/custom-elements/TdfMenu.js";
import { displaySection, activateLink, toggleMenu } from "./helpers";
import { initSlideAnimations } from "./sections/slides/slidesAnimations";
import { createFullElevationProfile } from "./sections/menu/setup-curve"


import { initPodiumsTabs } from "./sections/podiums/podiumsTabs";
import { showWinnerStage } from "./sections/podiums/winnerStage.js";
import { startCountdown } from "./sections/countdown/countdown.js";
import { checkScreenSize } from "./sections/checkSize.js";
import { showMaillots } from "./sections/podiums/maillots.js";
import { showGeneralPodium } from "./sections/podiums/winnersGC.js";

import { animateIntroLogo } from "./sections/slides/intro.js";
/* const drapeau = document.querySelector(".drapeau");
drapeau.innerHTML = `<span class="fi fi-fr"></span> <span class="fi fi-gr fis"></span>`;
 */
console.log("coucou");

//To create the slides animations
animateIntroLogo();
initSlideAnimations()

//Section podiums
initPodiumsTabs();
showWinnerStage();
showMaillots();
showGeneralPodium();

//Countdown
startCountdown();

//Function to check the size of the screen. If >1024, it says no :




const routes = () => {
  const hash = window.location.hash;
  
  // Si on n'a pas de hash, on est au sommet de la page (Intro)
  if (!hash) {
    // On s'assure que tout est visible
    document.querySelectorAll('body > *:not(#screen-warning)').forEach(el => el.classList.remove('hide'));
    // On met le menu sur sa section par défaut mais sans scroller
    displaySection("menu");
    return;
  }

  const hashs = hash.split("-");
  activateLink(hashs[0]);

  switch (hashs[0]) {
    case "#menu":
      displaySection("menu", () => {
        document.querySelector('#menu-wrapper')?.scrollIntoView();
      });
      break;

    case '#stakes':
      displaySection('stakes', () => {
        if(hashs[2]) {
          document.querySelector('tdf-stakes')?.setJersey(hashs[2]);
        }
        else {
          document.querySelector('tdf-stakes')?.setJersey(1);
        }
        toggleMenu();
      });
      break;

    case "#equipment":
      displaySection("equipment", () => toggleMenu());
      break;

    /* case "#route":
      displaySection("route");
      createFullElevationProfile();
      toggleMenu()
      break; */

    case "#rules":
      displaySection("rules", () => toggleMenu());
      break;

    case "#teams":
      displaySection("teams", () => toggleMenu());
      break;
  }
  checkScreenSize();

};

// On veut être averti des changements
window.addEventListener("hashchange", routes);
routes();
