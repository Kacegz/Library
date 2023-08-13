let myLibrary = [];
let id = 0;
const booksbox = document.querySelector("#books");
let books = document.querySelectorAll(".placeable");
const add = document.querySelector("#addbook");
add.addEventListener("click", addNewBook);
books[0].textContent = "";
let shelfindex = 0;
let counter = 0;
class Book {
  constructor(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }
  display() {
    let book = document.createElement("div");
    book.classList.add("book");
    let title = document.createElement("h1");
    let author = document.createElement("h2");
    let pages = document.createElement("p");
    let read = document.createElement("p");
    title.textContent = this.title;
    author.textContent = this.author;
    pages.textContent = this.pages;
    read.textContent = this.read;
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(read);
    let choices = document.createElement("div");
    choices.id = "choiceboxes";
    let remove = document.createElement("div");
    remove.classList.add("remove");
    remove.id = this.id;
    book.id = this.id;
    let change = document.createElement("div");
    change.classList.add("change");
    change.id = this.id;
    change.addEventListener("click", this.changeRead);
    remove.addEventListener("click", this.removeBook);
    choices.appendChild(change);
    choices.appendChild(remove);
    book.appendChild(choices);
    books[shelfindex].appendChild(book);
  }

  removeBook() {
    console.log(this);
    let shelf = document.querySelector(".placeable");
    console.log(myLibrary[document.getElementById(this)]);
    let book = document.getElementById(this.id);
    console.log(book);
    if (book.parentNode) {
      book.parentNode.removeChild(book);
    }
    delete myLibrary[this.id];
  }
  changeRead() {
    let thisbook = document
      .getElementById(this.id)
      .getElementsByTagName("p")[1];
    console.log(thisbook);
    if (this.read === "Not read yet") {
      thisbook.textContent = "Already read";
      return (this.read = "Already read");
    } else {
      thisbook.textContent = "Not read yet";
      return (this.read = "Not read yet");
    }
  }
}

function addNewBook(event) {
  let newTitle = document.querySelector("#title");
  let newAuthor = document.querySelector("#author");
  let newPages = document.querySelector("#pages");
  let newRead;
  if (document.querySelector("#read").checked) {
    newRead = "Already read";
  } else {
    newRead = "Not read yet";
  }
  /*
  if (newTitle === "" || newTitle === "" || newPages === "") {
    return;
  }
  if (isNaN(newPages)) {
    document.querySelector("#pages").setAttribute("style", "border-color:red");
    return;
  }*/
  if (newTitle.validity.valueMissing) {
    return;
  }
  if (newAuthor.validity.valueMissing) {
    return;
  }
  if (newPages.validity.valueMissing || newPages.validity.patternMismatch) {
    return;
  }
  document.querySelector("#pages").setAttribute("style", "border-color:green");
  addBookToLibrary(
    newTitle.value,
    newAuthor.value,
    newPages.value,
    newRead,
    id
  );
  if (myLibrary.slice(-1)[0].id % 4 == 0) {
    shelfindex++;
    let shelf = document.createElement("div");
    shelf.classList.add("shelf");
    let placeableshelf = document.createElement("div");
    placeableshelf.classList.add("shelf");
    placeableshelf.classList.add("placeable");
    booksbox.appendChild(placeableshelf);
    booksbox.appendChild(shelf);
    books = document.querySelectorAll(".placeable");
  }
  myLibrary.slice(-1)[0].display();
  event.preventDefault();
}

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read, id);
  id++;
  myLibrary.push(newBook);
}
function displayAll() {
  myLibrary.forEach((book) => {
    console.log(book.id);
    myLibrary[book.id].display();
  });
}
addBookToLibrary("Hobbit", "Tolkien", 310, "Not read yet");
addBookToLibrary("Witcher", "A.Sapkowski", 343, "Already read");
displayAll();
