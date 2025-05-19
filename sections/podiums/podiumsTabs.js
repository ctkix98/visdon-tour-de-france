export function initPodiumsTabs() {
    const tabs = document.querySelectorAll(".tab-button");
    const etapeBlock = document.querySelector("#podium-etape");
    const generalBlock = document.querySelector("#podium-general");
    const maillotsBlock = document.querySelector("#podium-maillots");
  
    if (!tabs.length || !etapeBlock || !generalBlock || !maillotsBlock) return;
  
    function showOnly(blockToShow) {
      [etapeBlock, generalBlock, maillotsBlock].forEach(block => {
        block.style.display = "none";
      });
      blockToShow.style.display = "block";
    }
  
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
  
        const selected = tab.dataset.tab;
  
        switch (selected) {
          case "tab-etape":
            showOnly(etapeBlock);
            break;
          case "tab-general":
            showOnly(generalBlock);
            break;
          case "tab-maillots":
            showOnly(maillotsBlock);
            break;
        }
      });
    });
  
    // Afficher l'onglet actif au chargement
    const activeTab = document.querySelector(".tab-button.active");
    if (activeTab) {
      activeTab.click();
    } else {
      showOnly(etapeBlock);
    }
  }
  