document.getElementById("search-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = document.getElementById("search-input").value.trim();

    const response = await fetch(`/search?q=${encodeURIComponent(query)}`);
    const books = await response.json();

    // Update the book list dynamically (depends on how your book cards are rendered)
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
        `;
        container.appendChild(div);
    });
});
