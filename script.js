// listeners
const overlay = document.querySelector(".overlay");
const formContainer = document.querySelector(".add-book");

const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", addToLibrary);

// book constructor
class Book {
  constructor(name, author) {
    this.name = form.name.value;
    this.author = form.author.value;
  }
}

// create book,add to library
let myLibrary = [];
const form = document.forms.popup;

function addToLibrary(e) {
  e.preventDefault();
  overlay.style.display = "none";
  formContainer.style.display = "none";
  let newBook = new Book();
  myLibrary.push(newBook);
  setLocalStorage();
  render();
  form.reset();
  createAddCard();
}

// render

function render() {
  const bookContainer = document.querySelector(".book-container");
  const books = document.querySelectorAll(".book");
  books.forEach((book) => bookContainer.removeChild(book));

  myLibrary.forEach((book) => createBook(book));
}

// create book DOM

const bookContainer = document.querySelector(".book-container");

function createBook(book) {
  const bookDiv = document.createElement("div");
  const nameDiv = document.createElement("div");
  const authorDiv = document.createElement("div");
  const removeBtn = document.createElement("button");
  const readBtn = document.createElement("button");

  bookDiv.classList.add("book");

  nameDiv.textContent = book.name;
  nameDiv.classList.add("name");
  bookDiv.appendChild(nameDiv);

  authorDiv.textContent = book.author;
  authorDiv.classList.add("author");
  bookDiv.appendChild(authorDiv);

  removeBtn.textContent = "Del";
  removeBtn.setAttribute("id", "remove-btn");
  bookDiv.appendChild(removeBtn);

  removeBtn.addEventListener("click", () => {
    myLibrary.splice(myLibrary.indexOf(book), 1);
    setLocalStorage();
    render();
    createAddCard();
  });

  bookContainer.appendChild(bookDiv);
}

// create add-book-card

function createAddCard() {
  const addBookCardDiv = document.createElement("div");
  addBookCardDiv.classList.add("book");
  addBookCardDiv.classList.add("add-book-card");

  const addBookBtn = document.createElement("button");
  addBookBtn.setAttribute("id", "add-book-btn");
  addBookBtn.innerText = "+";

  addBookCardDiv.appendChild(addBookBtn);
  bookContainer.appendChild(addBookCardDiv);

  addBookBtn.addEventListener("click", openForm);

  function openForm() {
    overlay.style.display = "block";
    formContainer.style.display = "block";
  }
}

// Local Storage

function setLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function loadLocalStorage() {
  if (!localStorage.myLibrary) {
    render();
    createAddCard();
  } else {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    render();
    createAddCard();
  }
}

loadLocalStorage();