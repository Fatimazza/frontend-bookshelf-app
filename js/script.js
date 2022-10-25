const books = [];

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBookForm');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });
});

function addBook() {
    const bookTitle = document.getElementById('inputBookTitle').value;
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const bookYear = document.getElementById('inputBookYear').value;
    const bookIsComplete = document.getElementById('inputBookIsComplete').checked;

    const generatedBookId = generateBookId();
    const bookObject = generateBookObject(generatedBookId, bookTitle, bookAuthor, bookYear, bookIsComplete);
    books.push(bookObject);

    console.log('Book ' + generatedBookId + ' ' + bookTitle + ' ' + bookAuthor + ' ' + bookYear + ' ' + bookIsComplete);
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

