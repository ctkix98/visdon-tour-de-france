class MenuBubble extends HTMLElement {

    static observedAttributes = [];

    constructor() {
        super();
    }

    render() {
        this.innerHTML = `
                <p>${this.getAttribute('name')}</p>
        `;
    }

    connectedCallback() {
        console.log("Custom element added to page.");
        this.render();
    }

    
}

customElements.define("menu-bubble", MenuBubble);