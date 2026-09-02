const filterButtons = document.querySelectorAll(".filter-button");
const galleryItems = document.querySelectorAll(".gallery-item");
const portfolioCount = document.getElementById("portfolio-count");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const lightboxCounter = document.getElementById("lightbox-counter");

let currentGalleryIndex = 0;


/* =========================
   GALLERY HELPERS
========================= */

function getVisibleGalleryItems() {
    return [...galleryItems].filter((item) => {
        return !item.classList.contains("hidden");
    });
}

function updatePortfolioCount() {
    if (!portfolioCount) return;

    portfolioCount.textContent =
        getVisibleGalleryItems().length;
}


/* =========================
   PORTFOLIO FILTERS
========================= */

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        galleryItems.forEach((item) => {

            const category = item.dataset.category;

            if (
                filter === "all" ||
                category === filter
            ) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }

        });

        updatePortfolioCount();

    });

});


/* =========================
   LIGHTBOX
========================= */

function updateLightboxCounter() {

    if (!lightboxCounter) return;

    const visibleItems =
        getVisibleGalleryItems();

    lightboxCounter.textContent =
        `${currentGalleryIndex + 1} / ${visibleItems.length}`;
}


function openLightbox(item) {

    if (!lightbox || !lightboxImage) return;

    const visibleItems =
        getVisibleGalleryItems();

    currentGalleryIndex =
        visibleItems.indexOf(item);

    lightboxImage.src =
        item.dataset.image;

    lightbox.classList.add("open");

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";

    updateLightboxCounter();
}


function closeLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove("open");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


function changeLightbox(direction) {

    const visibleItems =
        getVisibleGalleryItems();

    if (!visibleItems.length) return;

    currentGalleryIndex += direction;

    if (currentGalleryIndex < 0) {
        currentGalleryIndex =
            visibleItems.length - 1;
    }

    if (
        currentGalleryIndex >=
        visibleItems.length
    ) {
        currentGalleryIndex = 0;
    }

    lightboxImage.src =
        visibleItems[
            currentGalleryIndex
        ].dataset.image;

    updateLightboxCounter();
}


/* =========================
   OPEN PHOTOS
========================= */

galleryItems.forEach((item) => {

    item.addEventListener("click", () => {

        openLightbox(item);

    });

});


/* =========================
   LIGHTBOX CONTROLS
========================= */

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


if (lightboxPrev) {

    lightboxPrev.addEventListener(
        "click",
        () => {
            changeLightbox(-1);
        }
    );

}


if (lightboxNext) {

    lightboxNext.addEventListener(
        "click",
        () => {
            changeLightbox(1);
        }
    );

}


/* Click dark background to close */

if (lightbox) {

    lightbox.addEventListener(
        "click",
        (event) => {

            if (event.target === lightbox) {
                closeLightbox();
            }

        }
    );

}


/* =========================
   MOBILE SWIPE
========================= */

let touchStartX = 0;

if (lightbox) {

    lightbox.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    lightbox.addEventListener(
        "touchend",
        (event) => {

            const touchEndX =
                event.changedTouches[0].screenX;

            const distance =
                touchEndX - touchStartX;

            if (Math.abs(distance) < 50) {
                return;
            }

            if (distance < 0) {
                changeLightbox(1);
            } else {
                changeLightbox(-1);
            }

        },
        { passive: true }
    );

}


/* =========================
   KEYBOARD CONTROLS
========================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            !lightbox ||
            !lightbox.classList.contains("open")
        ) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowLeft") {
            changeLightbox(-1);
        }

        if (event.key === "ArrowRight") {
            changeLightbox(1);
        }

    }
);


/* =========================
   INITIAL COUNT
========================= */

updatePortfolioCount();