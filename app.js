let cartCount = 0;
const cartCountElements = document.querySelectorAll("[data-cart-count]");
const statusMessage = document.querySelector("[data-status-message]");

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add-to-cart]");

  if (!button) return;

  cartCount += 1;
  cartCountElements.forEach((element) => {
    element.textContent = cartCount;
  });

  if (statusMessage) {
    statusMessage.textContent = `已加入「${button.dataset.addToCart}」`;
  }
});

// 訂單進度控制
document.addEventListener('DOMContentLoaded', () => {
  const steps = Array.from(document.querySelectorAll('.progress-steps .step'));
  const progressFill = document.querySelector('[data-progress-fill]');
  const statusText = document.querySelector('[data-order-status-text]');
  const nextBtn = document.getElementById('next-step');
  const prevBtn = document.getElementById('prev-step');
  const simulateBtn = document.getElementById('simulate');

  if (!steps.length || !progressFill) return;

  let current = 0;
  const labels = ['店家接單', '餐點製作中', '外送途中', '完成'];

  function render() {
    steps.forEach((el, idx) => {
      el.classList.remove('active', 'completed');
      if (idx < current) el.classList.add('completed');
      if (idx === current) el.classList.add('active');
    });

    const pct = (current) / (steps.length - 1) * 100;
    progressFill.style.width = `${pct}%`;
    if (statusText) statusText.textContent = `狀態：${labels[current]}`;
  }

  nextBtn && nextBtn.addEventListener('click', () => {
    current = Math.min(current + 1, steps.length - 1);
    render();
  });

  prevBtn && prevBtn.addEventListener('click', () => {
    current = Math.max(current - 1, 0);
    render();
  });

  let simInterval = null;
  simulateBtn && simulateBtn.addEventListener('click', () => {
    if (simInterval) {
      clearInterval(simInterval);
      simInterval = null;
      simulateBtn.textContent = '模擬自動進度';
      return;
    }
    simulateBtn.textContent = '停止模擬';
    simInterval = setInterval(() => {
      if (current >= steps.length - 1) {
        clearInterval(simInterval);
        simulateBtn.textContent = '模擬自動進度';
        simInterval = null;
        return;
      }
      current += 1;
      render();
    }, 1200);
  });

  steps.forEach((el, idx) => {
    el.addEventListener('click', () => {
      current = idx;
      render();
    });
  });

  render();
});

// 訂單進度控制
document.addEventListener('DOMContentLoaded', () => {
  const steps = Array.from(document.querySelectorAll('.progress-steps .step'));
  const progressFill = document.querySelector('[data-progress-fill]');
  const statusText = document.querySelector('[data-order-status-text]');
  const nextBtn = document.getElementById('next-step');
  const prevBtn = document.getElementById('prev-step');
  const simulateBtn = document.getElementById('simulate');

  if (!steps.length || !progressFill) return;

  let current = 0;
  const labels = steps.map(s => s.querySelector('.step-label').textContent.trim());

  function render() {
    steps.forEach((el, idx) => {
      el.classList.remove('active', 'completed');
      if (idx < current) el.classList.add('completed');
      if (idx === current) el.classList.add('active');
    });

    const pct = (current) / (steps.length - 1) * 100;
    progressFill.style.width = `${pct}%`;
    if (statusText) statusText.textContent = `狀態：${labels[current]}`;
  }

  nextBtn && nextBtn.addEventListener('click', () => {
    current = Math.min(current + 1, steps.length - 1);
    render();
  });

  prevBtn && prevBtn.addEventListener('click', () => {
    current = Math.max(current - 1, 0);
    render();
  });

  let simInterval = null;
  simulateBtn && simulateBtn.addEventListener('click', () => {
    if (simInterval) {
      clearInterval(simInterval);
      simInterval = null;
      simulateBtn.textContent = '模擬自動進度';
      return;
    }
    simulateBtn.textContent = '停止模擬';
    simInterval = setInterval(() => {
      if (current >= steps.length - 1) {
        clearInterval(simInterval);
        simulateBtn.textContent = '模擬自動進度';
        simInterval = null;
        return;
      }
      current += 1;
      render();
    }, 1300);
  });

  // 點擊步驟可直接切換（無障礙）
  steps.forEach((el, idx) => {
    el.addEventListener('click', () => {
      current = idx;
      render();
    });
  });

  render();
});
