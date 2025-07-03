document.addEventListener("DOMContentLoaded", function () {
  // === HERO TITLE ANIMATION ===
  const spans = document.querySelectorAll(".hero-title span");
  spans.forEach((span, index) => {
    span.style.animationDelay = `${index * 0.05}s`;
  });

  // === MOBILE MENU TOGGLE ===
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const backdrop = document.getElementById("mobileBackdrop");

  hamburger?.addEventListener("click", () => {
    navLinks?.classList.toggle("open");
    backdrop?.classList.toggle("hidden");
  });

  backdrop?.addEventListener("click", () => {
    navLinks?.classList.remove("open");
    backdrop?.classList.add("hidden");
  });

  // === CLIENT LOGO FADE-IN ===
  const boxes = document.querySelectorAll(".client-box");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, {
      threshold: 0.2,
    });
    boxes.forEach((box) => observer.observe(box));
  } else {
    // Fallback
    boxes.forEach((box) => box.classList.add("visible"));
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
});