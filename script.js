// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // Menu Toggle Logic
    const menuBtn = document.getElementById('menuBtn');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('.menu-link');

    if (menuBtn && menuOverlay) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('open');
            menuOverlay.classList.toggle('open');
            document.body.style.overflow = menuOverlay.classList.contains('open') ? 'hidden' : '';
        });

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('open');
                menuOverlay.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // Hero Background Slider Logic
    const slides = document.querySelectorAll('.hero-bg-slide');
    if (slides.length > 0) {
        let currentSlide = 0;

        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Change image every 5 seconds
    }

    // 1. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('active');
            // Optional: stop observing once revealed
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 2. Native Parallax Effect on Images
    const parallaxImages = document.querySelectorAll('.portfolio-item img');

    window.addEventListener('scroll', () => {
        // Request animation frame for smooth performance
        requestAnimationFrame(() => {
            parallaxImages.forEach(img => {
                const rect = img.parentElement.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                // Only animate if element is in viewport
                if (rect.top <= windowHeight && rect.bottom >= 0) {
                    // Calculate scroll percentage relative to element
                    const distance = windowHeight - rect.top;
                    const percentage = distance / (windowHeight + rect.height);

                    // Simple Y translation for parallax (scale is handled in CSS hover)
                    // Move from -5% to 5% based on scroll
                    const moveY = (percentage - 0.5) * 20;
                    img.style.transform = `translateY(${moveY}%) scale(1.05)`;
                }
            });
        });
    });

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
