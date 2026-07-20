// Oak Tree Foundry — interactions
(function () {
  "use strict";

  // Footer year
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  // Nav border on scroll
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 8) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav drawer
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  function closeMenu() {
    nav.classList.remove("open");
    if (toggle) { toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Open menu"); }
  }
  function openMenu() {
    nav.classList.add("open");
    if (toggle) { toggle.setAttribute("aria-expanded", "true"); toggle.setAttribute("aria-label", "Close menu"); }
  }
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      nav.classList.contains("open") ? closeMenu() : openMenu();
    });
    // Close after tapping any link in the drawer
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    // Escape closes
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
    // Reset when leaving mobile width
    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) closeMenu();
    });
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  // Draw the altitude line when the ladder enters view
  var line = document.querySelector(".altitude-line");
  var dots = document.querySelectorAll(".altitude-dot");
  var ladder = document.getElementById("ladder");
  if (line && ladder && !reduce && "IntersectionObserver" in window) {
    var lio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          line.classList.add("drawn");
          dots.forEach(function (d) { d.classList.add("drawn"); });
          lio.disconnect();
        }
      });
    }, { threshold: 0.3 });
    lio.observe(ladder);
  }
})();
