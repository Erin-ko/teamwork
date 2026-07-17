/* order-status.js */

document.addEventListener('DOMContentLoaded', () => {
  const steps = Array.from(document.querySelectorAll('.progress-steps .step'));
  const progressFill = document.querySelector('[data-progress-fill]');
  const visualStage = document.getElementById('status-visual-stage');
  const prevBtn = document.getElementById('prev-step');
  const nextBtn = document.getElementById('next-step');
  const simulateBtn = document.getElementById('simulate');

  if (!steps.length || !progressFill || !visualStage) return;

  let currentStep = 0;
  let simInterval = null;

  // Metadata for the 4 steps
  const stepsData = [
    {
      title: "店家已接單",
      desc: "餐廳已收到您的訂單，正準備安排製作。請稍候，美味即將開始準備！",
      eta: "預計送達時間：30-40 分鐘",
      illustration: `
        <svg class="visual-illustration" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 80 h70" stroke-width="3" />
          <rect x="25" y="45" width="50" height="35" rx="2" fill="#e8f5e9" />
          <path d="M20 45 l8 -15 h44 l8 15 Z" fill="#a5d6a7" />
          <path d="M28 30 v15 M36 30 v15 M44 30 v15 M52 30 v15 M60 30 v15 M68 30 v15" />
          <rect x="45" y="60" width="12" height="20" fill="#ffffff" />
          <rect x="32" y="54" width="8" height="8" fill="#ffffff" />
          <rect x="60" y="54" width="8" height="8" fill="#ffffff" />
          <g class="anim-bell">
            <path d="M50 12 a6 6 0 0 1 6 6 v3 H44 v-3 a6 6 0 0 1 6 -6 z" fill="currentColor" />
            <path d="M40 21 h20" />
            <circle cx="50" cy="24" r="1.5" fill="currentColor" />
          </g>
        </svg>
      `
    },
    {
      title: "餐點製作中",
      desc: "主廚正在用心地為您烹調餐點，我們將確保您的食物熱騰騰且衛生美味！",
      eta: "預計送達時間：20-30 分鐘",
      illustration: `
        <svg class="visual-illustration" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path class="anim-steam-1" d="M38 25 c -2 -5, 2 -10, 0 -15" />
          <path class="anim-steam-2" d="M50 25 c -2 -5, 2 -10, 0 -15" />
          <path class="anim-steam-3" d="M62 25 c -2 -5, 2 -10, 0 -15" />
          <g class="anim-pot">
            <path d="M22 40 h56" stroke-width="3.5" />
            <path d="M26 40 v28 a10 10 0 0 0 10 10 h28 a10 10 0 0 0 10 -10 V40" fill="#e8f5e9" />
            <path d="M44 33 h12 v7 H44 z" fill="#a5d6a7" />
            <path d="M22 48 h-5 v8 h5" />
            <path d="M78 48 h5 v8 h5" />
          </g>
          <path d="M30 87 h40" stroke-width="3" stroke="#dee2e6" />
          <path d="M38 87 c 2 -4, 4 -4, 6 0 M48 87 c 2 -4, 4 -4, 6 0 M58 87 c 2 -4, 4 -4, 6 0" stroke="#ff8f00" stroke-width="2" />
        </svg>
      `
    },
    {
      title: "外送途中",
      desc: "外送員已拿到您熱騰騰的餐點，正以最安全且快速的速度騎往您的取餐地點，請保持手機暢通！",
      eta: "預計送達時間：5-10 分鐘",
      illustration: `
        <svg class="visual-illustration" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line class="anim-dash-1" x1="85" y1="30" x2="65" y2="30" stroke="#2e7d61" stroke-width="2" />
          <line class="anim-dash-2" x1="90" y1="50" x2="75" y2="50" stroke="#2e7d61" stroke-width="2" />
          <line class="anim-dash-3" x1="80" y1="70" x2="60" y2="70" stroke="#2e7d61" stroke-width="2" />
          <g class="anim-scooter">
            <rect x="18" y="32" width="16" height="18" rx="2" fill="#a5d6a7" />
            <path d="M22 40 h8 M22 45 h8" stroke-width="1.5" />
            <path d="M34 48 h16 l6 -12 h8" stroke-width="3" />
            <path d="M47 48 l5 12 h10" stroke-width="3" />
            <path d="M64 36 l2 12" stroke-width="3" />
            <g class="anim-wheel">
              <circle cx="28" cy="68" r="9" fill="#ffffff" stroke-width="3" />
              <line x1="28" y1="59" x2="28" y2="77" stroke-width="1.5" />
              <line x1="19" y1="68" x2="37" y2="68" stroke-width="1.5" />
            </g>
            <g class="anim-wheel">
              <circle cx="64" cy="68" r="9" fill="#ffffff" stroke-width="3" />
              <line x1="64" y1="59" x2="64" y2="77" stroke-width="1.5" />
              <line x1="55" y1="68" x2="73" y2="68" stroke-width="1.5" />
            </g>
            <path d="M69 30 l2 6 h-4 Z" fill="currentColor" />
          </g>
        </svg>
      `
    },
    {
      title: "餐點已送達",
      desc: "您的餐點已送達指定取餐點！請下樓或到指定地點取餐，祝您用餐愉快！如果有任何問題，歡迎隨時聯絡會員中心。",
      eta: "送達時間：剛剛",
      illustration: `
        <svg class="visual-illustration" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <ellipse class="anim-ripple" cx="50" cy="80" rx="15" ry="5" stroke="#47b08d" stroke-width="1.5" />
          <ellipse class="anim-ripple" cx="50" cy="80" rx="25" ry="8" stroke="#47b08d" stroke-width="1" style="animation-delay: 0.6s;" />
          <g class="anim-box">
            <path d="M30 60 l20 8 l20 -8 v15 l-20 8 l-20 -8 Z" fill="#e8f5e9" stroke-width="2.5" />
            <path d="M30 60 l20 -8 l20 8" fill="#a5d6a7" />
            <path d="M30 60 l-8 -6 l20 -8 l8 14" fill="#81c784" />
            <path d="M70 60 l8 -6 l-20 -8 l-8 14" fill="#81c784" />
          </g>
          <g class="anim-pin">
            <path d="M50 48 c -8 -8, -8 -18, 0 -24 c 8 6, 8 16, 0 24 Z" fill="#2e7d61" />
            <circle cx="50" cy="34" r="3.5" fill="#ffffff" />
            <path d="M47 34 l2 2 l4 -4" stroke="#2e7d61" stroke-width="1.5" fill="none" />
          </g>
        </svg>
      `
    }
  ];

  function render() {
    // 1. Update step states
    steps.forEach((el, idx) => {
      el.classList.remove('active', 'completed');
      if (idx < currentStep) {
        el.classList.add('completed');
        el.setAttribute('aria-selected', 'false');
      } else if (idx === currentStep) {
        el.classList.add('active');
        el.setAttribute('aria-selected', 'true');
      } else {
        el.setAttribute('aria-selected', 'false');
      }
    });

    // 2. Update progress fill line
    const pct = (currentStep / (steps.length - 1)) * 100;
    progressFill.style.width = `${pct}%`;

    // 3. Update Visual Stage content
    const data = stepsData[currentStep];
    visualStage.innerHTML = `
      <div class="visual-illustration-container">
        ${data.illustration}
      </div>
      <div class="status-detail">
        <h3 class="status-title" data-order-status-text>${data.title}</h3>
        <p class="status-desc">${data.desc}</p>
        <span class="status-eta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          ${data.eta}
        </span>
      </div>
    `;

    // 4. Update button states
    if (prevBtn) prevBtn.disabled = currentStep === 0;
    if (nextBtn) nextBtn.disabled = currentStep === steps.length - 1;

    // Accessibility updates
    const liveRegion = document.getElementById('status-live-region');
    if (liveRegion) {
      liveRegion.textContent = `當前訂單狀態：${data.title}。${data.desc}`;
    }
  }

  // Prev Button
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (simInterval) stopSimulation();
      currentStep = Math.max(currentStep - 1, 0);
      render();
    });
  }

  // Next Button
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (simInterval) stopSimulation();
      currentStep = Math.min(currentStep + 1, steps.length - 1);
      render();
    });
  }

  // Simulation Logic
  function stopSimulation() {
    if (simInterval) {
      clearInterval(simInterval);
      simInterval = null;
      if (simulateBtn) {
        simulateBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          模擬自動進度
        `;
        simulateBtn.classList.remove('status-btn-primary');
        simulateBtn.classList.add('status-btn-accent');
      }
    }
  }

  function startSimulation() {
    if (currentStep >= steps.length - 1) {
      currentStep = 0; // Restart from step 0 if reached end
    }
    
    if (simulateBtn) {
      simulateBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect></svg>
        停止模擬
      `;
      simulateBtn.classList.remove('status-btn-accent');
      simulateBtn.classList.add('status-btn-primary');
    }

    simInterval = setInterval(() => {
      if (currentStep >= steps.length - 1) {
        stopSimulation();
        return;
      }
      currentStep += 1;
      render();
    }, 4000); // 4 seconds per step to allow viewing animations
  }

  if (simulateBtn) {
    simulateBtn.addEventListener('click', () => {
      if (simInterval) {
        stopSimulation();
      } else {
        startSimulation();
      }
    });
  }

  // Interactivity on step clicks
  steps.forEach((el, idx) => {
    el.addEventListener('click', () => {
      if (simInterval) stopSimulation();
      currentStep = idx;
      render();
    });
  });

  // Initial render
  render();
});
