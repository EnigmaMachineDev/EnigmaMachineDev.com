document.addEventListener('DOMContentLoaded', function () {
  var dropdown = document.getElementById('nav-dropdown');
  var dropToggle = document.getElementById('nav-dropdown-toggle');

  if (dropdown && dropToggle) {
    dropToggle.addEventListener('click', function () {
      var open = dropdown.classList.toggle('open');
      dropToggle.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        dropToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var hamburger = document.getElementById('nav-hamburger');
  var mobileMenu = document.getElementById('nav-mobile');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(open));
    });
  }

  // Theme toggle: match system → light → dark. The state lives in /theme.js
  // (window.siteTheme), loaded in every page's <head>; the button is added
  // here so no page's nav markup has to change.
  var navInner = document.querySelector('.nav-inner');
  if (navInner && window.siteTheme) {
    var ORDER = ['system', 'light', 'dark'];
    var LABELS = { system: 'Match system', light: 'Light', dark: 'Dark' };
    var ICONS = {
      system: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
      light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
      dark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/></svg>'
    };

    var themeBtn = document.createElement('button');
    themeBtn.type = 'button';
    themeBtn.className = 'theme-toggle';

    var render = function (pref) {
      var next = ORDER[(ORDER.indexOf(pref) + 1) % ORDER.length];
      themeBtn.innerHTML = ICONS[pref];
      themeBtn.title = 'Theme: ' + LABELS[pref] + ' — switch to ' + LABELS[next].toLowerCase();
      themeBtn.setAttribute('aria-label', 'Theme: ' + LABELS[pref] + '. Switch to ' + LABELS[next].toLowerCase() + '.');
    };

    themeBtn.addEventListener('click', function () {
      var pref = window.siteTheme.get();
      window.siteTheme.set(ORDER[(ORDER.indexOf(pref) + 1) % ORDER.length]);
    });
    window.siteTheme.subscribe(render);
    render(window.siteTheme.get());

    var hamburgerBtn = document.getElementById('nav-hamburger');
    navInner.insertBefore(themeBtn, hamburgerBtn);
  }

  var path = window.location.pathname;
  document.querySelectorAll('.site-nav a[href]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === '/') {
      if (path === '/') a.classList.add('active');
    } else if (path.startsWith(href)) {
      a.classList.add('active');
    }
  });

  document.querySelectorAll('.patch-note-header').forEach(function (header) {
    header.addEventListener('click', function () {
      header.closest('.patch-note-entry').classList.toggle('open');
    });
  });
});
