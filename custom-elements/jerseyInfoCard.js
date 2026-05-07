class JerseyInfoCard extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute('title') || '';
    const img = this.getAttribute('img') || '';
    const content = this.getAttribute('content') || '';

    this.className = "jersey-information flex flex-row items-center justify-center gap-[5%] mt-10";

    this.innerHTML = `
      <div class="jersey-display flex flex-col items-center justify-center gap-4 min-w-[15vw]">
        <h6 class="text-2xl font-bold text-black-950 uppercase tracking-wide text-center">${title}</h6>
        <img src="${img}" alt="${title}" class="w-full h-auto object-contain" />
      </div>
      <div class="jersey-info-display p-[5%] text-xl font-thin leading-relaxed">
        <p>${content}</p>
      </div>
    `;
  }
}

customElements.define("jersey-info-card", JerseyInfoCard);