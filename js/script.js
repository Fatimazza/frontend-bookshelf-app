document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBookForm');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });
});

function addBook() {
    const generatedID = generateBookId();
    console.log('Function Add Book called');
    console.log('Book id ' + generateBookId);
}

function generateBookId() {
    return +new Date();
}
