"use strict";

/* Elements */
const headerMenu = document.querySelector(".header .menu");
const hamburgerToggle = document.querySelector(".bars");
const menu = document.querySelector(".menu");
const overlay = document.querySelector(".overlay");
// select all sections to use for scrollspy feature
const sections = document.querySelectorAll("section");
// Tabs
const resumeListItems = document.querySelectorAll(".resume__list-item");
const tabElems = document.querySelectorAll(".tab");

/*-------------- Open-Close mobile menu --------------*/
hamburgerToggle.addEventListener("click", function (e) {
  hamburgerToggle.classList.toggle("bars--open");
  menu.classList.toggle("menu--open");
  overlay.classList.toggle("overlay--active");
});

/*-------- Close mobile menu when click on overlay --------*/
overlay.addEventListener("click", e => {
  hamburgerToggle.classList.remove("bars--open");
  menu.classList.remove("menu--open");
  overlay.classList.remove("overlay--active");
});

/*-------------- Scroll to Section --------------*/
headerMenu.addEventListener("click", function (e) {
  const menuLink = e.target.closest(".menu__link");

  if (menuLink) {
    e.preventDefault(); // dont' scroll by default html , csss behavior

    const targetId = menuLink.getAttribute("href");

    const target = document.querySelector(`${targetId}`);

    target.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "start",
    });

    // remove active link and set new one
    const prevActiveLink = headerMenu.querySelector(".menu__link.menu__link--active");
    prevActiveLink.classList.remove("menu__link--active");
    menuLink.classList.add("menu__link--active");
  }
});

/*-------------------- Scrollspy Feature --------------------*/
let sectionObserver = new IntersectionObserver(
  function (entries, observer) {
    entries.forEach(sectionElem => {
      if (sectionElem.isIntersecting) {
        // diactive previous link
        document.querySelector(".header .menu .menu__link.menu__link--active").classList.remove("menu__link--active");

        // active new link
        document.querySelector(`.header .menu .menu__link[href="#${sectionElem.target.id}"]`).classList.add("menu__link--active");
      }
    });
  },
  {
    // define configuration of observer
    root: null,
    rootMargin: "0px",
    threshold: 0.8,
  }
);

// observe all section with observer object
sections.forEach(sectionElem => {
  sectionObserver.observe(sectionElem);
});

// Tabs Feature in Resume Section
resumeListItems.forEach(resumeListItem => {
  resumeListItem.addEventListener("click", function () {
    // diactive previous item
    document.querySelector(".resume__list-item--active").classList.remove("resume__list-item--active");
    // active new item
    this.classList.add("resume__list-item--active");

    const tabTargeElem = document.querySelector(`.tab#${resumeListItem.dataset.tabTarget}`);
    // hide previous tab
    document.querySelector(".tab--active").classList.remove("tab--active");
    // show new tab
    tabTargeElem.classList.add("tab--active");
  });
});
