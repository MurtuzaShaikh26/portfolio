/* Murtuza Shaikh — portfolio interactions.
   No dependencies. Everything degrades gracefully without JS:
   detail panels are the only hidden content, and they carry the same
   text in the DOM for search engines. */

(function () {
  'use strict';

  /* ---------- theme ---------- */
  var root = document.documentElement;
  var STORAGE_KEY = 'theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#ffffff');
  }

  var stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* private mode */ }

  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(stored || (prefersDark ? 'dark' : 'light'));

  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- mobile nav ---------- */
  var burger = document.getElementById('nav-burger');
  var mobileNav = document.getElementById('nav-mobile');

  function closeMobileNav() {
    if (!mobileNav || !burger) return;
    mobileNav.classList.remove('is-open');
    mobileNav.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
  }

  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      if (open) {
        closeMobileNav();
      } else {
        mobileNav.hidden = false;
        mobileNav.classList.add('is-open');
        burger.setAttribute('aria-expanded', 'true');
        burger.setAttribute('aria-label', 'Close menu');
      }
    });

    // close after tapping a link
    mobileNav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMobileNav();
    });

    // a resize past the breakpoint leaves the panel stranded otherwise
    window.addEventListener('resize', function () {
      if (window.innerWidth > 780) closeMobileNav();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileNav();
  });

  /* ---------- project detail panels ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('.js-details'), function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;

    var label = btn.querySelector('.js-label');

    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
      if (label) label.textContent = open ? 'Details' : 'Hide details';
    });
  });

  /* ---------- sticky nav shadow ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- scroll spy ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));

  // only track sections the nav actually links to — #contact has no link, and
  // letting it win at the bottom of the page would clear the whole nav
  var linked = {};
  links.forEach(function (l) { linked[l.getAttribute('href')] = true; });

  var sections = Array.prototype.slice
    .call(document.querySelectorAll('main section[id]'))
    .filter(function (s) { return linked['#' + s.id]; });

  if (sections.length && links.length) {
    var current = null;

    function syncSpy() {
      // the last section whose top has passed just under the sticky header wins;
      // comparing intersection ratios instead makes tall sections dominate short ones
      var line = 88;
      var active = sections[0].id;

      for (var i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top <= line) active = sections[i].id;
      }

      // the last section can be too short to ever reach the line
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        active = sections[sections.length - 1].id;
      }

      if (active === current) return;
      current = active;
      links.forEach(function (link) {
        link.classList.toggle('is-active', link.getAttribute('href') === '#' + active);
      });
    }

    var ticking = false;
    function requestSpy() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () { ticking = false; syncSpy(); });
    }

    syncSpy();
    window.addEventListener('scroll', requestSpy, { passive: true });
    window.addEventListener('resize', requestSpy);
  }

  /* ---------- footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
