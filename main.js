const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Add book
function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  displayBook();
}

// Display book
function displayBook() {
  console.log(myLibrary);
  const libraryContainer = document.querySelector("#library");
  libraryContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.innerHTML = `
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <p>Read: ${book.isRead ? "Yes" : "No"}</p>
    `;

    libraryContainer.appendChild(bookCard);
  });
}

// New book form
const newBookBtn = document.querySelector("#newBookBtn");
const bookForm = document.querySelector("#bookForm");

newBookBtn.addEventListener("click", () => {
  if (bookForm.style.display === "none" || bookForm.style.display === "") {
    bookForm.style.display = "flex";
  } else {
    bookForm.style.display = "none";
  }
});

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const isRead = document.querySelector("#isRead").checked;

  addBookToLibrary(title, author, pages, isRead);

  bookForm.reset();
  bookForm.style.display = "none";
});

// testing
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
addBookToLibrary("Clean Code", "Robert C. Martin", 464, true);
