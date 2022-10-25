const books = [];
const RENDER_EVENT = 'render-book';

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBookForm');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });
});

document.addEventListener(RENDER_EVENT, function () {
    console.log(books);
    createBookItem();
});

function addBook() {
    const bookTitle = document.getElementById('inputBookTitle').value;
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const bookYear = document.getElementById('inputBookYear').value;
    const bookIsComplete = document.getElementById('inputBookIsComplete').checked;

    const generatedBookId = generateBookId();
    const bookObject = generateBookObject(generatedBookId, bookTitle, bookAuthor, bookYear, bookIsComplete);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function generateBookId() {
    return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete
    }
}

function createBookItem() {
    const textTitle = document.createElement('h3');
    textTitle.innerText = "Judul Buku"

    const textAuthor = document.createElement('p');
    textAuthor.innerText = "Penulis: Author";

    const textYear = document.createElement('p');
    textYear.innerText = "Tahun: 2020";

    const textContainer = document.createElement('article');
    textContainer.classList.add('book_item');
    textContainer.append(textTitle, textAuthor, textYear);

    const incompleteBookList = document.getElementById('completeBookshelfList');
    incompleteBookList.innerHTML = '';
    incompleteBookList.append(textContainer)

    const isBookCompleted = true;

    if (isBookCompleted) {
        const incompleteButton = document.createElement('button');
        incompleteButton.classList.add('green');
        incompleteButton.innerText = 'Belum selesai di baca';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('red');
        deleteButton.innerText = 'Hapus';

        const actionContainer = document.createElement('div');
        actionContainer.classList.add('action');
        actionContainer.append(incompleteButton, deleteButton);

        textContainer.append(actionContainer);
    }
}


