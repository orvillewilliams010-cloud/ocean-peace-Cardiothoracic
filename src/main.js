/* ==========================================================================
   Ocean Peace Cardiothoracic Surgery - Main Interactive JavaScript Application
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

// --- Triage Wizard Options ---
const TRIAGE_DATA = {
  conditions: [
    { id: 'coronary', title: 'Coronary Artery Blockage (Angina / MI)', desc: 'Chest pain, shortness of breath, or abnormal cardiac catheterization report.' },
    { id: 'valve_issue', title: 'Heart Valve Murmur / Stenosis / Regurgitation', desc: 'Leaky or tight Mitral, Aortic, or Tricuspid valve diagnosed on Echocardiogram.' },
    { id: 'aortic_aneurysm', title: 'Thoracic Aortic Aneurysm or Dissection', desc: 'Enlarged ascending aorta or structural dilation detected on CT scan.' },
    { id: 'lung_nodule', title: 'Pulmonary Nodule / Lung Mass', desc: 'Abnormal X-Ray or CT chest scan requiring diagnostic lobectomy or biopsy.' }
  ]
};

// --- DOM Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initAnimatedCounters();
  initBpmMonitor();
  initTriageWizard();
  initProcedureTabs();
  initModalListeners();
  initRecoveryCalculator();
  initConsultationForm();
  initPdfDownload();
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

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

// 2. Animated Counter Numbers
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.trust-number, .stat-pill .num');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const targetText = counter.textContent.trim();
          const match = targetText.match(/([\d,]+(\.\d+)?)/);
          if (match) {
            const numericValue = parseFloat(match[0].replace(/,/g, ''));
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
                counter.textContent = prefix + (numericValue % 1 !== 0 ? numericValue.toFixed(1) : numericValue.toLocaleString()) + suffix;
                clearInterval(timer);
              } else {
                counter.textContent = prefix + (numericValue % 1 !== 0 ? start.toFixed(1) : Math.floor(start).toLocaleString()) + suffix;
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

// 3. Live BPM Heart Rate Monitor Simulator
function initBpmMonitor() {
  const bpmElem = document.getElementById('bpmValue');
  if (bpmElem) {
    setInterval(() => {
      const randomBpm = Math.floor(68 + Math.random() * 8);
      bpmElem.textContent = randomBpm;
    }, 2500);
  }
}

// 4. Interactive Candidate Triage Wizard
function initTriageWizard() {
  const container = document.getElementById('triageStepContent');
  if (!container) return;

  let currentStep = 1;
  let selectedCondition = null;

  const renderStep = () => {
    if (currentStep === 1) {
      container.innerHTML = `
        <h3 style="font-size:1.3rem; margin-bottom:1.5rem; color:#fff;">Select Your Referred Diagnosis or Primary Symptom:</h3>
        <div class="triage-options-grid">
          ${TRIAGE_DATA.conditions.map(c => `
            <div class="triage-option-card ${selectedCondition === c.id ? 'selected' : ''}" data-id="${c.id}">
              <h4>${c.title}</h4>
              <p>${c.desc}</p>
            </div>
          `).join('')}
        </div>
      `;

      container.querySelectorAll('.triage-option-card').forEach(card => {
        card.addEventListener('click', () => {
          selectedCondition = card.dataset.id;
          currentStep = 2;
          updateStepButtons();
          renderStep();
        });
      });
    } else if (currentStep === 2) {
      container.innerHTML = `
        <h3 style="font-size:1.3rem; margin-bottom:1rem; color:#fff;">Have you had prior open heart surgery or sternotomy?</h3>
        <p style="color:var(--text-muted); margin-bottom:1.5rem;">Sternal-sparing robotic access is highly recommended for patients seeking to avoid re-sternotomy risks.</p>
        <div style="display:flex; gap:1.5rem;">
          <button class="btn btn-secondary btn-lg" id="priorNo">No Prior Surgery (First-time)</button>
          <button class="btn btn-secondary btn-lg" id="priorYes">Yes, Prior Heart Surgery</button>
        </div>
      `;

      document.getElementById('priorNo').addEventListener('click', () => {
        currentStep = 3;
        updateStepButtons();
        renderStep();
      });

      document.getElementById('priorYes').addEventListener('click', () => {
        currentStep = 3;
        updateStepButtons();
        renderStep();
      });
    } else if (currentStep === 3) {
      let recTitle = 'Robotic Sternal-Sparing Candidate';
      let recDesc = 'Based on your selection, you are an excellent candidate for minimally invasive port-access evaluation by Dr. Williams.';

      if (selectedCondition === 'coronary') {
        recTitle = 'Off-Pump Beating-Heart CABG Specialist Evaluation';
        recDesc = 'Our off-pump bypass program eliminates the heart-lung machine for optimal brain & renal protection.';
      } else if (selectedCondition === 'aortic_aneurysm') {
        recTitle = 'Valve-Sparing Aortic Reconstruction Consultation';
        recDesc = 'Complex aortic root repair preserving your native valve leaflets.';
      }

      container.innerHTML = `
        <div style="background:rgba(0,242,254,0.06); border:1px solid var(--border-accent); border-radius:var(--radius-lg); padding:2rem;">
          <span style="background:rgba(16,185,129,0.2); color:#4ade80; padding:0.3rem 0.8rem; border-radius:99px; font-weight:700; font-size:0.8rem; text-transform:uppercase;">Candidate Assessment Complete</span>
          <h3 style="font-size:1.6rem; color:#fff; margin:1rem 0 0.5rem;">${recTitle}</h3>
          <p style="color:var(--text-muted); font-size:1rem; margin-bottom:1.5rem;">${recDesc}</p>
          <div style="display:flex; gap:1rem;">
            <a href="#consultation" class="btn btn-primary btn-lg">Schedule Priority Evaluation →</a>
            <button class="btn btn-outline" id="restartWizard">Restart Assessment</button>
          </div>
        </div>
      `;

      document.getElementById('restartWizard')?.addEventListener('click', () => {
        currentStep = 1;
        selectedCondition = null;
        updateStepButtons();
        renderStep();
      });
    }
  };

  const updateStepButtons = () => {
    document.querySelectorAll('.triage-step-btn').forEach(btn => {
      const step = parseInt(btn.dataset.step, 10);
      btn.classList.toggle('active', step === currentStep);
    });
  };

  document.querySelectorAll('.triage-step-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentStep = parseInt(btn.dataset.step, 10);
      updateStepButtons();
      renderStep();
    });
  });

  renderStep();
}

// 5. Procedure Filter Tabs
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

// 6. Modal Handler
function initModalListeners() {
  const modalOverlay = document.getElementById('procedureModal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');

  if (modalOverlay) {
    document.querySelectorAll('.open-procedure-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const procId = btn.dataset.procedure;
        if (PROCEDURES_DATA[procId]) {
          openProcedureModal(PROCEDURES_DATA[procId]);
        }
      });
    });

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
      <div class="procedure-badge" style="display:inline-block; padding:0.35rem 0.9rem; background:rgba(0,242,254,0.12); border:1px solid var(--border-accent); border-radius:999px; color:var(--primary-cyan); font-size:0.8rem; font-weight:800; text-transform:uppercase; margin-bottom:1rem;">${data.subtitle}</div>
      <h2 style="font-size: 1.85rem; margin-bottom: 0.85rem; color: #fff;">${data.title}</h2>
      <p style="color: var(--text-muted); font-size: 1.025rem; margin-bottom: 1.5rem; line-height:1.65;">${data.fullDetails}</p>
      
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; background: rgba(3,10,22,0.8); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-light); margin-bottom: 1.5rem;">
        <div>
          <div style="font-size:0.75rem; color:var(--text-dim); text-transform:uppercase; font-weight:700;">Surgery Duration</div>
          <div style="font-weight:800; color:var(--primary-cyan); font-size:1rem; margin-top:0.2rem;">${data.duration}</div>
        </div>
        <div>
          <div style="font-size:0.75rem; color:var(--text-dim); text-transform:uppercase; font-weight:700;">Hospital Stay</div>
          <div style="font-weight:800; color:var(--teal-accent); font-size:1rem; margin-top:0.2rem;">${data.hospitalStay}</div>
        </div>
        <div>
          <div style="font-size:0.75rem; color:var(--text-dim); text-transform:uppercase; font-weight:700;">Full Recovery</div>
          <div style="font-weight:800; color:#fff; font-size:1rem; margin-top:0.2rem;">${data.recoveryTime}</div>
        </div>
      </div>

      <h4 style="font-size: 1.15rem; margin-bottom: 0.85rem; color: #fff;">Key Surgical Advantages</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 2rem;">
        ${data.keyFeatures.map(feat => `
          <li style="display: flex; align-items: flex-start; gap: 0.65rem; color: var(--text-muted); font-size: 0.95rem;">
            <span style="color: var(--teal-accent); font-weight:800;">✓</span> ${feat}
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

// 7. Patient Recovery Calculator
function initRecoveryCalculator() {
  const selectElem = document.getElementById('calcProcedureSelect');
  const resultsContainer = document.getElementById('recoveryResultsContainer');

  if (selectElem && resultsContainer) {
    const updateCalculator = () => {
      const procKey = selectElem.value;
      const data = RECOVERY_RULES[procKey] || RECOVERY_RULES.cabg;

      resultsContainer.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem; border-bottom:1px solid var(--border-light); padding-bottom:0.85rem;">
          <h4 style="font-size:1.15rem; color:#fff;">Estimated Recovery Horizon</h4>
          <span style="background:rgba(20,184,166,0.18); border:1px solid var(--border-teal); color:var(--teal-accent); padding:0.3rem 0.85rem; border-radius:99px; font-size:0.85rem; font-weight:800;">${data.weeks}</span>
        </div>

        <div class="recovery-timeline">
          <div class="timeline-step">
            <div class="step-num">1</div>
            <div class="step-content">
              <h5>Physical Mobility & Exercise Target</h5>
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

        <div style="margin-top:1.75rem; background:rgba(239,68,68,0.12); border:1px solid rgba(239,68,68,0.35); border-radius:var(--radius-md); padding:1.15rem; display:flex; gap:0.85rem; align-items:flex-start;">
          <span style="color:var(--pulse-red); font-weight:800; font-size:1.1rem;">⚠️</span>
          <div>
            <strong style="color:#fff; font-size:0.875rem;">Medical Watch Flags:</strong>
            <p style="font-size:0.825rem; color:var(--text-muted); margin-top:0.25rem;">${data.alerts}</p>
          </div>
        </div>
      `;
    };

    selectElem.addEventListener('change', updateCalculator);
    updateCalculator();
  }
}

// 8. Consultation Booking Form Handler
function initConsultationForm() {
  const form = document.getElementById('consultationForm');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const name = formData.get('fullName') || 'Patient';
      const procedure = formData.get('procedureType') || 'General Consultation';
      const refNumber = 'OP-' + Math.floor(100000 + Math.random() * 900000);

      showToast(`Request Received! Reference: ${refNumber}`);
      form.reset();

      const modalOverlay = document.getElementById('procedureModal');
      const modalBody = document.getElementById('modalBody');

      if (modalOverlay && modalBody) {
        modalBody.innerHTML = `
          <div style="text-align: center; padding: 1rem 0;">
            <div style="width: 76px; height: 76px; background: rgba(16,185,129,0.18); border: 2px solid var(--emerald-green); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: var(--emerald-green); font-size: 2.2rem; font-weight:800;">✓</div>
            <h2 style="font-size: 1.9rem; margin-bottom: 0.5rem; color: #fff;">Consultation Request Received</h2>
            <p style="color: var(--teal-accent); font-weight: 800; font-size: 1.15rem; margin-bottom: 1.5rem;">Confirmation Reference: ${refNumber}</p>
            <p style="color: var(--text-muted); font-size: 1rem; max-width: 520px; margin: 0 auto 2.25rem; line-height: 1.65;">
              Thank you, <strong>${name}</strong>. Our clinical triage coordinator at Ocean Peace Cardiothoracic Surgery has received your request regarding <strong>${procedure}</strong> and will contact you within 24 hours to finalize your appointment time.
            </p>
            <button class="btn btn-primary btn-lg" onclick="document.getElementById('procedureModal').classList.remove('active')">Return to Website</button>
          </div>
        `;
        modalOverlay.classList.add('active');
      }
    });
  }
}

// 9. PDF Packet Download Handler
function initPdfDownload() {
  const downloadBtn = document.getElementById('downloadPdfBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Generating Printable Pre-Op Patient Packet...');
      setTimeout(() => {
        showToast('Download complete: Ocean_Peace_Patient_Preparation_Guide.pdf');
      }, 1500);
    });
  }
}

// 10. Toast Notification Utility
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
    toast.style.transform = 'translateX(-100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// 11. Smooth Internal Links Scroll
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
