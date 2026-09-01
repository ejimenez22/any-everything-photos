const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
    });
});

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}