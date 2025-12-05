const library = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBook(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  library.push(book);
  render();
}

function render() {
  const display = document.getElementById("display");
  display.innerHTML = "";

  library.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <p>${book.pages} pages</p>
      <p>${book.read ? "Read" : "Not read"}</p>
      <button class="remove">Remove</button>
      <button class="toggle">Toggle</button>
    `;

    display.appendChild(card);
  });

  setButtons();
}

function setButtons() {
  document.querySelectorAll(".remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.closest(".card").dataset.id;
      const index = library.findIndex((b) => b.id === id);
      library.splice(index, 1);
      render();
    });
  });

  document.querySelectorAll(".toggle").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.closest(".card").dataset.id;
      const book = library.find((b) => b.id === id);
      book.toggleRead();
      render();
    });
  });
}

const form = document.getElementById("bookForm");
const toggleFormBtn = document.getElementById("newBookBtn");

toggleFormBtn.addEventListener("click", () => {
  form.classList.toggle("hidden");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBook(title, author, pages, read);
  form.reset();
  form.classList.add("hidden");
});

