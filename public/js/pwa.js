// ══════════════════════════════════════════
//  UPSC COMMAND CENTER — PWA ENGINE
//  Install prompt, offline mode, notifications,
//  haptic feedback, app-like behaviours
// ══════════════════════════════════════════

const PWA = (() => {

  let deferredInstallPrompt = null;
  let isOnline = navigator.onLine;
  let notificationPermission = Notification?.permission || 'default';

  // ── INIT ──
  function init() {
    registerServiceWorker();
    handleInstallPrompt();
    handleOnlineOffline();
    handleURLShortcuts();
    injectInstallBanner();
    injectOfflineBanner();
    injectNotificationPrompt();
    setupHaptics();
    lockPortrait();
    preventBounce();
    styleStatusBar();
  }

  // ── SERVICE WORKER REGISTRATION ──
  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('/sw.js')
      .then(reg => {
        console.log('[PWA] SW registered:', reg.scope);
        // Check for updates every 60 seconds
        setInterval(() => reg.update(), 60000);
        // Notify user when update is available
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              showUpdateToast();
            }
          });
        });
      })
      .catch(err => console.warn('[PWA] SW registration failed:', err));
  }

  // ── INSTALL PROMPT (Android/Chrome) ──
  function handleInstallPrompt() {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      deferredInstallPrompt = e;
      // Show install banner after 8 seconds if not already installed
      setTimeout(() => {
        if (!isInstalled() && !localStorage.getItem('upsc_install_dismissed')) {
          showInstallBanner();
        }
      }, 8000);
    });

    window.addEventListener('appinstalled', () => {
      deferredInstallPrompt = null;
      hideInstallBanner();
      showToast('✅ App installed! Open from your home screen.', 4000, 'success');
      localStorage.setItem('upsc_installed', '1');
    });
  }

  function isInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true
      || localStorage.getItem('upsc_installed') === '1';
  }

  function showInstallBanner() {
    const banner = document.getElementById('installBanner');
    if (banner) {
      banner.classList.add('show');
      // Auto-hide after 20 seconds
      setTimeout(() => banner.classList.remove('show'), 20000);
    }
  }

  function hideInstallBanner() {
    const banner = document.getElementById('installBanner');
    if (banner) banner.classList.remove('show');
  }

  async function triggerInstall() {
    if (!deferredInstallPrompt) {
      // iOS fallback instructions
      if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        showToast('📱 Tap the Share button → "Add to Home Screen"', 6000, 'info');
      } else {
        showToast('Open in Chrome browser for install option', 4000, 'info');
      }
      return;
    }
    hideInstallBanner();
    deferredInstallPrompt.prompt();
    const { outcome } = await deferredInstallPrompt.userChoice;
    if (outcome === 'accepted') {
      showToast('🎉 Installing UPSC Command Center...', 3000, 'success');
    }
    deferredInstallPrompt = null;
  }

  function dismissInstallBanner() {
    hideInstallBanner();
    localStorage.setItem('upsc_install_dismissed', Date.now());
  }

  // ── ONLINE / OFFLINE ──
  function handleOnlineOffline() {
    window.addEventListener('online', () => {
      isOnline = true;
      hideOfflineBanner();
      showToast('🌐 Back online — syncing progress...', 2500, 'success');
    });
    window.addEventListener('offline', () => {
      isOnline = false;
      showOfflineBanner();
    });
    // Initial state check
    if (!navigator.onLine) showOfflineBanner();
  }

  function showOfflineBanner() {
    const b = document.getElementById('offlineBanner');
    if (b) b.classList.add('show');
  }
  function hideOfflineBanner() {
    const b = document.getElementById('offlineBanner');
    if (b) b.classList.remove('show');
  }

  // ── STUDY REMINDER NOTIFICATIONS ──
  async function requestNotifications() {
    if (!('Notification' in window)) {
      showToast('Notifications not supported on this device', 3000, 'warning');
      return;
    }
    if (Notification.permission === 'granted') {
      setupStudyReminders();
      showToast('🔔 Study reminders already active!', 2500, 'success');
      return;
    }
    const permission = await Notification.requestPermission();
    notificationPermission = permission;
    if (permission === 'granted') {
      setupStudyReminders();
      showToast('🔔 Study reminders enabled! You\'ll get daily alerts.', 4000, 'success');
      hideNotificationPrompt();
      localStorage.setItem('upsc_notif_granted', '1');
    } else {
      showToast('Enable notifications in browser settings for reminders', 4000, 'info');
    }
  }

  function setupStudyReminders() {
    // Schedule daily reminder at 7 AM using setTimeout
    // (Real push needs backend — this works while app is open/cached)
    const now = new Date();
    const next7AM = new Date(now);
    next7AM.setHours(7, 0, 0, 0);
    if (next7AM <= now) next7AM.setDate(next7AM.getDate() + 1);
    const msUntil7AM = next7AM - now;

    setTimeout(() => {
      if (Notification.permission === 'granted') {
        new Notification('🌅 Good morning! UPSC revision time', {
          body: `You have ${getOverdueCount()} topics overdue for revision. Start now!`,
          icon: '/icons/icon-192.png',
          badge: '/icons/icon-96.png',
          vibrate: [200, 100, 200],
          tag: 'daily-reminder'
        });
      }
      // Re-schedule for next day
      setInterval(() => {
        if (Notification.permission === 'granted') {
          new Notification('📚 UPSC Daily Study Reminder', {
            body: 'Your revision queue is waiting. Consistency builds toppers!',
            icon: '/icons/icon-192.png',
            tag: 'daily-reminder'
          });
        }
      }, 24 * 60 * 60 * 1000);
    }, msUntil7AM);

    console.log('[PWA] Study reminder set for', next7AM.toLocaleTimeString());
  }

  function getOverdueCount() {
    try {
      const REVISION_TOPICS = window.REVISION_TOPICS || [];
      return REVISION_TOPICS.filter(t => t.urgency === 'overdue').length;
    } catch { return 3; }
  }

  function hideNotificationPrompt() {
    const p = document.getElementById('notifPrompt');
    if (p) p.classList.remove('show');
  }

  // ── URL SHORTCUTS ──
  function handleURLShortcuts() {
    const params = new URLSearchParams(window.location.search);
    const panel = params.get('panel');
    if (panel && window.App) {
      setTimeout(() => window.App.switchPanel(panel), 300);
    }
  }

  // ── HAPTIC FEEDBACK ──
  function setupHaptics() {
    if (!navigator.vibrate) return;
    // Light haptic on option select
    document.addEventListener('click', e => {
      const option = e.target.closest('.option');
      const btn = e.target.closest('.btn-primary, .bnav-tab, .feed-filter');
      if (option) navigator.vibrate(30);
      else if (btn) navigator.vibrate(15);
    });
  }

  // ── PREVENT BOUNCE (iOS overscroll) ──
  function preventBounce() {
    document.body.addEventListener('touchmove', e => {
      if (e.target.closest('.scheme-table-wrap, .sidebar, .modal-body, .answer-textarea')) return;
      // Allow scroll inside scrollable elements, prevent bounce on body
    }, { passive: true });
  }

  // ── LOCK PORTRAIT ──
  function lockPortrait() {
    if (screen.orientation?.lock) {
      screen.orientation.lock('portrait').catch(() => {});
    }
  }

  // ── STATUS BAR COLOUR (Android) ──
  function styleStatusBar() {
    // Already set in meta theme-color — this updates dynamically
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    // Dark header when at top
    meta.content = '#0d0d0d';
  }

  // ── INJECT UI ELEMENTS ──
  function injectInstallBanner() {
    const el = document.createElement('div');
    el.id = 'installBanner';
    el.className = 'pwa-banner install-banner';
    el.innerHTML = `
      <div class="pwa-banner-icon">🏛️</div>
      <div class="pwa-banner-text">
        <div class="pwa-banner-title">Install UPSC Command Center</div>
        <div class="pwa-banner-sub">Works offline · No Play Store needed · Free</div>
      </div>
      <button class="pwa-install-btn" onclick="PWA.triggerInstall()">Install</button>
      <button class="pwa-dismiss-btn" onclick="PWA.dismissInstallBanner()">✕</button>
    `;
    document.body.appendChild(el);
  }

  function injectOfflineBanner() {
    const el = document.createElement('div');
    el.id = 'offlineBanner';
    el.className = 'pwa-banner offline-banner';
    el.innerHTML = `
      <span style="font-size:1rem">📡</span>
      <span class="pwa-banner-text" style="flex:1">
        <strong>You're offline</strong> — All content still available from cache
      </span>
    `;
    document.body.appendChild(el);
  }

  function injectNotificationPrompt() {
    if (localStorage.getItem('upsc_notif_granted') || Notification?.permission === 'granted') return;
    const el = document.createElement('div');
    el.id = 'notifPrompt';
    el.className = 'pwa-banner notif-banner';
    el.innerHTML = `
      <span style="font-size:1rem">🔔</span>
      <div class="pwa-banner-text">
        <div class="pwa-banner-title">Enable study reminders?</div>
        <div class="pwa-banner-sub">Daily 7 AM nudge to keep your streak going</div>
      </div>
      <button class="pwa-install-btn" onclick="PWA.requestNotifications()">Enable</button>
      <button class="pwa-dismiss-btn" onclick="this.closest('.pwa-banner').classList.remove('show')">✕</button>
    `;
    document.body.appendChild(el);
    // Show after 30 seconds
    setTimeout(() => {
      if (!localStorage.getItem('upsc_notif_granted')) el.classList.add('show');
    }, 30000);
  }

  // ── TOAST NOTIFICATIONS ──
  let toastTimer = null;
  function showToast(msg, duration = 3000, type = 'info') {
    let toast = document.getElementById('pwaToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'pwaToast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.className = 'pwa-toast pwa-toast-' + type + ' show';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
  }

  // ── UPDATE TOAST ──
  function showUpdateToast() {
    let toast = document.getElementById('updateToast');
    if (toast) return;
    toast = document.createElement('div');
    toast.id = 'updateToast';
    toast.className = 'pwa-banner update-banner show';
    toast.innerHTML = `
      <span style="font-size:1rem">🔄</span>
      <div class="pwa-banner-text">
        <strong>Update available</strong> — New content & features ready
      </div>
      <button class="pwa-install-btn" onclick="window.location.reload()">Update Now</button>
      <button class="pwa-dismiss-btn" onclick="this.closest('.pwa-banner').remove()">✕</button>
    `;
    document.body.appendChild(toast);
  }

  return {
    init,
    triggerInstall,
    dismissInstallBanner,
    requestNotifications,
    showToast,
    isOnline: () => isOnline,
    isInstalled
  };
})();

// Auto-init PWA when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', PWA.init);
} else {
  PWA.init();
}
