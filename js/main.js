/* ============================================
   MAIN.JS - Site Portfolio Jescy Gratton
   Vanilla JS - Zero dépendances
   ============================================ */

(function () {
    'use strict';

    /* ----------------------------------------
       DOM ELEMENTS
       ---------------------------------------- */
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const reveals = document.querySelectorAll('.reveal');
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.dot[data-index]');

    /* ----------------------------------------
       NAVBAR SCROLL EFFECT
       Transparent → solid avec backdrop-blur
       ---------------------------------------- */
    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll(); // état initial

    /* ----------------------------------------
       MOBILE MENU TOGGLE
       ---------------------------------------- */
    function openMenu() {
        navToggle.classList.add('active');
        navMenu.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', function () {
        const isOpen = navMenu.classList.contains('active');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Fermer menu quand on clique un lien nav
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            closeMenu();
        });
    });

    // Fermer menu avec Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    /* ----------------------------------------
       SMOOTH SCROLL
       ---------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    /* ----------------------------------------
       ACTIVE NAV LINK ON SCROLL
       ---------------------------------------- */
    var sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        var scrollPos = window.scrollY + 120;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    /* ----------------------------------------
       SCROLL REVEAL (Intersection Observer)
       ---------------------------------------- */
    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal--visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -40px 0px',
            }
        );

        reveals.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        // Fallback: tout montrer
        reveals.forEach(function (el) {
            el.classList.add('reveal--visible');
        });
    }

    /* ----------------------------------------
       ANIMATED COUNTERS
       ---------------------------------------- */
    var countersStarted = false;

    function animateCounters() {
        if (countersStarted) return;
        countersStarted = true;

        statNumbers.forEach(function (counter) {
            var target = parseInt(counter.getAttribute('data-target'), 10);
            var suffix = counter.textContent.replace(/[0-9]/g, '').trim();
            var duration = 2000; // 2 secondes
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);

                // Ease out cubic
                var eased = 1 - Math.pow(1 - progress, 3);
                var current = Math.floor(eased * target);

                counter.textContent = current + suffix;

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    counter.textContent = target + suffix;
                    counter.classList.add('counted');
                }
            }

            requestAnimationFrame(step);
        });
    }

    // Observer pour déclencher les compteurs quand visibles
    if ('IntersectionObserver' in window && statNumbers.length > 0) {
        var statsSection = statNumbers[0].closest('section');
        if (statsSection) {
            var statsObserver = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            animateCounters();
                            statsObserver.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.3 }
            );
            statsObserver.observe(statsSection);
        }
    }

    /* ----------------------------------------
       TESTIMONIALS CAROUSEL
       ---------------------------------------- */
    var currentTestimonial = 0;
    var totalTestimonials = testimonialCards.length;
    var autoPlayInterval = null;

    function showTestimonial(index) {
        // Clamp index
        if (index < 0) index = totalTestimonials - 1;
        if (index >= totalTestimonials) index = 0;

        currentTestimonial = index;

        // Cards
        testimonialCards.forEach(function (card) {
            card.classList.remove('testimonial-card--active');
        });
        if (testimonialCards[currentTestimonial]) {
            testimonialCards[currentTestimonial].classList.add('testimonial-card--active');
        }

        // Dots
        testimonialDots.forEach(function (dot) {
            dot.classList.remove('dot--active');
        });
        if (testimonialDots[currentTestimonial]) {
            testimonialDots[currentTestimonial].classList.add('dot--active');
        }
    }

    function nextTestimonial() {
        showTestimonial(currentTestimonial + 1);
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextTestimonial, 5000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // Click sur dots
    testimonialDots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            var index = parseInt(this.getAttribute('data-index'), 10);
            showTestimonial(index);
            startAutoPlay(); // Restart autoplay après interaction
        });
    });

    // Démarrer autoplay si témoignages existent
    if (totalTestimonials > 1) {
        startAutoPlay();
    }

    // Pause autoplay quand la section n'est pas visible
    if ('IntersectionObserver' in window && testimonialCards.length > 0) {
        var carouselSection = testimonialCards[0].closest('section');
        if (carouselSection) {
            var carouselObserver = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            startAutoPlay();
                        } else {
                            stopAutoPlay();
                        }
                    });
                },
                { threshold: 0.1 }
            );
            carouselObserver.observe(carouselSection);
        }
    }

    /* ----------------------------------------
       CONTACT FORM (Formspree)
       ---------------------------------------- */
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validation simple
            var name = contactForm.querySelector('[name="name"]');
            var email = contactForm.querySelector('[name="email"]');
            var message = contactForm.querySelector('[name="message"]');

            if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
                return;
            }

            // Loading state
            submitBtn.classList.add('is-loading');
            submitBtn.disabled = true;

            // Envoyer à Formspree
            var formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json',
                },
            })
                .then(function (response) {
                    if (response.ok) {
                        // Succès
                        contactForm.reset();
                        formSuccess.removeAttribute('hidden');
                        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                        // Cacher le message de succès après 8 secondes
                        setTimeout(function () {
                            formSuccess.setAttribute('hidden', '');
                        }, 8000);
                    } else {
                        throw new Error('Erreur serveur');
                    }
                })
                .catch(function () {
                    alert(
                        'Oups! Une erreur est survenue. Envoyez-moi un email directement à jesycgratton@gmail.com'
                    );
                })
                .finally(function () {
                    submitBtn.classList.remove('is-loading');
                    submitBtn.disabled = false;
                });
        });
    }

    /* ----------------------------------------
       YEAR IN FOOTER (auto update)
       ---------------------------------------- */
    var yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* ----------------------------------------
       KEYBOARD ACCESSIBILITY
       ---------------------------------------- */

    // Focus visible uniquement au clavier
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', function () {
        document.body.classList.remove('keyboard-nav');
    });

})();
