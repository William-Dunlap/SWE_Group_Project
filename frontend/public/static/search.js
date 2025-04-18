document.getElementById("search-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = document.getElementById("search-input").value.trim();

    const response = await fetch(`/search?q=${encodeURIComponent(query)}`);
    const books = await response.json();
    const container = document.getElementById("book-container");
    container.innerHTML = "";

    books.forEach(book => {
        const div = document.createElement("div");
        div.className = "book-card";
        div.innerHTML = `
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Course:</strong> ${book.courseNumber}</p>
                <p><strong>Professor:</strong> ${book.professor}</p>
                <p><strong>Price:</strong> $${book.price}</p>
                <button class="buy-button" data-id="${book.doc_id}">Buy</button>
        `;
        container.appendChild(div);
    });
});

document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("buy-button")) {
        const bookId = e.target.dataset.id;

        const confirmed = confirm("Are you sure you want to buy this book?");
        if (!confirmed) return;

        const response = await fetch(`/delete-book/${bookId}`, {
            method: "DELETE"
        });
        if (response.ok) {
            e.target.closest(".book-card").remove();
        } else {
            const error = await response.json();
            alert("Error: " + error.error);
        }
    }
});

