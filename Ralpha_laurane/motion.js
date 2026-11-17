/* =========================================
   RALPH LAUREN — MOTION EXPERIENCE
   JAVASCRIPT PART 1/3
   LOADER + SCROLL + NAVIGATION + SEARCH
========================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================
       1. PAGE LOADER
    ===================================== */

    const loader = document.querySelector(".loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {
                loader.classList.add("hide");
            }

        }, 1200);

    });


    // Fallback in case the load event has already fired
    if (document.readyState === "complete" && loader) {

        setTimeout(() => {
            loader.classList.add("hide");
        }, 1200);

    }



    /* =====================================
       2. NAVBAR SCROLL EFFECT
    ===================================== */

    const navbar = document.querySelector(".navbar");

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 80) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();



    /* =====================================
       3. SCROLL REVEAL ANIMATION
    ===================================== */

    const revealElements = document.querySelectorAll(
        ".reveal"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px"
        }
    );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });



    /* =====================================
       4. MOBILE NAVIGATION
    ===================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            mobileMenu.classList.toggle("active");

            const isOpen = mobileMenu.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            document.body.style.overflow = isOpen
                ? "hidden"
                : "";

        });


        // Close menu after selecting a link

        const mobileLinks = mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.style.overflow = "";

            });

        });

    }



    /* =====================================
       5. SEARCH OVERLAY
    ===================================== */

    const searchOpen = document.querySelector(".search-open");
    const searchClose = document.querySelector(".search-close");
    const searchOverlay = document.querySelector(".search-overlay");
    const searchInput = document.querySelector(
        ".search-form input"
    );


    function openSearch() {

        if (!searchOverlay) return;

        searchOverlay.classList.add("active");

        document.body.style.overflow = "hidden";

        setTimeout(() => {

            if (searchInput) {
                searchInput.focus();
            }

        }, 300);

    }


    function closeSearch() {

        if (!searchOverlay) return;

        searchOverlay.classList.remove("active");

        document.body.style.overflow = "";

    }


    if (searchOpen) {
        searchOpen.addEventListener("click", openSearch);
    }

    if (searchClose) {
        searchClose.addEventListener("click", closeSearch);
    }


    // Close search with Escape key

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeSearch();

            if (mobileMenu) {
                mobileMenu.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

            document.body.style.overflow = "";

        }

    });



    /* =====================================
       6. SEARCH FORM PREVENT DEFAULT
    ===================================== */

    const searchForm = document.querySelector(".search-form");

    if (searchForm) {

        searchForm.addEventListener("submit", event => {

            event.preventDefault();

            const query = searchInput
                ? searchInput.value.trim()
                : "";

            if (!query) return;

            alert(
                "Search preview: " + query +
                "\n\nThis is a visual concept. Search functionality is not connected to a product database yet."
            );

        });

    }


});


/* =========================================
   END OF JAVASCRIPT PART 1
========================================= */
/* =========================================
   RALPH LAUREN — MOTION EXPERIENCE
   JAVASCRIPT PART 2/3
   JOURNAL SLIDER + CUSTOM CURSOR + PARALLAX
========================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================
       1. INTERACTIVE JOURNAL SLIDER
    ===================================== */

    const journalTrack = document.querySelector(".journal-track");

    const previousButton = document.querySelector(".previous");
    const nextButton = document.querySelector(".next");

    const progressBar = document.querySelector(".rail-progress span");


    if (journalTrack) {

        function getScrollAmount() {

            const card = journalTrack.querySelector(".journal-card");

            if (!card) return 300;

            const gap = parseFloat(
                getComputedStyle(journalTrack).gap
            ) || 0;

            return card.offsetWidth + gap;

        }


        function updateProgress() {

            if (!progressBar) return;

            const maxScroll =
                journalTrack.scrollWidth - journalTrack.clientWidth;

            if (maxScroll <= 0) {
                progressBar.style.width = "100%";
                return;
            }

            const percentage =
                (journalTrack.scrollLeft / maxScroll) * 100;

            progressBar.style.width =
                Math.max(25, percentage + 25) + "%";

        }


        if (nextButton) {

            nextButton.addEventListener("click", () => {

                journalTrack.scrollBy({

                    left: getScrollAmount(),

                    behavior: "smooth"

                });

            });

        }


        if (previousButton) {

            previousButton.addEventListener("click", () => {

                journalTrack.scrollBy({

                    left: -getScrollAmount(),

                    behavior: "smooth"

                });

            });

        }


        journalTrack.addEventListener(
            "scroll",
            updateProgress,
            { passive: true }
        );


        window.addEventListener("resize", updateProgress);

        updateProgress();

    }



    /* =====================================
       2. CUSTOM CURSOR
    ===================================== */

    const cursor = document.querySelector(".cursor");

    const desktopPointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    );


    if (cursor && desktopPointer.matches) {

        cursor.style.display = "block";

        let mouseX = 0;
        let mouseY = 0;

        let cursorX = 0;
        let cursorY = 0;


        document.addEventListener("mousemove", event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

        });


        function animateCursor() {

            cursorX += (mouseX - cursorX) * 0.18;
            cursorY += (mouseY - cursorY) * 0.18;

            cursor.style.left = cursorX + "px";
            cursor.style.top = cursorY + "px";

            requestAnimationFrame(animateCursor);

        }

        animateCursor();


        // Cursor interaction with clickable elements

        const interactiveElements = document.querySelectorAll(
            "a, button, input"
        );


        interactiveElements.forEach(element => {

            element.addEventListener("mouseenter", () => {

                cursor.style.width = "17px";
                cursor.style.height = "17px";

            });


            element.addEventListener("mouseleave", () => {

                cursor.style.width = "9px";
                cursor.style.height = "9px";

            });

        });

    }



    /* =====================================
       3. HERO PARALLAX EFFECT
    ===================================== */

    const hero = document.querySelector(".hero");
    const heroBackground = document.querySelector(".hero-bg");


    if (hero && heroBackground && desktopPointer.matches) {

        hero.addEventListener("mousemove", event => {

            const rect = hero.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) / rect.width - 0.5;

            const y =
                (event.clientY - rect.top) / rect.height - 0.5;


            heroBackground.style.transform =
                `scale(1.04) translate(${x * -15}px, ${y * -12}px)`;

        });


        hero.addEventListener("mouseleave", () => {

            heroBackground.style.transform = "";

        });

    }



    /* =====================================
       4. CINEMATIC IMAGE REVEAL
    ===================================== */

    const cinematicImages = document.querySelectorAll(
        ".intro-image, .collection-image, .journal-image"
    );


    const imageObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("image-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    cinematicImages.forEach(image => {

        imageObserver.observe(image);

    });



    /* =====================================
       5. COLLECTION CARD STAGGER
    ===================================== */

    const collectionCards = document.querySelectorAll(
        ".collection-card"
    );


    const cardObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry, index) => {

                if (entry.isIntersecting) {

                    entry.target.style.transitionDelay =
                        (index % 2) * 150 + "ms";

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    collectionCards.forEach(card => {

        cardObserver.observe(card);

    });


});


/* =========================================
   END OF JAVASCRIPT PART 2
========================================= */
/* =========================================
   RALPH LAUREN — MOTION EXPERIENCE
   JAVASCRIPT PART 3/3
   FINAL POLISH + INTERACTIONS + PERFORMANCE
========================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================
       1. SMOOTH ANCHOR NAVIGATION
    ===================================== */

    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    anchorLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });



    /* =====================================
       2. IMAGE REVEAL ANIMATION
    ===================================== */

    const style = document.createElement("style");

    style.textContent = `

        .intro-image,
        .collection-image,
        .journal-image {

            clip-path: inset(0 0 0 0);

            transition:
                clip-path 1s cubic-bezier(.2,.7,.2,1);

        }

        .intro-image:not(.image-visible),
        .collection-image:not(.image-visible),
        .journal-image:not(.image-visible) {
            clip-path: none !important;
            -webkit-clip-path: none !important;
        }

        .intro-image img,
        .collection-image img,
        .journal-image img {

            transition:
                transform 1.2s cubic-bezier(.2,.7,.2,1);

        }

        .collection-card.visible {

            opacity: 1;
            transform: translateY(0);

        }

        .collection-card {

            opacity: 0;
            transform: translateY(35px);

            transition:
                opacity .8s ease,
                transform .8s ease;

        }

        @media (prefers-reduced-motion: reduce) {

            .intro-image,
            .collection-image,
            .journal-image {

                clip-path: none !important;

            }

            .collection-card {

                opacity: 1 !important;
                transform: none !important;

            }

        }

    `;

    document.head.appendChild(style);



    /* =====================================
       3. BUTTON HOVER EFFECT
    ===================================== */

    const buttons = document.querySelectorAll(
        ".round-button, .image-arrow, .rail-buttons button"
    );

    buttons.forEach(button => {

        button.addEventListener("mouseenter", () => {

            button.style.transition =
                "transform .35s cubic-bezier(.2,.7,.2,1)";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });



    /* =====================================
       4. SCROLL PROGRESS INDICATOR
    ===================================== */

    const progress = document.createElement("div");

    progress.className = "page-progress";

    progress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 2px;
        background: #c3b79b;
        z-index: 10001;
        pointer-events: none;
        transition: width .08s linear;
    `;

    document.body.appendChild(progress);


    let ticking = false;

    function updatePageProgress() {

        const scrollTop =
            window.scrollY || document.documentElement.scrollTop;

        const scrollHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage = scrollHeight > 0
            ? (scrollTop / scrollHeight) * 100
            : 0;

        progress.style.width = percentage + "%";

        ticking = false;

    }


    window.addEventListener("scroll", () => {

        if (!ticking) {

            window.requestAnimationFrame(updatePageProgress);

            ticking = true;

        }

    }, { passive: true });



    /* =====================================
       5. CLOSING SECTION PARALLAX
    ===================================== */

    const closingSection = document.querySelector(".closing");

    const closingBackground =
        document.querySelector(".closing-bg");


    if (
        closingSection &&
        closingBackground &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {

        window.addEventListener("scroll", () => {

            const rect = closingSection.getBoundingClientRect();

            if (
                rect.bottom < 0 ||
                rect.top > window.innerHeight
            ) {
                return;
            }

            const movement = rect.top * -0.08;

            closingBackground.style.transform =
                `translateY(${movement}px) scale(1.08)`;

        }, { passive: true });

    }



    /* =====================================
       6. IMAGE LOADING OPTIMISATION
    ===================================== */

    const images = document.querySelectorAll("img");

    images.forEach(image => {

        // Load images normally; avoid lazy-load timing issues in mobile browsers.
        image.setAttribute("loading", "eager");
        image.setAttribute("decoding", "async");

    });



    /* =====================================
       7. PAGE VISIBILITY OPTIMISATION
    ===================================== */

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {

            document.body.classList.add("page-hidden");

        } else {

            document.body.classList.remove("page-hidden");

        }

    });



    /* =====================================
       8. FINAL CONSOLE MESSAGE
    ===================================== */

    console.log(
        "%cRALPH LAUREN — EDITORIAL EXPERIENCE",
        "font-size:16px; color:#1c3028; font-weight:bold;"
    );

    console.log(
        "Website motion experience initialized successfully."
    );


});


/* =========================================
   END OF JAVASCRIPT
========================================= */