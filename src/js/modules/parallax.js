export function initPhilosophyParallax() {
  const items = document.querySelectorAll(".philosophy__bg");
  if (!items.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduce.matches) return;

  let ticking = false;

  const update = () => {
    ticking = false;
    const vh = window.innerHeight;

    items.forEach((el) => {
      const rect = el.getBoundingClientRect();

      if (rect.bottom < 0 || rect.top > vh) return;

      // 画面中央基準の進捗（-1 ～ 1）
      const center = rect.top + rect.height / 2;
      const progress = (center - vh / 2) / (vh / 2);
      const clamped = Math.max(-1, Math.min(1, progress));

      // data-speed で動く量を調整（px相当）
      const speed = Number(el.dataset.speed ?? 12);

      // 50% を基準に上下へずらす
      const y = 50 + clamped * speed;

      el.style.backgroundPosition = `center ${y}%`;
    });
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  update();
}
