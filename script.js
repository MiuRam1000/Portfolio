document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const burger = document.getElementById("burger");
    const navLinks = document.getElementById("nav-links");
    const links = document.querySelectorAll(".nav-links a");

    /* ---------- Navbar : fond au scroll ---------- */
    const onScroll = () => {
        navbar.classList.toggle("scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---------- Menu mobile ---------- */
    const closeMenu = () => {
        burger.classList.remove("open");
        navLinks.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
    };

    burger.addEventListener("click", () => {
        const isOpen = burger.classList.toggle("open");
        navLinks.classList.toggle("open", isOpen);
        burger.setAttribute("aria-expanded", String(isOpen));
    });

    links.forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });

    /* ---------- Lien actif selon la section visible ---------- */
    const sections = document.querySelectorAll("section[id]");
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    links.forEach((link) => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${entry.target.id}`
                        );
                    });
                }
            });
        },
        { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((section) => sectionObserver.observe(section));

    /* ---------- Apparition au scroll ---------- */
    const revealTargets = document.querySelectorAll(
        ".section-title, .section-intro, .about-text, .projet, .contact-list li"
    );
    revealTargets.forEach((el) => el.classList.add("reveal"));

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));

    /* ---------- Lightbox sur les captures du projet ---------- */
    document.querySelectorAll(".galerie img").forEach((img) => {
        img.addEventListener("click", () => {
            const box = document.createElement("div");
            box.className = "lightbox";
            box.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
            const close = () => {
                box.remove();
                document.removeEventListener("keydown", onKey);
            };
            const onKey = (e) => e.key === "Escape" && close();
            box.addEventListener("click", close);
            document.addEventListener("keydown", onKey);
            document.body.appendChild(box);
        });
    });

    /* ---------- Année du footer ---------- */
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
});