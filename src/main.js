// main.js（エントリーポイント）
// =====================================
// Styles
import "./assets/styles/style.scss";

// Modules
import { initHeader } from "./js/modules/header";
// Aboutの「サムネ→クリックでVimeo再生」を使うなら追加
import { initAboutVideo } from "./js/modules/aboutVideo";
import { initVideoPlayer } from "./js/modules/videoPlayer";
import { initAboutBgtext } from "./js/modules/aboutBgtext";
import { initReveal } from "./js/modules/reveal";
import { initPhilosophyParallax } from "./js/modules/parallax.js";
import { initHeroVideoLoader } from "./js/modules/heroVideoLoader";

// =====================================
// Helpers
function runInit() {
  // ヘッダー（スクロールで背景変更など）
  if (typeof initHeader === "function") initHeader();
  if (typeof initHeroVideoLoader === "function") initHeroVideoLoader();

  // About 動画（必要なページにだけ .js-video が存在すればOK）
  if (typeof initAboutVideo === "function") initAboutVideo();

  if (typeof initVideoPlayer === "function") initVideoPlayer();
  if (typeof initAboutBgtext === "function") initAboutBgtext();
  if (typeof initReveal === "function") initReveal({
    rootMargin: "0px 0px -5% 0px",
    threshold: 0.25,
  });
  if (typeof initPhilosophyParallax === "function") initPhilosophyParallax();
}

// DOM ready
document.addEventListener("DOMContentLoaded", runInit);

