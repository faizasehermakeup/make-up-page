document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // --- Custom Cursor Logic ---
    const cursor = document.querySelector(".cursor");
    const links = document.querySelectorAll("a, button, .thumbnail-item");

    window.addEventListener("mousemove", (e) => {
        gsap.to(cursor, { duration: 0.3, x: e.clientX, y: e.clientY, ease: "power3.out" });
    });

    links.forEach(link => {
        link.addEventListener("mouseenter", () => cursor.classList.add("link-hover"));
        link.addEventListener("mouseleave", () => cursor.classList.remove("link-hover"));
    });
    
    // --- Sticky Navigation on Scroll ---
    const nav = document.querySelector(".nav");
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {className: 'scrolled', targets: nav}
    });

    // --- Section-Based Animation Logic (THE FIX) ---
    // This new approach ensures elements are animated reliably.

    // 1. Animate Hero on load
    const heroTl = gsap.timeline();
    heroTl.from(".hero h1", { autoAlpha: 0, y: 50, duration: 1.2, ease: "power3.out" })
          .from(".hero p", { autoAlpha: 0, y: 30, duration: 1, ease: "power3.out" }, "-=0.8");

    // 2. Animate About Section on scroll
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".about",
            start: "top 70%",
            toggleActions: "play none none reverse"
        }
    });
    aboutTl.from(".about .section-title", { autoAlpha: 0, y: 50, duration: 1 })
           .from(".about .section-subtitle", { autoAlpha: 0, y: 40, duration: 1 }, "-=0.8")
           .from(".about .section-body p", { autoAlpha: 0, y: 30, stagger: 0.15, duration: 0.8 }, "-=0.7")
           .from(".about .about-image", { autoAlpha: 0, x: 50, duration: 1 }, "-=1");

    // 3. Animate Services Section on scroll
    const servicesTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".services",
            start: "top 70%",
            toggleActions: "play none none reverse"
        }
    });
    servicesTl.from(".services .section-title", { autoAlpha: 0, y: 50, duration: 1 })
              .from(".service-card", { autoAlpha: 0, y: 50, stagger: 0.2, duration: 0.8 }, "-=0.7");
    
    // --- "Artistry Spotlight" Portfolio Logic ---
    const spotlightImage = document.getElementById("spotlight-image");
    const thumbnailContainer = document.querySelector(".thumbnail-container");

    const portfolioImages = [
        { src: "image1.jpg", alt: "Radiant Bridal Glow" },
        { src: "image2.jpg", alt: "Sultry Evening Glam" },
        { src: "image3.jpg", alt: "Classic Red Lip" },
        { src: "image4.jpg", alt: "Modern Mehndi Look" },
        { src: "image5.jpg", alt: "Editorial Edge" },
        { src: "image6.jpg", alt: "Soft Natural Beauty" },
        { src: "image7.jpg", alt: "Soft Natural Beauty" },
        { src: "image8.jpg", alt: "Soft Natural Beauty" },
        { src: "image9.jpg", alt: "Soft Natural Beauty" },
    ];
    let currentImageIndex = 0;

    portfolioImages.forEach((imgData, index) => {
        const thumb = document.createElement("div");
        thumb.className = "thumbnail-item";
        thumb.innerHTML = `<img src="images/${imgData.src}" alt="${imgData.alt}">`;
        thumbnailContainer.appendChild(thumb);

        thumb.addEventListener("click", () => {
            if (index !== currentImageIndex) {
                updateSpotlight(index);
            }
        });
    });

    const thumbnails = document.querySelectorAll(".thumbnail-item");

    function updateSpotlight(newIndex) {
        const oldIndex = currentImageIndex;
        currentImageIndex = newIndex;
        
        cursor.classList.add("hidden");
        
        const tl = gsap.timeline({ onComplete: () => cursor.classList.remove("hidden") });

        tl.to(spotlightImage, {
            duration: 0.5,
            autoAlpha: 0,
            y: -30,
            ease: "power3.in"
        }).call(() => {
            spotlightImage.src = `images/${portfolioImages[newIndex].src}`;
            spotlightImage.alt = portfolioImages[newIndex].alt;
            
            thumbnails[oldIndex].classList.remove("active");
            thumbnails[newIndex].classList.add("active");
        }).to(spotlightImage, {
            duration: 0.5,
            autoAlpha: 1,
            y: 0,
            ease: "power3.out"
        });
    }

    spotlightImage.src = `images/${portfolioImages[0].src}`;
    thumbnails[0].classList.add("active");

    // 4. Animate Portfolio Section on scroll
    const portfolioTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".portfolio",
            start: "top 70%",
            toggleActions: "play none none reverse"
        }
    });
    portfolioTl.from(".portfolio .section-title", { autoAlpha: 0, y: 50, duration: 1 })
               .from(".spotlight-image-wrapper", { autoAlpha: 0, scale: 0.9, duration: 1 }, "-=0.7")
               .from(".thumbnail-item", { autoAlpha: 0, y: 50, stagger: 0.1, duration: 0.6 }, "-=0.7");
    

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

    // --- Final Step: Reveal the Page ---
    // This removes the .loading class and fades the body in.
    window.addEventListener('load', () => {
        document.body.classList.remove('loading');
    });
});
