export function initAboutBgtext() {
  const about = document.querySelector(".about");
  if (!about) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        about.classList.add("is-visible");
        observer.disconnect(); // 一度だけでOK
      }
    },
    {
      root: null,
      threshold: 0.3, // 30%見えたら発火
    }
  );

  observer.observe(about);
}
