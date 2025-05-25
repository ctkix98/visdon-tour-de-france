class MenuBubble extends HTMLElement {

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
            `<p>${this.getAttribute('name')}</p>`
          );
    }

    connectedCallback() {
        this.render();
    }

    
}

customElements.define("menu-bubble", MenuBubble);