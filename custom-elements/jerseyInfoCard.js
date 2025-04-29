class JerseyInfoCard extends HTMLElement {

    static observedAttributes = [];

    constructor() {
        super();
    }

    render() {

        this.insertAdjacentHTML(
            "afterbegin",
            `<div class="jersey-display">
                <h6>${this.getAttribute('title')}</h6>
                <img src="${this.getAttribute('img')}" alt="${this.getAttribute('title')}" />
              </div>
              <div class="jersey-info-display">
                <p>
                 ${this.getAttribute('content')}
                </p>
              </div>`
          );
    }

    connectedCallback() {
        console.log("Custom element added to page.");
        this.render();
    }

    
}

customElements.define("jersey-info-card", JerseyInfoCard );