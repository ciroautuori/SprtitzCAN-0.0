// js/script.js
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const headerElement = document.querySelector('header');
    let headerHeight = 0;
    if (headerElement) {
        headerHeight = headerElement.offsetHeight;
    }

    const mainElement = document.querySelector('main');
    if (mainElement && headerElement && getComputedStyle(headerElement).position === 'fixed') {
        mainElement.style.paddingTop = headerHeight + 'px';
    }

    // --- Smooth Scrolling ---
    const navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId) {
                let currentOffset = 0;
                if (headerElement && getComputedStyle(headerElement).position === 'fixed') {
                    currentOffset = headerHeight;
                }
                gsap.to(window, {
                    duration: 1.2,
                    scrollTo: {
                        y: targetId,
                        offsetY: currentOffset
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });

    // --- Hero Section Logic ---
    const canImage = document.getElementById('productCan');
    const flavorButtons = document.querySelectorAll('.flavor-selector button');
    const flavorTextElement = document.querySelector('.flavor-text');
    const heroTitle = document.querySelector('#hero .hero-title');

    if (canImage && flavorButtons.length && flavorTextElement) {
        flavorButtons.forEach(button => {
            button.addEventListener('click', () => {
                flavorButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const selectedColor = button.dataset.color;
                const selectedText = button.dataset.text;
                flavorTextElement.textContent = selectedText;
                canImage.classList.remove('red-filter', 'blue-filter', 'green-filter');
                if (selectedColor !== 'original') {
                    canImage.classList.add(selectedColor + '-filter');
                }
            });
        });
        if (flavorButtons.length > 0) {
            flavorButtons[0].classList.add('active');
            flavorTextElement.textContent = flavorButtons[0].dataset.text;
            const initialColor = flavorButtons[0].dataset.color;
            if (initialColor !== 'original') {
                canImage.classList.add(initialColor + '-filter');
            }
        }
    }

    // --- GSAP Animations - Header, Hero Intro ---
    if (headerElement) {
        gsap.from(headerElement, { duration: 0.8, opacity: 0, ease: "power2.out", delay: 0.1 });
    }

    if (heroTitle) {
        gsap.from(heroTitle, { duration: 1, opacity: 0, y: 50, ease: "power3.out", delay: 0.5 });
    }
    if (canImage) {
        gsap.from(canImage, { duration: 1, opacity: 0, scale: 0.8, ease: "back.out(1.7)", delay: 0.8 });
    }
    if (flavorButtons.length > 0) {
        gsap.from(".flavor-selector button", { duration: 0.5, opacity: 0, y: 20, stagger: 0.1, ease: "power2.out", delay: 1.2 });
    }
    if (flavorTextElement) {
        gsap.from(flavorTextElement, { duration: 0.5, opacity: 0, y: 20, ease: "power2.out", delay: 1.5 });
    }

    // --- Parallax Effect for Hero Elements ---
    const heroSection = document.querySelector("#hero");
    if (heroSection) {
        if (heroTitle) {
            gsap.to(heroTitle, {
                yPercent: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: heroSection,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            });
        }

        if (canImage) {
            gsap.to(canImage, {
                yPercent: -15,
                scale: 0.9,
                opacity: 0.7,
                ease: "none",
                scrollTrigger: {
                    trigger: heroSection,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            });
        }
    }

    // --- Scroll-triggered Animations for #section1 .box elements ---
    const section1Exists = document.querySelector("#section1");
    if (section1Exists) {
        const section1Title = section1Exists.querySelector("h2");
        if (section1Title) {
            gsap.from(section1Title, {
                duration: 1, opacity: 0, x: -100, ease: "power3.out",
                scrollTrigger: { trigger: section1Title, start: "top 85%", toggleActions: "play none none none" }
            });
        }

        const boxes = section1Exists.querySelectorAll(".box");
        if (boxes.length > 0) {
            boxes.forEach(box => {
                gsap.fromTo(box,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
                        scrollTrigger: { trigger: box, start: "top 80%", toggleActions: "play none none none" }
                    }
                );

                const hoverTween = gsap.to(box, {
                    scale: 1.1,
                    rotation: 5,
                    backgroundColor: "#2980b9",
                    duration: 0.3,
                    paused: true,
                    ease: "power1.inOut"
                });

                box.addEventListener('mouseenter', () => hoverTween.play());
                box.addEventListener('mouseleave', () => hoverTween.reverse());
            });
        }
    }

    // --- Animations for Section 2 ---
    const section2Exists = document.querySelector("#section2");
    if (section2Exists) {
        const section2Title = section2Exists.querySelector("h2");
        if (section2Title) {
            gsap.from(section2Title, {
                duration: 1, opacity: 0, y: 50, ease: "power3.out",
                scrollTrigger: { trigger: section2Title, start: "top 85%", toggleActions: "play none none none" }
            });
        }
        const section2Paras = section2Exists.querySelectorAll("p");
        if(section2Paras.length > 0) {
            gsap.from(section2Paras, {
                duration: 0.8, opacity: 0, y: 20, stagger: 0.2, ease: "power2.out",
                scrollTrigger: { trigger: section2Exists, start: "top 70%", toggleActions: "play none none none" }
            });
        }
    }

    console.log("Parallax and hover interactivity initialized in js/script.js.");
});
