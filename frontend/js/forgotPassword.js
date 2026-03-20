console.log("Forgot Password JS loaded");

import { withTimeout } from "./timeout.js";

const form = document.getElementById("forgotForm");
const emailInput = document.getElementById("email");
const loading = document.getElementById("loading");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Butn pressed");
  

  const email = emailInput.value.trim();

  if (!email) {
    message.innerText = "Please enter your email";
    message.className = "text-red-400 text-center mt-4";
    return;
  }

  try {
    // UI loading state
    loading.classList.remove("hidden");
    submitBtn.disabled = true;
    message.innerText = "";

    const res = await withTimeout(
      fetch("https://auth-system-backend-fdwu.onrender.com/api/v1/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      }),
      10000 // timeout added
    );

    let data = {};
    try {
      data = await res.json();
    } catch {}

    if (res.ok) {
      message.innerText = "Reset link sent to your email.";
      message.className = "text-green-400 text-center mt-4";
      form.reset();
    } else {
      message.innerText = data.message || "Failed to send reset email.";
      message.className = "text-red-400 text-center mt-4";
    }

  } catch (error) {
    console.error(error);

    if (error.message === "TIMEOUT") {
      message.innerText = "Server taking too long. Try again.";
    } else if (error.message === "NETWORK") {
      message.innerText = "Check your internet connection.";
    } else {
      message.innerText = "Something went wrong.";
    }

    message.className = "text-red-400 text-center mt-4";

  } finally {
    loading.classList.add("hidden");
    submitBtn.disabled = false;
  }
});