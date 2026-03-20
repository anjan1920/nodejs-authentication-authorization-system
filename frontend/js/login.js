console.log("Login page loaded");
import { apiRequest } from "./api.js"; 
import { withTimeout } from "./timeout.js";

const loader = document.getElementById("loader");
const errorBox = document.getElementById("errorMsg");

function init() {
  showLoader();
  checkAuth();
}
init();


async function checkAuth() {
  try {
    console.log("Checking logged in user...");

    const res = await withTimeout(
      apiRequest(
        "https://auth-system-backend-fdwu.onrender.com/api/v1/auth/current-user",
        {
          method: "GET",
          credentials: "include",
        }
      ),
      8000
    );

    if (!res.ok) return;

    let data;
    try {
      data = await res.json();
    } catch {
      return;
    }

    if (data?.success) {
      redirectToDashboard();
    }

  } catch (error) {
    if (error.message === "TIMEOUT") {
      showError("Server is taking too long. Try again.");
    } else {
      console.log("User not logged in");
    }
  } finally {
    hideLoader();
  }
}




document
  .getElementById("loginForm")
  .addEventListener("submit", handleLoginSubmit);

async function handleLoginSubmit(e) {
  e.preventDefault();
  clearError();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await loginUser(email, password);
}



async function loginUser(email, password) {
  try {
    showLoader();

    const res = await withTimeout(
      apiRequest(
        "https://auth-system-backend-fdwu.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      ),
      10000
    );

    let data = {};
    try {
      data = await res.json();
    } catch {}

    if (!res.ok) {
      showError(data.message || "Invalid credentials");
      return;
    }

    redirectToDashboard();

  } catch (err) {
    if (err.message === "TIMEOUT") {
      showError("Server is slow (cold start). Try again.");
    } else if (err.message === "NETWORK") {
      showError("Check your internet connection.");
    } else {
      showError("Something went wrong");
    }

    console.error(err);
  } finally {
    hideLoader();
  }
}



function redirectToDashboard() {
  window.location.href = "./dashboard.html";
}

function showError(message) {
  errorBox.innerText = message;
  errorBox.classList.remove("hidden");
}

function clearError() {
  errorBox.innerText = "";
  errorBox.classList.add("hidden");
}

function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}