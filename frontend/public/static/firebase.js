// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Handle login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageContainer = document.getElementById('message-container');

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            messageContainer.innerHTML = `<p>Welcome, ${user.email}</p>`;
            messageContainer.style.color = "green";
            setTimeout(() => {
                window.location.href = "/profile";  // Redirect to profile page
            }, 2000); // Delay to show the success message
        })
        .catch((error) => {
            const errorMessage = error.message;
            messageContainer.innerHTML = `<p>Error: ${errorMessage}</p>`;
            messageContainer.style.color = "red";
        });
});

// Handle account creation
document.getElementById('create-account-btn').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageContainer = document.getElementById('message-container');

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            messageContainer.innerHTML = `<p>Account created successfully! Welcome, ${user.email}</p>`;
            messageContainer.style.color = "green";
            setTimeout(() => {
                window.location.href = "/profile";  // Redirect to profile page
            }, 2000); // Delay to show the success message
        })
        .catch((error) => {
            const errorMessage = error.message;
            messageContainer.innerHTML = `<p>Error: ${errorMessage}</p>`;
            messageContainer.style.color = "red";
        });
});
