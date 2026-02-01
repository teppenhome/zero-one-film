export function initVideoPlayer() {
  document.querySelectorAll(".js-video").forEach((wrap) => {
    const btn = wrap.querySelector(".about__play");
    const vimeoId = wrap.dataset.vimeoId;
    const title = wrap.dataset.vimeoTitle || "Vimeo video";

    if (!btn || !vimeoId) return;

    btn.addEventListener("click", () => {
      if (wrap.classList.contains("is-playing")) return;
      wrap.classList.add("is-playing");

      const src =
        `https://player.vimeo.com/video/${encodeURIComponent(vimeoId)}` +
        `?autoplay=1&muted=0&loop=0&title=0&byline=0&portrait=0&dnt=1`;

      const iframe = document.createElement("iframe");
      iframe.className = "about__video-embed";
      iframe.src = src;
      iframe.title = title;
      iframe.allow = "autoplay; fullscreen; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.loading = "lazy";

      wrap.appendChild(iframe);
    });
  });
}
