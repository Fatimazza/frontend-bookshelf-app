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

function createBookItem(bookObject) {
    const textTitle = document.createElement('h3');
    textTitle.innerText = bookObject.title

    const textAuthor = document.createElement('p');
    textAuthor.innerText = 'Penulis: ' + bookObject.author;

    const textYear = document.createElement('p');
    textYear.innerText = 'Tahun: ' + bookObject.year;

    const textContainer = document.createElement('article');
    textContainer.classList.add('book_item');
    textContainer.append(textTitle, textAuthor, textYear);
    textContainer.setAttribute('id', `book-${bookObject.id}`)

    if (bookObject.isComplete) {
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
    } else {
        const completeButton = document.createElement('button');
        completeButton.classList.add('green');
        completeButton.innerText = 'Selesai di baca';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('red');
        deleteButton.innerText = 'Hapus';

        const actionContainer = document.createElement('div');
        actionContainer.classList.add('action');
        actionContainer.append(completeButton, deleteButton);

        textContainer.append(actionContainer);
    }

    return textContainer;
}


