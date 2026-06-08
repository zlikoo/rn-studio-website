(function () {
  var script = document.currentScript;
  var fontsUrl = script.getAttribute('data-fonts');
  var storageKey = script.getAttribute('data-key') || 'cookie_consent';

  function loadFonts() {
    if (!fontsUrl) return;
    var origins = [
      { href: 'https://fonts.googleapis.com' },
      { href: 'https://fonts.gstatic.com', crossorigin: true },
    ];
    origins.forEach(function (o) {
      var l = document.createElement('link');
      l.rel = 'preconnect';
      l.href = o.href;
      if (o.crossorigin) l.setAttribute('crossorigin', '');
      document.head.appendChild(l);
    });
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontsUrl;
    document.head.appendChild(link);
  }

  function removeBanner() {
    var el = document.getElementById('cookie-banner');
    if (!el) return;
    el.style.transform = 'translateY(110%)';
    el.style.opacity = '0';
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 420);
  }

  function showBanner() {
    var css = [
      '#cookie-banner{',
      'position:fixed;bottom:0;left:0;right:0;z-index:99999;',
      'background:#0D0C0B;border-top:2px solid #C9F03C;',
      'padding:14px 40px;',
      'display:flex;align-items:center;justify-content:space-between;gap:32px;',
      'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;',
      'transform:translateY(100%);opacity:0;',
      'animation:_cb_up 0.5s cubic-bezier(0.16,1,0.3,1) 0.25s forwards;',
      '}',
      '@keyframes _cb_up{to{transform:translateY(0);opacity:1}}',
      '@media(prefers-reduced-motion:reduce){',
      '#cookie-banner{animation:none;transform:translateY(0);opacity:1}',
      '}',
      '#_cb_text{display:flex;align-items:baseline;gap:12px;flex:1;min-width:0}',
      '#_cb_label{',
      'font-size:9px;letter-spacing:0.15em;text-transform:uppercase;',
      'color:#C9F03C;font-weight:700;white-space:nowrap;flex-shrink:0;',
      'padding-top:1px;',
      '}',
      '#_cb_copy{font-size:13px;line-height:1.5;color:#5C5651;margin:0;',
      'white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '#_cb_actions{display:flex;gap:8px;flex-shrink:0;align-items:center}',
      '#_cb_decline{',
      'padding:9px 20px;background:transparent;',
      'border:1px solid #1E1C1A;color:#5C5651;',
      'font-size:10px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;',
      'font-family:inherit;cursor:pointer;',
      'transition:border-color 0.2s ease,color 0.2s ease;line-height:1;',
      '}',
      '#_cb_decline:hover{border-color:#5C5651;color:#F0E8DC}',
      '#_cb_accept{',
      'padding:9px 20px;background:#C9F03C;border:none;color:#0A0908;',
      'font-size:10px;letter-spacing:0.12em;text-transform:uppercase;font-weight:700;',
      'font-family:inherit;cursor:pointer;',
      'transition:background 0.18s ease;line-height:1;',
      '}',
      '#_cb_accept:hover{background:#d8f94e}',
      '#_cb_decline:focus-visible,#_cb_accept:focus-visible{',
      'outline:2px solid #C9F03C;outline-offset:3px',
      '}',
      '@media(max-width:640px){',
      '#cookie-banner{',
      'flex-direction:column;align-items:stretch;gap:14px;padding:18px 20px;',
      '}',
      '#_cb_text{flex-direction:column;gap:5px;align-items:flex-start}',
      '#_cb_copy{white-space:normal;text-overflow:unset;overflow:visible}',
      '#_cb_actions{display:grid;grid-template-columns:1fr 1fr;gap:8px}',
      '#_cb_decline,#_cb_accept{padding:13px 12px;text-align:center}',
      '}',
    ].join('');

    var styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie-Einwilligung');
    banner.innerHTML = [
      '<div id="_cb_text">',
      '<span id="_cb_label">Schriften</span>',
      '<p id="_cb_copy">Diese Website lädt Schriften über Google Fonts — dabei wird deine IP-Adresse an Google-Server übertragen.</p>',
      '</div>',
      '<div id="_cb_actions">',
      '<button id="_cb_decline">Ablehnen</button>',
      '<button id="_cb_accept">Akzeptieren</button>',
      '</div>',
    ].join('');

    document.body.appendChild(banner);

    document.getElementById('_cb_accept').addEventListener('click', function () {
      localStorage.setItem(storageKey, 'accepted');
      loadFonts();
      removeBanner();
    });

    document.getElementById('_cb_decline').addEventListener('click', function () {
      localStorage.setItem(storageKey, 'declined');
      removeBanner();
    });
  }

  var consent = localStorage.getItem(storageKey);
  if (consent === 'accepted') {
    loadFonts();
  } else if (!consent) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }
})();
