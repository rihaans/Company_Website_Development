// Mobile menu toggle
  const headerPill = document.getElementById('headerPill');
  const menuButton = document.getElementById('menuButton');
  const closeButton = document.getElementById('closeButton');

  menuButton.addEventListener('click', () => {
    headerPill.classList.add('expanded');
  });

  closeButton.addEventListener('click', () => {
    headerPill.classList.remove('expanded');
  });

// Smooth scroll to 'Our services' section
document.addEventListener("DOMContentLoaded", () => {
  const scrollToServices = document.querySelector(".services-title");

  document.querySelectorAll("a[href='#services']").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToServices.scrollIntoView({ behavior: "smooth" });
    });
  });
});

// Hover animation delay for client boxes
  document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".client-box");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, {
      threshold: 0.2
    });

    boxes.forEach((box) => observer.observe(box));
  });


// Contact form submission handling
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("status");

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const db = firebase.firestore();

      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        message: form.message.value.trim(),
        timestamp: new Date()
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
  });

