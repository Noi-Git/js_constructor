// 1. Book Constructor - creating actual book object
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// 3. UI Constructor - set of prototyp method
function UI() {}

// Add book to list
UI.prototype.addBookToList = function(book) {
    // console.log(book)
    const list = document.getElementById('book-list');

    // Crate tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">Delete</a></td>
    `;
    
    list.appendChild(row);
}
    // Show Alert
    UI.prototype.showAlert = function(message, className) {
        // Create div
        const div = document.createElement('div');
        // Add classes
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('.container');
        // Get form
        const form = document.querySelector('#book-form');
        // Insert alert
        container.insertBefore(div, form);

        // Disappear after 3 seconds
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    // Delete Book
    UI.prototype.deleteBook = function(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    // Clear Fields
    UI.prototype.clearFields = function() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

// 2. Event Listeners for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
    // console.log('test')
    // get form values
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const isbn = document.getElementById('isbn').value
    // console.log(title, author, isbn);

    // instantiate a book
    const book = new Book(title, author, isbn);
    // console.log(book);

    // instantiate UI
    const ui = new UI()
    // console.log(ui);

    // Validate
    if(title === '' || title === '' || isbn === '') {
        // alert('Failed')
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add book to list
        ui.addBookToList(book);

        // Show success
        ui.showAlert('Book Added!', 'success');

        // Clear fields
        ui.clearFields();
    }

    e.preventDefault();
})


// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
    // console.log(123);
    // Instantiate UI
    const ui = new UI();

    // Delete book
    ui.deleteBook(e.target);

    // Show message
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault();
})