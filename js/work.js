// work.js (Separate module script)

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDer--SLSZbjinReOKPPG_U77PmfbCnmkU",
  authDomain: "baabme-96b1d.firebaseapp.com",
  databaseURL: "https://baabme-96b1d-default-rtdb.firebaseio.com",
  projectId: "baabme-96b1d",
  storageBucket: "baabme-96b1d.firebasestorage.app",
  messagingSenderId: "615856666101",
  appId: "1:615856666101:web:4dc78c47f927bc186a1cbc",
  measurementId: "G-8Q30W1KFJP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

let confirmationResult;
let isVerified = false;

const workGrid = document.getElementById("work-grid");
const works = ["Burger Club","Burger Club","Burger Club","Burger Club","Burger Club","Burger Club"];

if (workGrid) {
  works.forEach((title, i) => {
    const div = document.createElement("div");
    div.className = `work-box ${i % 2 === 0 ? "dark" : "green"}`;
    div.innerText = title;
    div.addEventListener("click", () => handleWorkClick(i));
    workGrid.appendChild(div);
  });
}

function handleWorkClick(index) {
  if (!isVerified) {
    document.getElementById("verify-popup").classList.remove("hidden");

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
        size: "normal",
        callback: () => console.log("Recaptcha verified")
      }, auth);
    }
  } else {
    const file = `./documents/BurgerClub.pdf`;
    document.getElementById("pdf-viewer").src = file;
    document.getElementById("pdf-popup").classList.remove("hidden");
  }
}

window.sendOTP = () => {
  const phone = document.getElementById("phone-number").value;
  signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
    .then(result => {
      confirmationResult = result;
      document.getElementById("otp-code").classList.remove("hidden");
      document.getElementById("verify-btn").classList.remove("hidden");
    })
    .catch(err => alert(err.message));
};

window.verifyOTP = () => {
  const code = document.getElementById("otp-code").value;
  confirmationResult.confirm(code)
    .then(result => {
      const phone = result.user.phoneNumber;
      push(ref(db, "verifiedPhones"), {
        phone,
        timestamp: new Date().toISOString()
      });
      isVerified = true;
      document.getElementById("verify-popup").classList.add("hidden");
    })
    .catch(() => alert("Incorrect OTP"));
};

window.closePDF = () => {
  document.getElementById("pdf-popup").classList.add("hidden");
};

window.closeVerifyPopup = () => {
  document.getElementById("verify-popup").classList.add("hidden");
};

window.closePDF = () => {
  document.getElementById("pdf-popup").classList.add("hidden");
};