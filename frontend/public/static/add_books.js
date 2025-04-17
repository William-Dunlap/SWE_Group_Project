document.getElementById("add-book-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Collect data from the form and convert it to a plain object
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Send the data as JSON to the backend
    const response = await fetch("/add-book", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"  // Make sure we are sending JSON
        },
        body: JSON.stringify(data)  // Send the data as a JSON string
    });

    const message = document.getElementById("add-book-message");
    const result = await response.json();
    console.log("Backend response:", result);  // Debug log for response

    message.textContent = result.message || result.error;
    message.style.color = response.ok ? "green" : "red";
});
