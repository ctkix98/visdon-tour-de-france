
import materielData from '../data/materiel.json';

class TdfEquipment extends HTMLElement {
  constructor() {
    super();
    this.equipments = materielData;
  }

  connectedCallback() {
    this.render();
    this.initHoverLogic();
  }

  initHoverLogic() {
    const modal = this.querySelector('#modal-equipment');
    const titreEl = this.querySelector('#equipment-titre');
    const texteEl = this.querySelector('#equipment-texte');

    this.querySelectorAll('[id].part-hover').forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const id = el.getAttribute('id');
        const equip = this.equipments.find(item => item.id == id);
        
        if (equip) {
          titreEl.textContent = equip.titre;
          texteEl.textContent = equip.contenu;
          modal.classList.remove('hidden');
          const mw = modal.offsetWidth || 320;
          const mh = modal.offsetHeight || 100;
          modal.style.left = `${e.pageX - mw - 15}px`;
          modal.style.top = `${e.pageY - mh - 15}px`;
        }
      });

      el.addEventListener('mouseleave', () => {
        modal.classList.add('hidden');
      });
    });
  }

  render() {
    this.classList.add("section-wrapper");

    this.innerHTML = `
      <a href="#menu-section" class="btn-back"> back </a>
      <div class="menu-section-title">Équipement</div>
      
      <div class="third-cloumn flex justify-center items-end relative">
        <svg id="cycliste" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1119 1047" class="h-[63vh] w-auto max-w-full drop-shadow-2xl">
          <defs>
            <style>
              @keyframes pulse-hint {
                0%, 100% { opacity: 0; }
                50% { opacity: 0.2; }
              }
              .part-hover {
                cursor: pointer;
                animation: pulse-hint 2.5s ease-in-out infinite;
              }
              .part-hover:hover {
                animation: none !important;
                fill: rgba(255,255,255,0.65) !important;
                opacity: 1 !important;
              }
              .cls-1 { fill: #ffc66b; }
              .cls-2 { fill: #a7beff; }
              .cls-3 { fill: #ffd421; }
              .cls-4 { fill: #ff5d9c; }
              .cls-5 { fill: #8cffda; }
              .cls-6 { fill: #e6ff93; }
              .cls-7 { fill: #fff17f; }
              .cls-8 { fill: #149fff; }
              .cls-9 { fill: #149555; }
            </style>
          </defs>
          <image width="1119" height="1047" href="./assets/img/cycliste.png" />

          <!-- id=0 : Casque (path Illustrator — artboard 1119×1047, pas de transform) -->
          <path id="0" class="cls-2 part-hover" d="M321.07,113.83s15.73-10.94,41.99-9.87c28.74,1.17,31.04-3.56,40.07-9.67,3.76-2.54,12.86-8.6,13.52-8.91,6.93-3.25,4.77-11.06,54.68,8.58,19.73,7.77,38.39-17.87,38.39-17.87l-16.45-19.74s-5.03-10.25,1.93-15.67-43.42-28.18-94.69-25.66-101.11,59.14-79.44,98.8Z"/>


          <!-- id=8 : Lunettes (path Illustrator — artboard 1119×1047, pas de transform) -->
          <path id="8" class="cls-8 part-hover" d="M348.3,142.06l21.59,16.03c3.74-8.17,9.41-23.71,5.09-28.92-3.07-3.71-9.86-6.85-7.09-7.84,30.9-11,64.46-21.74,59.03-21.52l-92.91,22.07,9.89,16.95,4.4,3.23Z"/>

          <!-- id=3 : Oreillette (groupe Illustrator — artboard 1119×1047, pas de transform) -->
          <g id="3" class="cls-4 part-hover">
            <path d="M442.89,129.02c-1.33,1.15-3.03,1.68-4.91.81-6.19-2.84,0-9.02,0-9.02,0,0,2.32.26,6.19,0l-1.27,8.21Z"/>
            <polyline points="513 130.26 481.55 140.14 442.89 129.02"/>
          </g>

          <!-- id=6 : Maillot/Jersey (path Illustrator — artboard 1119×1047, pas de transform) -->
          <path id="6" class="cls-6 part-hover" d="M630.96,563.18s49.52,37.08,77.88,34.61l66.41-78.36c.15.35,12.51-21.43,27.97-42.8s32.79-40.77,38.79-41.62c11.53-1.64,51.81-70.15,10.97-148.6-41.09-78.92-33.33-89.09-55.61-103.84s-126.42-73.27-186.17-73.58-91.7,11.37-91.7,11.37l-16.74,26.88-2.46,24.12s-8.6,22.43-7.99,28.57,1.38,10.91-36.24,7.54l7.02,49.48-9.03,37.91,43.62,5.99-5.38,29.95,69.13-2.96c-.68-3.06,3.34-18.99,5.57-50.39.29-4.13,15.27,0,23.92,1.59,22.6,4.18,28.08,18.3,51.15,14.44l11.83,12.6.15,6.61c.33-1.64-50.98,5.65-97.69,30.57l-11.67,54.84c7.17,2.17,15.42,45.83,14.81,52.23,0,.04-3.55-1.83,130.35-11.52l-58.89,124.39Z"/>

          <!-- id=7 : Gants (path Illustrator — artboard 1119×1047, pas de transform) -->
          <path id="7" class="cls-1 part-hover" d="M335.4,508.93s-4-8.64-15.59-4.21-44.66,29.92-46.98,40.45,4.85,10.32,4.85,10.32c0,0,10.11-7.58,13.48-9.69s5.27,9.48,9.48,11.59,1.47,5.69,9.9,8.43,6.53,7.16,11.8,5.69,8.64-5.69,12.01-5.27,26.54,2.32,31.18-5.69-6.11-22.92-6.11-22.92l-24.02-28.69Z"/>


          <!-- id=5 : Chaussures (paths Illustrator, viewBox origin 345x324 → scale+translate vers zone chaussures) -->
          <g id="5" class="cls-9 part-hover" transform="translate(480, 662) ">
            <path d="M314.98,216.59c-48.48,43.68-62.94-6.56-66.72,6.96-6.24,22.32-47.2,70.67-62.64,72.24-14.16,1.44-14.89,27.86,12.48,28.08,58.56.48,79.68-32.64,79.68-32.64l66.72-49.92c3.99-24.53-15.59-52.04-24-53.04-3.34-.4-7.02,4.94-8.16,9.36-1.88,7.28,3.01,13.6,3.84,14.64l-1.2,4.32Z"/>
            <path d="M28.53,65.69l27.05,34.22-38.5,2.38c-4.53.1-9.01-1.52-12.17-4.78s-6.99-9.53-2.17-14.21c11.71-11.39,25.79-17.61,25.79-17.61Z"/>
            <path d="M115.72,22.35l19.18,31.14,35.89-15.57L143.25,1.94s1.13,6.39-4.02,8.25-23.51,12.17-23.51,12.17Z"/>
          </g>

          <!-- id=1 : Cadre (paths Illustrator — fill-rule=evenodd pour creuser les triangles intérieurs) -->
          <g id="1" class="cls-3 part-hover" transform="translate(240, 490)">
            <path fill-rule="evenodd" d="M18.26,328.27l127.56-234.18s6.54-16.35,19.62,0,220.44,292.4,220.44,292.4l302.86-39.25-179.23-234.83,17.66-54.95L153.01.55.6,309.3l17.66,18.97Z M405.47,356.13L176.56,50.92s-7.2-23.71,15.7-23.3,296.32,46.85,296.32,46.85l-83.11,281.67Z M661.99,335.26l-153.79-196.03s-3.27-13.08-10.47,0-68.3,219.23-68.3,219.23l232.55-23.2Z"/>
          </g>

          <!-- id=2 : Roues (paths Illustrator — fill-rule=evenodd pour bande de roulement uniquement) -->
          <g id="2" class="cls-5 part-hover" transform="translate(3, 573)">
            <!-- Roue avant : outer + inner fusionnés → anneau -->
            <path fill-rule="evenodd" d="M59.07,212.78s-35.58,207.53,193.98,206.68c213.46-41.51,213.46-272.75,90.64-351.53-77.93-29.65-242.82-31.71-284.61,144.85Z M2.04,272.45c13.93,108.8,88.05,200.06,250.35,199.15,83.92-.47,219.11-100.14,227.76-228.89C487.45,134.2,388.79-22.28,223.78,3.28,51.57,29.95-10.39,193.02,2.04,272.45Z"/>
            <!-- Roue arrière : outer + inner fusionnés → anneau -->
            <path fill-rule="evenodd" d="M757.42,171.65c-41.41,56.47-57.98,265.41,151.72,247.81,164.14-33.23,204.89-243.58,82.07-322.35-77.93-29.65-156.99-28.24-233.79,74.54Z M673.85,292.12c24.09,85.08,63.62,182.45,225.88,181.46,83.92-.52,207.06-91.48,215.72-220.23,7.3-108.51-87.34-252.85-229.29-227.9-158.75,27.9-224.73,187.24-212.31,266.68Z"/>
          </g>
        </svg>

        <div id="modal-equipment" class="hidden fixed bg-black/80 backdrop-blur-md text-white border border-white/20 p-6 rounded-2xl shadow-2xl z-[100] max-w-sm pointer-events-none transition-all duration-200">
          <p id="equipment-titre" class="block font-black text-yellow-500 uppercase tracking-widest mb-2 border-b border-white/10 pb-2 text-lg">Titre</p>
          <p id="equipment-texte" class="text-sm font-light leading-relaxed">
            Description du matériel...
          </p>
        </div>

        <div class="absolute top-10 right-20 bg-black/50 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-light">
          🧭 Survolez les parties du cycliste
        </div>
      </div>
    `;
  }
}

customElements.define("tdf-equipment", TdfEquipment);