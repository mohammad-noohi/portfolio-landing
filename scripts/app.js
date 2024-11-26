"use strict";

/* Elements */
const hamburgerToggle = document.querySelector(".bars");
const menu = document.querySelector(".menu");
const overlay = document.querySelector(".overlay");

/* Open-Close mobile menu */
hamburgerToggle.addEventListener("click", function (e) {
  hamburgerToggle.classList.toggle("bars--open");
  menu.classList.toggle("menu--open");
  overlay.classList.toggle("overlay--active");
});

/* Close mobile menu when click on overlay */
overlay.addEventListener("click", e => {
  hamburgerToggle.classList.remove("bars--open");
  menu.classList.remove("menu--open");
  overlay.classList.remove("overlay--active");
});
