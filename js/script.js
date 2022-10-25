document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBookForm');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });
});

function addBook() {
    const generatedBookId = generateBookId();
    console.log('Function Add Book called');
    console.log('Book id ' + generatedBookId);
}

function generateBookId() {
    return +new Date();
}
