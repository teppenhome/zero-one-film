/**
 * Hero Vimeo ローディング制御
 * Vimeo Player API で動画再生開始を検知し、ローディングをフェードアウト
 */

const VIMEO_SDK_URL = "https://player.vimeo.com/api/player.js";
const FALLBACK_TIMEOUT_MS = 10000;

/**
 * Vimeo SDK を動的に読み込む
 * @returns {Promise<typeof Vimeo>}
 */
function loadVimeoSdk() {
  if (typeof window.Vimeo !== "undefined") {
    return Promise.resolve(window.Vimeo);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = VIMEO_SDK_URL;
    script.async = true;
    script.onload = () => resolve(window.Vimeo);
    script.onerror = () => reject(new Error("Vimeo SDK の読み込みに失敗しました"));
    document.head.appendChild(script);
  });
}

/**
 * ローディングを非表示にする
 * @param {HTMLElement} loader
 */
function hideLoader(loader) {
  if (!loader) return;
  loader.classList.add("is-hidden");
  loader.setAttribute("aria-hidden", "true");
}

/**
 * Hero ビデオローダーの初期化
 * index.html の hero セクションにのみ存在する要素を対象とする
 */
export function initHeroVideoLoader() {
  const loader = document.getElementById("hero-loader");
  const iframe = document.getElementById("hero-vimeo");

  if (!loader || !iframe) return;

  let isHidden = false;

  // ネットワークエラー等でイベントが来ない場合のフォールバック
  let fallbackTimer = setTimeout(() => hide(), FALLBACK_TIMEOUT_MS);

  const hide = () => {
    if (isHidden) return;
    isHidden = true;
    clearTimeout(fallbackTimer);
    hideLoader(loader);
  };

  const setupPlayer = async () => {
    try {
      const Vimeo = await loadVimeoSdk();
      const player = new Vimeo.Player(iframe);

      // 動画再生開始でローディングを非表示
      player.on("playing", hide);

      // フォールバック: loaded イベント（再生直前の準備完了）
      player.on("loaded", () => {
        player.getPaused().then((paused) => {
          if (!paused) hide();
        });
      });
    } catch (err) {
      console.warn("[heroVideoLoader]", err);
      hide();
    }
  };

  setupPlayer();
}
