// 首頁專屬互動：捲動浮現與統計數字動畫
document.documentElement.classList.add("has-js");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// 區塊進入視窗時加上 .is-visible，觸發 CSS 浮現效果
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

// 統計數字從 0 跑到目標值
function animateCount(element) {
  const target = Number(element.dataset.countTo);
  const suffix = element.dataset.countSuffix || "";
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(target * eased) + suffix;

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

const countElements = document.querySelectorAll("[data-count-to]");

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  countElements.forEach((element) => countObserver.observe(element));
} else {
  countElements.forEach((element) => {
    element.textContent =
      element.dataset.countTo + (element.dataset.countSuffix || "");
  });
}
