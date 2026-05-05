class RulesCard extends HTMLElement {

    static observedAttributes = [];

    constructor() {
        super();
    }

    render() {
       /*  this.innerHTML = `
                <p>${this.getAttribute('name')}</p>
        `; */

        this.insertAdjacentHTML(
            "afterbegin",
            `
            <div
              class="card-container"
            >
              <!-- Face avant -->
              <div
                class="front-card"
              >
                <p>${this.getAttribute('title')}</p>
              </div>
              <!-- Face arrière -->
              <div
                class="back-card"  
              >
                <p>

                  ${this.getAttribute('content')}</p>
              </div>`
          );
    }

    connectedCallback() {
        this.render();
    }

    
}

customElements.define("rules-card", RulesCard);