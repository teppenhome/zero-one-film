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
      {
        root: null,
        threshold: 0,
      }
    );
    observer.observe(hero);
  }

  /* =========================
     Mobile Menu
  ========================= */
  if (!toggle || !drawer) return;

  const openMenu = () => {
    header.classList.add("is-menu-open");
    drawer.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    header.classList.remove("is-menu-open");
    drawer.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  backdrop?.addEventListener("click", closeMenu);
  closeBtn?.addEventListener("click", closeMenu);

  drawerLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && header.classList.contains("is-menu-open")) {
      closeMenu();
    }
  });
}
