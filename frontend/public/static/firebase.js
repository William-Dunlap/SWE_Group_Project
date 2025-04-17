import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCtCbV-xl4oi7jr2jANhAiRtSgPPAwuYg8",
    authDomain: "chompbooks-a9e0d.firebaseapp.com",
    projectId: "chompbooks-a9e0d",
    storageBucket: "chompbooks-a9e0d.appspot.com",
    messagingSenderId: "938537878272",
    appId: "1:938537878272:web:2295153f124eddfdf329e5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const createAccountBtn = document.getElementById("create-account-btn");
    const messageContainer = document.getElementById("message-container");

    async function sendTokenToBackend(user) {
        const idToken = await user.getIdToken();
        const response = await fetch("/session-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken })
        });

        if (response.ok) {
            window.location.href = "/profile";
        } else {
            messageContainer.textContent = "Failed to start session.";
        }
    }

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const userCred = await signInWithEmailAndPassword(auth, email, password);
                await sendTokenToBackend(userCred.user);
            } catch (err) {
                messageContainer.textContent = err.message;
            }
        });
    }

    if (createAccountBtn) {
        createAccountBtn.addEventListener("click", async () => {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const userCred = await createUserWithEmailAndPassword(auth, email, password);
                await sendTokenToBackend(userCred.user);
            } catch (err) {
                messageContainer.textContent = err.message;
            }
        });
    }
});
