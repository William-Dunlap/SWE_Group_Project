document.getElementById("add-book-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("/add-book", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const message = document.getElementById("add-book-message");
    const result = await response.json();
    console.log("Backend response:", result);

    message.textContent = result.message || result.error;
    message.style.color = response.ok ? "green" : "red";

    if (response.ok) {
        // Clear form fields
        form.reset();

        // Remove message after ~2 seconds
        setTimeout(() => {
            message.textContent = "";
        }, 2000);
    }
});
