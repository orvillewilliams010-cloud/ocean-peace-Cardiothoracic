/* ==========================================================================
   Ocean Peace Cardiothoracic Surgery - Main JavaScript Application
   ========================================================================== */

// --- Surgical Procedures Dataset ---
const PROCEDURES_DATA = {
  cabg: {
    category: 'cardiac',
    title: 'Coronary Artery Bypass Grafting (CABG)',
    subtitle: 'On-Pump & Off-Pump (Beating Heart) Revascularization',
    summary: 'Restores vital blood flow to cardiac muscle using healthy autologous arterial or venous grafts, bypassing severe coronary artery blockages.',
    duration: '3 - 5 Hours',
    hospitalStay: '4 - 6 Days',
    recoveryTime: '6 - 8 Weeks',
    keyFeatures: [
      'Beating-heart (Off-Pump) capability reducing cardiopulmonary bypass risks',
      'Use of Bilateral Internal Thoracic Arteries (BITA) for long-term graft durability',
      'Minimally Invasive Direct CABG (MIDCAB) options for isolated LAD disease'
    ],
    fullDetails: 'Coronary Artery Bypass Grafting is the gold-standard intervention for complex multi-vessel coronary artery disease. At Ocean Peace Cardiothoracic Surgery, we utilize state-of-the-art arterial conduit harvesting and precision microsurgical anastomoses to maximize bypass patency and long-term survival.'
  },
  valve: {
    category: 'cardiac',
    title: 'Advanced Valve Repair & Replacement',
    subtitle: 'Aortic, Mitral & Tricuspid Surgical Reconstruction',
    summary: 'Surgical restoration or mechanical/bioprosthetic replacement of dysfunctional heart valves to correct regurgitation or severe stenosis.',
    duration: '2.5 - 4 Hours',
    hospitalStay: '3 - 5 Days',
    recoveryTime: '4 - 6 Weeks',
    keyFeatures: [
      'Complex Mitral Valve Repair prioritizing leaflet preservation',
      'Transcatheter & Surgical Aortic Valve Replacement (SAVR/TAVR options)',
      'Aortic Root Reconstruction & Ross Procedure for young adults'
    ],
    fullDetails: 'Whenever clinically feasible, valve repair is prioritized over replacement to maintain native valve geometry and minimize lifelong anticoagulation needs. Our surgical suite features intraoperative 3D Transesophageal Echocardiography (TEE) for immediate repair validation.'
  },
  robotic: {
    category: 'robotic',
    title: 'Minimally Invasive & Robotic Heart Surgery',
    subtitle: 'Port-Access & Computer-Assisted Precision Surgery',
    summary: 'Performed through 2-4 cm mini-thoracotomy ports without cutting the sternum, resulting in dramatically less pain and accelerated recovery.',
    duration: '3 - 4 Hours',
    hospitalStay: '2 - 3 Days',
    recoveryTime: '2 - 3 Weeks',
    keyFeatures: [
      'Zero sternal incision (Sternal Sparing approach)',
      'High-definition 3D endoscopic vision with 7 degrees of instrument motion',
      'Rapid return to full physical activity and driving'
    ],
    fullDetails: 'Robotic Cardiothoracic Surgery represents the pinnacle of modern surgical innovation. Small lateral port incisions allow sub-millimeter surgical maneuvers, minimizing tissue trauma and blood loss while dramatically shortening hospital length of stay.'
  },
  thoracic: {
    category: 'thoracic',
    title: 'VATS & Robotic Thoracic Lobectomy',
    subtitle: 'Video-Assisted Thoracoscopic & Robotic Pulmonary Surgery',
    summary: 'Minimally invasive resection of lung nodules, lobar malignancies, and mediastinal tumors with advanced hilar lymph node dissection.',
    duration: '2 - 3 Hours',
    hospitalStay: '2 - 4 Days',
    recoveryTime: '3 - 4 Weeks',
    keyFeatures: [
      'VATS & DaVinci Robotic lobectomy and segmentectomy',
      'Thymectomy for Myasthenia Gravis & Mediastinal Tumors',
      'Pleural effusion management and decortication'
    ],
    fullDetails: 'Our thoracic program emphasizes early-stage lung cancer eradication using anatomical segmentectomy and lobectomy, preserving healthy lung tissue while achieving complete oncologic clearance.'
  },
  aortic: {
    category: 'cardiac',
    title: 'Complex Aortic Root & Aneurysm Reconstruction',
    subtitle: 'Ascending, Arch & Thoracoabdominal Aortic Surgery',
    summary: 'Comprehensive repair of thoracic aortic aneurysms, acute Type A aortic dissections, and bicuspid aortic valve disease.',
    duration: '4 - 6 Hours',
    hospitalStay: '5 - 7 Days',
    recoveryTime: '8 - 10 Weeks',
    keyFeatures: [
      'Valve-Sparing Aortic Root Replacement (David & Yacoub Procedures)',
      'Hybrid Endovascular Arch Repair (TEVAR)',
      'Deep Hypothermic Circulatory Arrest with Selective Antegrade Cerebral Perfusion'
    ],
    fullDetails: 'Aortic surgical reconstruction requires specialized brain and visceral organ protection protocols. Dr. Williams leads a multi-disciplinary aortic team dedicated to high-acuity aortic reconstruction.'
  }
};

// --- Recovery Tool Calculator Rules ---
const RECOVERY_RULES = {
  cabg: {
    weeks: '6 - 8 Weeks',
    mobility: 'Short 10-15 minute daily walks inside home, gradually extending to 30 mins by Week 3.',
    sternalLimits: 'Strict Sternal Precautions for 8 weeks: Do not lift, push, or pull anything > 10 lbs.',
    driving: 'Cleared for driving after 6 weeks (upon physician sternal stability evaluation).',
    alerts: 'Contact clinic immediately if incision site exhibits warmth, redness, or if sudden weight gain > 3 lbs occurs overnight.'
  },
  valve: {
    weeks: '4 - 6 Weeks',
    mobility: 'Light ambulatory walking. Avoid strenuous upper-body resistance exercises for 6 weeks.',
    sternalLimits: 'Avoid bilateral arm overhead lifting or sudden chest twists.',
    driving: 'Typically cleared at 4 - 6 weeks if off all narcotic medications.',
    alerts: 'Monitor blood pressure & heart rate. Report shortness of breath, palpitation spikes, or fever > 100.4°F.'
  },
  robotic: {
    weeks: '2 - 3 Weeks',
    mobility: 'Normal light daily activities immediately upon hospital discharge.',
    sternalLimits: 'No sternal restrictions! Avoid lifting > 20 lbs for 3 weeks to protect port sites.',
    driving: 'Cleared for driving in 10 - 14 days once off narcotic pain medication.',
    alerts: 'Inspect lateral port sites daily. Report localized drainage or increasing pain.'
  },
  thoracic: {
    weeks: '3 - 4 Weeks',
    mobility: 'Deep breathing exercises with Incentive Spirometer every 2 hours while awake.',
    sternalLimits: 'Avoid heavy pushing or torso torque exercises for 4 weeks.',
    driving: 'Cleared for driving in 2 to 3 weeks.',
    alerts: 'Seek immediate care for sudden chest sharp pain, hemoptysis, or oxygen saturation < 92%.'
  }
};

// --- DOM Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initAnimatedCounters();
  initProcedureTabs();
  initModalListeners();
  initRecoveryCalculator();
  initConsultationForm();
  initSmoothScroll();
});

// 1. Mobile Navigation
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isExpanded = navLinks.classList.contains('active');
      toggleBtn.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when link clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

// 2. Animated Counter Numbers
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.trust-number, .quick-stat-box .value');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const targetText = counter.textContent.trim();
          const match = targetText.match(/([\d,]+)/);
          if (match) {
            const numericValue = parseInt(match[0].replace(/,/g, ''), 10);
            const prefix = targetText.substring(0, match.index);
            const suffix = targetText.substring(match.index + match[0].length);
            
            let start = 0;
            const duration = 2000;
            const stepTime = 30;
            const steps = duration / stepTime;
            const increment = numericValue / steps;

            const timer = setInterval(() => {
              start += increment;
              if (start >= numericValue) {
                counter.textContent = prefix + numericValue.toLocaleString() + suffix;
                clearInterval(timer);
              } else {
                counter.textContent = prefix + Math.floor(start).toLocaleString() + suffix;
              }
            }, stepTime);
          }
        });
      }
    });
  }, { threshold: 0.2 });

  const heroBar = document.querySelector('.hero-trust-bar');
  if (heroBar) observer.observe(heroBar);
}

// 3. Procedure Filter Tabs
function initProcedureTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('.procedure-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.tab;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'slide-in 0.4s ease-out forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 4. Modal Handler
function initModalListeners() {
  const modalOverlay = document.getElementById('procedureModal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');

  if (modalOverlay) {
    // Open Modal Triggers
    document.querySelectorAll('.open-procedure-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const procId = btn.dataset.procedure;
        if (PROCEDURES_DATA[procId]) {
          openProcedureModal(PROCEDURES_DATA[procId]);
        }
      });
    });

    // Close listeners
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
      });
    }

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }
}

function openProcedureModal(data) {
  const modalOverlay = document.getElementById('procedureModal');
  const modalBody = document.getElementById('modalBody');

  if (modalOverlay && modalBody) {
    modalBody.innerHTML = `
      <div class="procedure-badge" style="display:inline-block; padding:0.3rem 0.8rem; background:rgba(0,242,254,0.1); border:1px solid var(--border-accent); border-radius:999px; color:var(--primary-cyan); font-size:0.8rem; font-weight:700; text-transform:uppercase; margin-bottom:1rem;">${data.subtitle}</div>
      <h2 style="font-size: 1.8rem; margin-bottom: 0.75rem; color: #fff;">${data.title}</h2>
      <p style="color: var(--text-muted); font-size: 1rem; margin-bottom: 1.5rem; line-height:1.6;">${data.fullDetails}</p>
      
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; background: rgba(4,13,26,0.6); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-light); margin-bottom: 1.5rem;">
        <div>
          <div style="font-size:0.75rem; color:var(--text-dim); text-transform:uppercase;">Surgery Duration</div>
          <div style="font-weight:700; color:var(--primary-cyan); font-size:0.95rem;">${data.duration}</div>
        </div>
        <div>
          <div style="font-size:0.75rem; color:var(--text-dim); text-transform:uppercase;">Hospital Stay</div>
          <div style="font-weight:700; color:var(--teal-accent); font-size:0.95rem;">${data.hospitalStay}</div>
        </div>
        <div>
          <div style="font-size:0.75rem; color:var(--text-dim); text-transform:uppercase;">Full Recovery</div>
          <div style="font-weight:700; color:#fff; font-size:0.95rem;">${data.recoveryTime}</div>
        </div>
      </div>

      <h4 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: #fff;">Key Surgical Advantages</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 2rem;">
        ${data.keyFeatures.map(feat => `
          <li style="display: flex; align-items: flex-start; gap: 0.6rem; color: var(--text-muted); font-size: 0.925rem;">
            <span style="color: var(--teal-accent); font-weight:700;">✓</span> ${feat}
          </li>
        `).join('')}
      </ul>

      <div style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button class="btn btn-secondary close-modal-btn">Close Details</button>
        <a href="#consultation" class="btn btn-primary close-modal-btn" onclick="document.getElementById('procedureModal').classList.remove('active')">Schedule Consultation</a>
      </div>
    `;

    modalOverlay.classList.add('active');

    modalBody.querySelectorAll('.close-modal-btn').forEach(btn => {
      btn.addEventListener('click', () => modalOverlay.classList.remove('active'));
    });
  }
}

// 5. Patient Recovery Calculator
function initRecoveryCalculator() {
  const selectElem = document.getElementById('calcProcedureSelect');
  const resultsContainer = document.getElementById('recoveryResultsContainer');

  if (selectElem && resultsContainer) {
    const updateCalculator = () => {
      const procKey = selectElem.value;
      const data = RECOVERY_RULES[procKey] || RECOVERY_RULES.cabg;

      resultsContainer.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid var(--border-light); padding-bottom:0.75rem;">
          <h4 style="font-size:1.1rem; color:#fff;">Estimated Recovery Phase</h4>
          <span style="background:rgba(20,184,166,0.15); border:1px solid var(--border-teal); color:var(--teal-accent); padding:0.25rem 0.75rem; border-radius:99px; font-size:0.85rem; font-weight:700;">${data.weeks}</span>
        </div>

        <div class="recovery-timeline">
          <div class="timeline-step">
            <div class="step-num">1</div>
            <div class="step-content">
              <h5>Physical Mobility & Exercise</h5>
              <p>${data.mobility}</p>
            </div>
          </div>
          <div class="timeline-step">
            <div class="step-num">2</div>
            <div class="step-content">
              <h5>Incision & Lifting Restrictions</h5>
              <p>${data.sternalLimits}</p>
            </div>
          </div>
          <div class="timeline-step">
            <div class="step-num">3</div>
            <div class="step-content">
              <h5>Driving & Travel Clearance</h5>
              <p>${data.driving}</p>
            </div>
          </div>
        </div>

        <div style="margin-top:1.5rem; background:rgba(255,77,77,0.1); border:1px solid rgba(255,77,77,0.3); border-radius:var(--radius-md); padding:1rem; display:flex; gap:0.75rem; align-items:flex-start;">
          <span style="color:var(--pulse-red); font-weight:800;">⚠️</span>
          <div>
            <strong style="color:#fff; font-size:0.85rem;">Medical Watch Flags:</strong>
            <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.2rem;">${data.alerts}</p>
          </div>
        </div>
      `;
    };

    selectElem.addEventListener('change', updateCalculator);
    updateCalculator(); // Initialize default
  }
}

// 6. Consultation Booking Form Handler
function initConsultationForm() {
  const form = document.getElementById('consultationForm');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const name = formData.get('fullName') || 'Patient';
      const procedure = formData.get('procedureType') || 'General Consultation';
      const refNumber = 'OP-' + Math.floor(100000 + Math.random() * 900000);

      // Show Toast Notification
      showToast(`Request Received! Reference: ${refNumber}`);

      // Reset form
      form.reset();

      // Show confirmation alert modal
      const modalOverlay = document.getElementById('procedureModal');
      const modalBody = document.getElementById('modalBody');

      if (modalOverlay && modalBody) {
        modalBody.innerHTML = `
          <div style="text-align: center; padding: 1rem 0;">
            <div style="width: 70px; height: 70px; background: rgba(34,197,94,0.15); border: 2px solid #22c55e; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: #22c55e; font-size: 2rem;">✓</div>
            <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem; color: #fff;">Consultation Request Submitted</h2>
            <p style="color: var(--teal-accent); font-weight: 700; font-size: 1.1rem; margin-bottom: 1.5rem;">Confirmation Reference: ${refNumber}</p>
            <p style="color: var(--text-muted); font-size: 0.95rem; max-width: 500px; margin: 0 auto 2rem; line-height: 1.6;">
              Thank you, <strong>${name}</strong>. Our clinical triage coordinator at Ocean Peace Cardiothoracic Surgery has received your request regarding <strong>${procedure}</strong> and will contact you within 24 hours to finalize your appointment time.
            </p>
            <button class="btn btn-primary" onclick="document.getElementById('procedureModal').classList.remove('active')">Return to Website</button>
          </div>
        `;
        modalOverlay.classList.add('active');
      }
    });
  }
}

// 7. Toast Notification Utility
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color: var(--primary-cyan); font-size: 1.2rem;">ℹ️</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// 8. Smooth Internal Links Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}
