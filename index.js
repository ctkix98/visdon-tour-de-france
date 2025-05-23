import "/node_modules/flag-icons/css/flag-icons.min.css";
import "/sections/menu/menu.js";
import "/custom-elements/menu-bubble.js";
import "/custom-elements/RulesCard.js";
import "/custom-elements/jerseyInfoCard.js";
import "/sections/menu/rules.js"
import "/sections/menu/stakes.js"
import "/sections/menu/teams.js"
import "/sections/podiums/podiumsTabs.js"
import "/sections/map/setup-traces.js"
import "/sections/map/stage-infos.js"
import "/sections/menu/route.js"
// import "/sections/menu/setup-curve.js"

import { displayCategories } from "./sections/menu/menu";
import { displaySection, activateLink, toggleMenu } from "./helpers";
import { displayCards } from "./sections/menu/rules";
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

console.log("coucou");

//To create the slides animations
initSlideAnimations()

//Section podiums
initPodiumsTabs();
showWinnerStage();
showMaillots();
showGeneralPodium();

//Countdown
startCountdown();

//Function to check the size of the screen. If >1024, it says no :
checkScreenSize();

//Function to animate finish-line section
setupFinishScrollRace();



const routes = () => {
  const hash = window.location.hash || "#menu-section";
  const hashs = hash.split("-");
  activateLink(hashs[0]);

  switch (hashs[0]) {
    case "#menu":
      displaySection("menu");
      displayCategories();
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

    case "#route":
      displaySection("route");
      createFullElevationProfile();
      toggleMenu()
      break;

    case "#rules":
      displaySection("rules");
      displayCards();
      toggleMenu()
      break;

      case "#teams":
        displaySection("teams");
        displayTeams();
        toggleMenu()
        break;  
  }
};

// On veut être averti des changements
window.addEventListener("hashchange", routes);
routes();
