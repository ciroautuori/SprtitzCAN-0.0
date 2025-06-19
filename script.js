document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const heroSection = document.getElementById('hero'); // Define heroSection

    // Define color schemes for each flavor (assuming this is kept from original)
    const flavorColors = {
        'melon-mint': {
            primary: '#4CAF50', // Green
            secondary: '#388E3C',
            heroBg: '#4CAF50',
        },
        'grapefruit': {
            primary: '#FFC107', // Amber/Yellow
            secondary: '#FFA000',
            heroBg: '#FFC107',
        },
        'blackberry-hibiscus': {
            primary: '#9C27B0', // Purple
            secondary: '#7B1FA2',
            heroBg: '#9C27B0',
        },
        'tropical': {
            primary: '#FF5722', // Deep Orange
            secondary: '#E64A19',
            heroBg: '#FF5722',
        }
    };

    // REVISED Flavor Selector Logic
    const allFlavorSelectors = document.querySelectorAll('.flavor-selector-hero span[data-flavor]');

    function setActiveFlavor(selectedFlavorElement) {
        // Remove 'active' class from all flavor selectors
        allFlavorSelectors.forEach(span => span.classList.remove('active')); // Use allFlavorSelectors
        // Add 'active' class to the clicked one
        if (selectedFlavorElement) {
            selectedFlavorElement.classList.add('active');
        }
    }

    allFlavorSelectors.forEach(selector => {
        selector.addEventListener('click', () => {
            const flavor = selector.dataset.flavor;
            const bgImage = selector.dataset.bgImage; // data-bg-image from HTML

            if (flavorColors[flavor]) {
                const colors = flavorColors[flavor];
                root.style.setProperty('--primary-color', colors.primary);
                root.style.setProperty('--secondary-color', colors.secondary);

                // Handle hero background (color or image)
                // For now, sticking to color change as per instructions, bgImage is for future use
                if (heroSection) { // Ensure heroSection is available
                     root.style.setProperty('--hero-bg-color', colors.heroBg);
                    // If actual image backgrounds were to be used:
                    // if (bgImage) {
                    //     heroSection.style.backgroundImage = `url('${bgImage}')`;
                    // } else {
                    //     heroSection.style.backgroundImage = 'none';
                    //     root.style.setProperty('--hero-bg-color', colors.heroBg); // Fallback to color
                    // }
                }
                setActiveFlavor(selector);
            }
        });
    });

    // Initial default flavor click
    const defaultFlavorElement = document.querySelector('.flavor-selector-hero span[data-flavor="melon-mint"]');
    if (defaultFlavorElement) {
        defaultFlavorElement.click();
    } else if (allFlavorSelectors.length > 0) {
        allFlavorSelectors[0].click();
    }

    // Scroll Animations
    const animatedElementsOnScroll = document.querySelectorAll('.feature-item, .flavor-card, .recommended-product-item, .social-grid img');

    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Stop observing once it has appeared
            }
        });
    }, observerOptions);

    animatedElementsOnScroll.forEach(el => {
        observer.observe(el);
    });
});
