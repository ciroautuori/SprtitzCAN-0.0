document.addEventListener("DOMContentLoaded", function() {
    console.log("Script loaded and DOM fully loaded!");

    gsap.registerPlugin(ScrollTrigger);

    // --- Configuration for Dynamic Can ---
    // IMPORTANT: This needs to be updated with actual image paths and flavor data
    const flavors = {
        flavor1: {
            image: "img/PLACEHOLDER_CAN_FLAVOR1.png", // Example path
            name: "Flavor 1",
            // color: "#ff0000" // Optional: for changing background or text colors
        },
        flavor2: {
            image: "img/PLACEHOLDER_CAN_FLAVOR2.png",
            name: "Flavor 2",
            // color: "#00ff00"
        },
        flavor3: {
            image: "img/PLACEHOLDER_CAN_FLAVOR3.png",
            name: "Flavor 3",
            // color: "#0000ff"
        }
    };

    const productCanImage = document.getElementById("productCan");
    const flavorSelectorButtons = document.querySelectorAll(".flavor-selectors button");

    function updateCanFlavor(flavorKey) {
        if (flavors[flavorKey] && productCanImage) {
            const selectedFlavor = flavors[flavorKey];

            // Animate out the old can
            gsap.to(productCanImage, {
                opacity: 0,
                scale: 0.9,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    productCanImage.setAttribute("src", selectedFlavor.image);
                    productCanImage.setAttribute("alt", `Product Can - ${selectedFlavor.name}`);

                    // Animate in the new can
                    gsap.to(productCanImage, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out",
                        delay: 0.1 // Slight delay for image to load
                    });
                }
            });

            // Optional: Change other elements based on flavor (e.g., hero background)
            // if (selectedFlavor.color) {
            //     gsap.to(".hero", { backgroundColor: selectedFlavor.color, duration: 0.5 });
            // }

            // Update active state for buttons
            flavorSelectorButtons.forEach(btn => {
                if (btn.dataset.flavor === flavorKey) {
                    btn.classList.add("active");
                } else {
                    btn.classList.remove("active");
                }
            });
        }
    }

    if (flavorSelectorButtons.length > 0 && productCanImage) {
        flavorSelectorButtons.forEach(button => {
            button.addEventListener("click", () => {
                const flavorKey = button.dataset.flavor;
                updateCanFlavor(flavorKey);
            });
        });

        // Set an initial flavor
        const initialFlavorKey = Object.keys(flavors)[0];
        if (initialFlavorKey && flavors[initialFlavorKey] && flavors[initialFlavorKey].image) {
             productCanImage.setAttribute("src", flavors[initialFlavorKey].image);
             productCanImage.setAttribute("alt", `Product Can - ${flavors[initialFlavorKey].name}`);
             const initialButton = document.querySelector(`.flavor-selectors button[data-flavor='${initialFlavorKey}']`);
             if (initialButton) initialButton.classList.add("active");
        } else if (productCanImage) { // Fallback if initial flavor setup fails but can image element exists
            productCanImage.setAttribute("src", "img/PLACEHOLDER_CAN.png"); // Default placeholder
            productCanImage.setAttribute("alt", "Product Can");
        }

    } else if (productCanImage) { // If only can exists but no buttons
         productCanImage.setAttribute("src", "img/PLACEHOLDER_CAN.png"); // Default placeholder
         productCanImage.setAttribute("alt", "Product Can");
    }


    // --- Hero Section Animations ---
    if (document.querySelector(".hero-content h1")) {
        gsap.from(".hero-content h1", {
            duration: 1.5, y: -50, opacity: 0, ease: "power3.out", delay: 0.5
        });
    }
    if (document.querySelector(".hero-content p")) {
        gsap.from(".hero-content p", {
            duration: 1.5, y: 50, opacity: 0, ease: "power3.out", delay: 1
        });
    }
    if (document.querySelectorAll(".hero-buttons button").length > 0) {
        gsap.from(".hero-buttons button", {
            duration: 1, opacity: 0, y: 30, stagger: 0.3, ease: "power3.out", delay: 1.5
        });
    }
    // Animate #productCan itself as part of the showcase, if it's the main visual
    if (productCanImage) { // Changed from ".can-showcase" to productCanImage for direct animation
        gsap.from(productCanImage, { // Target the image directly
            duration: 1.5, opacity: 0, scale: 0.8, ease: "elastic.out(1, 0.75)", delay: 1.2
        });
    }


    // --- Animated Background Elements & Parallax ---
    const bgContainer = document.querySelector(".hero-background-elements");
    if (bgContainer) {
        const numElements = 30;
        for (let i = 0; i < numElements; i++) {
            let element;
            if (Math.random() > 0.5) {
                element = document.createElement("div");
                element.classList.add("star");
                gsap.set(element, {
                    width: Math.random() * 10 + 2,
                    height: Math.random() * 10 + 2,
                    backgroundColor: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`
                });
            } else {
                element = document.createElement("div");
                element.classList.add("bubble");
                gsap.set(element, {
                    width: Math.random() * 20 + 10,
                    height: Math.random() * 20 + 10,
                    backgroundColor: `rgba(0, 123, 255, ${Math.random() * 0.3 + 0.1})`,
                    border: "1px solid rgba(255, 255, 255, 0.3)"
                });
            }

            if(element){
                gsap.set(element, {
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight
                });
                bgContainer.appendChild(element);

                gsap.to(element, {
                    duration: Math.random() * 20 + 10,
                    x: `random(${0}, ${window.innerWidth})`,
                    y: `random(${0}, ${window.innerHeight})`,
                    opacity: `random(0.1, 0.7)`,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });

                gsap.to(element, {
                    y: `random(-200, 200)`,
                    scrollTrigger: {
                        trigger: ".hero",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: Math.random() * 1 + 0.5
                    },
                    ease: "none"
                });
            }
        }
    }

    // --- Enhanced Can Interaction (Hover/Click Effects) ---
    if (productCanImage) {
        productCanImage.addEventListener("mouseenter", () => {
            gsap.to(productCanImage, {
                scale: 1.15,
                filter: "drop-shadow(0 0 20px rgba(0,0,0,0.3))",
                duration: 0.3
            });
        });
        productCanImage.addEventListener("mouseleave", () => {
            gsap.to(productCanImage, {
                scale: 1,
                filter: "drop-shadow(0 0 10px rgba(0,0,0,0.1))",
                duration: 0.3
            });
        });
        productCanImage.addEventListener("mousedown", () => {
            gsap.to(productCanImage, { scale: 1.05, duration: 0.1 });
        });
        productCanImage.addEventListener("mouseup", () => {
            if (productCanImage.matches(':hover')) {
                 gsap.to(productCanImage, { scale: 1.15, duration: 0.1 });
            } else {
                 gsap.to(productCanImage, { scale: 1, duration: 0.1 });
            }
        });
    }

    // --- Scroll-Based Animations for Sections ---
    if (document.querySelector("#about .container")) {
        gsap.from("#about .container > *", {
            scrollTrigger: {
                trigger: "#about",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reset",
            },
            opacity: 0, y: 50, duration: 0.8, stagger: 0.2
        });
    }
    if (document.querySelector("#flavors .container > h2")) {
        gsap.from("#flavors .container > h2", {
            scrollTrigger: {
                trigger: "#flavors",
                start: "top 80%",
                toggleActions: "play none none reset",
            },
            opacity: 0, y: 50, duration: 0.8
        });
    }
    if (document.querySelectorAll(".flavor-item").length > 0) {
        gsap.from(".flavor-item", {
            scrollTrigger: {
                trigger: ".flavors-grid",
                start: "top 80%",
                toggleActions: "play none none reset",
            },
            opacity: 0, y: 50, duration: 0.6, stagger: 0.2
        });
    }
});
