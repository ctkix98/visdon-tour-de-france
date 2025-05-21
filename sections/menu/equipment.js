// recupérer les informations du fichier json
import equipmentJson from '../../data/materiel.json' assert { type: 'json' };

const equipments = equipmentJson;


const descriptionBox = document.getElementById("modal-euqipment");
const titreEl = document.getElementById("titre");
const texteEl = document.getElementById("texte");

const ids = Object.keys(equipments);

ids.forEach(id => {
    console.log(id);
  const el = document.getElementById(id);
    console.log(el);
  if (el) {
    el.addEventListener("mousemove", (e) => {
      const equip = equipments[id];
      titreEl.textContent = equip.titre;
      texteEl.textContent = equip.contenu;
      descriptionBox.classList.remove("hidden");
      descriptionBox.style.left = e.pageX + 15 + "px";
      descriptionBox.style.top = e.pageY + 15 + "px";
    });

    el.addEventListener("mouseleave", () => {
      descriptionBox.classList.add("hidden");
    });
  }
});