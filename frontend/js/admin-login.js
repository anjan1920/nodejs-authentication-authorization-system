// handle admin login page logic
console.log("Admin login page loaded");

import { apiRequest } from "./api.js";
import { withTimeout } from "./timeout.js"; // added for timeout handling

const loader = document.getElementById("loader");

function init() {
  showLoader();
  checkAuth();
}

init();

async function checkAuth() {
  try {
    console.log("Checking logged in admin...");

    const res = await withTimeout(
      apiRequest(
        "https://auth-system-backend-fdwu.onrender.com/api/v1/auth/current-user",
        {
          method: "GET",
          credentials: "include"
        }
      ),
      8000 // timeout added
    );

    if (!res.ok) {
      return;
    }

    let data;
    try {
      data = await res.json();
    } catch {
      return;
    }

    if (!data.success) {
      return;
    }

    redirectToDashboard();

  } catch (error) {
    if (error.message === "TIMEOUT") {
      showError("Server taking too long (cold start)");
    } else {
      console.log("Admin not logged in");
    }
  } finally {
    hideLoader();
  }
}

document.getElementById("adminLoginForm").addEventListener("submit", handleLoginSubmit);

async function handleLoginSubmit(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log(`Admin email and pass ${email}, ${password}`);

  await loginAdmin(email, password);
}



async function loginAdmin(email, password) {
  try {
    showLoader();

    const res = await withTimeout(
      apiRequest(
        "https://auth-system-backend-fdwu.onrender.com/api/v1/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({ email, password })
        }
      ),
      10000 // login timeout
    );

    let data = {};
    try {
      data = await res.json();
    } catch {}

    console.log(data);

    if (!res.ok) {
      showError(data.message || "Admin login failed");
      return;
    }

    redirectToDashboard();

  } catch (err) {
    if (err.message === "TIMEOUT") {
      showError("Server slow, try again");
    } else if (err.message === "NETWORK") {
      showError("Check internet connection");
    } else {
      showError("Server error");
    }

    console.error(err);
  } finally {
    hideLoader(); // added for proper cleanup
  }
}

function redirectToDashboard() {
  window.location.href = "./admin-dashboard.html";
}

function showError(message) {
  document.getElementById("errorMsg").innerText = message;
}

function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}