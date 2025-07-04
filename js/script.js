document.addEventListener("DOMContentLoaded", () => {
  // === HERO TITLE ANIMATION ===
  const spans = document.querySelectorAll(".hero-title span");
  spans.forEach((span, index) => {
    span.style.animationDelay = `${index * 0.05}s`;
  });

  // === HEADER SHOW/HIDE ON SCROLL ===
  const header = document.getElementById("floatingHeader");
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScrollY && currentScroll > 100) {
      header.style.top = "-100px";
    } else {
      header.style.top = "10px";
    }
    lastScrollY = currentScroll;
  });

  // === MOBILE MENU TOGGLE ===
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const backdrop = document.getElementById("mobileBackdrop");
  if (hamburger && navLinks && backdrop) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      backdrop.classList.toggle("hidden");
    });
    backdrop.addEventListener("click", () => {
      navLinks.classList.remove("open");
      backdrop.classList.add("hidden");
    });
  }

  // === CLIENT LOGO FADE-IN ===
  const boxes = document.querySelectorAll(".client-box");
  if ("IntersectionObserver" in window && boxes.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target.style.transitionDelay = `${index * 100}ms`;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    boxes.forEach((box) => observer.observe(box));
  }

  // === CONTACT FORM FIREBASE HANDLING ===
  const form = document.getElementById("contactForm");
  const status = document.getElementById("status");
  if (form && status) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const db = firebase.firestore();
      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        message: form.message.value.trim(),
        timestamp: new Date(),
      };
      try {
        await db.collection("contactMessages").add(data);
        status.textContent = "Message sent successfully!";
        status.style.color = "green";
        form.reset();
      } catch (error) {
        console.error("Error sending message:", error);
        status.textContent = "Failed to send message. Please try again.";
        status.style.color = "red";
      }
    });
  }

  // === SMOOTH SCROLL FUNCTION ===
  function smoothScrollTo(targetEl, duration = 1200) {
    const startY = window.scrollY;
    const targetY = targetEl.getBoundingClientRect().top + window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();
    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    function animation(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutQuad(progress);
      window.scrollTo(0, startY + distance * easedProgress);
      if (elapsed < duration) {
        requestAnimationFrame(animation);
      }
    }
    requestAnimationFrame(animation);
  }

  // === SERVICES PAGE FUNCTIONALITY ===
  window.addEventListener("load", () => {
    const container = document.querySelector(".services-container");
    if (container) container.classList.add("visible");

    const serviceTitle = document.getElementById("serviceTitle");
    const serviceDescription = document.getElementById("serviceDescription");
    const mainImage = document.getElementById("mainImage");
    const galleryWrapper = document.getElementById("galleryWrapper");
    const serviceList = document.querySelectorAll("#serviceList li");
    const serviceContent = document.getElementById("mainContent");

    const services = [
      {
        title: "Design & Creations",
        desc: "From concept to creation, we deliver high-quality design and printing solutions tailored to your brand. Whether it’s business cards, brochures, flyers, or custom packaging, we bring your vision to life with creative designs and sharp print finishes that leave a lasting impression.",
        mainImg: "images/advertisingsignage.png",
        gallery: [
          "images/Advertising and signage/1.png",
          "images/Advertising and signage/2.png",
          "images/Advertising and signage/3.png",
          "images/Advertising and signage/4.png",
        ],
      },
      {
        title: "Print & Publishing",
        desc: "Our print and publishing services cater to everything from corporate reports to books, magazines, and catalogs. We ensure precise layouts, premium paper options, and professional finishing, helping your publications stand out in both print and digital formats.",
        mainImg: "images/print.jpg",
        gallery: ["images/print1.jpg", "images/print2.jpg"],
      },
      {
        title: "Packaging & Labelling",
        desc: "We design and produce custom packaging and labels that not only protect your products but also enhance shelf appeal. From boxes and pouches to stickers and barcode labels, our solutions are functional, visually striking, and aligned with your brand identity.",
        mainImg: "images/package.jpg",
        gallery: ["images/package1.jpg", "images/package2.jpg"],
      },
      {
        title: "Branding & Promotions",
        desc: "We help you build a memorable brand identity with cohesive visual elements, logo design, and promotional materials. Our branding strategies are crafted to enhance recognition, trust, and impact—whether you're launching a new brand or refreshing an existing one.",
        mainImg: "images/branding.jpg",
        gallery: ["images/branding1.jpg", "images/branding2.jpg"],
      },
      {
        title: "Advertising & Signage",
        desc: "Get noticed with impactful advertising and signage solutions. We design and install everything from indoor signs and outdoor billboards to vehicle wraps and digital displays—tailored to draw attention and communicate your message effectively.",
        mainImg: "images/signage.jpg",
        gallery: ["images/signage1.jpg", "images/signage2.jpg"],
      },
      {
        title: "Gifts & Premium",
        desc: "Make your brand unforgettable with personalized corporate gifts and premium giveaways. From branded merchandise to custom-made luxury items, we offer unique options perfect for events, employee rewards, and client appreciation.",
        mainImg: "images/gifts.jpg",
        gallery: ["images/gifts1.jpg", "images/gifts2.jpg"],
      },
      {
        title: "Framing & Canvas",
        desc: "Preserve and showcase your memories or artwork with our professional framing and canvas services. Whether it's for home, office, or exhibitions, we provide custom framing, canvas stretching, and high-resolution printing that adds a touch of elegance.",
        mainImg: "images/canvas.jpg",
        gallery: ["images/canvas1.jpg", "images/canvas2.jpg"],
      },
      {
        title: "Carpet & Curtains",
        desc: "Add style and comfort to your spaces with our custom carpets and curtains. We offer a wide range of designs, fabrics, and installation services for residential, commercial, and event use—ensuring both aesthetic appeal and functionality.",
        mainImg: "images/carpet.jpg",
        gallery: ["images/carpet1.jpg", "images/carpet2.jpg"],
      },
    ];

    let currentIndex = 0;

    function updateService(index) {
      serviceContent.classList.add("fade-out");
      setTimeout(() => {
        const s = services[index];
        serviceTitle.textContent = s.title;
        serviceDescription.textContent = s.desc;
        mainImage.src = s.mainImg;
        currentIndex = index;

        serviceList.forEach((li) => li.classList.remove("active"));
        serviceList[index].classList.add("active");
        serviceContent.classList.remove("fade-out");

        // Inject image gallery inline
        if (galleryWrapper) {
          galleryWrapper.innerHTML = s.gallery
            .map((src) => `<img src="${src}" alt="Gallery Image">`)
            .join("");
        }
      }, 300);
    }

    serviceList.forEach((item) => {
      item.addEventListener("click", () => {
        const index = parseInt(item.dataset.service);
        updateService(index);
      });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const indexFromURL = parseInt(urlParams.get("service"));
    if (
      !isNaN(indexFromURL) &&
      indexFromURL >= 0 &&
      indexFromURL < services.length
    ) {
      updateService(indexFromURL);
    } else {
      updateService(0);
    }
  });
});
