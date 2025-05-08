// Cache la section en cours et affiche celle correspondant à l'id passé en paramètre
const displaySection = (id) => {
    document.querySelector('section.active')?.classList.remove('active')
    document.querySelector(`#${id}-section`)?.classList.add('active')
  }
  
  // Same same, avec les liens
  const activateLink = (id) => {
    document.querySelector(`menu-bubble a.active`)?.classList.remove('active')
    document.querySelector(`menu-bubble a[href="${id}"]`)?.classList.add('active')
  }
  const toggleMenu = () => {
    const notMenuSections = document.querySelectorAll('body>*:not(#menu-wrapper)');

const backButton = document.querySelector('.btn-back');

    notMenuSections.forEach(section => {
      section.classList.add('hide');
    });

    backButton.addEventListener('click', () => {
      notMenuSections.forEach(section => {
        section.classList.remove('hide');
      });
    });
  };
  export {displaySection, activateLink, toggleMenu}
  