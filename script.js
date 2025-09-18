document.addEventListener("DOMContentLoaded", () => {
    // --- Custom Cursor Logic ---
    const cursor = document.querySelector(".cursor");
    const links = document.querySelectorAll("a, button, .gallery-item, .nav-menu-button");

    window.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });

    links.forEach(link => {
        link.addEventListener("mouseenter", () => cursor.classList.add("link-hover"));
        link.addEventListener("mouseleave", () => cursor.classList.remove("link-hover"));
    });

    // --- Navigation Menu Logic ---
    const menuButton = document.querySelector(".nav-menu-button");
    const navOverlay = document.querySelector(".nav-overlay");
    const navLinks = document.querySelectorAll(".nav-link");
    let isNavOpen = false;

    const navTimeline = gsap.timeline({ paused: true });
    navTimeline.to(navOverlay, {
        transform: "translateY(0)",
        duration: 0.8,
        ease: "power3.inOut"
    }).to(navLinks, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.5");

    menuButton.addEventListener("click", () => {
        if (isNavOpen) {
            navTimeline.reverse();
        } else {
            navTimeline.play();
        }
        isNavOpen = !isNavOpen;
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isNavOpen) {
                navTimeline.reverse();
                isNavOpen = false;
            }
        });
    });

    // --- GSAP Animations ---
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Load-in Animation
    gsap.from(".hero h1", { duration: 1, y: 50, opacity: 0, ease: "power3.out", delay: 0.2 });
    gsap.from(".hero p", { duration: 1, y: 30, opacity: 0, ease: "power3.out", delay: 0.4 });

    // Section Title Animation
    gsap.utils.toArray(".section-title").forEach(title => {
        gsap.from(title, {
            duration: 1,
            y: 50,
            opacity: 0,
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    // Animate other elements
    gsap.from(".about-content", { duration: 1, x: -100, opacity: 0, scrollTrigger: { trigger: ".about", start: "top 70%" } });
    gsap.from(".about-image", { duration: 1, x: 100, opacity: 0, scrollTrigger: { trigger: ".about", start: "top 70%" } });
    gsap.from(".service-card", { duration: 0.8, y: 80, opacity: 0, stagger: 0.2, scrollTrigger: { trigger: ".services", start: "top 70%" } });

    // --- Dynamic Gallery & Lightbox Logic ---
    const galleryGrid = document.querySelector(".gallery-grid");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.querySelector(".lightbox-image");
    const lightboxClose = document.querySelector(".lightbox-close");
    
    // IMPORTANT: Make sure you have these images in an 'images' folder
    const imageList = [
        { src: "image1.jpg", title: "Radiant Bridal Glow" },
        { src: "image2.jpg", title: "Sultry Evening Glam" },
        { src: "image3.jpg", title: "Classic Red Lip" },
        { src: "image4.jpg", title: "Modern Mehndi Look" },
        { src: "image5.jpg", title: "Editorial Edge" },
        { src: "image6.jpg", title: "Soft Engagement Look" },
    ];

    imageList.forEach(imgData => {
        const item = document.createElement("div");
        item.className = "gallery-item";
        item.innerHTML = `
            <img src="images/${imgData.src}" alt="${imgData.title}">
            <div class="gallery-item-overlay">${imgData.title}</div>
        `;
        galleryGrid.appendChild(item);
        
        item.addEventListener("click", () => {
            lightboxImage.src = `images/${imgData.src}`;
            lightbox.classList.add("active");
        });
    });

    // Animate gallery items on scroll
    gsap.from(".gallery-item", {
        duration: 0.8,
        scale: 0.8,
        opacity: 0,
        stagger: 0.15,
        scrollTrigger: {
            trigger: ".gallery-grid",
            start: "top 80%"
        }
    });

    lightboxClose.addEventListener("click", () => {
        lightbox.classList.remove("active");
    });
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove("active");
        }
    });

    // --- Testimonials Slider (Swiper.js) ---
    new Swiper(".swiper-container", {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });
});
