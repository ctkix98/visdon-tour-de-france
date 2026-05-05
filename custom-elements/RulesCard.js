class RulesCard extends HTMLElement {

    static observedAttributes = [];

    constructor() {
        super();
    }

    render() {
        const title = this.getAttribute('title') || '';
        const content = this.getAttribute('content') || '';

        this.className = "group min-h-64 [perspective:1000px]";
        
        this.innerHTML = `
          <div class="card-container h-full w-full relative transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-lg shadow-black/20 rounded-xl">
            <!-- Face avant -->
            <div class="front-card absolute inset-0 backface-hidden bg-yellow-500 text-black flex items-center justify-center rounded-br-lg rounded-tl-lg p-8">
              <p class="font-bold text-lg text-center uppercase tracking-wider">${title}</p>
            </div>
            <!-- Face arrière -->
            <div class="back-card absolute inset-0 backface-hidden bg-black text-white flex items-start justify-center [transform:rotateY(180deg)] overflow-y-auto rounded-br-lg rounded-tl-lg p-8">
              <p class="text-sm leading-relaxed">${content}</p>
            </div>
          </div>
        `;
    }

    connectedCallback() {
        this.render();
    }

    
}

customElements.define("rules-card", RulesCard);