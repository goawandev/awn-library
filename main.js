// const myLibrary = [];

// function Book(title, author, pages, isRead) {
//   this.id = crypto.randomUUID();
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.isRead = isRead;
// }

// Book.prototype.toggleReadStatus = function () {
//   this.isRead = !this.isRead;
// };

// // Add book
// function addBookToLibrary(title, author, pages, isRead) {
//   const newBook = new Book(title, author, pages, isRead);
//   myLibrary.push(newBook);
//   displayBook();
// }

// // Display book
// function displayBook() {
//   console.log(myLibrary);
//   const libraryContainer = document.querySelector("#library");
//   libraryContainer.innerHTML = "";

//   myLibrary.forEach((book) => {
//     const bookCard = document.createElement("div");
//     bookCard.classList.add("book-card");
//     bookCard.setAttribute("data-id", book.id);

//     bookCard.innerHTML = `
//     <h3>${book.title}</h3>
//     <p>Author: ${book.author}</p>
//     <p>Pages: ${book.pages}</p>
//     <label>
//     <input type="checkbox" class="read-toggle" ${book.isRead ? "checked" : ""}>
//     Read
//     </label>
//     <button class="remove-btn">Remove</button>
//     `;

//     libraryContainer.appendChild(bookCard);
//   });

//   //   EventListener remove book
//   const removeButtons = document.querySelectorAll(".remove-btn");
//   removeButtons.forEach((button) => {
//     button.addEventListener("click", (e) => {
//       const bookCard = e.target.closest(".book-card");
//       const bookId = bookCard.getAttribute("data-id");
//       removeBook(bookId);
//     });
//   });

//   //   EventListener status read
//   const readToggles = document.querySelectorAll(".read-toggle");
//   readToggles.forEach((checkbox) => {
//     checkbox.addEventListener("change", (e) => {
//       const bookCard = e.target.closest(".book-card");
//       const bookId = bookCard.getAttribute("data-id");
//       toggleBookReadStatus(bookId);
//     });
//   });
// }

// // New book form
// const newBookBtn = document.querySelector("#newBookBtn");
// const bookForm = document.querySelector("#bookForm");

// newBookBtn.addEventListener("click", () => {
//   if (bookForm.style.display === "none" || bookForm.style.display === "") {
//     bookForm.style.display = "flex";
//   } else {
//     bookForm.style.display = "none";
//   }
// });

// bookForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const title = document.querySelector("#title").value;
//   const author = document.querySelector("#author").value;
//   const pages = document.querySelector("#pages").value;
//   const isRead = document.querySelector("#isRead").checked;

//   addBookToLibrary(title, author, pages, isRead);

//   bookForm.reset();
//   bookForm.style.display = "none";
// });

// // Remove book
// function removeBook(bookId) {
//   const index = myLibrary.findIndex((book) => book.id === bookId);

//   if (index !== -1) {
//     myLibrary.splice(index, 1);
//     console.log("Buku dihapus. Sisa buku:", myLibrary);
//     displayBook();
//   }
// }

// // Read status function
// function toggleBookReadStatus(bookId) {
//   const book = myLibrary.find((b) => b.id === bookId);
//   if (book) {
//     book.toggleReadStatus();
//     displayBook();
//   }
// }

// // testing
// addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
// addBookToLibrary("Clean Code", "Robert C. Martin", 464, true);

// Refactor To Class
// Book Class
class Book {
  constructor(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  toggleReadStatus() {
    this.isRead = !this.isRead;
  }
}

// Library Class
class Library {
  constructor() {
    this.books = [];
    this.libraryContainer = document.querySelector("#library");
    this.bookForm = document.querySelector("#bookForm");
    this.newBookBtn = document.querySelector("#newBookBtn");

    this.setUpEventListeners();
  }

  setUpEventListeners() {
    // New book btn
    this.newBookBtn.addEventListener("click", () => {
      if (
        this.bookForm.style.display === "none" ||
        this.bookForm.style.display === ""
      ) {
        this.bookForm.style.display = "flex";
      } else {
        this.bookForm.style.display = "none";
      }
    });

    // sumbit form new book
    this.bookForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.querySelector("#title").value;
      const author = document.querySelector("#author").value;
      const pages = document.querySelector("#pages").value;
      const isRead = document.querySelector("#isRead").checked;

      this.addBook(title, author, pages, isRead);

      this.bookForm.reset();
      this.bookForm.style.display = "none";
    });
  }

  addBook(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    this.books.push(newBook);
    this.displayBooks();
  }

  removeBook(bookId) {
    this.books = this.books.filter((book) => book.id !== bookId);
    this.displayBooks();
  }

  toggleReadStatus(bookId) {
    const book = this.books.find((b) => b.id === bookId);
    if (book) {
      book.toggleReadStatus();
      this.displayBooks();
    }
  }

  displayBooks() {
    console.log(this.books);
    this.libraryContainer.innerHTML = "";

    this.books.forEach((book) => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");
      bookCard.setAttribute("data-id", book.id);

      bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <label>
          <input type="checkbox" class="read-toggle" ${
            book.isRead ? "checked" : ""
          }>
          Read
        </label>
        <button class="remove-btn">Remove</button>
      `;

      this.libraryContainer.appendChild(bookCard);
    });

    this.attachCardEvents();
  }

  attachCardEvents() {
    // Delete book
    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const bookCard = e.target.closest(".book-card");
        const bookId = bookCard.getAttribute("data-id");
        this.removeBook(bookId);
      });
    });

    const readToggles = document.querySelectorAll(".read-toggle");
    readToggles.forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        const bookCard = e.target.closest(".book-card");
        const bookId = bookCard.getAttribute("data-id");
        this.toggleReadStatus(bookId);
      });
    });
  }
}

const library = new Library();

library.addBook("The Hobbit", "J.R.R", 310, false);
library.addBook("Clean Code", "Robert C. Martin", 464, true);
