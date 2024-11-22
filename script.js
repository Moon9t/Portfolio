document.addEventListener('DOMContentLoaded', () => {
    // Loader
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        loader.style.display = 'none';
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Header animation
    gsap.from('header', {
        y: '-100%',
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Hero section animations
    gsap.from('.hero h1', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5
    });

    gsap.from('.hero h2', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 1
    });

    gsap.from('.cta-button', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 1.5
    });

    // Section title animations
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });

    // About section animation
    gsap.from('.profile-image', {
        scrollTrigger: {
            trigger: '.profile-image',
            start: 'top 80%'
        },
        opacity: 0,
        x: -50,
        duration: 1
    });

    gsap.from('.bio', {
        scrollTrigger: {
            trigger: '.bio',
            start: 'top 80%'
        },
        opacity: 0,
        x: 50,
        duration: 1
    });

    gsap.from('.key-points .point', {
        scrollTrigger: {
            trigger: '.key-points',
            start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2
    });

    // Skills animation
    gsap.utils.toArray('.skill').forEach(skill => {
        gsap.from(skill, {
            scrollTrigger: {
                trigger: skill,
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });

    // Project cards animation
    gsap.utils.toArray('.project-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });

    // Timeline animation
    gsap.utils.toArray('.timeline-item').forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%'
            },
            opacity: 0,
            x: item.classList.contains('left') ? -50 : 50,
            duration: 1
        });
    });

    // Contact form animation
    gsap.from('#contact-form', {
        scrollTrigger: {
            trigger: '#contact-form',
            start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        duration: 1
    });

    // Typing effect
    const typingText = document.getElementById('typing-text');
    const phrases = ['Web Developer', 'Designer', 'Problem Solver'];
    let i = 0;
    let j = 0;
    let currentPhrase = [];
    let isDeleting = false;
    let isEnd = false;

    function loop() {
        isEnd = false;
        typingText.innerHTML = currentPhrase.join('');

        if (i < phrases.length) {
            if (!isDeleting && j <= phrases[i].length) {
                currentPhrase.push(phrases[i][j]);
                j++;
            }

            if (isDeleting && j <= phrases[i].length) {
                currentPhrase.pop(phrases[i][j]);
                j--;
            }

            if (j == phrases[i].length) {
                isEnd = true;
                isDeleting = true;
            }

            if (isDeleting && j === 0) {
                currentPhrase = [];
                isDeleting = false;
                i++;
                if (i == phrases.length) {
                    i = 0;
                }
            }
        }
        const spedUp = Math.random() * (80 - 50) + 50;
        const normalSpeed = Math.random() * (300 - 200) + 200;
        const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed;
        setTimeout(loop, time);
    }

    loop();

    // Skills progress animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = `${progress}%`;
        });
    }

    function initSkillsAnimation() {
        const skillsSection = document.getElementById('skills');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(skillsSection);
    }

    document.addEventListener('DOMContentLoaded', initSkillsAnimation);

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    gsap.to(card, { opacity: 1, scale: 1, duration: 0.5 });
                } else {
                    gsap.to(card, { opacity: 0, scale: 0.8, duration: 0.5 });
                }
            });
        });
    });

    // Scroll to top button
    const scrollToTopButton = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('darkMode', null);
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        const contactForm = document.getElementById('contact-form');
    
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(contactForm);
                const formObject = Object.fromEntries(formData.entries());

                try {
                    const response = await fetch('http://localhost:5500/send-email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formObject),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        alert('Thank you for your message! I\'ll get back to you soon.');
                        contactForm.reset();
                    } else {
                        alert(`Error: ${data.error || 'There was an error sending your message. Please try again later.'}`);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('There was an error sending your message. Please try again later.');
                }
            });
        }
    });
    let scene, camera, renderer, geometry, material, mesh;

    function initThreeJS() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('hero-background').appendChild(renderer.domElement);

            // Create an icosahedron geometry
            geometry = new THREE.IcosahedronGeometry(3, 1); // Increased size from 1.5 to 2
            material = new THREE.MeshBasicMaterial({
                color: 0x0077be, // Blue color for the wireframe
                wireframe: true,
                wireframeLinewidth: 3
            });
            mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            // Add ambient light
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            // Add directional light
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            directionalLight.position.set(5, 5, 5);
            scene.add(directionalLight);

            // Adjust camera position to accommodate larger size
            camera.position.z = 7;

        // Add mouse move event listener
        document.addEventListener('mousemove', onMouseMove);

        animate();
    }

    function onMouseMove(event) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        // Rotate the mesh based on mouse position
        mesh.rotation.x = mouseY * 0.5;
        mesh.rotation.y = mouseX * 0.5;
    }

    function animate() {
        requestAnimationFrame(animate);

        // Slowly rotate the mesh
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.005;

        // Pulsate the mesh
        const scale = 1 + Math.sin(Date.now() * 0.001) * 0.1;
        mesh.scale.set(scale, scale, scale);

        renderer.render(scene, camera);
    }

    // Call initThreeJS when the window loads
    window.addEventListener('load', initThreeJS);

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Add this new function
    function ensureAboutImageLoaded() {
        const aboutImage = document.querySelector('#about .profile-image');
        if (aboutImage && !aboutImage.complete) {
            aboutImage.src = aboutImage.src;
        }
    }

    // Call this function when navigating to the About section
    document.querySelector('a[href="#about"]').addEventListener('click', function() {
        setTimeout(ensureAboutImageLoaded, 100);
    });

    // Also call it when the page loads
    ensureAboutImageLoaded();
});

function initProjectCarousel() {
    new Swiper('.swiper-container', {
        slidesPerView: 1,
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        }
    });
}

document.addEventListener('DOMContentLoaded', initProjectCarousel);

function initParallaxEffects() {
    gsap.utils.toArray(".section-title").forEach(title => {
        gsap.from(title, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: title,
                start: "top bottom-=100",
                end: "bottom top",
                toggleActions: "play none none reset"
            }
        });
    });

    gsap.from("#about .profile-image", {
        x: -100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#about",
            start: "top center",
            end: "bottom top",
            toggleActions: "play none none reset"
        }
    });

    gsap.from("#skills .skills-container", {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#skills",
            start: "top center",
            end: "bottom top",
            toggleActions: "play none none reset"
        }
    });

    gsap.from("#experience .timeline-item", {
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
            trigger: "#experience",
            start: "top center",
            end: "bottom top",
            toggleActions: "play none none reset"
        }
    });
}
document.addEventListener('DOMContentLoaded', initParallaxEffects);

function initInteractiveTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });

        const year = item.getAttribute('data-year');
        const yearElement = document.createElement('div');
        yearElement.classList.add('timeline-year');
        yearElement.textContent = year;
        item.prepend(yearElement);
    });
}

document.addEventListener('DOMContentLoaded', initInteractiveTimeline);

function forceReflow() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none';
        section.offsetHeight; // Trigger reflow
        section.style.display = '';
    });
}

function ensureVisibility() {
    forceReflow();
    initInteractiveTimeline();
    animateSkillBars();
    // Add any other initialization functions here
}

window.addEventListener('load', ensureVisibility);
window.addEventListener('resize', ensureVisibility);

function setElementsToFinalState() {
    gsap.set(".section-title", { opacity: 1, y: 0 });
    gsap.set("#about .profile-image", { x: 0, opacity: 1 });
    gsap.set("#skills .skills-container", { y: 0, opacity: 1 });
    gsap.set("#experience .timeline-item", { opacity: 1 });
}

function initScrollTracking() {
    let hasScrolled = localStorage.getItem('hasScrolled') === 'true';

    if (hasScrolled) {
        setElementsToFinalState();
    }

    window.addEventListener('scroll', () => {
        if (!hasScrolled && window.scrollY > 100) {
            hasScrolled = true;
            localStorage.setItem('hasScrolled', 'true');
        } else if (window.scrollY === 0) {
            hasScrolled = false;
            localStorage.setItem('hasScrolled', 'false');
        }
    });
}

// Call this function on page load
document.addEventListener('DOMContentLoaded', initScrollTracking);

function initFloatingContactForm() {
    const modal = document.getElementById('contact-modal');
    const btn = document.querySelector('.cta-button');
    const span = document.getElementsByClassName('close')[0];

    btn.onclick = function() {
        modal.style.display = 'block';
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    document.getElementById('floating-contact-form').onsubmit = function(e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Message sent! (This is a demo)');
        modal.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', initFloatingContactForm);

function initTextRevealAnimations() {
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            duration: 1,
            opacity: 0,
            y: 50,
            ease: "power3.out",
            scrollTrigger: {
                trigger: title,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            }
        });
    });

    gsap.utils.toArray('.animated-text').forEach(text => {
        gsap.from(text, {
            duration: 1,
            opacity: 0,
            y: 20,
            ease: "power2.out",
            scrollTrigger: {
                trigger: text,
                start: "top bottom-=50",
                toggleActions: "play none none reverse"
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initTextRevealAnimations);

function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        let dx = mouseX - cursorX;
        let dy = mouseY - cursorY;
        cursorX += dx * 0.2;
        cursorY += dy * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animate);
    }
    animate();

    const interactiveElements = document.querySelectorAll('a, button, .project-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}
document.addEventListener('DOMContentLoaded', initCustomCursor);

function initParticleText() {
    particlesJS('particle-text', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false, anim: { enable: false } },
            size: { value: 3, random: true, anim: { enable: false } },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });

    const particleText = document.getElementById('particle-text');
    particleText.innerHTML = 'MOON9T';
}

document.addEventListener('DOMContentLoaded', initParticleText);

function initExperienceModal() {
    const modal = document.getElementById('experience-modal');
    const btn = document.getElementById('view-experience');
    const span = modal.querySelector('.close');

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

document.addEventListener('DOMContentLoaded', initExperienceModal);
