// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCtCbV-xl4oi7jr2jANhAiRtSgPPAwuYg8",
    authDomain: "chompbooks-a9e0d.firebaseapp.com",
    projectId: "chompbooks-a9e0d",
    storageBucket: "chompbooks-a9e0d.appspot.com",
    messagingSenderId: "938537878272",
    appId: "1:938537878272:web:2295153f124eddfdf329e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle login form submission
document.addEventListener("DOMContentLoaded", function () {
    console.log("Firebase.js loaded and DOM ready");

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault(); // Prevent page reload

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const messageContainer = document.getElementById("message-container");

            console.log("Attempting to log in with:", email);

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log("User logged in:", userCredential.user);
                messageContainer.innerHTML = `<p>Login successful!</p>`;
                messageContainer.style.color = "green";
                setTimeout(() => {
                    window.location.href = "/profile";
                }, 2000);
            } catch (error) {
                console.error("Login error:", error);
                messageContainer.innerHTML = `<p>Error: ${error.message}</p>`;
                messageContainer.style.color = "red";
            }
        });
    }

    // Handle account creation button
    const createAccountBtn = document.getElementById("create-account-btn");
    if (createAccountBtn) {
        createAccountBtn.addEventListener("click", async function () {
            console.log("Create account button clicked");

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const messageContainer = document.getElementById("message-container");

            console.log("Attempting to create account with:", email);

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log("User created:", userCredential.user);
                messageContainer.innerHTML = `<p>Account created successfully!</p>`;
                messageContainer.style.color = "green";
                setTimeout(() => {
                    window.location.href = "/profile";
                }, 2000);
            } catch (error) {
                console.error("Signup error:", error);
                messageContainer.innerHTML = `<p>Error: ${error.message}</p>`;
                messageContainer.style.color = "red";
            }
        });
    }

    // Global error handler for debugging
    window.addEventListener("error", function (event) {
        console.log("Global error:", event.error);
    });
});
