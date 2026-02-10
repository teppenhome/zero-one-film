export function initHeader() {
  const header = document.getElementById("header");
  const hero = document.getElementById("hero");

  const toggle = document.querySelector(".nav-toggle");
  const drawer = document.querySelector(".drawer");
  const backdrop = document.querySelector(".drawer__backdrop");
  const closeBtn = document.querySelector(".drawer__close");
  const drawerLinks = document.querySelectorAll(".drawer__link");

  if (!header) return;

  /* =========================
     Scroll: heroを過ぎたらheader変化
  ========================= */
  if (hero) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        header.classList.toggle("is-scrolled", !entry.isIntersecting);
      },
      { root: null, threshold: 0 },
    );
    observer.observe(hero);
  }

  /* =========================
     Mobile Menu
  ========================= */
  if (!toggle || !drawer) return;

  // もしHTML側で aria-controls が未設定なら保険で付与
  // （idがある場合だけ）
  if (!toggle.getAttribute("aria-controls")) {
    const id = drawer.getAttribute("id");
    if (id) toggle.setAttribute("aria-controls", id);
  }

  // focus trap 用
  const focusableSelector =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  let lastFocusedEl = null;

  const lockScroll = (lock) => {
    // body だけだとiOS等で弱いことがあるので html もロック
    document.documentElement.style.overflow = lock ? "hidden" : "";
    document.body.style.overflow = lock ? "hidden" : "";
  };

  const isOpen = () =>
    header.classList.contains("is-menu-open") &&
    !drawer.hidden &&
    drawer.classList.contains("is-open");

  const openMenu = () => {
    if (isOpen()) return;

    lastFocusedEl = document.activeElement;

    header.classList.add("is-menu-open");
    drawer.hidden = false;

    // transition を効かせるために1フレーム遅らせて is-open
    requestAnimationFrame(() => {
      drawer.classList.add("is-open");
    });

    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "メニューを閉じる");

    lockScroll(true);

    // 最初のフォーカス
    const focusables = drawer.querySelectorAll(focusableSelector);
    if (focusables.length) focusables[0].focus();
  };

  const closeMenu = () => {
    if (!header.classList.contains("is-menu-open")) return;

    header.classList.remove("is-menu-open");
    drawer.classList.remove("is-open");

    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "メニューを開く");

    lockScroll(false);

    // アニメ後に hidden
    const onEnd = (e) => {
      // drawer(ルート)の opacity transition を想定
      if (e.target !== drawer) return;
      drawer.hidden = true;
      drawer.removeEventListener("transitionend", onEnd);

      // フォーカス復帰
      lastFocusedEl?.focus?.();
      lastFocusedEl = null;
    };
    drawer.addEventListener("transitionend", onEnd);

    // 万が一transitionが無い/発火しないケース保険
    window.setTimeout(() => {
      if (!drawer.hidden && !header.classList.contains("is-menu-open")) {
        drawer.hidden = true;
      }
    }, 400);
  };

  /* =========================
     Events
  ========================= */
  toggle.addEventListener("click", () => {
    isOpen() ? closeMenu() : openMenu();
  });

  backdrop?.addEventListener("click", closeMenu);
  closeBtn?.addEventListener("click", closeMenu);

  drawerLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (!isOpen()) return;

    // ESC
    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
      return;
    }

    // Focus trap (Tab)
    if (e.key === "Tab") {
      const focusables = Array.from(drawer.querySelectorAll(focusableSelector));
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // 画面幅がPCになったら強制クローズ（表示崩れ防止）
  const mq = window.matchMedia("(min-width: 768px)");
  const handleMQ = () => {
    if (mq.matches) closeMenu();
  };
  mq.addEventListener?.("change", handleMQ);
  handleMQ();
}
