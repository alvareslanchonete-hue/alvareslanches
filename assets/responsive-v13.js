(() => {
  let scheduled = false;

  function applyResponsiveLayout() {
    const hero = document.querySelector("#inicio");
    const heroImage = hero?.querySelector("img.responsive-media, img");
    const heroFrame = heroImage?.parentElement;
    if (heroImage && heroFrame) {
      heroFrame.classList.add("alv-hero-frame");
      heroImage.classList.add("alv-hero-image");
      heroFrame.style.setProperty("--alv-hero-url", `url("${heroImage.currentSrc || heroImage.src}")`);
      const desktop = heroImage.style.getPropertyValue("--desktop-position") || "center center";
      const mobile = heroImage.style.getPropertyValue("--mobile-position") || "center center";
      heroFrame.style.setProperty("--desktop-position", desktop);
      heroFrame.style.setProperty("--mobile-position", mobile);
    }

    const story = document.querySelector("#historia");
    const storyVideos = story?.querySelectorAll("video") || [];
    if (storyVideos.length) {
      const firstCard = storyVideos[0].parentElement?.parentElement;
      firstCard?.parentElement?.classList.add("alv-history-grid");
      storyVideos.forEach((video) => {
        video.parentElement?.classList.add("alv-history-frame");
        video.parentElement?.parentElement?.classList.add("alv-history-card");
      });
    }
  }

  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyResponsiveLayout();
    });
  });

  // O conteúdo publicado pode ser recriado pelo React. Observar somente a árvore
  // evita um ciclo causado pelas próprias variáveis CSS aplicadas acima.
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("resize", applyResponsiveLayout, { passive: true });
  applyResponsiveLayout();
})();
