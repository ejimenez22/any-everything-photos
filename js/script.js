const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");


/* =========================
   MOBILE NAV
========================= */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
    });

}

navLinks.forEach((link) => {

    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
    });

});


/* =========================
   YEAR
========================= */

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


/* =========================
   CAROUSEL CONTROLS
========================= */

const carouselButtons =
    document.querySelectorAll(".carousel-arrow");

carouselButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const carouselId =
            button.dataset.carousel;

        const direction =
            Number(button.dataset.direction);

        const carousel =
            document.getElementById(carouselId);

        if (!carousel) return;

        const firstItem =
            carousel.firstElementChild;

        if (!firstItem) return;

        const gap = 20;

        const scrollAmount =
            firstItem.getBoundingClientRect().width + gap;

        carousel.scrollBy({
            left: scrollAmount * direction,
            behavior: "smooth"
        });

    });

});