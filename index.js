import "/node_modules/flag-icons/css/flag-icons.min.css";
import "/sections/menu/menu.js";
import "/custom-elements/MenuBubble.js";
import "/custom-elements/RulesCard.js";
import "/custom-elements/TdfRules.js";
import "/custom-elements/jerseyInfoCard.js";
import "/sections/menu/stakes.js"
import "/sections/menu/teams.js"
import "/sections/podiums/podiumsTabs.js"
import "/sections/map/stage-infos.js"
import "/sections/menu/equipment.js"
import "/sections/menu/route.js"


import "/custom-elements/TdfMenu.js";
import { displaySection, activateLink, toggleMenu } from "./helpers";
import { displayJerseyDetails } from "./sections/menu/stakes";
import { initSlideAnimations } from "./sections/slides/slidesAnimations";
import { displayTeams } from "./sections/menu/teams";
import { createFullElevationProfile } from "./sections/menu/setup-curve"


import { initPodiumsTabs } from "./sections/podiums/podiumsTabs";
import { showWinnerStage } from "./sections/podiums/winnerStage.js";
import { startCountdown } from "./sections/countdown/countdown.js";
import { checkScreenSize } from "./sections/checkSize.js";
import { setupFinishScrollRace } from "./sections/finish/finishline.js";
import { showMaillots } from "./sections/podiums/maillots.js";
import { showGeneralPodium } from "./sections/podiums/winnersGC.js";

import { animateIntroLogo } from "./sections/slides/intro.js";
/* const drapeau = document.querySelector(".drapeau");
drapeau.innerHTML = `<span class="fi fi-fr"></span> <span class="fi fi-gr fis"></span>`; */

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

//Function to animate finish-line section
setupFinishScrollRace();



const routes = () => {
  const hash = window.location.hash || "#menu-section";
  const hashs = hash.split("-");
  activateLink(hashs[0]);

  switch (hashs[0]) {
    case "#menu":
      displaySection("menu");
      // Le Custom Element se gère lui-même
      document.querySelector('#menu-wrapper')?.scrollIntoView();
      break;

      case '#stakes':
        if(hashs[2]) {
          displayJerseyDetails(hashs[2])
          displaySection('stakes')
        }
        else {
          displayJerseyDetails(1)
          displaySection('stakes')
          
        }
        toggleMenu()
      break;

    case "#equipment":
      displaySection("equipment");
      toggleMenu()
      break;

    /* case "#route":
      displaySection("route");
      createFullElevationProfile();
      toggleMenu()
      break; */

    case "#rules":
      displaySection("rules");
      // Le Custom Element se gère lui-même
      toggleMenu()
      break;

      case "#teams":
        displaySection("teams");
        displayTeams();
        toggleMenu()
        break;  
  }
  checkScreenSize();

};

// On veut être averti des changements
window.addEventListener("hashchange", routes);
routes();
