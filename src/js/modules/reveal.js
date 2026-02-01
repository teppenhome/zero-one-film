export function initReveal(options = {}) {
  const {
    selector = ".js-reveal",
    rootMargin = "0px 0px -10% 0px",
    threshold = 0.15,
    once = true,
  } = options;

  const targets = document.querySelectorAll(selector);
  if (!targets.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;

        // data属性で個別調整（任意）
        const delay = el.dataset.revealDelay;
        const duration = el.dataset.revealDuration;

        if (delay) el.style.transitionDelay = `${delay}ms`;
        if (duration) el.style.transitionDuration = `${duration}ms`;

        el.classList.add("is-revealed");

        if (once) io.unobserve(el);
      });
    },
    { root: null, rootMargin, threshold }
  );

  targets.forEach((el) => io.observe(el));
}
