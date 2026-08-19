document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. 導覽列滾動狀態
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // 2. 行動版選單開關
  toggle?.addEventListener('click', () => {
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-label', open ? '關閉導覽選單' : '開啟導覽選單');
    if (open) requestAnimationFrame(() => nav.querySelector('a')?.focus());
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav?.classList.contains('open')) {
      nav.classList.remove('open');
      toggle?.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
      toggle?.setAttribute('aria-label', '開啟導覽選單');
      document.body.classList.remove('menu-open');
      toggle?.focus();
    }
  });

  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }));

  // 站內錨點維持平滑捲動，歷史返回則由瀏覽器立即還原原位置。
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      const scrollBehavior = reduceMotion ? 'auto' : 'smooth';
      if (hash === '#top') window.scrollTo({ top: 0, left: 0, behavior: scrollBehavior });
      else target.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
      if (window.location.hash !== hash) history.pushState(null, '', hash);
    });
  });

  // 3. 英雄首頁背景輪播 (Hero Background Slideshow)
  const hero = document.querySelector('.hero-media');
  const heroImages = [
    'background-image/dadu road.png',
    'background-image/mrt tucheng.png',
    'background-image/weiwuying.png'
  ];
  let heroIndex = 0;
  if (hero) {
    hero.style.setProperty('--hero-image', `url("${heroImages[0]}")`);
    if (!reduceMotion) {
      setInterval(() => {
        heroIndex = (heroIndex + 1) % heroImages.length;
        hero.style.setProperty('--hero-image', `url("${heroImages[heroIndex]}")`);
        hero.animate([{ opacity: 0.6 }, { opacity: 1 }], { duration: 800, easing: 'ease-in-out' });
      }, 6000);
    }
  }

  // 4. 品牌轉場遮罩 (Brand Reveal Transition)
  const brandReveal = document.querySelector('.brand-reveal');
  let brandFrame = 0;
  const updateBrandReveal = () => {
    if (!brandReveal || reduceMotion) return;
    const rect = brandReveal.getBoundingClientRect();
    const distance = Math.max(1, brandReveal.offsetHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, -rect.top / distance));
    const eased = 1 - Math.pow(1 - progress, 3);
    const maskOpacity = Math.min(1, progress / 0.22);
    const wordScale = 1 + 27 * (1 - eased);
    const copyOpacity = Math.min(1, Math.max(0, (progress - 0.72) / 0.2));
    brandReveal.style.setProperty('--brand-mask-opacity', maskOpacity.toFixed(3));
    brandReveal.style.setProperty('--brand-word-scale', wordScale.toFixed(3));
    brandReveal.style.setProperty('--brand-copy-opacity', copyOpacity.toFixed(3));
    brandFrame = 0;
  };
  const requestBrandReveal = () => {
    if (!brandFrame) brandFrame = requestAnimationFrame(updateBrandReveal);
  };
  updateBrandReveal();
  window.addEventListener('scroll', requestBrandReveal, { passive: true });
  window.addEventListener('resize', requestBrandReveal, { passive: true });

  const brandVideo = brandReveal?.querySelector('.brand-reveal-video');
  if (brandVideo) {
    let brandVideoVisible = false;
    const syncBrandVideo = () => {
      if (!reduceMotion && brandVideoVisible && !document.hidden) {
        brandVideo.play().catch(() => {});
      } else {
        brandVideo.pause();
      }
    };
    brandVideo.pause();
    const brandVideoObserver = new IntersectionObserver(entries => {
      brandVideoVisible = entries[0].isIntersecting;
      syncBrandVideo();
    }, { rootMargin: '160px 0px', threshold: 0 });
    brandVideoObserver.observe(brandReveal);
    document.addEventListener('visibilitychange', syncBrandVideo);
  }

  // 5. 滾動進場淡入效果 (Scroll Reveal Observer)
  const reveals = document.querySelectorAll('.reveal');
  if (reduceMotion) {
    reveals.forEach(el => el.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px' });
    reveals.forEach(el => observer.observe(el));
  }

  // 6. 電信訊號波形背景動畫 (Canvas Wave Animation)
  const waveCanvas = document.getElementById('contact-wave-canvas');
  const contactSection = document.getElementById('contact');
  if (waveCanvas && contactSection && !reduceMotion) {
    const context = waveCanvas.getContext('2d');
    let waveWidth = 0;
    let waveHeight = 0;
    let waveFrame = 0;
    let waveStart = 0;
    let lastWaveRender = 0;
    let wavesVisible = false;
    const waveFrameInterval = 1000 / 30; // 30fps

    const resizeWaves = () => {
      const rect = contactSection.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1);
      waveWidth = Math.max(1, rect.width);
      waveHeight = Math.max(1, rect.height);
      waveCanvas.width = Math.round(waveWidth * ratio);
      waveCanvas.height = Math.round(waveHeight * ratio);
      waveCanvas.style.width = `${waveWidth}px`;
      waveCanvas.style.height = `${waveHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const drawWave = (time, config) => {
      const centerY = waveHeight * config.y;
      const gradient = context.createLinearGradient(0, 0, waveWidth, 0);
      gradient.addColorStop(0, 'rgba(0,163,224,0)');
      gradient.addColorStop(0.24, config.color);
      gradient.addColorStop(0.72, config.color);
      gradient.addColorStop(1, 'rgba(100,255,218,0)');
      context.beginPath();
      for (let x = -20; x <= waveWidth + 20; x += 7) {
        const progress = Math.min(1, Math.max(0, x / waveWidth));
        const envelope = Math.sin(Math.PI * progress);
        const primary = Math.sin(x * config.frequency + time * config.speed);
        const secondary = Math.sin(x * config.frequency * 0.42 - time * config.speed * 0.63);
        const y = centerY + (primary * 0.72 + secondary * 0.28) * config.amplitude * envelope;
        if (x === -20) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.strokeStyle = gradient;
      context.lineWidth = config.lineWidth;
      context.shadowColor = config.glow;
      context.shadowBlur = config.blur;
      context.stroke();
    };

    const drawWaveNodes = time => {
      const count = waveWidth < 768 ? 7 : 13;
      for (let index = 0; index < count; index += 1) {
        const progress = ((index / count) + ((time * 0.000025) % 1)) % 1;
        const x = progress * waveWidth;
        const y = waveHeight * 0.52 + Math.sin(progress * Math.PI * 4 + time * 0.00055) * waveHeight * 0.13;
        const radius = 2.2 + Math.sin(time * 0.002 + index) * 0.75;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(100,255,218,.95)';
        context.shadowColor = '#64ffda';
        context.shadowBlur = 8;
        context.fill();
      }
      context.shadowBlur = 0;
    };

    const renderWaves = timestamp => {
      if (!wavesVisible || document.hidden) {
        waveFrame = 0;
        return;
      }
      if (lastWaveRender && timestamp - lastWaveRender < waveFrameInterval) {
        waveFrame = requestAnimationFrame(renderWaves);
        return;
      }
      lastWaveRender = timestamp;
      if (!waveStart) waveStart = timestamp;
      const time = timestamp - waveStart;
      context.clearRect(0, 0, waveWidth, waveHeight);
      context.globalCompositeOperation = 'lighter';
      drawWave(time, { y: 0.36, amplitude: waveHeight * 0.13, frequency: 0.010, speed: 0.0012, lineWidth: 1.8, color: 'rgba(0,183,255,.76)', glow: '#00b7ff', blur: 10 });
      drawWave(time, { y: 0.52, amplitude: waveHeight * 0.20, frequency: 0.014, speed: -0.0010, lineWidth: 2.6, color: 'rgba(100,255,218,.84)', glow: '#64ffda', blur: 14 });
      drawWave(time, { y: 0.68, amplitude: waveHeight * 0.11, frequency: 0.019, speed: 0.00075, lineWidth: 1.5, color: 'rgba(91,137,255,.68)', glow: '#5b89ff', blur: 10 });
      drawWaveNodes(time);
      context.globalCompositeOperation = 'source-over';
      waveFrame = wavesVisible ? requestAnimationFrame(renderWaves) : 0;
    };

    const waveObserver = new IntersectionObserver(entries => {
      wavesVisible = entries[0].isIntersecting;
      if (wavesVisible && !document.hidden && !waveFrame) {
        lastWaveRender = 0;
        waveFrame = requestAnimationFrame(renderWaves);
      }
      if (!wavesVisible && waveFrame) {
        cancelAnimationFrame(waveFrame);
        waveFrame = 0;
      }
    }, { threshold: 0.05 });

    const syncWaveVisibility = () => {
      if (document.hidden && waveFrame) {
        cancelAnimationFrame(waveFrame);
        waveFrame = 0;
      } else if (!document.hidden && wavesVisible && !waveFrame) {
        lastWaveRender = 0;
        waveFrame = requestAnimationFrame(renderWaves);
      }
    };

    resizeWaves();
    waveObserver.observe(contactSection);
    window.addEventListener('resize', resizeWaves, { passive: true });
    document.addEventListener('visibilitychange', syncWaveVisibility);
  }

  // 7. 詢價與現場會勘對話框 (Contact Dialog & Multi-modal triggers)
  const contactDialog = document.getElementById('contact-dialog');
  const contactModalTriggers = document.querySelectorAll('.contact-modal-open');
  const contactForm = document.getElementById('contact-request-form');
  const contactFormView = document.getElementById('contact-form-view');
  const contactReviewView = document.getElementById('contact-review-view');
  const contactReviewList = document.getElementById('contact-review-list');
  const contactReviewEdit = document.getElementById('contact-review-edit');
  const contactNetlifySubmit = document.getElementById('contact-netlify-submit');
  const contactSubmitStatus = document.getElementById('contact-submit-status');
  const contactSuccessView = document.getElementById('contact-success-view');
  const contactServiceError = document.getElementById('contact-service-error');
  const contactChannelError = document.getElementById('contact-channel-error');

  if (contactDialog && contactForm) {
    const serviceInputs = [...contactForm.querySelectorAll('input[name="services"]')];

    const resetContactDialog = () => {
      contactForm.reset();
      contactFormView.hidden = false;
      contactReviewView.hidden = true;
      contactSuccessView.hidden = true;
      contactServiceError.hidden = true;
      contactChannelError.hidden = true;
      contactReviewList.replaceChildren();
      contactSubmitStatus.textContent = '';
      contactNetlifySubmit.disabled = false;
      contactNetlifySubmit.innerHTML = '確認並送出 <span>→</span>';
      document.body.classList.remove('contact-dialog-open');
    };

    const openContactDialog = () => {
      contactDialog.showModal();
      document.body.classList.add('contact-dialog-open');
      // 如果手機選單是開著的，自動關閉
      nav?.classList.remove('open');
      toggle?.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      requestAnimationFrame(() => serviceInputs[0]?.focus());
    };

    const closeContactDialog = () => contactDialog.close();

    contactModalTriggers.forEach(trigger => {
      trigger.addEventListener('click', openContactDialog);
    });

    contactDialog.querySelectorAll('[data-dialog-close]').forEach(button => {
      button.addEventListener('click', closeContactDialog);
    });

    contactDialog.addEventListener('click', event => {
      if (event.target === contactDialog) closeContactDialog();
    });

    contactDialog.addEventListener('close', resetContactDialog);

    serviceInputs.forEach(input => input.addEventListener('change', () => {
      if (serviceInputs.some(service => service.checked)) contactServiceError.hidden = true;
    }));

    ['contact-email', 'contact-phone'].forEach(id => document.getElementById(id)?.addEventListener('input', () => {
      if (contactForm.email.value.trim() || contactForm.phone.value.trim()) contactChannelError.hidden = true;
    }));

    contactForm.addEventListener('submit', event => {
      event.preventDefault();
      const selectedServices = serviceInputs.filter(input => input.checked).map(input => input.value);
      if (!selectedServices.length) {
        contactServiceError.hidden = false;
        serviceInputs[0]?.focus();
        return;
      }
      if (!contactForm.email.value.trim() && !contactForm.phone.value.trim()) {
        contactChannelError.hidden = false;
        contactForm.email.focus();
        return;
      }
      if (!contactForm.reportValidity()) return;

      const formData = new FormData(contactForm);
      const details = [
        ['需求項目', selectedServices.join('、')],
        ['姓名／稱謂', formData.get('name')],
        ['公司名稱', formData.get('company') || '未提供'],
        ['電子信箱', formData.get('email')],
        ['聯絡電話', formData.get('phone')],
        ['場域地點', formData.get('location') || '未提供'],
        ['方便聯絡時段', formData.get('contactTime')],
        ['需求說明', formData.get('message')]
      ];
      contactReviewList.replaceChildren();
      details.forEach(([label, value]) => {
        const term = document.createElement('dt');
        const description = document.createElement('dd');
        term.textContent = label;
        description.textContent = String(value);
        contactReviewList.append(term, description);
      });

      contactFormView.hidden = true;
      contactReviewView.hidden = false;
      contactDialog.scrollTop = 0;
      contactNetlifySubmit.focus();
    });

    contactNetlifySubmit.addEventListener('click', async () => {
      if (window.location.protocol === 'file:') {
        contactSubmitStatus.textContent = '本機預覽模式下不會送出資料；部署至 Netlify 後即可進行正式收單測試。';
        return;
      }
      contactSubmitStatus.textContent = '資料送出中，請稍候…';
      contactNetlifySubmit.disabled = true;
      contactNetlifySubmit.textContent = '送出中…';
      try {
        const submissionData = new FormData(contactForm);
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(submissionData).toString()
        });
        if (!response.ok) throw new Error(`Netlify form submission failed: ${response.status}`);
        contactReviewView.hidden = true;
        contactSuccessView.hidden = false;
        contactDialog.scrollTop = 0;
        contactSuccessView.querySelector('button')?.focus();
      } catch (error) {
        console.error(error);
        contactSubmitStatus.textContent = '目前無法送出，請稍後再試或直接來信 service@gaushyang.com.tw。';
      } finally {
        contactNetlifySubmit.disabled = false;
        contactNetlifySubmit.innerHTML = '確認並送出 <span>→</span>';
      }
    });

    contactReviewEdit.addEventListener('click', () => {
      contactReviewView.hidden = true;
      contactFormView.hidden = false;
      contactDialog.scrollTop = 0;
      serviceInputs[0]?.focus();
    });
  }

  // 8. 專案照片瀏覽器
  document.querySelectorAll('[data-gallery-dialog]').forEach(galleryDialog => {
    const galleryImage = galleryDialog.querySelector('[data-gallery-image]');
    const galleryCaption = galleryDialog.querySelector('[data-gallery-caption]');
    const galleryCount = galleryDialog.querySelector('[data-gallery-count]');
    const galleryThumbnails = [...galleryDialog.querySelectorAll('[data-gallery-thumbnail]')];
    const galleryTriggers = document.querySelectorAll(`[data-gallery-target="${galleryDialog.id}"]`);
    if (!galleryImage || !galleryCaption || !galleryCount || !galleryThumbnails.length) return;

    let galleryIndex = 0;
    let galleryTrigger = null;

    const showGalleryImage = index => {
      galleryIndex = (index + galleryThumbnails.length) % galleryThumbnails.length;
      const thumbnail = galleryThumbnails[galleryIndex];
      galleryImage.src = thumbnail.dataset.full;
      galleryImage.alt = thumbnail.dataset.alt;
      galleryCaption.textContent = thumbnail.dataset.caption;
      galleryCount.textContent = `${galleryIndex + 1} / ${galleryThumbnails.length}`;
      galleryThumbnails.forEach((item, itemIndex) => {
        const isCurrent = itemIndex === galleryIndex;
        item.classList.toggle('is-current', isCurrent);
        if (isCurrent) item.setAttribute('aria-current', 'true');
        else item.removeAttribute('aria-current');
      });
    };

    const closeGallery = () => galleryDialog.close();
    galleryTriggers.forEach(trigger => trigger.addEventListener('click', () => {
      galleryTrigger = trigger;
      showGalleryImage(0);
      galleryDialog.showModal();
      document.body.classList.add('gallery-dialog-open');
      requestAnimationFrame(() => galleryDialog.querySelector('[data-gallery-close]')?.focus());
    }));

    galleryDialog.querySelector('[data-gallery-close]')?.addEventListener('click', closeGallery);
    galleryDialog.querySelector('[data-gallery-previous]')?.addEventListener('click', () => showGalleryImage(galleryIndex - 1));
    galleryDialog.querySelector('[data-gallery-next]')?.addEventListener('click', () => showGalleryImage(galleryIndex + 1));
    galleryThumbnails.forEach((thumbnail, index) => thumbnail.addEventListener('click', () => showGalleryImage(index)));
    galleryDialog.addEventListener('click', event => {
      if (event.target === galleryDialog) closeGallery();
    });
    galleryDialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') showGalleryImage(galleryIndex - 1);
      if (event.key === 'ArrowRight') showGalleryImage(galleryIndex + 1);
      if (event.key === 'Home') showGalleryImage(0);
      if (event.key === 'End') showGalleryImage(galleryThumbnails.length - 1);
    });
    galleryDialog.addEventListener('close', () => {
      document.body.classList.remove('gallery-dialog-open');
      galleryTrigger?.focus();
    });
  });

  // 9. 隱私權政策與個資告知彈窗 (Privacy Dialog)
  const privacyDialog = document.getElementById('privacy-dialog');
  const openPrivacyLink = document.getElementById('open-privacy-link');
  const footerPrivacyBtn = document.getElementById('footer-privacy-btn');

  if (privacyDialog) {
    const openPrivacy = (e) => {
      if (e) e.preventDefault();
      privacyDialog.showModal();
      document.body.classList.add('privacy-dialog-open');
    };
    const closePrivacy = () => {
      privacyDialog.close();
      document.body.classList.remove('privacy-dialog-open');
    };

    openPrivacyLink?.addEventListener('click', openPrivacy);
    footerPrivacyBtn?.addEventListener('click', openPrivacy);

    privacyDialog.querySelectorAll('[data-privacy-close]').forEach(btn => {
      btn.addEventListener('click', closePrivacy);
    });

    privacyDialog.addEventListener('click', event => {
      if (event.target === privacyDialog) closePrivacy();
    });
  }

  // 10. 頁尾年份自動更新
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
