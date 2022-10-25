const books = [];
const RENDER_EVENT = 'render-book';

const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOK_APPS';

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBookForm');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });
});

document.addEventListener(RENDER_EVENT, function () {
    console.log(books);

    const incompleteBookList = document.getElementById('incompleteBookshelfList');
    incompleteBookList.innerHTML = '';

    const completeBookList = document.getElementById('completeBookshelfList');
    completeBookList.innerHTML = '';

    for (const bookItem of books) {
        const bookElement = createBookItem(bookItem);

        if (!bookItem.isComplete)
            incompleteBookList.append(bookElement);
        else
            completeBookList.append(bookElement);
    }
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
    saveData();
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
    };
}

function createBookItem(bookObject) {
    const textTitle = document.createElement('h3');
    textTitle.innerText = bookObject.title;

    const textAuthor = document.createElement('p');
    textAuthor.innerText = 'Penulis: ' + bookObject.author;

    const textYear = document.createElement('p');
    textYear.innerText = 'Tahun: ' + bookObject.year;

    const textContainer = document.createElement('article');
    textContainer.classList.add('book_item');
    textContainer.append(textTitle, textAuthor, textYear);
    textContainer.setAttribute('id', `book-${bookObject.id}`);

    const completeStatusButton = document.createElement('button');
    completeStatusButton.classList.add('green');
    bookObject.isComplete ?
        completeStatusButton.innerText = 'Belum selesai di baca' :
        completeStatusButton.innerText = 'Selesai di baca';

    completeStatusButton.addEventListener('click', function () {
        manageCompletedBook(bookObject);
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('red');
    deleteButton.innerText = 'Hapus';

    deleteButton.addEventListener('click', function () {
        removeBook(bookObject.id);
    });

    const actionContainer = document.createElement('div');
    actionContainer.classList.add('action');
    actionContainer.append(completeStatusButton, deleteButton);

    textContainer.append(actionContainer);

    return textContainer;
}

function removeBook(bookId) {
    const bookTarget = findBookIndex(bookId);

    if (bookTarget === -1) return;

    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }
    return -1;
}

function manageCompletedBook(bookObject) {
    const bookTarget = findBook(bookObject.id);

    if (bookTarget == null) return;

    bookTarget.isComplete = !bookObject.isComplete;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function findBook(bookId) {
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}