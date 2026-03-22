document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // Trigger appear on elements immediately visible
    setTimeout(() => {
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                element.classList.add('appear');
            }
        });
    }, 100);

    // Hero Slider Logic
    const slides = document.querySelectorAll('.hero-slider .slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;
        
        const goToSlide = (index) => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        };

        const nextSlide = () => goToSlide(currentSlide + 1);
        const prevSlide = () => goToSlide(currentSlide - 1);

        const startSlider = () => {
            slideInterval = setInterval(nextSlide, 4000); // 4 seconds interval gives plenty of time to view
        };
        const resetSlider = () => {
            clearInterval(slideInterval);
            startSlider();
        };

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetSlider();
            });
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetSlider();
            });
        }

        startSlider();
    }
});
