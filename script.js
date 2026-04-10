import { nanoid } from "https://cdn.jsdelivr.net/npm/nanoid/nanoid.js";

let myLibrary = JSON.parse(localStorage.getItem("library")) || [
  {
    author: "George Orwell",
    title: "1984",
    category: "Fiction",
    pages: "328",
    readStatus: "Read",
    id: "T6cunGevj85jBfOKEeYha",
  },
  {
    author: "J.R.R. Tolkien",
    title: "The Fellowship of the Ring",
    category: "Fiction",
    pages: "423",
    readStatus: "Unread",
    id: "0ZNbQIk7pM6G5aWAkErGw",
  },
  {
    author: "Yuval Noah Harari",
    title: "Sapiens",
    category: "Science",
    pages: "443",
    readStatus: "Read",
    id: "BYkaqLTtTfpoxzLoPPk-v",
  },
  {
    author: "Agatha Christie",
    title: "Murder on the Orient Express",
    category: "Mystery",
    pages: "256",
    readStatus: "Unread",
    id: "U1yVkbB4MxQB4mVW0ePkA",
  },
  {
    author: "F. Scott Fitzgerald",
    title: "The Great Gatsby",
    category: "Romance",
    pages: "180",
    readStatus: "Read",
    id: "B25yRpcBn0o_r_-LCoAPK",
  },
];

if (myLibrary.length === 0) {
  displayEmptyNotification("Books in your library will appear here");
  document.getElementById("search").setAttribute("disabled", true);
}

function displayEmptyNotification(message) {
  document.querySelector(".js-container").innerHTML =
    `<p class="no-result">${message}</p>`;
}

updateBookHistory();
function updateBookHistory() {
  const readBooks = myLibrary.reduce((accumulator, book) => {
    if (book.readStatus === "Read") {
      accumulator += 1;
    }
    return accumulator;
  }, 0);

  const unreadBooks = myLibrary.reduce((accumulator, book) => {
    if (book.readStatus === "Unread") {
      accumulator += 1;
    }
    return accumulator;
  }, 0);
  document.querySelector(".js-read").textContent = readBooks;
  document.querySelector(".js-unread").textContent = unreadBooks;
}

document
  .querySelector(".heading-illustration")
  .addEventListener("click", (event) => {
    document.querySelectorAll(".read-status").forEach((value) => {
      value.classList.toggle("selected-value");
    });
  });

class Book {
  constructor(author, title, category, pages, readStatus, id) {
    this.author = author;
    this.title = title;
    this.category = category;
    this.pages = pages;
    this.readStatus = readStatus;
    this.id = id;
  }
}

function addBookToLibrary(author, title, category, pages, readStatus, id) {
  const book = new Book(author, title, category, pages, readStatus, id);

  myLibrary.push(book);
  saveToStorage();
  document.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });
  document
    .querySelector(".js-added-confirmation")
    .classList.add("added-successfully");
  setTimeout(() => {
    document
      .querySelector(".js-added-confirmation")
      .classList.remove("added-successfully");
  }, 3000);
}

renderLibrary(myLibrary);
function renderLibrary(books) {
  document.querySelector(".js-container").innerHTML = "";
  books.forEach((book, index) => {
    const buttonStatus = book.readStatus === "Read" ? "Unread" : "Read";
    document.querySelector(".js-container").innerHTML += `
      <div class="book-card js-book-card">
        <div class="category-container">
          <div class="category">
            <p>${book.category}</p>
          </div>
        </div>
        <div class="book-metadata">
          <p class="label">Author:</p>
          <p class="value">${book.author}</p>
          <p class="label">Title:</p>
          <p class="value book-title">${book.title}</p>
          <p class="label">Pages:</p>
          <p class="value">${book.pages}</p>
          <p class="label">Status:</p>
          <p class="value read-status">${book.readStatus}</p>
        </div>
        <div class="book-buttons">
          <button type="button" class="toggle-status js-toggle-status" data-id="${book.id}">Mark as ${buttonStatus}</button>
          <button type="button" class="remove js-remove" data-index="${index}">Remove</button>
        </div>
      </div>
  `;
  });
}

function searchBook(searchTerm) {
  const searchResults = myLibrary.filter((book) => {
    return (
      book.author.toLowerCase().includes(searchTerm) ||
      book.title.toLowerCase().includes(searchTerm) ||
      book.category.toLowerCase().includes(searchTerm)
    );
  });

  if (searchResults.length === 0) {
    displayEmptyNotification("No matching books found");
    return;
  }

  renderLibrary(searchResults);
}

function saveToStorage() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
}

function renderFormDialogue() {
  document.querySelector(".js-overlay").classList.add("active-overlay");
}

document.querySelector(".js-overlay").addEventListener("click", (e) => {
  if (e.target === e.currenTarget) {
    closeFormDialogue();
  }
});

function closeFormDialogue() {
  document.querySelector(".js-overlay").classList.remove("active-overlay");
}

document.getElementById("search").addEventListener("input", (event) => {
  const searchTerm = document
    .getElementById("search")
    .value.trim()
    .toLowerCase();
  searchBook(searchTerm);
});

const authorInput = document.getElementById("author");
const titleInput = document.getElementById("title");
const pagesInput = document.getElementById("pages");
const categoryInput = document.getElementById("category");

[authorInput, titleInput, pagesInput].forEach((input) => {
  input.addEventListener("input", () => {
    input.setCustomValidity("");
  });
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (authorInput.validity.valueMissing) {
    authorInput.setCustomValidity("Please provide an author");
    authorInput.reportValidity();
    return;
  } else {
    authorInput.setCustomValidity("");
  }

  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity("Please provide a book title");
    titleInput.reportValidity();
    return;
  } else {
    titleInput.setCustomValidity("");
  }

  if (pagesInput.validity.valueMissing) {
    pagesInput.setCustomValidity("Please provide the number of pages");
    pagesInput.reportValidity();
  } else {
    pagesInput.setCustomValidity("");
  }

  if (isNaN(pagesInput.value) || pagesInput.value.trim() === "") {
    pagesInput.setCustomValidity("Pages must be numbers");
    pagesInput.reportValidity();
    return;
  } else {
    pagesInput.setCustomValidity("");
  }

  if (Number(pagesInput.value) < 10 || Number(pagesInput.value) > 1000) {
    pagesInput.setCustomValidity("Pages must be between 10 and 1000");
    pagesInput.reportValidity();
    return;
  } else {
    pagesInput.setCustomValidity("");
  }

  const author = authorInput.value;
  const title = titleInput.value;
  const category = categoryInput.value;
  const pages = pagesInput.value;
  const id = nanoid();

  const checkBox = document.getElementById("read");
  const readStatus = checkBox.checked ? "Read" : "Unread";

  addBookToLibrary(author, title, category, pages, readStatus, id);

  renderLibrary(myLibrary);
  updateBookHistory();
});

document.querySelector(".js-new-book").addEventListener("click", (e) => {
  renderFormDialogue();
});

document.querySelector(".js-close-button").addEventListener("click", () => {
  closeFormDialogue();
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeFormDialogue();
  }
});

document.querySelector(".js-container").addEventListener("click", (event) => {
  if (event.target.classList.contains("js-toggle-status")) {
    const id = event.target.getAttribute("data-id");

    const book = myLibrary.find((book) => {
      return book.id === id;
    });

    if (book) {
      if (book.readStatus === "Read") {
        book.readStatus = "Unread";
      } else if (book.readStatus === "Unread") {
        book.readStatus = "Read";
      }
      renderLibrary(myLibrary);
      saveToStorage();
      updateBookHistory();
    }
  }

  if (event.target.classList.contains("js-remove")) {
    const index = event.target.dataset.index;
    const container = event.target.closest(".js-book-card");
    container.classList.add("fade");
    setTimeout(() => {
      myLibrary.splice(index, 1);
      renderLibrary(myLibrary);
      saveToStorage();
      updateBookHistory();
    }, 500);
  }
});
