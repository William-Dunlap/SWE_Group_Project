// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    const firebaseConfig = {
    apiKey: "AIzaSyCtCbV-xl4oi7jr2jANhAiRtSgPPAwuYg8",
    authDomain: "chompbooks-a9e0d.firebaseapp.com",
    projectId: "chompbooks-a9e0d",
    storageBucket: "chompbooks-a9e0d.firebasestorage.app",
    messagingSenderId: "938537878272",
    appId: "1:938537878272:web:2295153f124eddfdf329e5"
};

console.log("Script loaded!");

// Check if elements exist
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    console.log("Login form exists:", !!document.getElementById('login-form'));
    console.log("Email input exists:", !!document.getElementById('email'));
    console.log("Password input exists:", !!document.getElementById('password'));
    console.log("Create account button exists:", !!document.getElementById('create-account-btn'));
});
// This file handles the communication with our Flask backend for authentication
// It deliberately avoids direct Firebase client initialization

document.addEventListener('DOMContentLoaded', function() {
    console.log("Firebase.js loaded and DOM ready");

    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent page reload
            console.log("Login form submitted");

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const messageContainer = document.getElementById('message-container');

            console.log("Attempting to log in with:", email);

            // Make a direct request to the Flask backend
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    messageContainer.innerHTML = `<p>${data.message}</p>`;
                    messageContainer.style.color = "green";
                    setTimeout(() => {
                        window.location.href = "/profile";
                    }, 2000);
                } else if (data.error) {
                    messageContainer.innerHTML = `<p>Error: ${data.error}</p>`;
                    messageContainer.style.color = "red";
                }
            })
            .catch(error => {
                console.error("Login error:", error);
                messageContainer.innerHTML = `<p>Error: ${error.message}</p>`;
                messageContainer.style.color = "red";
            });
        });
    }

    // Handle account creation button
    const createAccountBtn = document.getElementById('create-account-btn');
    if (createAccountBtn) {
        createAccountBtn.addEventListener('click', function() {
            console.log("Create account button clicked");

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const messageContainer = document.getElementById('message-container');

            console.log("Attempting to create account with:", email);

            fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    messageContainer.innerHTML = `<p>${data.message}</p>`;
                    messageContainer.style.color = "green";
                    setTimeout(() => {
                        window.location.href = "/profile";
                    }, 2000);
                } else if (data.error) {
                    messageContainer.innerHTML = `<p>Error: ${data.error}</p>`;
                    messageContainer.style.color = "red";
                }
            })
            .catch(error => {
                console.error("Signup error:", error);
                messageContainer.innerHTML = `<p>Error: ${error.message}</p>`;
                messageContainer.style.color = "red";
            });
        });
    }

    // Add global error handler for debugging
    window.addEventListener('error', function(event) {
        console.log('Global error:', event.error);
    });
});