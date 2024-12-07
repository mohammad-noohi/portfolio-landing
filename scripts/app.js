"use strict";

/*----------------------- Elements -----------------------*/
const hamburgerToggle = document.querySelector(".bars");
const menu = document.querySelector(".menu");
const overlay = document.querySelector(".overlay");
const sections = document.querySelectorAll("section");
const resumeListItems = document.querySelectorAll(".resume__list-item");
const tabElems = document.querySelectorAll(".tab");
const menuItems = document.querySelectorAll(".menu__item");
const sliderItems = document.querySelectorAll(".portfolio-list__item");

/*-------------- باز و بسته شدن منو موبایل --------------*/
hamburgerToggle.addEventListener("click", function (e) {
  hamburgerToggle.classList.toggle("bars--open");
  menu.classList.toggle("menu--open");
  overlay.classList.toggle("overlay--active");
});

// بسته شدن منو موبایل با کلیک خارج از منو
overlay.addEventListener("click", e => {
  hamburgerToggle.classList.remove("bars--open");
  menu.classList.remove("menu--open");
  overlay.classList.remove("overlay--active");
});

/*------------------- اسکرول به سکشن مورد نظر -------------------*/
menuItems.forEach(menuItem => {
  menuItem.addEventListener("click", e => {
    e.preventDefault();

    // diactive previous item
    document.querySelector(".menu__item--active").classList.remove("menu__item--active");

    // active new item
    menuItem.classList.add("menu__item--active");

    const sectionClass = menuItem.getAttribute("data-section");
    const sectionElem = document.querySelector(`.${sectionClass}`);
    const sectionOffsetTop = sectionElem.offsetTop;

    /* 
    because we use sticky header so we should subtraction the height of header from offsettop value of section for scrolling
    */

    const headerHeight = document.querySelector(".header").offsetHeight;

    window.scrollTo({
      top: sectionOffsetTop - headerHeight,
      behavior: "smooth",
    });
  });
});

/*-------------- عملکرد تب های توی سکشن روزمه --------------*/
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

/*---------------------  تب ها و عملکرد اسلایدرها ---------------------*/

const swiper = new Swiper(".swiper", {
  // Basic Config
  slidesPerView: 1,
  spaceBetween: 30,

  // pagination config
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    // dynamicBullets : true, // I use this later
  },

  // responsive
  breakpoints: {
    768: {
      slidesPerView: 2,
      // spaceBetween: 20,
    },

    992: {
      slidesPerView: 3,
      // spaceBetween: 30,
    },

    1200: {
      slidesPerView: 4,
      // spaceBetween: 50,
    },
  },
});

sliderItems.forEach(sliderItem => {
  sliderItem.addEventListener("click", e => {
    // diactive previous slider item button
    const previousSliderItem = document.querySelector(".portfolio-list__item--active").classList.remove("portfolio-list__item--active");

    // active current slider item button
    sliderItem.classList.add("portfolio-list__item--active");

    const sliderId = sliderItem.getAttribute("data-slider-id");

    const portfolioContentElem = document.querySelector(sliderId);

    // hide previous slider
    document.querySelector(".portfolio__content--active").classList.remove("portfolio__content--active");

    // show related slider
    portfolioContentElem.classList.add("portfolio__content--active");
  });
});

/* ScrollSpy Feature */

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const sectionClass = entry.target.className;
      const menuItem = document.querySelector(`.menu__item[data-section="${sectionClass}"]`);
      if (entry.isIntersecting) {
        menuItem.classList.add("menu__item--active");
      } else {
        menuItem.classList.remove("menu__item--active");
      }
    });
  },
  {
    threshold: 0.5,
  }
);

sections.forEach(section => {
  sectionObserver.observe(section);
});
