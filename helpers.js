// Cache la section en cours et affiche celle correspondant à l'id passé en paramètre
const displaySection = (id, callback) => {
    const overlay = document.querySelector('#transition-overlay');
    
    if (!overlay) {
        document.querySelector('#menu-wrapper > *.active')?.classList.remove('active');
        document.querySelector(`#${id}-section`)?.classList.add('active');
        if (callback) callback();
        return;
    }

    // Phase 1 : Entrée (fond beige + logo depuis la droite)
    overlay.classList.remove('exit');
    overlay.classList.add('active');

    setTimeout(() => {
        // Phase 2 : Changement de section au milieu de la transition
        document.querySelector('#menu-wrapper > *.active')?.classList.remove('active');
        document.querySelector(`#${id}-section`)?.classList.add('active');
        
        // On exécute les actions supplémentaires ici
        if (callback) callback();
        
        // Phase 3 : Sortie (le logo part à gauche, puis le fond s'efface)
        overlay.classList.add('exit');
        
        setTimeout(() => {
            overlay.classList.remove('active');
        }, 150); // Petit délai pour un cross-fade onctueux
        
        setTimeout(() => {
            overlay.classList.remove('exit');
        }, 800);
    }, 700); 
}
  
  // Same same, avec les liens
  const activateLink = (id) => {
    document.querySelector(`menu-bubble a.active`)?.classList.remove('active')
    document.querySelector(`menu-bubble a[href="${id}"]`)?.classList.add('active')
  }
  const toggleMenu = () => {
    const notMenuSections = document.querySelectorAll('body > *:not(#menu-wrapper):not(#screen-warning)');

const backButton = document.querySelectorAll('a.btn-back');

    notMenuSections.forEach(section => {
      section.classList.add('hide');
    });

    backButton.forEach(button => {
      button.addEventListener('click', () => {
        notMenuSections.forEach(section => {
          section.classList.remove('hide');
        });
      });
    });
  };
  export {displaySection, activateLink, toggleMenu}
  