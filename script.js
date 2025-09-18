document.addEventListener("DOMContentLoaded", () => {
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

    // --- GSAP Mechanical Animations ---
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Animation (Mechanical Reveal)
    const heroP = document.querySelector('.hero p');
    gsap.from(heroP, { duration: 1.5, textContent: "", ease: "none", delay: 0.5 });
    gsap.from(".hero h1", { duration: 1.2, y: 80, opacity: 0, ease: "power3.out", delay: 0.2 });

    // Section Content Mechanical Reveal Animation
    function createTextReveal(selector) {
        gsap.utils.toArray(selector).forEach(elem => {
            gsap.from(elem, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            });
        });
    }
    createTextReveal(".section-title");
    createTextReveal(".section-subtitle");
    createTextReveal(".section-body p");

    gsap.from(".about-image", { duration: 1.2, x: 100, opacity: 0, ease: "power3.out", scrollTrigger: { trigger: ".about", start: "top 70%" } });
    gsap.from(".service-card", { duration: 0.8, y: 80, opacity: 0, stagger: 0.2, scrollTrigger: { trigger: ".services", start: "top 70%" } });


    // --- "Artistry Spotlight" Portfolio Logic ---
    const spotlightImage = document.getElementById("spotlight-image");
    const thumbnailContainer = document.querySelector(".thumbnail-container");

    // IMPORTANT: Make sure you have these 5 images in an 'images' folder
    const portfolioImages = [
        { src: "image1.jpg", alt: "Radiant Bridal Glow" },
        { src: "image2.jpg", alt: "Sultry Evening Glam" },
        { src: "image3.jpg", alt: "Classic Red Lip" },
        { src: "image4.jpg", alt: "Modern Mehndi Look" },
        { src: "image5.jpg", alt: "Editorial Edge" },
    ];
    let currentImageIndex = 0;

    // Create thumbnails
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

    // Function to update the spotlight image with animation
    function updateSpotlight(newIndex) {
        const oldIndex = currentImageIndex;
        currentImageIndex = newIndex;
        
        // Hide cursor during transition to prevent flicker on image
        cursor.classList.add("hidden");

        const tl = gsap.timeline({
            onComplete: () => cursor.classList.remove("hidden")
        });

        tl.to(spotlightImage, {
            duration: 0.5,
            opacity: 0,
            y: -30,
            ease: "power3.in"
        }).call(() => {
            spotlightImage.src = `images/${portfolioImages[newIndex].src}`;
            spotlightImage.alt = portfolioImages[newIndex].alt;
            
            thumbnails[oldIndex].classList.remove("active");
            thumbnails[newIndex].classList.add("active");
        }).to(spotlightImage, {
            duration: 0.5,
            opacity: 1,
            y: 0,
            ease: "power3.out"
        });
    }

    // Initialize first image
    spotlightImage.src = `images/${portfolioImages[0].src}`;
    thumbnails[0].classList.add("active");

    // Animate thumbnails into view
    gsap.from(".thumbnail-item", {
        duration: 0.6,
        y: 50,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".thumbnail-container",
            start: "top 90%"
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
