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
