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
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
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

  // === SMOOTH SCROLL ===
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

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        smoothScrollTo(target, 2500);
      }
    });
  });

  // === SERVICES PAGE FUNCTIONALITY ===
  const serviceTitle = document.getElementById("serviceTitle");
  const serviceDescription = document.getElementById("serviceDescription");
  const mainImage = document.getElementById("mainImage");
  const galleryContainer = document.getElementById("galleryContainer");
  const closeModal = document.getElementById("closeModal");
  const imageModal = document.getElementById("imageModal");
  const serviceList = document.querySelectorAll("#serviceList li");

  if (serviceTitle && serviceDescription && mainImage && galleryContainer) {
    const services = [
      {
        title: "Design & Creations",
        desc: "We deliver high-impact design solutions that shape brand identity...",
        mainImg: "images/designcreations.png",
        gallery: [
          "images/Advertising and signage/1.png",
          "images/Advertising and signage/2.png",
          "images/Advertising and signage/3.png",
          "images/Advertising and signage/4.png",
        ],
      },
      {
        title: "Print & Publishing",
        desc: "Your ideas on paper – fast, premium, and stunning.",
        mainImg: "images/print.jpg",
        gallery: ["images/print1.jpg", "images/print2.jpg"],
      },
      {
        title: "Packaging & Labelling",
        desc: "Creative packaging that stands out on the shelf.",
        mainImg: "images/package.jpg",
        gallery: ["images/package1.jpg", "images/package2.jpg"],
      },
      {
        title: "Branding & Promotions",
        desc: "Boost your presence with powerful branding.",
        mainImg: "images/branding.jpg",
        gallery: ["images/branding1.jpg", "images/branding2.jpg"],
      },
      {
        title: "Advertising & Signage",
        desc: "Visual impact, outdoor and indoor signage that works.",
        mainImg: "images/signage.jpg",
        gallery: ["images/signage1.jpg", "images/signage2.jpg"],
      },
      {
        title: "Gifts & Premium",
        desc: "Corporate gifts and branded merchandise to remember.",
        mainImg: "images/gifts.jpg",
        gallery: ["images/gifts1.jpg", "images/gifts2.jpg"],
      },
      {
        title: "Framing & Canvas",
        desc: "High-quality framing and elegant canvas prints.",
        mainImg: "images/canvas.jpg",
        gallery: ["images/canvas1.jpg", "images/canvas2.jpg"],
      },
      {
        title: "Carpet & Curtains",
        desc: "Custom carpet and curtain solutions tailored to your space.",
        mainImg: "images/carpet.jpg",
        gallery: ["images/carpet1.jpg", "images/carpet2.jpg"],
      },
    ];

    let currentIndex = 0;

    function updateService(index) {
      const s = services[index];
      serviceTitle.textContent = s.title;
      serviceDescription.textContent = s.desc;
      mainImage.src = s.mainImg;
      currentIndex = index;

      serviceList.forEach((li) => li.classList.remove("active"));
      serviceList[index].classList.add("active");
    }

    serviceList.forEach((item) => {
      item.addEventListener("click", () => {
        const index = parseInt(item.dataset.service);
        updateService(index);
      });
    });

    mainImage.addEventListener("click", () => {
      const galleryImgs = services[currentIndex].gallery
        .map((src) => `<img src="${src}" alt="Gallery Image">`)
        .join("");
      galleryContainer.innerHTML = galleryImgs;
      imageModal.classList.remove("hidden");
    });

    closeModal?.addEventListener("click", () => {
      imageModal.classList.add("hidden");
    });

    // Load from URL
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
  }
});
